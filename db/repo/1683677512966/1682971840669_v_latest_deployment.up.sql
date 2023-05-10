DROP VIEW IF EXISTS latest_deployment;
CREATE VIEW latest_deployment AS
SELECT *
FROM deployments
UNION ALL
SELECT NULL as id, NULL AS `timestamp`, NULL AS run_identifier, NULL AS person_id, NULL AS status_id, NULL AS `url`
ORDER BY `timestamp` DESC
LIMIT 1;