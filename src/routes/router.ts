import { Route, Routes } from "./routes";

export type RouteDetails = {
  label: string;
  route: Route;
  subroutes?: RouteDetails[];
};

export type Router = RouteDetails[];

export const router: RouteDetails[] = [
  {
    label: "À propos",
    route: Routes.ABOUT,
    subroutes: [
      { label: "Actualités", route: Routes.NEWS },
      { label: "Règlements", route: Routes.RULES },
      { label: "Annonces", route: Routes.MESSAGES },
    ],
  },
  {
    label: "Activités",
    route: Routes.ACTIVITIES,
    subroutes: [
      { label: "Récréatif", route: Routes.ACTIVITY_RECREATIVE },
      { label: "Fête d'enfants", route: Routes.ACTIVITY_PARTIES },
      { label: "Compétitif", route: Routes.ACTIVITY_COMPETITIVE },
      { label: "Comment s'inscrire", route: Routes.REGISTRATION_PROCESS },
    ],
  },
  {
    label: "Horaire",
    route: Routes.SCHEDULE,
  },
  {
    label: "Contact",
    route: Routes.CONTACT,
  },
];
