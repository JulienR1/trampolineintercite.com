CREATE OR REPLACE VIEW active_messages AS
SELECT content, `start_date` AS `date`
FROM messages
WHERE `start_date` >= CURDATE() && end_date <= CURDATE() && `visible` = TRUE
ORDER BY `start_date`;