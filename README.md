# Abstract Activity Tracker

A simple and efficient tool designed to track transaction counts for multiple smart contracts on the **Abstract L2 Chain**.

> **Note**: This project was created by **Antigravity / Gemini 3**.

## Features

- **Multi-Contract Tracking**: Monitor total transaction counts for a list of smart contract addresses simultaneously.
- **Accurate Data**: Utilizes a hybrid strategy (Scraping + RPC) to ensure "Total" counts (incoming + outgoing) are captured accurately.
- **Total Sum**: Instantly view the aggregate transaction volume across all tracked contracts.
- **Persistence**: Your list of contracts is automatically saved to your browser's local storage.
- **Proxy Support**: Bypass Cloudflare blocking on Vercel by configuring a proxy.

> [!WARNING]
> **Hosted Version Limitations**: The hosted version of this application may not work as expected because the transaction count retrieval relies on scraping the Abstract Explorer. When triggered from a cloud environment (like Vercel), this traffic is often identified as a bot and blocked by security services (e.g., Cloudflare). For reliable usage, run the application locally or ensure you have a robust residential proxy configured.


## Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment & Proxy Configuration

### Vercel Deployment

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  **Important**: To make scraping work on Vercel (bypassing Cloudflare), you must add a **Environment Variable**:
    -   **Name**: `PROXY_URL`
    -   **Value**: Your proxy connection string (e.g., `http://user:pass@proxy.com:port`).

    *Note: You will need to obtain a residential proxy from a provider like Bright Data, Smartproxy, or Oxylabs.*

### GitHub

1.  Create a new repository on GitHub.
2.  Push your local code:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <your-repo-url>
    git push -u origin main
    ```
