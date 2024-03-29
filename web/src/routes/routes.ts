enum BaseRoutes {
  HOME = "/",
  ABOUT = "/a-propos",
  CONTACT = "/contact",
  SCHEDULE = "/horaire",
}

enum ActivityRoutes {
  ACTIVITIES = "/activites",
  ACTIVITY_DETAILS = "/activites/details",
  ACTIVITY_RECREATIVE = "/activites/details#recreatif",
  ACTIVITY_COMPETITIVE = "/activites/details#competitif",
  ACTIVITY_PARTIES = "/activites/details#locations",
}

enum TeamRoutes {
  TEAMS = "/equipes",
}

enum CommunicationRoutes {
  NEWS = "/actualites",
  MESSAGES = "/annonces",
  REGISTRATION_PROCESS = "/comment-sinscrire",
  RULES = "/reglements",
}

enum AdminRoutes {
  ADMIN = "/admin",
  LOGIN = "/admin/login",
}

enum StaticRoutes {
  SPORT_N_ROLL = "https://app.sportnroll.com/#/registration/21ef84af-f7c1-4f3e-a182-729a8ca963f8",
  JROUSSEAU = "https://jrousseau.ca",
}

export const Routes = {
  ...BaseRoutes,
  ...ActivityRoutes,
  ...TeamRoutes,
  ...CommunicationRoutes,
  ...AdminRoutes,
  ...StaticRoutes,
};

export type Route =
  | BaseRoutes
  | ActivityRoutes
  | TeamRoutes
  | CommunicationRoutes
  | AdminRoutes
  | StaticRoutes;
