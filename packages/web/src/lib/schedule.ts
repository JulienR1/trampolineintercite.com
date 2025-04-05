import type { Time } from "common";

export type Schedulable = { time: { start: Time; end: Time } };

type RenderMetadata = {
    inset: number;
    adjacent?: { position: number; count: number };
};

function decimal(time: Time): number {
    return time.hour + time.minute / 60;
}

function overlap(a: Schedulable, b: Schedulable): boolean {
    return (
        decimal(a.time.start) <= decimal(b.time.start) &&
        decimal(b.time.start) < decimal(a.time.end)
    );
}

export function withPositionMetadata<T extends Schedulable>(
    activities: T[][],
): (T & RenderMetadata)[][] {
    return activities.map((w) => {
        const weekday = w
            .sort((a, b) => decimal(a.time.start) - decimal(b.time.start))
            .map((a) => {
                (a as T & RenderMetadata).inset = 0;
                return a as T & RenderMetadata;
            });

        const adjacents = new Set<T & RenderMetadata>();
        for (let i = 1; i < weekday.length; i++) {
            const adjacentCount = adjacents.size;
            const current = weekday[i];
            const previous = weekday[i - 1];

            if (overlap(previous, current)) {
                if (
                    decimal(current.time.start) - decimal(previous.time.start) <
                    0.5
                ) {
                    adjacents.add(previous);
                    adjacents.add(current);
                } else {
                    current.inset = previous.inset + 1;
                }
            }

            if (
                adjacents.size === adjacentCount ||
                (adjacents.size > 0 && i === weekday.length - 1)
            ) {
                for (const [position, activity] of [...adjacents].entries()) {
                    activity.adjacent = { position, count: adjacents.size };
                }
                adjacents.clear();
            }
        }

        return weekday;
    });
}
