# Message Board Prototype

## Overview

This is a prototype message board implemented as a single-page web application in React and a simple backend in NodeJS. The message board consists of multiple named channels where users can view and submit messages.

## Project Structure

The project is divided into two main parts:

- React Client: Frontend implemented using React, Typescript, MUI library.
- NodeJS Backend: Backend server implemented using Express, socket.io.

## Installation

### React Client

Navigate to the `client` directory:

- cd message-borad-frontend

Install dependencies and start the React client:

- npm install
- npm start

### Nodejs Backend

Navigate to the `server` directory:

- cd message-borad-backend

Install dependencies and start the React client:

- npm install
- npm start

## Usage

Open your browser and go to http://localhost:3000 to access the message board.

The message board consists of three panels:

- Navigation panel: List of channels
- Message list panel: List of messages for the selected channel
- Editor panel: Text area input to submit new messages (visible when a channel is selected)
- Interact with the message board by selecting channels, entering text in the editor, and submitting messages.

## API Endpoints

GET Channels:

http://localhost:3001/channels

GET Channel Messages:

http://localhost:3001/messages/<channel>

POST Submit Message:

http://localhost:3001/<channel>
Body: { "text": "Your message here" }

## Improve the application

- Auto scroll to latest message
- Use socket.io to provide real-time chat-app
- Search channels
