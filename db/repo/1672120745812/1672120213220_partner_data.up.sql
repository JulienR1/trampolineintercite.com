CREATE OR REPLACE VIEW partner_data AS
SELECT website_link, label, width, height, `key`, alt
FROM `partner`, `image`
WHERE `partner`.image_id = `image`.id AND NOW() >= `start_date` AND (end_date IS NULL OR NOW() <= end_date);