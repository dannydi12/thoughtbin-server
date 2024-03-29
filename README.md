# ThoughtBin Server

[![CodeFactor](https://www.codefactor.io/repository/github/dannydi12/thoughtbin-server/badge)](https://www.codefactor.io/repository/github/dannydi12/thoughtbin-server)

ThoughtBin allows users to anonymously share and create content on a simple and frictionless micro-platform. Think of it as a privacy-centric Twitter with a hint of 4Chan. A live demo can be found at [https://thoughtbin.danthebuilder.com/](https://thoughtbin.danthebuilder.com/)

## Summary
This API provides the means to create, read, update, and delete thoughts as a user on Thoughtbin.

## Motivation

I wanted a social media network where I didn't have to worry about followers, likes, or reputation. I felt there was a need to create something that respected the user and fostered a safe space for self-expression. Soon after, the idea of ThoughtBin was born. 

ThoughtBin's basic principles:

* Disseminating information shouldn’t be difficult
* Publishing new information should not require you to surrender your identity
* Access to information should not be gated by identification
* Every internet user should have the ability to *anonymously* share/create content; *pseudonymity* is not acceptable.

By design, ThoughtBin only stores a single token in Local Storage to authenticate and fetch your personal thoughts. No trackers, no cookies, nothing else.

## ThoughtBot

The live demo includes an automated posting bot that scrapes r/ShowerThoughts to feign user interaction and show off the WebSocket functionality + infinite scroll features. Here is the repository for [ThoughtBot](https://github.com/dannydi12/thoughtbin-bot).

## Installation

#### `npm install`

Installs all the required dependencies. Run this before anything else.

#### `npm run migrate`

Uses postgrator to create required tables. Create a database and edit `postgrator-config.js`  before running this command.

#### `npm run dev`

Runs the app in the development mode.

#### `npm test`

Launches Mocha.

#### `npm start`

Launches the server at the port specified in your `.env` file.

## Configuration

Make sure to go to `[thoughtbin-folder-name]/example.env` , rename it to `.env`, and then enter your configuration details (port, Postgres database URL, etc)

**The front-end repository can be found [here](https://github.com/dannydi12/thoughtbin-client).**

## Usage

### Open Endpoints

Open endpoints require no authentication.

* [Get Token](docs/token.md) : `POST /token` - Get a token for subsequent authorized requests
* [Get Thoughts](docs/thoughts/get.md) : `GET /thoughts/` - Get 10 thoughts at any given index

### Endpoints that require Authentication

Basic CRUD operations in regard to thoughts.

* [Create A Thought](docs/thoughts/post.md) : `POST /thoughts/` 
* [Get A Thought](docs/thoughts/id/get.md) : `GET /thoughts/:id`
* [Update A Thought](docs/thoughts/id/patch.md) : `PATCH /thoughts/:id`
* [Delete A Thought](docs/thoughts/id/delete.md) : `DELETE /thoughts/:id`


## Built With

#### Back-end:

* Node
* PostgreSQL
* Knex
* JSON Web Token
* WebSockets
* Express
* Mocha, and Chai
* Deployed with Heroku

#### Front-end:

* React
* HTML5
* CSS3
* Javascript
* JSON Web Token
* WebSockets
* Jest
* Deployed with Zeit

## Demo

- [Live Demo](https://thoughtbin.danthebuilder.como/)

## Authors

* **Daniel DiVenere** - Fullstack Development, Deployment, etc - [https://danthebuilder.com/](https://danthebuilder.com/)
