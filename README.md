# 💣 Minesweeper Project 💣

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Implementation of [Minesweeper game](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>).
Try it out [here](https://www.google.com).

[1. Overview](#overview)

[2. Architecture and Dev Journey](#architecture-and-dev-journey)

[3. Project Setup](#project-setup)

[4. API Docs](#api-docs)

[5. Tasks Breakdown](#tasks-breakdown)

## Overview

---

This game is part of a technical evaluation.
[Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game)) is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field.



## Architecture and Dev Journey

---

This project has three main modules:

* API: A Restful API that provides access to create and play Minesweeper matches using different users
* APP: A Single Page Application that implements a playable Minesweeper Board, and options to login and load previous matches
* SDK: A library to handle API integration between APP and API.


For the API, I originally I decided to gor for a 3 layer architecture, where:

1. An *applicatio* layer takes responsibility for validating input data, and routing through the available services.

2. The *service* layer provides a set of services that models the operations and flows of the domain.

3. The *manager* layer where the low level data access is implemented.

For the evaluation time restrictions, I decided to merge both the *service* and *manager*, so the transformation logic from the database responses to the service models are in the same place.

A decision -a bad one- that I made early on was not to use any form of ORM to make it a more interesting implementation. Turned out that consumed a bit more time that expected, and made the implementation more complex as well.

To interact with the Minesweeper matches, I decided to use a Command like pattern approach: Match Service is capable of receive Match Commands, and those commands execute operations over a Match, updating its internal state, and potentially the Match state (WON, LOST, IN PROGRESS, etc).
This was definitely a good idea, and later on made the integration with the APP simpler and intuitive.

One last comment about the API is the LRU. I was not expecting performance issues with MongoDB, but turns out that the free tier of Atlas was kind of warming up for each query. In order to mitigate that, I implemented an In Memory cache that saves the state of the Match there, and prevents any save unless the user explicitly saves from the UI. In a more realistic scenario, I've used a queue with persistent messages for the match commands, or a Redis.

Regarding the APP, I decided to go with React and Create-React-App, which are the technologies I feel more comfortable with (Probably theres better options for games). Pretty much the only add on to the standard, scaffolded Create React App is the addition of React Router to handle routing.

Theres one thing that are Im not happy with the APP implementation, and that is that I used different models for the Cells representation coming from the API, and the internal Cell model used on the UI. That generated additional transformations on the client side. If I were used the same model on both, the code implementation would have been a bit more cleaner.
Also, the Game component is a bit complex. With more time, Ive refactored it a bit and extract some potiential components from it.

Walkthrough Video with Demo:

[![Watch the video](data:image/png;base64,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)](https://drive.google.com/file/d/1jayyZOyZ-e5jOty_D_P6FvoJeJRXUI5a/view?usp=sharing)



## Project Setup

---

0. Verify that you have NodeJS 10+, yarn and a local instance of MongoDB installed on your computer.

1. Run following command to install APP dependencies

    ```bash
        cd app && yarn
    ```

2. Run following command to install API dependencies

    ```bash
        cd api && yarn
    ```

3. Setup env file: 
   ```bash 
        cp .env.example .env
    ```

    and change MONGODB_CONNECTION_STRING property for the Mongo Conneection String of your local instance, and MONGODB_DB_NAME to the name of the database.

4. Start API running:

    ```bash
        cd api
        yarn debug-build
        yarn start
    ```

5. Start APP running:

    ```bash
        cd app
        yarn start
    ```

6. Execute Unit Tests with:

    ```bash
        cd api
        yarn start
    ```

## API Docs

---

Go to the [Minesweeper API Docs](http://192.241.136.96:3004/)

## Tasks Breakdown

---

| Date     | Tasks                                                                                                                                                                                     | Time    |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 06/02/20 | Started working on project! Invested time reading the requisites; about Minesweeper rules, variations and mathematical models around it.                                                  | ~1.5 hs |
|          | Defined an initial approach to the solution: project will contain three components: a RESTful API, an API SDK (client) and a web app.                                                     | ~1.5 hs |
|          | Defined a tech stack: API will use Typescript so I can take advantage of the stronger type system, Express as web framework, Winston for logging, React for the app, and create-react-app |         |
|          | to scafold it.                                                                                                                                                                            | ~0.5 hs |
|          | Created a public git repo with the initial structure of the project, plus setup of gitignore, tsconfig, webpack file, etc.                                                                | ~2 hs   |
| 06/03/20 | Setup of [Digital Ocean Droplet](https://www.digitalocean.com/products/droplets/) where API and APP will be deployed.                                                                     | ~0.5 hs |
|          | Completed an initial end to end integration between a test service on the API, and MongoDB.                                                                                               | ~1 hs   |
|          | Implemented a simple MongoDB native driver wrapper to execute queries to the database.                                                                                                    | ~1.5 hs |
|          | Setup of Mongo cloud instance on Mongo Atlas, and integration with the API.                                                                                                               | ~1.5 hs |
|          | Setup and implementation of unit tests for models, utils and services                                                                                                                     | ~2 hs   |
| 06/06/20 | Made a first code refactor to improve quality of the implementation, particularly on the commons / utils module, and he services                                                          | ~2 hs   |
|          | Integrated an LRU cache on the Match service                                                                                                                                              | ~2 hs   |
|          | Implementation of the Command pattern inspired solution to control the execution flow of the game through the Match service                                                               | ~2 hs   |
|          | Initial setup of Swagger                                                                                                                                                                  | ~0.5 hs |
| 06/07/20 | Implemented the board interations and algorithms of initialization, and other algorithms required through the game, particularly Floo Fill for adjacent cells without bombs.              | ~1.5 hs |
|          | Implemented first APP version using React, added React Router to handle the different scenes of the game, setup integration with API more in detail, tested login API                     | ~4 hs   |
|          | Implemented and Integrated a module to send commands to the API to play the game                                                                                                          | ~2 hs   |
|          | Implemented remainig views of the APP, several bug fixes during test.                                                                                                                     | ~3 hs   |
|          | Updated documents and styles (jsdocs, tests, code formatting)                                                                                                                             | ~0.5 hs |
| 06/09/20 | Wrapping up implementation, fixed several bugs on inputs                                                                                                                                  | ~3 hs   |
|          | Added validations                                                                                                                                                                         | ~1 hs   |
|          | Created SDK.                                                                                                                                                                              | ~2 hs   |
|          | Updated README, deploy latest version of the APP and API to server, minor improvements and created issues to track existing problems                                                      | ~3 hs   |