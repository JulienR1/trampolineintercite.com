DROP VIEW IF EXISTS offdays_in_current_session;
CREATE VIEW offdays_in_current_session AS
SELECT `date`, reason
FROM offdays
RIGHT JOIN current_session AS cs ON cs.id = offdays.session_id;