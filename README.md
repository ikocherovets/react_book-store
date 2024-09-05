# React Book Store

A modern, fully responsive mock book store built with React, Vite, TypeScript, and Bulma, featuring dynamic product listings, sorting, and detailed product views. **Backend setup with `json-server` is required** for adding, editing, and deleting books.

## 🚀 Project Description

React Book Store is a mock online book store designed to showcase modern frontend technologies. It features book listings, sorting, detailed book views, and backend interaction. This project is ideal for learning purposes or as a starter template for more complex book management systems.

## 🛠️ Features

- Dynamic book listings with sorting and filtering by author
- Detailed book views with descriptions
- Add, edit, and delete books via `json-server`
- Responsive design using Bulma
- Backend interactions powered by a mock API (`json-server`)
- Fast development and build process powered by Vite

## 🧩 Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling. It’s fast!
- **TypeScript**: JavaScript with syntax for types.
- **Bulma**: A modern CSS framework based on Flexbox.
- **SCSS**: A preprocessor scripting language that is interpreted or compiled into CSS.
- **json-server**: A full fake REST API with zero coding, used as a mock backend.

## 📦 Installation and Setup

To get a local copy running, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/ikocherovets/react_book-store.git
```
### 2. Ensure you have Node.js installed (version 18 or later):

```bash
node -v
```

### 3. Install dependencies:

```bash
npm install
```

### 4. Setup and Run the Backend (json-server):
Setting up the backend is mandatory to add, edit, and delete books. **Make sure to keep the json-server running in a separate terminal while working with the app.** Do not close this terminal window, as the backend server needs to stay active while using the app.

```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

### 5. Run the app locally:

```bash
npm run dev
```
