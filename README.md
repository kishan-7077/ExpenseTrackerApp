# 📱 My Expenses App

## 🚀 Overview
This is an **Expo-based React Native** application designed to help users manage their personal expenses. Users can add expenses, track how much they owe or are owed, and view transaction histories with specific people. The app uses **MongoDB** as the backend and **Axios** for API requests.

### 🔧 Technologies Used
- **React Native** with **Expo**
- **Axios** for API requests
- **MongoDB** with **Mongoose** for the backend
- **React Navigation** for navigating between screens
- **React Native Paper** for UI components

## 📱 Features
- **💳 User Management:** Add and manage users with the amount they owe and are owed.
- **📊 Transaction Tracking:** Record transactions where users can either "give" or "receive" money.
- **💰 Expenses Overview:** View a summary of what you owe and what you are owed.
- **📝 Transaction History:** View detailed transaction histories for each user.

## Installation

To run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/kishan-7077/ExpenseTrackerApp.git
cd expense-tracker-app
```

### 2. Set Up the Backend

The backend is built using **Express** and **MongoDB**. To set it up:

1. Install dependencies for the backend:

```bash
cd server
npm install
```

2. Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:5000`. Make sure MongoDB is running locally or use a cloud instance.

### 3. Set Up the Frontend (Expo App)

1. Install the Expo CLI if you don't have it:

```bash
npm install -g expo-cli
```

2. Install the frontend dependencies:

```bash
cd mobile
npm install
```

3. Start the Expo project:

```bash
expo start
```

This will open the Expo developer tools in your browser. Scan the QR code with the Expo Go app on your phone to run the app, or use an Android/iOS simulator.

### 4. Configure the API URL

Make sure the frontend is pointing to the correct API URL (where the Express backend is running). You can modify the API URL in the frontend code like this:

```js
axios.get('http://192.168.1.7:5000/api/users/');
```

Change `192.168.1.7` to your local or remote backend address.

# Usage

1. **Main Screen**: Displays a list of all users, their balances, and transaction details.
2. **Transaction History**: On pressing a specific user's card, their transaction history is shown, including the details of whether they "gave" or "received" money.
3. **Transactions**: You can add transactions using the "Give" or "Receive" actions, which update the user's balance.

### 🔄 API Endpoints (Backend)

- **GET /api/users**: Fetches all users.
- **POST /api/users**: Adds or updates a user.
- **POST /api/users/gave**: Updates a user’s balance for giving money.
- **POST /api/users/got**: Updates a user’s balance for receiving money.
- **GET /api/users/:id/transactions**: Fetches all transactions for a specific user.

### 👩‍💻 Contribution

Feel free to fork the repository and make contributions. For large changes, please open an issue to discuss the changes before implementing them.

### 📝 License

Distributed under the MIT License. See LICENSE for more information.

## Acknowledgments

- **React Native** and **Expo** for making mobile app development faster and easier.
- **Mongoose** and **Express** for handling backend data and API requests.
- **Axios** for smooth API communication.

