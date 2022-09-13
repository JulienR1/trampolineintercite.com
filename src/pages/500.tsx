import { ErrorPage } from "@trampo/components";

export default function Custom500() {
  return (
    <ErrorPage
      errorCode="500"
      message="Une erreur est survenue du côté serveur."
    />
  );
}
