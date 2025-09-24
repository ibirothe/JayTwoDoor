# FastAPI + React + MongoDB Todo App

A full-stack Todo application with authentication and security measures, built with:

* FastAPI for the backend
* React for the frontend
* MongoDB as the database

The repository is under construction.

---

## Features

* User registration and login with JWT-based authentication
* Password hashing with bcrypt
* Secure token handling with access and refresh tokens
* CRUD operations for todos
* React frontend consuming the API
* Environment-based configuration for secrets

---

## Backend Tech Stack

* [FastAPI](https://fastapi.tiangolo.com/) – web framework
* [Uvicorn](https://www.uvicorn.org/) – ASGI server
* [Beanie](https://roman-right.github.io/beanie/) – ODM for MongoDB (built on Motor and Pydantic)
* [Motor](https://motor.readthedocs.io/) – async MongoDB driver
* [PyJWT via python-jose](https://python-jose.readthedocs.io/) – JWT authentication
* [passlib](https://passlib.readthedocs.io/) – password hashing
* [python-dotenv / python-decouple] – environment variable management
* [email-validator](https://pypi.org/project/email-validator/) – email validation

---

## Frontend Tech Stack

* React
* Axios

---

## License

This project is licensed under the MIT License.
