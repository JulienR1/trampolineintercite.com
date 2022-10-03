[`trampolineintercite.com`](../README.md)/[`docs`](./docs.md)

# Docs

Documentation can be found here:

- [Environment (`.env`) files](./environment.md)
- [Sendgrid setup](./sendgrid.md)
- [Deployment process](./deploy.md)
- [Architecture](./architecture.md)

## How to ...

<details>
    <summary>Add a new partner</summary>

#### Create a new image

```sql
INSERT INTO `image` (`width`, `height`, `url`, `alt`)
VALUES (width, height, 'url', 'alt');

SELECT * FROM image ORDER BY ID DESC LIMIT 1;
```

#### Create a new partner (and link w/ image)

```sql
INSERT INTO `partner` (`website_link`, `start_date`, [`end_date`], `label`, `image_id`)
VALUES ('website_link', 'start_date', ['end_date'], 'label', image_id);
```

</details>
