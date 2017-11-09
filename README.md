# "Readable" project

This is the final assessment project for [Udacity's React course](https://www.udacity.com/course/react-nanodegree--nd019) - React & Redux section.

Contents:

* [Project overview](#project-overview)
* [Running the project](#running-the-project)
* [Dev notes and improvements](#dev-notes-and-improvements)


## 1. Project overview

This is a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments (along the lines of Hacker News and Reddit).

## 2. Running the project

This react project include a minimal nodejs project in the `api-server/` folder, cloned from the course's [starter server repository](https://github.com/udacity/reactnd-project-readable-starter).

#### Installing NPM dependencies

First step is to install the NPM dependencies in both project.
From the project root folder:

`> npm install`

During the installation process of the react project, SemanticUI will ask a few things. From the command line, when asked, choose the **automatic** setup and use the default values.

Then, go to the nodejs server project and install its dependencies:

```
> cd api-server

api-server> npm install
```

#### Running the server and the client

You need to start the server **and** the client applications.

You can do it manually, by running `npm run start` in both folder (the root one, and the `api-server/` one), or by simply running from the root project folder:

`npm run start-all`

Using `concurrently`package, it will run the server and the client server at the same time. The client server is configured as a proxy to redirect the APi calls to the nodejs server, that will be listening on a different port.

## 3. Dev notes and improvements

This is a **work in progress** project, there are a few important missing things that were not target of the course:

* *no unit/integration testing*
* *no Prop-Types or flow-type integration*

I plan to work on the previous points, and migrate from `thunk`to `saga` middleware.
