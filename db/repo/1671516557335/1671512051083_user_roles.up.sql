DROP VIEW IF EXISTS user_roles;
CREATE VIEW user_roles AS
SELECT id, label, person_id
FROM `role` as r
LEFT JOIN person_to_role as ptr ON r.id = ptr.role_id;