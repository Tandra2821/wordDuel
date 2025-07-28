# 🧙‍♀️ Word Duel Game

A fun, browser-based two-player word game where players take turns typing unique words within a timed setting. Built using **HTML**, **CSS**, and **JavaScript**, this game tracks scores, rounds, and high scores using **localStorage** and keeps both players' views synchronized across tabs.

## 🎮 How to Play

1. **Open the Game in Two Tabs or Browsers.**
2. Each player clicks their respective button to join:
   - **Player 1 (Lexa)**
   - **Player 2 (Syntax)**
3. Once both players join, the **"Play Now!"** button becomes active.
4. The game starts with a **countdown**.
5. Players take turns typing words:
   - Each word must be unique.
   - Points = word length.
6. The game runs for **3 rounds**.
7. At the end, the winner is announced, and the high score is recorded.

> Make sure each player uses a separate browser/tab to simulate two-player mode.

## 📁 Project Structure


## 💻 Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Local Storage API**

## 🧠 Features

- Two-player selection and turn-based input
- Countdown before the game begins
- Tracks and displays scores dynamically
- 3-round gameplay logic
- High Score tracking stored in browser
- Real-time tab synchronization using `storage` events
- Handles tab closing or leaving during a session

## 🏆 High Score System

- The top 5 most recent winners are stored and displayed.
- High scores are saved using `localStorage`.

## 🚀 How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern browser (Chrome/Firefox/Edge).
3. Use two separate tabs to simulate two players.
4. Enjoy the duel!

## 🛠️ Future Improvements

- Word validation using dictionary API.
- UI/UX enhancements (animations, transitions).
- Sound effects for turns and results.
- Mobile responsiveness.
- Online multiplayer using WebSockets or Firebase.

## 🙋‍♀️ Developed By

**Bhargavi Tandra**  
[LinkedIn](https://www.linkedin.com/in/bhargavi-tandra) | [GitHub](https://github.com/Tandra2821)

---

### ⚙️ License

This project is for learning and demonstration purposes. Feel free to use and modify it for personal or educational use.
