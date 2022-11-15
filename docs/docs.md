[`trampolineintercite.com`](../README.md)/[`docs`](./docs.md)

# Docs

Documentation can be found here:

- [Environment (`.env`) files](./environment.md)
- [Sendgrid setup](./sendgrid.md)
- [Deployment process](./deploy.md)
- [Architecture](./architecture.md)

## How to ...

<details>
    <summary id="add-image">Add an image</summary>

```sql
INSERT INTO `image` (`width`, `height`, `url`, `alt`)
VALUES (width, height, 'url', 'alt');

SELECT * FROM image ORDER BY ID DESC LIMIT 1;
```

</details>

<details>
    <summary>Add a new partner</summary>

#### 1. Create a new image: [procedure](#add-image)

#### 2. Create a new partner (and link w/ image)

```sql
INSERT INTO `partner` (`website_link`, `start_date`, [`end_date`], `label`, `image_id`)
VALUES ('website_link', 'start_date', ['end_date'], 'label', image_id);
```

</details>

<details>
<summary id="add-session">Add a session</summary>

```sql
INSERT INTO `session` (`start_date`, `end_date`, `label`)
VALUES (start_date, end_date, 'label');
```

</details>

<details id="add-course">
<summary>Manage courses</summary>

#### 0. Create an image: [procedure](#add-image)

#### 1. Create a new course

```sql
INSERT INTO `course` (`label`, `description`, `subtitle`, `image_id`, `default_type_id`)
VALUES ('label', 'description', 'subtitle', image_id, default_type_id);
```

| Title      | type_id |
| ---------- | ------- |
| Récréatif  | 1       |
| Compétitif | 2       |
| Locations  | 3       |

</details>

<details>
<summary>Manage course instances</summary>

`Courses` are base classes that are potentially recurring throughout many sessions.
`Course instances` are particular moments in time where these courses are actually available.

### Create an instance

1. Create a course: [procedure](#add-course).

1. Create a session: [procedure](#add-session)

1. Associate these values with an instance

```sql
INSERT INTO `course_instance` (`session_id`, `start_time`, `end_time`, `price`, `weekday`, `creator_id`, [`type_id`])
VALUES (session_id, start_time, end_time, price, weekday, creator_id, [type_id]);
```

| Weekday  | id  |
| -------- | --- |
| Dimanche | 0   |
| Lundi    | 1   |
| Mardi    | 2   |
| Mercredi | 3   |
| Jeudi    | 4   |
| Vendredi | 5   |
| Samedi   | 6   |

### Edit an instance's order

```sql
CALL set_course_instance_order(target_order, course_id, session_id);
```

</details>
