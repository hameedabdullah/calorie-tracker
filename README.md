# Calorie Tracker

A full-stack **Calorie Tracker Application** built using **React.js, Node.js, Express.js, and MySQL**. The application allows users to manage food items, exercise items, daily calorie intake, calorie burn, and view daily reports through an interactive dashboard.

---

# Technology Stack

## Frontend

* React.js
* Vite
* JavaScript (ES6)
* HTML5
* CSS3
* React Hot Toast
* Lucide React Icons

## Backend

* Node.js
* Express.js
* MySQL2
* bcrypt
* cors
* dotenv

## Database

* MySQL

---

# Features

## Authentication

* User Signup
* User Login
* Password Encryption using bcrypt

## Food Master

* Add Food
* Update Food
* Delete Food
* Display Food List

## Exercise Master

* Add Exercise
* Update Exercise
* Delete Exercise
* Display Exercise List

## Food Entries

* Add Daily Food Entry
* Automatic Calorie Calculation
* Edit Entry
* Delete Entry

## Exercise Entries

* Add Daily Exercise Entry
* Automatic Calorie Burn Calculation
* Edit Entry
* Delete Entry

## Dashboard

* Today's Calories Consumed
* Today's Calories Burned
* Net Calories

## Reports

* Daily Calorie Report
* Calories Consumed
* Calories Burned
* Net Calories

---

# Project Structure

```
calorie-tracker/

│
├── backend/
│   │
│   ├── database/
│   │      schema.sql
│   │      seed.sql
│   │      initDatabase.js
│   │
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── public/
│   └── images/
│
├── src/
│
├── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```
git clone https://github.com/hameedabdullah/calorie-tracker.git
```

Go to project folder

```
cd calorie-tracker
```

---

# Frontend Setup

Install frontend dependencies

```
npm install
```

Start frontend

```
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# Backend Setup

Open a new terminal

```
cd backend
```

Install backend dependencies

```
npm install
```

Create a `.env` file inside the backend folder.

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=calorie_tracker
PORT=5000
```

Start backend

```
npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

# Database Setup

## Step 1

Install MySQL Server.

---

## Step 2

Create a database.

```
CREATE DATABASE calorie_tracker;
```

---

## Step 3

Update the backend `.env` file.

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=calorie_tracker
PORT=5000
```

---

## Step 4

Start the backend.

```
cd backend

npm install

npm run dev
```

On startup, the application automatically executes

```
backend/database/schema.sql
```

and creates the following tables if they do not already exist.

```
users

food_master

food_entries

exercise_master

exercise_entries
```

No manual table creation is required.

---

## Step 5 (Optional)

Run

```
backend/database/seed.sql
```

to insert sample Food Master and Exercise Master data.

Sample images should be placed inside

```
public/images/
```

Example

```
public/images/rice.jpg

public/images/milk.jpg

public/images/apple.jpg

public/images/walking.jpg

public/images/running.jpg

public/images/cycling.jpg
```

because image paths are stored as

```
/images/rice.jpg
/images/milk.jpg
/images/apple.jpg
```

---

# Database Schema

## users

| Column     | Type      |
| ---------- | --------- |
| id         | INT       |
| username   | VARCHAR   |
| email      | VARCHAR   |
| password   | VARCHAR   |
| created_at | TIMESTAMP |

---

## food_master

| Column            | Type        |
| ----------------- | ----------- |
| id                | INT         |
| food_name         | VARCHAR     |
| unit              | ENUM(gm,ml) |
| calories_per_unit | INT         |
| image_url         | VARCHAR     |
| created_at        | TIMESTAMP   |
| updated_at        | TIMESTAMP   |

---

## food_entries

| Column     | Type        |
| ---------- | ----------- |
| id         | INT         |
| food_id    | Foreign Key |
| unit       | ENUM(gm,ml) |
| quantity   | DOUBLE      |
| calories   | DOUBLE      |
| created_at | TIMESTAMP   |
| updated_at | TIMESTAMP   |

---

## exercise_master

| Column            | Type      |
| ----------------- | --------- |
| id                | INT       |
| exercise_name     | VARCHAR   |
| unit              | VARCHAR   |
| calories_per_unit | INT       |
| image_url         | VARCHAR   |
| created_at        | TIMESTAMP |
| updated_at        | TIMESTAMP |

---

## exercise_entries

| Column      | Type        |
| ----------- | ----------- |
| id          | INT         |
| exercise_id | Foreign Key |
| unit        | VARCHAR     |
| quantity    | DOUBLE      |
| calories    | DOUBLE      |
| created_at  | TIMESTAMP   |
| updated_at  | TIMESTAMP   |

---

# Default Login Credentials

No default login credentials are provided.

Create a new account using the Signup page.

---

# API Endpoints

```
POST    /signup

POST    /login

GET     /food-master
POST    /food-master
PUT     /food-master/:id
DELETE  /food-master/:id

GET     /exercise-master
POST    /exercise-master
PUT     /exercise-master/:id
DELETE  /exercise-master/:id

GET     /food-entries
POST    /food-entries
PUT     /food-entries/:id
DELETE  /food-entries/:id

GET     /exercise-entries
POST    /exercise-entries
PUT     /exercise-entries/:id
DELETE  /exercise-entries/:id

GET     /dashboard

GET     /reports
```

---

# Author

**Hameed Abdullah**

GitHub

[https://github.com/hameedabdullah](https://github.com/hameedabdullah)
