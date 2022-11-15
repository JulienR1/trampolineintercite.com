DROP VIEW IF EXISTS current_session;
CREATE VIEW current_session AS
SELECT *
FROM SESSION
WHERE `start_date` <= NOW() AND `end_date` >= NOW();