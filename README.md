
# Rect Auth Firebase

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](#)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)

## Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Enviroment variables](#environment-variables)
   - [Running the Project](#running-the-project)
6. [Contact](#contact)

---

## About the Project

React Auth Firebase is a simple authentication project that shows authentication flow in a react application using firebase to provide authentication functionality. The library offers several features, including:

Firebase Authentication Integration: React Firebase Auth provides seamless integration with Firebase Authentication, allowing developers to easily authenticate users and manage their sessions.
Customizable Authentication Strategies: The library offers flexible authentication strategies that can be tailored to meet the specific needs of a React application. Developers can choose from a variety of authentication methods, including email/password, Google, Facebook, and more.
Password Hashing and Verification: React Firebase Auth provides password hashing and verification capabilities, ensuring that user passwords are securely stored and validated.
User Profile Management: The library offers user profile management capabilities, allowing developers to store and retrieve user information, such as email addresses, names, and profiles.
Seamless Integration: React Firebase Auth is designed to work seamlessly with React, allowing developers to easily integrate authentication functionality into their applications without any hassle.
By using React Firebase Auth, developers can build secure and scalable React applications with a robust authentication system. With its simple and intuitive API, developers can focus on building their application while ensuring a smooth user experience

[https://julius-react-auth-firebase.netlify.app/]

---

## Features

- ##### Email and Password Sign-Up
   Users can register using their email and password.
- ##### Email Verification
   A verification email is sent to new users during sign-up.
   Users cannot access the dashboard until they verify their email.
- ##### Login with Email and Password
   Users can log in using their email and password credentials.
- ##### Google Authentication
   Users can log in using their Google account via Firebase.
- ##### Password Recovery
   Users can reset their password via a password recovery link sent to their email.
- ##### Resend Verification Email
   If users haven't verified their email, they can request a resend of the verification email.
- ##### Notification feedback and error handling
   User feedback notification on authentication action

---

## Tech Stack

**Frontend:** Typescript, React, Tailwind CSS, Vite, Tanstack router, useContext
**Backend:** Firebase authentication
**Other:** Vite, PNPM, Zod, Netlify

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [pnpm](https://pnpm.io/)
   If you dont have pnpm installed 
   ```bash
   npm install -g pnpm
   ```


### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/ojst60/react-firebase-auth.git
   ```
2. Navigate to the project directory:
   ```bash
   cd react-firebase-auth
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Environment Variables

- VITE_FIREBASE_API_KEY=Firebase API key
- VITE_FIREBASE_AUTH_DOMAIN=Firebase Auth domain
- VITE_PROJECT_ID=Firebase Project ID
- VITE_STORAGE_BUCKET=Firebase Storage Bucket URL
- VITE_FIREBASE_MESSAGING_SENDER_ID=Firebase Messaging Sending ID
- VITE_APP_ID=Firebase App Id
- VITE_MEASUREMENT_ID=Firebase measurement Id
- VITE_PRODUCTION_URL=Production URL
- VITE_DEVELOPMENT_URL=Development URL
**Note**: Replace the placeholders in `.env.development` with actual values for your environment. Place `.env.development in` in project root folder

### Running the Project

For development mode:
```bash
pnpm dev
```

## Contact

[Julius Oyovwikigho](Julius4oyovwikigho@gmail.com)
[Your LinkedIn Profile](www.linkedin.com/in/julius-o-09879)  
[Project Link](https://github.com/ojst60/react-firebase-auth)

---
