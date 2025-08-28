
# Spender

A simple and clean web application to track daily and recurrent expenses.

## Features

*   Track daily expenses with a description, amount, and date.
*   Manage recurrent expenses with a name, amount, and frequency.
*   Edit and delete both daily and recurrent expenses.
*   Data is stored in a local `db.json` file.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/<your-github-username>/spender.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd spender
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To run the application, you will need to open two separate terminals.

**In the first terminal, start the backend server:**
```bash
node server.js
```

**In the second terminal, start the frontend application:**
```bash
npm run dev:client
```

The application will be available at `http://localhost:5173`.
