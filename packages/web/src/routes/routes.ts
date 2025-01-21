export type RouteModifer = "disabled" | "desktop-only" | "header-only" | "footer-only"

export type Route = {
    path: string,
    label: string,
    subroutes?: readonly Route[],
    modifiers?: readonly RouteModifer[],
}

type RouteArray = readonly Route[]

export const routes = [
    { path: "/", label: "Accueil", modifiers: ["footer-only"] },
    {
        path: "/a-propos",
        label: "À propos",
        subroutes: [
            { path: "/actualites", label: "Actualités" },
            { path: "/reglements", label: "Règlements" },
            { path: "/annonces", label: "Annonces" },
        ]
    },
    {
        "path": "/activites",
        label: "Activités",
        subroutes: [
            { path: "/activites/details#recreatif", label: "Récréatif" },
            { path: "/activites/details#fetes", label: "Fête d'enfants" },
            { path: "/activites/details#competitif", label: "Compétitif" },
            { path: "/activites/sport-etudes", label: "Sport-Études" },
            { path: "/activites/inscription", label: "Comment s'inscrire" },
        ]
    },
    { path: "/", label: "Accueil", modifiers: ["header-only"] },
    { path: "/horaire", label: "Horaire" },
    { path: "/contact", label: "Contact" }
] as const
routes satisfies RouteArray

type ListRoutes<R extends RouteArray> =
    R extends readonly [infer First extends Route, ...infer Rest extends RouteArray] ?
    First['path'] |
    ListRoutes<Rest> | (
        First['subroutes'] extends RouteArray ?
        ListRoutes<First['subroutes']> : never
    ) : never

export type Routes = ListRoutes<typeof routes>
