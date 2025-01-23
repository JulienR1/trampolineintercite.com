import type { FilterRoutes, ListRoutes, RouteArray, RouteModifer } from "./routes"
import { filter } from "./routes"

export const router = [
    { path: "/", label: "Accueil", modifiers: ["footer-only"] },
    {
        path: "/a-propos",
        label: "À propos",
        subroutes: [
            { path: "/actualites", label: "Actualités", modifiers: ['footer-only'] },
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
router satisfies RouteArray

export const headerRouter = filter(['header-only'], router)
export const footerRouter = filter(['footer-only'], router)
export type Routes<M extends RouteModifer[] = []> = ListRoutes<FilterRoutes<typeof router, M>>
