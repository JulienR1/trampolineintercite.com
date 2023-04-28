DROP VIEW IF EXISTS `users`;
CREATE VIEW `users` AS 
SELECT id, firstname, lastname, email, `password`
FROM `person` AS p
JOIN credentials AS c ON p.id = c.person_id