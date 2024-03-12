# Wordle Server

This is the wordle server, developed using NodeJS 20. The server is still under heavy development as most of the work was to get the client up and running, but right now the game is playable.

It depends on the sibling directory wordle-data to avoid hardcoding the database calls into the server itself.

## Installation

1. Clone the repository to your local machine: `git clone git@github.com:4thguy/wordle-project.git`
2. Navigate to the wordle-server directory: `cd wordle-server`
3. Install dependencies: `pnpm install`

## Running
1. Navigate to the wordle-server directory: `cd wordle-server`
2. Run `pnpm serve`

This will compile the project and serve it locally. You can now ping the server using an API tool at http://localhost:3000/ by default or run the client against it.

Any changes made to the project files will cause the server to reload with the new changes.

## Stack
The stack is a simple NodeJS server for now as development is still ongoing, database operations are offloaded as a dependency on the wordle-data folder

## Contributing
At the moment I am not accepting code contributions as the project is still under initial development, however if you think you have identified an issue or have a feature request please feel free to open an issue and I will look into it.