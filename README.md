[trampolineintercite.com](/README.md)

# Trampoline Intercité

Website repo for [Trampoline Intercité](https://trampolineintercite.com)

This is a monorepo that contains the following. More documentation can be found in the [docs section](./docs/docs.md).

<hr/>

## 1. Web

The actual website.

### Tech:

- [Astro](https://astro.build/);
- [ReactJS](https://reactjs.org) (Admin portal).

## 2. Server

The web service managing the UI. It is used to:

- Get the proper data when building the website;
- Edit the website via the admin portal;
- Manage other requests (e.g.: emails).

### Tech:

- [NodeJS](https://nodejs.dev/);
- [ExpressJS](https://expressjs.com/);
- [tRPC](https://trpc.io/).

## 3. Common

A collection of interfaces and types used by both the frontend and the backend.

### Tech:

- [Zod](https://zod.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 4. DB

A custom versioning and deploying tool for MySQL.
