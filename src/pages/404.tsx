import { ErrorPage } from "@trampo/components";

export default function Custom404() {
  return (
    <ErrorPage
      errorCode="404"
      message="Impossible de trouver la page spécifiée."
    />
  );
}
