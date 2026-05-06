
Secure Real Time Multiplayer Game

A secure 2D real-time multiplayer game built with:

HTML Canvas API
Socket.io
Node.js
Express
Helmet

This project was created for the FreeCodeCamp Information Security and Quality Assurance certification challenge.

Features
Real-time multiplayer gameplay
Multiple players connected simultaneously
Player avatars
Collectible items
Score system
Dynamic player ranking
WASD and Arrow key movement
Collision detection
Live synchronization between all players
Player disconnect handling
Security Features

This project includes the required security measures:

Prevent MIME sniffing using Helmet
Prevent XSS attacks
Disable client-side caching
Hide server technology with fake X-Powered-By: PHP 7.4.3
Technologies Used
Node.js
Express
Socket.io
Helmet 3.21.3
HTML5 Canvas API
Installation

Clone the repository:

git clone https://github.com/YOUR_USERNAME/secure-real-time-multiplayer-game.git

Move into the project directory:

cd secure-real-time-multiplayer-game

Install dependencies:

npm install

Start the server:

npm start
Run the Game

Open:

http://localhost:3000

Open multiple browser tabs/windows to test multiplayer functionality.

Controls
Key	Action
W / Arrow Up	Move Up
S / Arrow Down	Move Down
A / Arrow Left	Move Left
D / Arrow Right	Move Right
Project Structure
secure-real-time-multiplayer-game/
│
├── package.json
├── server.mjs
│
└── public/
    ├── index.html
    ├── style.css
    ├── client.js
    ├── Player.mjs
    └── Collectible.mjs
FreeCodeCamp Requirements Completed
Multiple players can connect and play
Each player has an avatar
Player class implemented
Collectible class implemented
WASD and Arrow controls
Collision detection
Score and ranking system
Real-time synchronization
Secure headers implemented
License

This project is open source and available under the MIT License.
