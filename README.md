# CinemaApp
## Overview

CinemaApp is java full-stack web aplication that alows the users to reserved, cancel or purcahse the ticket/tickets for movie. The application is built using Java for the backend and React+Vite for the frontend. 

## Notes
This application isn't finished yet. It's in working progress.
Also, alter column description in movie_coming_soon table. Instead of column type String, set up to Text.
e.g. ALTER TABLE cinema_db.movies_coming_soon modify column description TEXT;
Before you run application, first, you need to create database. In MySQL Workbench, type this: 
DROP SCHEMA IF EXISTS cinema_db;
CREATE SCHEMA cinema_db DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE cinema_db;
After application is run, also in MySQL Workbench add these lines of codes:
insert into role(name) values("ROLE_ADMIN");
insert into role(name) values("ROLE_USER");
insert into projection_type(name) values("2D");
insert into projection_type(name) values("3D");
insert into projection_type(name) values("4D");
insert into hall(name) values("hall-1");
insert into seat(seat_number, hall_id, available) values(1,1,true);
insert into seat(seat_number, hall_id, available) values(2,1,true);
insert into seat(seat_number, hall_id, available) values(3,1,true);
insert into seat(seat_number, hall_id, available) values(4,1,true);
insert into seat(seat_number, hall_id, available) values(5,1,true);
Also, you can add more halls and more seats. That's up to you.


## Features

- User authentication and authorization (registration, login, logout)
- Movie reservation functionality
- Projection reservation functionality
- Admin dashboard for managing movies, projections and tickets
- Payment integration using Stripe
- Responsive UI

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Security
- JPA (Hibernate)
- MySQL

### Frontend

- React+Vite
- React Router
- Bootstrap
- Stripe

## Getting Started

### Prerequisites

- JDK 11+
- Node.js
- MySQL

### Installation

1. **Clone the repository**


git clone https://github.com/jovangolic/CinemaApplication.git
cd CinemaApp

### Frontend setup
- npm create vite@latest
- input name of the project
- choose React+Vite
- choose javascript
- how to run:
- cd name-of-the-project
- npm install
- npm run dev

### Author
- Jovan Golic

# Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

# License

This project is licensed under the MIT License. See the LICENSE file for details.
