import classNames from "classnames";
import {
  ChangeEvent,
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import { useForm } from "./form-context";

export const InputElementFactory = <
  T extends HTMLAttributes<unknown> & { name?: string },
>(
  FormElement: FC<any>,
) =>
  memo(({ onChange, ...props }: Partial<T>) => {
    const { onChange: notifyForm, getErrors, subscribeToSubmit } = useForm();
    const [animateError, setAnimateError] = useState(false);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        notifyForm();
        onChange?.(event);
      },
      [onChange, notifyForm],
    );

    useEffect(() => {
      const unsubscribe = subscribeToSubmit(() => setAnimateError(true));
      return () => {
        unsubscribe();
      };
    }, [subscribeToSubmit]);

    useEffect(() => {
      let timeout;
      if (animateError) {
        timeout = setTimeout(() => setAnimateError(false), 100);
      }
      return () => {
        clearTimeout(timeout);
      };
    }, [animateError]);

    const errors = getErrors(props.name);
    const hasErrors = errors.length > 0;

    return (
      <>
        <FormElement
          {...props}
          className={classNames(props.className, {
            form__field: hasErrors,
            "form__error--notify": hasErrors && animateError,
          })}
          onChange={handleChange}
        />
        {hasErrors && (
          <div className="form__errorContainer">
            {errors.map((errorMessage, i) => (
              <p key={i} className="form__error">
                {errorMessage}
              </p>
            ))}
          </div>
        )}
      </>
    );
  });
