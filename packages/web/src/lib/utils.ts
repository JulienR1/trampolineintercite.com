import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { clamp } from "./maths";

export function asArray<T>(x: T | T[]) {
    return Array.isArray(x) ? x : [x]
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function hex2rgb(color: string): [r: number, g: number, b: number] {
    const rgb = parseInt(color.replace("#", ""), 16);
    return [
        (rgb >> 16) & 0xff,
        (rgb >> 8) & 0xff,
        (rgb >> 0) & 0xff
    ]
}

export function dark(background: string, threshold = 60) {
    // https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
    const [r, g, b] = hex2rgb(background)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < threshold;
}

export function contrast(color: string, factor = 0.3) {
    let [r, g, b] = hex2rgb(color)

    r = clamp((1 + ((0xff - r) > 128 ? 1 : -1) * factor) * r, 0, 255)
    g = clamp((1 + ((0xff - g) > 128 ? 1 : -1) * factor) * g, 0, 255)
    b = clamp((1 + ((0xff - b) > 128 ? 1 : -1) * factor) * b, 0, 255)

    return `rgb(${r}, ${g}, ${b})`;
}
