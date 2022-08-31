import { Route, Routes } from "./routes";

export type RouteDetails = {
  label: string;
  route: Route;
  subroutes?: RouteDetails[];
  modifiers?: Modifier[];
};

export enum Modifier {
  DISABLED,
  HEADER_ONLY,
  FOOTER_ONLY,
  DESKTOP_ONLY,
}

export type Router = RouteDetails[];

export const router: RouteDetails[] = [
  {
    label: "Accueil",
    route: Routes.HOME,
    modifiers: [Modifier.FOOTER_ONLY],
  },
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
    label: "Accueil",
    route: Routes.HOME,
    modifiers: [Modifier.HEADER_ONLY, Modifier.DESKTOP_ONLY],
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
