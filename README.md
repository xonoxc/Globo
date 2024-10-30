# Globo Blog

Globo Blog is a modern blogging platform built with Vite and React. This application allows users to create, edit, view, and manage blog posts with an intuitive, high-performance UI.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, edit, and delete blog posts
- Rich text editor support
- Responsive and optimized for performance
- User authentication and authorization
- SEO-friendly
- Dynamic routing for blog posts
- Commenting functionality with replies
- State management using Zustand

## Tech Stack

- **Frontend:** React, Vite, Redux for state management
- **Styling:** CSS Modules / Styled Components (optional)
- **Backend :** Node.js  + Typescript 
- **Authentication:** : Custom JWT authentication
- **Caching** : Redis

## Getting Started

### Prerequisites

- Node.js (>= 14.x.x) and npm (>= 6.x.x) or yarn (>= 1.22.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/globo-blog.git
   cd globo-blog
   ```


2. Install dependencies:

	```bash
		npm install
        # or
        yarn install
	```


3. Create a .env file and add environment variables as stated in .env.sample file

### Running the application

1.  To start the development server:

	```bash 
       npm run dev
       # or
       yarn dev
    ```


Open [http://localhost:5173](http://localhost:5173) to view the app in the browser

## Production Build

1. To build the project for production, run:

	```bash 
       npm run build
       # or
       yarn build
    ```


## Project Structure

	```bash

		├── public          # Static assets
		├── src
		│   ├── assets      # Image and other assets
		│   ├── components  # Reusable components
		│   ├── pages       # Page components (Home, Blog, etc.)
		│   ├── hooks       # Custom hooks
		│   ├── store       # Zustand store
		│   ├── utils       # Utility functions
		│   └── App.jsx     # Main App component
		├── .env            # Environment variables
		└── vite.config.js  # Vite configuration
    ```


# Contributing

Contributions are welcomed! Please submit a pull request or open an issue for feature requests and bug fixes.


# License

This project is licensed under the MIT license.
