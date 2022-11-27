DROP VIEW IF EXISTS courses_in_current_session;
CREATE VIEW courses_in_current_session AS
SELECT cis.*
FROM courses_in_session AS cis
RIGHT JOIN current_session AS cs ON cs.id = cis.session_id;