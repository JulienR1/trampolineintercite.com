enum BaseRoutes {
	HOME = "index",
	ABOUT = "a-propos",
	CONTACT = "contact",
	SCHEDULE = "horaire",
}

enum ActivityRoutes {
	ACTIVITIES = "activites",
	ACTIVITY_DETAILS = "activites/details",
	ACTIVITY_RECREATIVE = "activites/details#recreatif",
	ACTIVITY_COMPETITIVE = "activites/details#competitif",
	ACTIVITY_PARTIES = "activites/details#fetes",
}

enum TeamRoutes {
	TEAMS = "equipes",
}

enum CommunicationRoutes {
	NEWS = "actualites",
	MESSAGES = "annonces",
	REGISTRATION_PROCESS = "comment-sinscrire",
	RULES = "reglements",
}

export const Routes = { ...BaseRoutes, ...ActivityRoutes, ...TeamRoutes, ...CommunicationRoutes };
export type Route = typeof BaseRoutes & typeof ActivityRoutes & typeof TeamRoutes & typeof CommunicationRoutes;
