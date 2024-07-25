# CinemaApp
## Overview

CinemaApp is java full-stack web aplication that alows the users to reserved, cancel or purcahse the ticket/tickets for movie. The application is built using Java for the backend and React+Vite for the frontend. 

## Notes
This application isn't finished yet. It's in working progress.
Also, alter column description in movie_coming_soon table. Instead of column type String, set up to Text.
e.g. ALTER TABLE cinema_db.movies_coming_soon modify column description TEXT;


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
