# Implementation Plan - Abstract Activity Tracker

## Goal
Create a Next.js application that tracks transaction counts for a list of Abstract smart contract addresses.
The app will use Shadcn UI + Tailwind CSS for a modern look and be compatible with Vercel.

## Proposed Changes

### API Layer
#### [NEW] [lib/api.ts](file:///Users/hyunjuncho/.gemini/antigravity/brain/9a01d90c-ecd0-4e48-bde2-806c42ca4c1e/abstract-activity-tracker/lib/api.ts)
- Implement `fetchTransactionCount(address: string)` function.
- Strategy:
    - Primary: Use Abstract Explorer API (Abscan) to get total transaction count if available (e.g. via `?module=account&action=txlist` count or specific endpoint).
    - Fallback: Use RPC `eth_getTransactionCount` (only counts outgoing/nonce) if Explorer API is unavailable or rate-limited.
    - Will attempt to find a "total tx count" endpoint on Abscan.

### UI Components
#### [NEW] [components/activity-tracker.tsx](file:///Users/hyunjuncho/.gemini/antigravity/brain/9a01d90c-ecd0-4e48-bde2-806c42ca4c1e/abstract-activity-tracker/components/activity-tracker.tsx)
- Client component.
- State: `input` (string), `results` (array of { address, count, status }), `loading` (boolean).
- UI:
    - Textarea for inputting addresses (comma/space separated).
    - "Check Activity" Button.
    - Results display (Card or Table) showing Address and Transaction Count.
    - Error handling for invalid addresses.

#### [MODIFY] [app/page.tsx](file:///Users/hyunjuncho/.gemini/antigravity/brain/9a01d90c-ecd0-4e48-bde2-806c42ca4c1e/abstract-activity-tracker/app/page.tsx)
- Replace default Next.js boilerplate with the `ActivityTracker` component.
- Add a title/header "Abstract Activity Tracker".

### Dependencies
- Ensure Shadcn components are installed: `Button`, `Input`, `Textarea`, `Card`, `Table`.
- Install `axios` if not present (already in package.json).

## Verification Plan

### Automated Tests
- None planned for this small scope.

### Manual Verification
1.  **Build Check**: Run `npm run build` to ensure Vercel compatibility.
2.  **Functional Test**:
    - Input known Abstract addresses (will find some from Explorer).
    - Verify transaction counts are returned.
    - Test with invalid addresses (should show error or 0).
    - Test with multiple addresses (comma and space separated).
3.  **UI Check**: Verify responsive design and "modern" look (Shadcn/Tailwind).
