DROP TRIGGER IF EXISTS remove_course_order_instance;

CREATE TRIGGER remove_course_order_instance
BEFORE DELETE
ON course_instance
FOR EACH ROW
BEGIN
IF (SELECT COUNT(`order`) FROM course_instance_order WHERE session_id = OLD.session_id AND course_id = OLD.course_id) = 1 THEN
DELETE FROM course_instance_order WHERE session_id = OLD.session_id AND course_id = OLD.course_id;
END IF;
END;