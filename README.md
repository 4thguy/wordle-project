# Wordle Project
## Description

Welcome! This repository houses the development of a [Wordle](https://en.wikipedia.org/wiki/Wordle) game, with a primary focus on refining the client-side user interface. While some parts of the UI are more polished than others, ongoing work is being conducted on both the client-facing and server sides to enhance the overall user experience.

This project is a Wordle game implementation that consists of several parts

## Features
* Responsive design
* A theme with colors that respect your light/dark mode preferences

## Requirements

Developed on NodeJS v20 using pnpm to manage the npm packages and VueJS 3 for the client. Docker (docker-compose) is used to host a local database for development.

If any of these terms are unfamiliar to you, it is recommended that you familiarize yourself with what they mean before proceeding further.

## Components

   * *wordle-web*: This component encompasses the client interface, developed using Vue.js.
   * *wordle-shared*: Here, you'll find shared functions and classes written in TypeScript, aiding in the seamless interaction between different project components.
   * *wordle-server*: This segment hosts the Node.js server, also written in TypeScript, responsible for handling server-side operations and interactions.
   * *wordle-db*: Here, you'll find functions written in TypeScript to connect to the database backend, to avoid having the code that takes care of contacting the database inside the server itself.
   * *wordle-data*: This is the docker-compose file along with a long list of words to get the database started

## Checking Out the Project

To get started with the Wordle Project, follow these steps:

1. Clone the repository to your local machine: `git clone git@github.com:4thguy/wordle-project.git`
2. Navigate to the project directory: `cd wordle-project`
3. Explore the project components in their respective folders:
 * wordle-web
 * wordle-shared
 * wordle-server
 * wordle-data
 * wordle-db

## Development Instructions

For detailed instructions on developing and running each component, please refer to the respective folders.

    wordle-web/README.md: Instructions for setting up and running the client.
    wordle-shared/README.md: Guidelines for utilizing shared functions and classes.
    wordle-server/README.md: Instructions for deploying and managing the server.
    wordle-data/README.md: Instructions for communicating with the database.
    wordle-db/README.md: Instructions for setting up the database.

Feel free to explore, contribute, and enhance the Wordle Project. Happy coding! 🚀