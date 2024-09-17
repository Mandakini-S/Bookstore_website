### Introduction

Welcome to the Bookshop ecommerce project built using **React** for the frontend, **Django** for the backend, and **PostgreSQL** for the database.

This project was part of my 60 days of learning [Learning with Leapfrog] challenge 2024. 



## Table of Content
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Cloning the Project](#cloning-the-project)
- [Setting up the Backend:](#setting-up-the-backend)
- [Setting Up the Frontend (React)](#setting-up-the-frontend-react)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)

## Features

- User authentication (login, signup)
- Product listing, search, and filters
- Shopping cart and checkout functionality
- Admin panel for product and order management

## Technologies Used

- **Frontend**: React, JavaScript, Tailwind CSS
- **Backend**: Django, Django REST Framework
- **Database**: PostgreSQL

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [Python](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Cloning the Project

To clone this repository, run the following command in your terminal:

```bash
git clone https://github.com/Mandakini-S/c.git
cd https://github.com/Mandakini-S/Bookstore_website.git

```

## Setting up the Backend:

#### 1. Navigate to Backend folder:
```bash
cd Backend
```
#### 2. Create Virtual Environment and activate:

```bash

python -m venv venv
# for Linux/macOS
source venv/bin/activate 
 # for Windows
.\venv\Scripts\activate  

```

#### 3. Install dependencies:
```bash
pip install -r requirements.txt
```

#### 4. Configure PostgreSQL:
Create a PostgreSQL database and update the DATABASES setting by creating .env file in Backend Folder:
```bash

SECRET_KEY = 'SECRET-KEY-HERE'

DEBUG = 1

DB_NAME='Db-name here'
DB_USER='user name here'
DB_PASSWORD='password here'
DB_HOST=localhost
DB_PORT=5432
```

#### 5. Apply migrations:
```bash
python manage.py migrate
```

#### 6. Create a superuser (for admin panel access):
```bash
python manage.py createsuperuser

```

#### 7. Run the Django development server:
```bash
python manage.py runserver

```

## Setting Up the Frontend (React)

#### 1. Navigate to the frontend directory:

```bash
cd frontend
```

#### 2. Install the required dependencies:

```bash
npm install
```

#### 3. Run the React development server:
```bash
npm start
```
The frontend will be running on http://localhost:3000.


## Running the Project
To run the project, ensure both the **Django** backend and **React** frontend servers are running concurrently.

Visit http://localhost:3000 for the frontend and http://localhost:8000/admin for the Django admin panel.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit and push your changes (`git commit -m "Add new feature"`).
5. Submit a pull request.

<div align = 'center'><b>Happy coding !</b></div>

