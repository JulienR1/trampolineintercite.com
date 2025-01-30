export function asArray<T>(x: T | T[]) {
    return Array.isArray(x) ? x : [x]
}
