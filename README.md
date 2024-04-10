# o1-js iframe example

## Description

This is a simple example of how to use an iframe to display a webpage that uses o1js within another webpage.

This project has the following structure:

- `contracts`: Contains the smart contract code.

- `react-iframe`: Contains the React app that will be displayed in the iframe.

- `ui`: Contains the frontend code that hosts the content of the iframe which contains o1js code.

## How to run

1. Clone the repository.

2. Install the dependencies by running `npm install` in `contracts`, `react-iframe`, and `ui`.

3. Build the contracts by running `npm run build` in `contracts`.

4. Build and run the UI by running `npm run dev` in `ui`.

5. Open the browser and navigate to `http://localhost:3000`.

6. Build and run the React app by running `npm run dev` in `react-iframe`.

7. Open the browser and navigate to `http://localhost:3000`.

## Important Notes:

- The React app has the following [headers defined](./react-iframe/vite.config.ts#L6) to allow the iframe to load the content.

- The UI has the following [headers defined](./ui/next.config.js) to allow the iframe to load the content.

- The iframe itself has `allow="cross-origin-isolated"` to allow the iframe to load the content.
