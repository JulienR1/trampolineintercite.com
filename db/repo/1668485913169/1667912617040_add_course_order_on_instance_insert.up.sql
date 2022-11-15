DROP TRIGGER IF EXISTS set_order_to_last_on_insert;

CREATE TRIGGER set_order_to_last_on_insert
BEFORE INSERT
ON course_instance
FOR EACH ROW
BEGIN
SELECT EXISTS(SELECT 1 FROM course_instance_order WHERE session_id = new.session_id AND course_id = new.course_id LIMIT 1) INTO @record_is_created;
IF NOT @record_is_created THEN
    INSERT INTO course_instance_order (course_id, session_id, `order`)
    VALUES (new.course_id, new.session_id, (
        SELECT MAX(next_order)
        FROM (
            SELECT MAX(`order`) + 1 AS next_order
            FROM course_instance_order
            WHERE session_id = NEW.session_id AND course_id IN (
                SELECT course_id
                FROM course_instance
                WHERE type_id = NEW.type_id
            )
    GROUP BY course_id, session_id
    UNION ALL 
    SELECT 0 AS next_order)
    AS A)
);
END IF; 
END;