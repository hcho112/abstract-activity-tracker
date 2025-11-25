# Abstract Activity Tracker

A simple and efficient tool designed to track transaction counts for multiple smart contracts on the **Abstract L2 Chain**.

> **Note**: This project was created by **Antigravity / Gemini 3**.

## Features

- **Multi-Contract Tracking**: Monitor total transaction counts for a list of smart contract addresses simultaneously.
- **Accurate Data**: Utilizes a hybrid strategy (Scraping + RPC) to ensure "Total" counts (incoming + outgoing) are captured accurately.
- **Total Sum**: Instantly view the aggregate transaction volume across all tracked contracts.
- **Persistence**: Your list of contracts is automatically saved to your browser's local storage.
- **Clean UI**: Built with Next.js, Shadcn UI, and Tailwind CSS for a modern, responsive experience.

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

## Deployment

### Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Vercel will automatically detect Next.js and deploy.
