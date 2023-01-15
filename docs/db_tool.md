[`trampolineintercite.com`](../README.md)/[`docs`](./docs.md)/[`db_tool.md`](./db_tool.md)

# DB tool

## Setup

```bash
cd db/manager
npm i
npm run build
```

Add environment files for each required env. eg:

```
.env.local
.env.prod
```

## Commands

| Name     | Command                    | Description                                       |
| -------- | -------------------------- | ------------------------------------------------- |
| Add      | `node db/manager add`      | Create a new sql script entry                     |
| Remove   | `node db/manager remove`   | Remove a sql script in the current migration      |
| Migrate  | `node db/manager migrate`  | Execute every uncommited files to the selected db |
| Rollback | `node db/manager rollback` | Undo the last migration                           |
