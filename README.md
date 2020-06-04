# 💣 Minesweeper Project 💣

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Implementation of [Minesweeper game](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>).
Try it out [here](https://www.google.com).

[1. Overview](#overview)

[2. Architecture](#architecture)

[3. Project Structure](#project-structure)

[4. Project Setup](#project-setup)

[5. API Docs](#api-docs)

[6. Development Journey](#development-journey)

## Overview

---

This game is part of a technical evaluation.
TODO Add more details once the game is in progress.

## Architecture

---

TODO Complete

## Project Structure

---

TODO Complete

## Project Setup

---

TODO Complete

## API Docs

---

TODO Complete

## Development Journey

---

| Date     | Tasks                                                                                                                                                                                       | Time    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 06/02/20 | Started working on project! Invested time reading the requisites; about Minesweeper rules, variations and mathematical models around it.                                                    | ~1.5 hs |
|          | Defined an initial approach to the solution: project will contain three components: a RESTful API, an API SDK (client) and a web app.                                                       | ~1.5 hs |
|          | Defined a tech stack: API will use [Typescript](http://typescriptlang.org/) so I can take advantage of the stronger type system, [Express](https://expressjs.com/) as web framework,        |         |
|          | [winston](https://github.com/winstonjs) for logging, [React](https://reactjs.org/) for the APP, and [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) to scafold it. |         |
|          | Based on requisites will most need to use a database; will come back later to that.                                                                                                         | ~1 hs   |
|          | Created a public git repo with the initial structure of the project, plus setup of gitignore, tsconfig, webpack file, etc.                                                                  | ~2 hs   |
| 06/03/20 | Setup of [Digital Ocean Droplet](https://www.digitalocean.com/products/droplets/) where API and APP will be deployed.                                                                       | ~0.5 hs |
|          | Completed an initial end to end integration between a test service on the api, and MongoDB.                                                                                                 | ~1 hs   |
|          | Implemented a simple MongoDB native driver wrapper to execute queries to the database.                                                                                                      | ~1.5 hs |
| 06/04/20 |                                                                                                                                                                                             |         |
| 06/06/20 |                                                                                                                                                                                             |         |
| 06/07/20 |                                                                                                                                                                                             |         |
