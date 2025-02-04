import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function asArray<T>(x: T | T[]) {
    return Array.isArray(x) ? x : [x]
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function dark(background: string, threshold = 60) {
    background = background.replace("#", "");

    const rgb = parseInt(background, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < threshold;
}
