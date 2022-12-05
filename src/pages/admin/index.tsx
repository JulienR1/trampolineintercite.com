import { ImagePicker } from "@trampo/components";
import { useAsyncMemo } from "@trampo/hooks";
import { CourseType } from "@trampo/models";

import { fetchCourseBases } from "./service";

export default function Admin() {
  const courses = useAsyncMemo(fetchCourseBases, []);

  return (
    <div>
      <pre style={{ whiteSpace: "pre" }}>
        {JSON.stringify(courses, null, 2)}
      </pre>
      <form>
        <h2>Créer un cours</h2>
        <input type="text" name="label" placeholder="label" />
        <input type="text" name="description" placeholder="description" />
        <input type="text" name="subtitle" placeholder="subtitle" />
        <select name="type">
          {Object.entries(CourseType).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
        <ImagePicker />
      </form>
    </div>
  );
}
