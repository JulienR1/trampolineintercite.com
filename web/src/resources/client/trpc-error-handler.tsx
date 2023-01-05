import { useNotifications } from "@trampo/ui/notifications";
import { TRPCClientError } from "@trpc/client";

export const useTrpcErrorHandler = () => {
  const { addNotification } = useNotifications();

  return (err: any) => {
    if (err instanceof TRPCClientError) {
      switch (err.data.code) {
        case "BAD_REQUEST":
          return addNotification(
            "Mauvaise requête",
            "La requête effectuée est invalide ou n'existe pas.",
          ).error();
        case "UNAUTHORIZED":
          return addNotification(
            "Non autorisé",
            "Vous n'avez pas les droits pour effectuer cette action.",
          ).warning();
        case "FORBIDDEN":
          return addNotification(
            "Interdit",
            "Cette action ne vous est pas permise.",
          ).error();
        case "NOT_FOUND":
          return addNotification(
            "Introuvable",
            "La requête effectuée est introuvable",
          ).warning();
        case "INTERNAL_SERVER_ERROR":
          return addNotification(
            "Erreur serveur",
            "Le serveur a rencontré une erreur imprévue et ne peut pas continuer.",
          ).error();
        default:
          addNotification(
            "Erreur",
            "Une erreur inconnue est survenue.",
          ).error();
      }
    }
  };
};
