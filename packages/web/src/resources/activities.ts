import type { Activity } from "common";

export const activities: Activity[][] = [
    [],
    [
        {
            type: "recreatif",
            title: "Récréatif",
            subtitle: "6 ans et plus",
            time: {
                start: { hour: 8, minute: 0 },
                end: { hour: 10, minute: 45 },
            },
            lessons: {
                count: 8,
                first: new Date(2025, 1, 6),
                last: new Date(2025, 5, 5),
                exceptions: [],
            },
            price: 120,
            color: "#ff00ff",
        },
        {
            type: "precompetitif",
            title: "Précompétitif",
            time: {
                start: { hour: 8, minute: 30 },
                end: { hour: 12, minute: 0 },
            },
            lessons: {
                count: 8,
                first: new Date(2025, 1, 6),
                last: new Date(2025, 5, 5),
                exceptions: [],
            },
            price: 120,
            color: "#0ff0ff",
        },
        {
            type: "recreatif",
            title: "idk",
            time: {
                start: { hour: 10, minute: 30 },
                end: { hour: 11, minute: 15 },
            },
            lessons: {
                count: 8,
                first: new Date(2025, 1, 6),
                last: new Date(2025, 5, 5),
                exceptions: [],
            },
            price: 120,
            color: "#f0f0ff",
        },
    ],
    [
        {
            type: "initiation",
            title: "Initiation",
            subtitle: "3 à 5 ans",
            time: {
                start: { hour: 16, minute: 30 },
                end: { hour: 17, minute: 30 },
            },
            lessons: {
                count: 2,
                first: new Date(2025, 2, 2),
                last: new Date(2025, 3, 4),
                exceptions: [],
            },
            price: 28,
            color: "#12fa83",
        },
        {
            type: "recreatif",
            title: "Récréatif",
            subtitle: "6 ans et plus",
            time: {
                start: { hour: 17, minute: 45 },
                end: { hour: 19, minute: 15 },
            },
            lessons: {
                count: 2,
                first: new Date(2025, 2, 2),
                last: new Date(2025, 3, 4),
                exceptions: [],
            },
            price: 28,
            color: "#fa1283",
        },
    ],
    [
        {
            type: "recreatif",
            title: "activite 1",
            time: {
                start: { hour: 13, minute: 0 },
                end: { hour: 15, minute: 0 },
            },
            lessons: {
                count: 8,
                first: new Date(2025, 1, 6),
                last: new Date(2025, 5, 5),
                exceptions: [],
            },
            price: 120,
            color: "#0f0f00",
        },
        {
            type: "competitif",
            title: "activite 2",
            time: {
                start: { hour: 13, minute: 0 },
                end: { hour: 15, minute: 0 },
            },
            lessons: {
                count: 8,
                first: new Date(2025, 1, 6),
                last: new Date(2025, 5, 5),
                exceptions: [],
            },
            price: 120,
            color: "#f0f000",
        },
        {
            type: "precompetitif",
            title: "activite 3",
            time: {
                start: { hour: 14, minute: 15 },
                end: { hour: 16, minute: 0 },
            },
            lessons: {
                count: 8,
                first: new Date(2025, 1, 6),
                last: new Date(2025, 5, 5),
                exceptions: [],
            },
            price: 120,
            color: "#0fff30",
        },
        {
            type: "initiation",
            title: "activite 4",
            time: {
                start: { hour: 18, minute: 0 },
                end: { hour: 21, minute: 45 },
            },
            lessons: {
                count: 8,
                first: new Date(2025, 1, 6),
                last: new Date(2025, 5, 5),
                exceptions: [],
            },
            price: 120,
            color: "#ffff00",
        },
    ],
    [],
    [
        {
            type: "recreatif",
            title: "Récréatif",
            subtitle: "12 ans et plus",
            time: {
                start: { hour: 10, minute: 15 },
                end: { hour: 11, minute: 45 },
            },
            lessons: {
                count: 8,
                first: new Date(2025, 1, 6),
                last: new Date(2025, 5, 5),
                exceptions: [new Date(2025, 7, 1), new Date(2025, 6, 24)],
            },
            price: 120,
            color: "#ff0000",
        },
        {
            type: "competitif",
            title: "Compétitif",
            time: {
                start: { hour: 14, minute: 0 },
                end: { hour: 16, minute: 0 },
            },
            lessons: {
                count: 8,
                first: new Date(2025, 1, 6),
                last: new Date(2025, 5, 5),
                exceptions: [],
            },
            price: 120,
            color: "#0ff000",
        },
    ],
    [],
];
