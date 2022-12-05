DROP VIEW IF EXISTS course_base;
CREATE VIEW course_base AS
SELECT course.id, course.label AS label, `description`, subtitle, course_type.label AS `type`, `image`.`key` AS img_key, `image`.alt AS img_alt, `image`.width AS img_width, `image`.height AS img_height
FROM course
JOIN `image` ON `image`.id = course.image_id
JOIN course_type ON course_type.id = course.default_type_id;