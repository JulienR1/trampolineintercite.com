/***
* Greatest Common Divisor
*/
export function gcd(n: number[]): number {
    if (n.length === 1) {
        return n[0]
    }

    // NOTE: See Euclidean algorithm 
    if (n.length === 2) {
        let [a, b] = n
        while (b !== 0) {
            let t = b
            b = a % b
            a = t
        }
        return a
    }

    const stack = [...n]
    while (stack.length >= 2) {
        let a = stack.pop()!
        let b = stack.pop()!
        stack.push(gcd([a, b]))
    }
    return stack[0]
}

/**
* Lowest Common Multiple
*/
export function lcm(n: number[]): number {
    if (n.length === 0) {
        return 0
    }

    if (n.length <= 2) {
        const product = n.reduce((p, curr) => p * curr, 1)
        return product / gcd(n)
    }

    const stack = [...n]
    while (stack.length >= 2) {
        let a = stack.pop()!
        let b = stack.pop()!
        stack.push(lcm([a, b]))
    }
    return stack[0]
}
