DROP VIEW IF EXISTS latest_deployment;
CREATE VIEW latest_deployment AS
SELECT id, `timestamp`, run_identifier, person_id, `status`, `url`
FROM deployments
UNION
SELECT NULL as id, NULL AS `timestamp`, NULL AS run_identifier, NULL AS person_id, NULL AS `status`, NULL AS `url`
ORDER BY `timestamp` DESC
LIMIT 1;