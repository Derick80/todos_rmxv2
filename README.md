# Welcome to Remix

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Tech Stack

- [x] [Remix-Run](https://remix.run/): A React Framework for Building Production-Ready Apps
- [x] [TypeScript](https://www.typescriptlang.org/): TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [x] [Prisma](https://www.prisma.io/): Prisma is a next-generation ORM that can be used to build GraphQL servers, REST APIs, microservices & more.
- [x] [PlanetScale](https://planetscale.com/): PlanetScale is a database-as-a-service built on Vitess, the same technology that runs YouTube, Slack, and Square.

## Styles

- [x] [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
- [x] [ShadCn UI](https://ui.shadcn.com/): A Vue.js 3.0 UI Toolkit for Web.
- [x]  [ShadCN Themes](https://ui.shadcn.com/themes): A collection of themes for ShadCn UI.

## User Authentication

- [x] [Clerk](https://clerk.dev/): Clerk is a developer-first identity and user management platform. It handles all the tricky parts of user management, so you can focus on building your product.

## Packages Used

- [x] [Prettier-Plugin-Tailwind](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

- [x] [Tailwind CSS](https://tailwindcss.com/)

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
