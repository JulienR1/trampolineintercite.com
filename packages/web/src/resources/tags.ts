import z from "zod";
import { Tag } from "common";
import _tags from "./tags.json";

export const tags = z
    .array(Tag)
    .parse(_tags)
    .reduce(
        (acc, tag) => ({ ...acc, [tag.key]: tag }),
        {} as Record<string, Tag>,
    );
