import { describe, expect, test } from "vitest";
import { clamp, gcd } from "./maths";

describe("maths", function () {
    test("gcd", function () {
        const tests = [
            { inputs: [1], expected: 1 },
            { inputs: [1, 2], expected: 1 },
            { inputs: [2, 3], expected: 1 },
            { inputs: [2, 4], expected: 2 },
            { inputs: [2, 3, 4], expected: 1 },
            { inputs: [3, 6, 18], expected: 3 },
            { inputs: [12, 18], expected: 6 },
        ];

        tests.forEach((test, i) => {
            expect(gcd(test.inputs)).to.equal(
                test.expected,
                `tests[${i}]: expected ${test.inputs} to have ${test.expected} as gcd`,
            );
        });
    });

    test("clamp", function () {
        const tests = [
            { value: 1, min: 0, max: 1, expected: 1 },
            { value: 1, min: 2, max: 2, expected: 2 },
            { value: 1, min: 0, max: 0, expected: 0 },
            { value: 8, min: 8, max: 10, expected: 8 },
            { value: -1, min: 0, max: 1, expected: 0 },
            { value: -1, min: -4, max: 1, expected: -1 },
            { value: 2, min: -4, max: 0, expected: 0 },
        ];

        tests.forEach((test, i) => {
            expect(clamp(test.value, test.min, test.max)).to.equal(
                test.expected,
                `tests[${i}]: expected ${test.value} to be clamped to ${test.expected}`,
            );
        });
    });
});
