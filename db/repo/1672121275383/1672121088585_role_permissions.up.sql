DROP VIEW IF EXISTS role_permissions;
CREATE VIEW role_permissions AS
SELECT id, label, role_id
FROM permission as p
LEFT JOIN role_to_permission as rtp ON p.id = rtp.permission_id;