[`trampolineintercite.com`](../README.md)/[`docs`](./docs.md)/[`deploy.md`](./deploy.md)

# Deployment

## Preview

Every branch is automatically deployed on Vercel as a preview.

## Production

The master branch is automatically deployed on vercel in production.

### To trigger a production deployment from anywhere

```bash
curl --location --request POST 'https://api.github.com/repos/JulienR1/trampolineintercite.com/actions/workflows/production.yml/dispatches' \
--header 'Accept: application/vnd.github+json' \
--header 'X-GitHub-Api-Version: 2022-11-28' \
--header 'Authorization: Bearer <GITHUB_TOKEN>' \
--data-raw '{"ref":"master"}'
```
