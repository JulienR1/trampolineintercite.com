
export type RouteModifer = "disabled" | "header-only" | "footer-only"

export type Route = {
    path: string,
    label: string,
    icon?: string
    subroutes?: readonly Route[],
    modifiers?: readonly RouteModifer[],
}

export type RouteArray = readonly Route[]

type FilterRoute<
    R extends Route,
    AllowedModifiers extends readonly RouteModifer[] = [],
    RequiredModifiers extends readonly RouteModifer[] | undefined = R['modifiers']
> =
    RequiredModifiers extends readonly [infer FirstRequiredModifier extends RouteModifer, ...infer RestOfRequiredModifiers extends RouteModifer[]] ?
    FirstRequiredModifier extends AllowedModifiers[number] ?
    FilterRoute<R, AllowedModifiers, RestOfRequiredModifiers> :
    never
    : R

export type FilterRoutes<R extends RouteArray, M extends readonly RouteModifer[]> =
    R extends readonly [infer First extends Route, ...infer Rest extends RouteArray] ?
    [FilterRoute<First, M>, ...FilterRoutes<Rest, M>]
    : [];

export const filter = <R extends RouteArray, M extends readonly RouteModifer[]>(allowed: M, toFilter: R): FilterRoutes<R, M> =>
    toFilter
        .filter(route => (route.modifiers ?? []).every(modifier => allowed.includes(modifier)))
        .map(route => "subroutes" in route ? ({ ...route, subroutes: filter(allowed, route.subroutes!) }) : route) as FilterRoutes<R, M>

export type ListRoutes<R extends RouteArray> =
    R extends readonly [infer First extends Route, ...infer Rest extends RouteArray] ?
    First['path'] |
    ListRoutes<Rest> | (
        First['subroutes'] extends RouteArray ?
        ListRoutes<First['subroutes']> : never
    ) : never



