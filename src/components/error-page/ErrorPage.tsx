import { Routes } from "@trampo/routes";

import { Logo } from "../logo";
import { SmartLink } from "../smart-link";

interface IProps {
  errorCode: string;
  message: string;
}

export const ErrorPage = ({ errorCode, message }: IProps) => {
  return (
    <div className="errorPage">
      <div className="errorPage__column">
        <SmartLink className="errorPage__link" href={Routes.HOME}>
          <Logo />
        </SmartLink>
      </div>

      <div className="errorPage__separator"></div>

      <div className="errorPage__column">
        <h2 className="errorPage__title">{errorCode}</h2>
        <p className="errorPage__content">{message}</p>
      </div>
    </div>
  );
};
