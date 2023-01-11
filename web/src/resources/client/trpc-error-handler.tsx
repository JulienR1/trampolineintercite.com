import { useNotifications } from "@trampo/ui/notifications";
import { TRPCClientError } from "@trpc/client";

export const useTrpcErrorHandler = () => {
  const { addNotification } = useNotifications();

  return (err: any, message?: string) => {
    if (err instanceof TRPCClientError) {
      switch (err.data.code) {
        case "BAD_REQUEST":
          return addNotification(
            "Mauvaise requête",
            message ?? "La requête effectuée est invalide ou n'existe pas.",
          ).error();
        case "UNAUTHORIZED":
          return addNotification(
            "Non autorisé",
            message ??
              "Vous n'avez pas les droits pour effectuer cette action.",
          ).warning();
        case "FORBIDDEN":
          return addNotification(
            "Interdit",
            message ?? "Cette action ne vous est pas permise.",
          ).error();
        case "NOT_FOUND":
          return addNotification(
            "Introuvable",
            message ?? "La requête effectuée est introuvable",
          ).warning();
        case "INTERNAL_SERVER_ERROR":
          return addNotification(
            "Erreur serveur",
            message ??
              "Le serveur a rencontré une erreur imprévue et ne peut pas continuer.",
          ).error();
        default:
          addNotification(
            "Erreur",
            message ?? "Une erreur inconnue est survenue.",
          ).error();
      }
    }
  };
};
