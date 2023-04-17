CREATE OR REPLACE VIEW active_messages AS
SELECT title, content, `start_date`
FROM messages
WHERE `start_date` <= NOW() and end_date >= NOW() and `visible` = TRUE
ORDER BY `start_date`;