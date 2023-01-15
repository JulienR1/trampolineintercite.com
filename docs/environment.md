[`trampolineintercite.com`](../README.md)/[`docs`](./docs.md)/[`environment.md`](./environment.md)

# Environment

The environment file should contain these values:

## Web

```bash
PUBLIC_COPYRIGHT_START= # ex: 2022
PUBLIC_MAPS_API_KEY=
PUBLIC_SERVER_URL=
```

## Server

```bash
DATABASE_NAME=
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_PORT=          # ex: 3036

BUCKET_NAME=
BUCKET_REGION=
ACCESS_KEY=
SECRET_ACCESS_KEY=
S3_URL=

SENDGRID_API_KEY=
SENDGRID_SENDER_EMAIL=  # ex: no-reply@domain.com
SENDGRID_DAILY_QUOTA=   # ex: 95

REFERENCE_EMAIL=        # Email receiving mails from /contact
CONTACT_URL=            # ex: https://trampolineintercite.com/contact
LOGO_IMAGE_URL=         # ex: https://trampolineintercite.com/assets/logo.png

JWT_SECRET=
```

## DB

Each environment file should be of the form `.env.[env_name]`. For example: `.env.prod`

```bash
DATABASE_NAME=
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_PORT=

SLL_CERTIFICATE_PATH=   # Windows only, point to ssl .pem file
```
