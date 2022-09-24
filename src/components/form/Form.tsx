import { useZod } from "@trampo/hooks";
import { getFormData } from "@trampo/lib/app";
import {
  FormEvent,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { z } from "zod";

import { FormContext } from "./form-context";

export type FormRef = {
  reset: () => void;
};

interface IProps<T extends z.SomeZodObject>
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  zodSchema: T;
  initialValues: z.infer<T>;
  onSubmit: (formData: z.infer<T>) => void;
  children: ReactNode | ReactNode[];
}

export const Form = forwardRef(
  <T extends z.SomeZodObject>(
    { zodSchema, initialValues, onSubmit, children, ...props }: IProps<T>,
    ref,
  ) => {
    const formRef = useRef<HTMLFormElement>();
    const [isDirty, setIsDirty] = useState(false);
    const [formData, setFormData] = useState<T>(initialValues);
    const [submitSubscribers, setSubmitSubscribers] = useState<(() => void)[]>(
      [],
    );
    const zodResult = useZod(formData, zodSchema);

    const reset = useCallback(() => {
      Object.keys(initialValues).forEach(key => {
        const nodes = formRef.current.querySelectorAll(`[name="${key}"]`);
        nodes.forEach(node => (node["value"] = initialValues[key]));
      });
    }, [initialValues]);

    useEffect(() => {
      reset();
    }, [reset]);

    useImperativeHandle(ref, (): FormRef => ({ reset }));

    const handleSubmit = useCallback(
      (event: FormEvent) => {
        event.preventDefault();
        setIsDirty(true);

        if (zodResult.success) {
          onSubmit(formData);
          setIsDirty(false);
          setFormData(initialValues);
          reset();
        } else {
          submitSubscribers.forEach(submitSubscriber => {
            submitSubscriber();
          });
        }
      },
      [
        onSubmit,
        zodResult.success,
        formData,
        initialValues,
        submitSubscribers,
        reset,
      ],
    );

    const onChange = useCallback(
      () => setFormData(getFormData<z.infer<T>>(formRef.current)),
      [],
    );

    const getErrors = (label: string) => {
      return isDirty ? zodResult.errors?.[label] ?? [] : [];
    };

    const subscribeToSubmit = useCallback((callback: () => void) => {
      setSubmitSubscribers(subscribers => [...subscribers, callback]);
      return () => {
        setSubmitSubscribers(subscribers =>
          subscribers.filter(subscriber => subscriber === callback),
        );
      };
    }, []);

    return (
      <FormContext.Provider value={{ onChange, getErrors, subscribeToSubmit }}>
        <form {...props} ref={formRef} onSubmit={handleSubmit}>
          {children}
        </form>
      </FormContext.Provider>
    );
  },
);
