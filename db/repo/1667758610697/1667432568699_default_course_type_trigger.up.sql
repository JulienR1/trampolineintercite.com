DROP TRIGGER IF EXISTS init_type_id;
CREATE TRIGGER init_type_id
BEFORE INSERT
ON course_instance
FOR EACH ROW
IF NEW.type_id IS NULL THEN
SET NEW.type_id = (SELECT default_type_id FROM course WHERE course.id = NEW.course_id);
END IF;