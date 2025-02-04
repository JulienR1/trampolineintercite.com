import { describe, expect, test, } from "vitest";
import { gcd, } from "./maths";

describe("maths", function() {
    test("gcd", function() {
        const tests = [
            { inputs: [1], expected: 1 },
            { inputs: [1, 2], expected: 1 },
            { inputs: [2, 3], expected: 1 },
            { inputs: [2, 4], expected: 2 },
            { inputs: [2, 3, 4], expected: 1 },
            { inputs: [3, 6, 18], expected: 3 },
            { inputs: [12, 18], expected: 6 },
        ]

        tests.forEach((test, i) => {
            expect(gcd(test.inputs)).to.equal(test.expected, `tests[${i}]: expected ${test.inputs} to have ${test.expected} as gcd`);
        })

    })
})
