import { PageSeparator } from "./PageSeparator";

interface IProps {
  title: string;
}

export const PageTitle = ({ title }: IProps) => {
  return (
    <>
      <h1 className="page__title">{title}</h1>
      <PageSeparator />
    </>
  );
};
