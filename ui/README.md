# React + TypeScript + Vite

## Getting started

If you do not have Node.js installed:  
Download and install Node.js from [nodejs.org](https://nodejs.org/en).

Once Node.js is installed:

1. Install pnpm globally:

   ```bash
   npm install -g pnpm
   ```

2. Verify the installation:
   ```bash
   pnpm -v
   ```
3. Serve the API

4. Change directory into `ui` and run:

   ```bash
   pnpm install
   ```

5. Start the server:
   ```bash
   pnpm run dev
   ```

**Note:**

- I changed some of the start and end times to show different status in the UI. also I added a CORS middleware to be able to access the data.

- I added a placeholder thumbnail to the video contribution card.

_observation:_ Rendering 3 cards per row of 14 Cards leaves a gap for one card on the last row (on desktop). in a paginated layout this can give an impression that there's no more data to load.

_solution:_ Render either 12 or 18 Cards per page instead, so there are empty spaces in the layout whether on desktop or tablet.

## Todo

**Things I will do differently if I had more time.**

- Format start date and end date with the same year and month but different days to show May 27-28, 2025

- Complete "persist searches and pagination within the URL implementation"
- Create a more robust easy to navigate pagination component, though in a production app I will prefer to use existing pagination library.
- Add loading skeleton when fetching data
- create a contribution component and pass it in the app component where i will handle any necessary routing.Also, introduce a layout component for a smooth flow
- Add a Playwright test.
