DROP PROCEDURE IF EXISTS register_user;

CREATE PROCEDURE register_user(IN user_firstname VARCHAR(128), IN user_lastname VARCHAR(128), IN user_email VARCHAR(64), IN user_password VARCHAR(1024))
BEGIN

DECLARE new_user_id INT;

DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
	ROLLBACK;
	RESIGNAL;
END;

START TRANSACTION;

INSERT INTO person (firstname, lastname) VALUES (user_firstname, user_lastname);
SELECT id INTO new_user_id FROM person WHERE firstname=user_firstname AND lastname=user_lastname ORDER BY id DESC LIMIT 1;
INSERT INTO credentials (person_id, email, `password`) VALUES (new_user_id, user_email, user_password);

COMMIT;
SELECT new_user_id;

END;