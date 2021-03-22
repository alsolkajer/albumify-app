# Albumify app
## A social file album app

It's a Social album file directory. Here you can upload your file, store it, and download it with others. Build in nuxt js, express, and vuetify.

Default MongoDB link can be changed through api/config/keys.

## Features and specifications
- Authentication JWT (Login, Register, Logout) using passport and nuxt auth
- Nuxt and Express connect through server middleware
- Upload a file
- Download a file
- OWASP Protection

note: depreciation warning can be ignored safely
https://stackoverflow.com/questions/66190532/deprecationwarning-listening-to-events-on-the-db-class-has-been-deprecated-and

## Deployment
https://albumify-file-app.vercel.app/

note: backend hasn't been set up. (unfinished)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
