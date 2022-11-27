DROP VIEW IF EXISTS courses_in_session;
CREATE VIEW courses_in_session AS
SELECT 
    ci.session_id AS session_id,
    ci.course_id AS course_id,
    `type_id`,
    c.label AS label,
    subtitle,
    `description`,
    get_next_weekday(`start_date`, MIN(`weekday`)) AS `first_date`,
    get_next_weekday(DATE_ADD(end_date, INTERVAL -7 DAY), MAX(`weekday`)) AS `last_date`,
    MIN(price) AS min_price,
    MAX(price) AS max_price,
    MIN(TIMEDIFF(end_time, start_time)) AS min_duration,
    MAX(TIMEDIFF(end_time, start_time)) AS max_duration,
    i.width AS img_width,
    i.height AS img_height,
    i.url AS img_url,
    i.alt AS img_alt
FROM course_instance AS ci
LEFT JOIN course AS c ON ci.course_id = c.id
JOIN IMAGE AS i ON i.id = c.image_id
JOIN course_instance_order AS cio ON cio.course_id = c.id AND cio.session_id = ci.session_id
JOIN `session` AS s ON s.id = ci.session_id
GROUP BY `type_id`, course_id
ORDER BY cio.order;