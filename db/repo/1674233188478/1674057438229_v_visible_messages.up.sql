CREATE OR REPLACE VIEW active_messages AS
SELECT title, content, `start_date`
FROM messages
WHERE `start_date` >= CURDATE() && end_date <= CURDATE() && `visible` = TRUE
ORDER BY `start_date`;