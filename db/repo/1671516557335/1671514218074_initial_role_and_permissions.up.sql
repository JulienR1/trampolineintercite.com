INSERT INTO `role` (label) VALUES
('ADMIN'),
('SUPERADMIN');

INSERT INTO `permission` (label) VALUES
('ADMIN_PANEL'),
('EDIT'),
('DEPLOY');

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