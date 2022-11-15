DROP FUNCTION IF EXISTS overlaps_session;

CREATE FUNCTION overlaps_session(new_start_date DATE, new_end_date DATE)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
RETURN EXISTS (
SELECT *
FROM `session`
WHERE (new_start_date >= `session`.`start_date` AND new_start_date < `session`.`end_date`) OR
	  (new_end_date > `session`.`start_date` AND new_end_date <= `session`.`end_date`)
);
END;

DROP TRIGGER IF EXISTS check_session_overlap_on_insert;
CREATE TRIGGER check_session_overlap_on_insert
BEFORE INSERT
ON `session`
FOR EACH ROW
IF overlaps_session(NEW.start_date, NEW.end_date) THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Session overlaps an existing session.';
END IF;

DROP TRIGGER IF EXISTS check_session_overlap_on_update;
CREATE TRIGGER check_session_overlap_on_update
BEFORE UPDATE
ON `session`
FOR EACH ROW
IF overlaps_session(NEW.start_date, NEW.end_date) THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Session overlaps an existing session.';
END IF;
