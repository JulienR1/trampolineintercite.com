DROP PROCEDURE IF EXISTS set_course_instance_order;

CREATE PROCEDURE set_course_instance_order(IN target_order INT, IN actual_course_id INT, IN actual_session_id INT)
BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
	ROLLBACK;
	RESIGNAL;
END;

IF target_order < 0 OR target_order > (SELECT MAX(`order`) FROM course_instance_order cio WHERE cio.session_id = actual_session_id) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid target order.';
END IF;

SELECT `order` INTO @current_order FROM course_instance_order AS cio WHERE cio.course_id = actual_course_id AND cio.session_id = actual_session_id;
    
START TRANSACTION;
UPDATE course_instance_order cio SET `order` = -1 WHERE cio.course_id = actual_course_id AND cio.session_id = actual_session_id;

IF @current_order > target_order THEN
    UPDATE course_instance_order
    SET `order` = `order` + 1
    WHERE session_id = actual_session_id AND `order` BETWEEN target_order AND @current_order AND course_instance_order.course_id <> actual_course_id;
ELSEIF @current_order < target_order THEN	
	UPDATE course_instance_order
    SET `order` = `order` - 1
    WHERE session_id = actual_session_id AND `order` BETWEEN @current_order AND target_order AND course_instance_order.course_id <> actual_course_id;
END IF;

UPDATE course_instance_order SET `order` = target_order WHERE course_id = actual_course_id AND session_id = actual_session_id;
COMMIT;
END;