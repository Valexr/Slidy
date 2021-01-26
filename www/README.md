# svelte-esbuild-starter
Starter for new Svelte application with ESBuild bundler

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit alexxnb/svelte-esbuild-starter svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start development server:

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [derver](https://github.com/alexxnb/derver).