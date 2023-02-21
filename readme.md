# P4-JOB-API

P4-JOB-API is a RESTful API that provides endpoints to interact with a job database. The API is built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)

## Installation

To install the dependencies, clone the repository and run the following command:

npm install

Create a `.env` file and add the following variables:

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
JWT_LIFETIME=<token-expire-time>

## Usage

To start the server, run the following command:
npm start


By default, the server will run on port 3000. You can change the port by setting the `PORT` environment variable.

## Endpoints

### Authentication

| Endpoint         | Method | Description            | Request Body                          |
|------------------|--------|------------------------|---------------------------------------|
| `/api/auth/signup`    | POST   | Create a new user      | `{ "email": "<email>", "password": "<password>" }` |
| `/api/auth/login`     | POST   | Login with an existing user | `{ "email": "<email>", "password": "<password>" }` |

### Jobs

| Endpoint         | Method | Description            | Request Body                          |
|------------------|--------|------------------------|---------------------------------------|
| `/api/jobs`       | GET    | Get all jobs           | -                                     |
| `/api/jobs/:id`   | GET    | Get a single job by ID | -                                     |
| `/api/jobs`       | POST   | Create a new job       | `{ "title": "<title>", "description": "<description>", "location": "<location>" }` |
| `/api/jobs/:id`   | PUT    | Update a job by ID     | `{ "title": "<title>", "description": "<description>", "location": "<location>" }` |
| `/api/jobs/:id`   | DELETE | Delete a job by ID     | -                                     |





