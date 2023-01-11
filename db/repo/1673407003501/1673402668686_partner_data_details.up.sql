CREATE OR REPLACE VIEW partner_data_details AS
SELECT partner.id, website_link, label, width, height, `key`, alt, `start_date`, `end_date`
FROM `partner`, `image`
WHERE `partner`.image_id = `image`.id