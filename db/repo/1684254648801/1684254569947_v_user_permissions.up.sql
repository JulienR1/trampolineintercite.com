DROP VIEW IF EXISTS user_permissions;
CREATE VIEW user_permissions AS
SELECT user_id, permission_id, label
FROM user_to_permission AS utp
JOIN permission p ON p.id = utp.permission_id;