import type {
    FilterRoutes,
    ListRoutes,
    RouteArray,
    RouteModifer,
} from "./routes";
import { filter, labels } from "./routes";

export const router = [
    { path: "/", label: "Accueil", modifiers: ["footer-only"] },
    {
        path: "/a-propos",
        label: "À propos",
        icon: "star",
        subroutes: [
            { path: "/actualites", label: "Actualités" },
            { path: "/reglements", label: "Règlements" },
            { path: "/annonces", label: "Annonces" },
        ],
    },
    {
        path: "/activites",
        label: "Activités",
        icon: "sports_gymnastics",
        subroutes: [
            { path: "/activites/details#recreatif", label: "Récréatif" },
            { path: "/activites/details#fetes", label: "Fête d'enfants" },
            { path: "/activites/details#competitif", label: "Compétitif" },
            { path: "/activites/sport-etudes", label: "Sport-Études" },
            { path: "/activites/inscription", label: "Comment s'inscrire" },
        ],
    },
    { path: "/horaire", label: "Horaire", icon: "date_range" },
    { path: "/contact", label: "Contact", icon: "call" },
    { path: "/404", label: "404", modifiers: ["disabled"] },
] as const;
router satisfies RouteArray;

export const headerRouter = filter(["header-only"], router);
export const footerRouter = filter(["footer-only"], router);
export type Routes<M extends RouteModifer[] = []> = ListRoutes<
    FilterRoutes<typeof router, M>
>;

export const routerLabels = labels(router);
