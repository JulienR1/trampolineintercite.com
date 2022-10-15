import { ISessionCourse } from "@trampo/models";
import { useCallback, useEffect, useRef, useState } from "react";

import { Course } from "./Course";

interface IProps {
  courses: ISessionCourse[];
}

export const CourseWrapper = ({ courses }: IProps) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const courseRefs = useRef<HTMLDivElement[]>([]);

  const [itemsPerRow, setItemsPerRow] = useState(1);

  const handleWindowResize = useCallback(() => {
    const wrapperWidth = wrapperRef.current.clientWidth;
    const courseWidth = courseRefs.current[0].clientWidth;

    const gap = Math.max(
      (courseRefs.current[1]?.offsetLeft ?? 0) -
        courseRefs.current[0].offsetLeft -
        courseWidth,
      0,
    );

    const itemCountPerRow = Math.floor(
      (wrapperWidth + gap) / (courseWidth + gap),
    );

    setItemsPerRow(itemCountPerRow);
  }, []);

  useEffect(() => {
    const courseElements = [...courseRefs.current];
    while (courseElements.length > 0) {
      const coursesInRow = courseElements.splice(0, itemsPerRow);
      const rowHeight = Math.min(
        ...coursesInRow.map(course => course.clientHeight),
      );
      for (const course of coursesInRow) {
        if (
          course.clientHeight > rowHeight ||
          (course.style.maxHeight && itemsPerRow > 1)
        ) {
          course.style.maxHeight = `${rowHeight}px`;
        } else {
          course.style.maxHeight = "";
        }
      }
    }
  }, [itemsPerRow]);

  useEffect(() => {
    if (courseRefs.current.length === 0) {
      return;
    }

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => document.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <div ref={wrapperRef} className="course__wrapper">
      {courses.map((course, index) => (
        <Course
          key={index}
          {...course}
          ref={ref => (courseRefs.current[index] = ref)}
        />
      ))}
    </div>
  );
};
