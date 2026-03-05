# Moodify 🎧
### AI Powered Mood Based Music Recommendation Platform

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![Redis](https://img.shields.io/badge/Cache-Redis-red)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![MediaPipe](https://img.shields.io/badge/AI-MediaPipe-purple)
![ImageKit](https://img.shields.io/badge/Storage-ImageKit-blueviolet)
![Status](https://img.shields.io/badge/Status-Production-success)

Moodify is a **full stack mood based music web application** that detects a user's emotional state from facial expressions and automatically recommends songs that match the detected mood.

The platform combines **AI powered emotion detection**, **custom audio playback**, and a **scalable backend architecture** to deliver a modern interactive music experience.

Users can also upload songs categorized by mood, allowing the music library to grow dynamically.

---

# 🌐 Live Deployment

Frontend (Vercel)  
https://moodify-sync.vercel.app/

Backend (Render)  
https://moodify-server-kkf7.onrender.com

---

# Project Overview

Moodify integrates **real time facial emotion detection** with a custom music streaming interface.

Using the **browser camera and Google MediaPipe Face Landmark Detection**, the application analyzes facial landmarks in real time and determines the user's mood. Based on the detected emotion, the application automatically selects and plays songs from the mood categorized music library.

The platform also allows authenticated users to upload their own songs, enabling a continuously expanding music collection.

The project demonstrates a complete **production style full stack system** including authentication, media uploads, AI integration, audio playback, scalable backend architecture, and cloud deployment.

---

# Core Features

## AI Mood Detection
- Real time facial landmark detection
- Emotion classification from facial expressions
- Automatic matching of songs with detected mood
- Browser camera integration using MediaPipe

## Mood Based Music Recommendation
- Songs categorized by emotion
- Automatic playlist generation
- Seamless mood based playback

## Song Upload System
Authenticated users can upload songs into the platform.

Features include:

- MP3 file upload support
- Automatic metadata extraction using ID3 tags
- Album artwork extraction
- Upload audio and artwork to **ImageKit CDN**
- Store song metadata and URLs in MongoDB

## Advanced Music Player

The platform includes a fully custom React music player with:

- Play / Pause controls
- Forward & backward skip (5 seconds)
- Volume control with mute support
- Playback speed control
- Interactive progress bar with seeking
- Next / Previous navigation
- Automatic next song playback
- Playlist queue system
- Click to play song switching
- Smooth song transitions
- Responsive UI for mobile devices

## Secure Authentication

Moodify uses a production style authentication system:

- User Registration
- User Login
- Logout functionality
- JWT based authentication
- HTTP only cookies for session security
- Password hashing using **bcrypt**
- Protected routes

---

# System Architecture

```
                ┌──────────────┐
                │   Frontend   │
                │  React (Vite)│
                └──────┬───────┘
                       │
                       │ API Requests
                       ▼
               ┌───────────────┐
               │   Node.js API │
               │  Express App  │
               └──────┬────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
     MongoDB        Redis        ImageKit
 (User & Songs)   (Tokens)     (Media CDN)
        │
        ▼
   Metadata + Mood Based Song Storage
```

### Architecture Explanation

- **React frontend** communicates with backend APIs
- **Express backend** manages authentication, uploads, and mood logic
- **MongoDB** stores users and song metadata
- **Redis** manages authentication tokens and caching
- **ImageKit** stores song files and album artwork using CDN

---

# Backend Architecture

The backend follows a modular architecture:

```
controllers → business logic
routes → API endpoints
models → database schemas
services → integrations (ImageKit, Redis)
```

### Backend Responsibilities

- Authentication & authorization
- Song upload and metadata extraction
- Mood based song retrieval
- Token management
- Media storage integration
- API communication

---

# Frontend Architecture

The frontend follows a **feature based structure**.

Each feature module contains:

- Components
- Hooks
- Context providers
- Styles

### State Management

Global state is managed using **React Context** for:

- Authentication state
- Current playing song
- Playlist queue
- Player controls

---

# 🛠️ Tech Stack

## Frontend
- React (Vite)
- SCSS
- React Context API
- Google MediaPipe Face Landmark Detection

## Backend
- Node.js
- Express.js
- MongoDB
- Redis
- JWT Authentication
- bcrypt Password Hashing

## Media Handling
- ImageKit CDN
- ID3 metadata extraction

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# What This Project Demonstrates

Moodify demonstrates strong full stack engineering skills including:

- Secure authentication systems
- AI integration in web applications
- Real time emotion detection
- Media file uploads
- Custom audio playback engine
- Scalable project architecture
- Cloud deployment workflows
- Secure API communication
- Production level application design

---

# Final Note

Moodify is a production style full stack application combining **AI based facial emotion detection with music streaming functionality**.
It demonstrates practical implementation of authentication systems, media processing, scalable backend architecture, and responsive frontend design in a real world deployment environment.
