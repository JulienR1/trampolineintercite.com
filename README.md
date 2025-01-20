[trampolineintercite.com](/README.md)

# Trampoline Intercité

Website repo for [Trampoline Intercité](https://trampolineintercite.com)

This is a monorepo that contains the following. More documentation can be found in the [docs section](./docs/docs.md).

---

## 1. [`/packages/web`](/packages/web)

The actual user facing website.

| Framework                     | Language                                      |
| ----------------------------- | --------------------------------------------- |
| [Astro](https://astro.build/) | [TypeScript](https://www.typescriptlang.org/) |

## 2. [`/packages/app`](/packages/app)

The admin portal used to configure and edit the user facing website.

| Framework                   | Language                                      |
| --------------------------- | --------------------------------------------- |
| [React](https://react.dev/) | [TypeScript](https://www.typescriptlang.org/) |

## 3. [`/packages/server`](/packages/server)

The common backend used to:

- Build the user facing website;
- Edit and configure the user facing website;
- Access other web services required by the website (eg: emails).

| Framework | Language              |
| --------- | --------------------- |
| [TBD](#)  | [Go](https://go.dev/) |

## 4. [`/packages/common`](/packages/common)

A collection of interfaces and types used by both frontends.

| Framework               | Language                                      |
| ----------------------- | --------------------------------------------- |
| [Zod](https://zod.dev/) | [TypeScript](https://www.typescriptlang.org/) |

## 5. [`/packages/db`](/packages/db)

A custom versioning and deploying tool for PostgreSQL.

## 6. [`/packages/cli`](/packages/cli)

A custom cli tool used to perform admin operations without requiring the portal.
