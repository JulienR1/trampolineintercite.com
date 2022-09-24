import { createContext, useContext } from "react";

import { IFormContext } from "./type";

export const FormContext = createContext<IFormContext>({} as IFormContext);

export const useForm = () => useContext(FormContext);
