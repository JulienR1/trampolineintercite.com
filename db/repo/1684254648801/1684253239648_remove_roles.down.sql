CREATE TABLE role
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(128) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE person_to_role
(
  person_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (person_id, role_id)
);

CREATE TABLE role_to_permission
(
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id)
);

DROP VIEW IF EXISTS role_permissions;
CREATE VIEW role_permissions AS
SELECT id, label, role_id
FROM permission as p
LEFT JOIN role_to_permission as rtp ON p.id = rtp.permission_id;

DROP VIEW IF EXISTS user_roles;
CREATE VIEW user_roles AS
SELECT id, label, person_id
FROM `role` as r
LEFT JOIN person_to_role as ptr ON r.id = ptr.role_id;

INSERT INTO `role` (label) VALUES
('ADMIN'),
('SUPERADMIN');

INSERT INTO role_to_permission (permission_id, role_id)
SELECT `permission`.id AS permission_id, `role`.id AS role_id FROM `permission`, `role` WHERE `permission`.label = 'ADMIN_PANEL' AND `role`.label = 'ADMIN';
INSERT INTO role_to_permission (permission_id, role_id)
SELECT `permission`.id AS permission_id, `role`.id AS role_id FROM `permission`, `role` WHERE `permission`.label = 'EDIT' AND `role`.label = 'ADMIN';
INSERT INTO role_to_permission (permission_id, role_id)
SELECT `permission`.id AS permission_id, `role`.id AS role_id FROM `permission`, `role` WHERE `permission`.label = 'ADMIN_PANEL' AND `role`.label = 'SUPERADMIN';
INSERT INTO role_to_permission (permission_id, role_id)
SELECT `permission`.id AS permission_id, `role`.id AS role_id FROM `permission`, `role` WHERE `permission`.label = 'EDIT' AND `role`.label = 'SUPERADMIN';
INSERT INTO role_to_permission (permission_id, role_id)
SELECT `permission`.id AS permission_id, `role`.id AS role_id FROM `permission`, `role` WHERE `permission`.label = 'DEPLOY' AND `role`.label = 'SUPERADMIN';

INSERT INTO person_to_role (person_id, role_id)
SELECT `person`.id AS person_id, `role`.id AS role_id FROM `person`, `role` WHERE firstname = 'admin' AND lastname = 'admin' AND label = 'ADMIN';
INSERT INTO person_to_role (person_id, role_id)
SELECT `person`.id AS person_id, `role`.id AS role_id FROM `person`, `role` WHERE firstname = 'admin' AND lastname = 'admin' AND label = 'SUPERADMIN';