# Groover Fullstack Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This repository is part of the groover fullstack job application, check the [Project requirements](https://developers.grover.com/frontend-task/) 

## Getting Started

First, install the packages with NPM:

```bash
npm install
```

Then, run the development server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Testing

### Unit and Integration

Integration tests are built with [Jest](https://jestjs.io/) along with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro). Use the following command to run it:

```bash
npm run test
```

---

## Mock server

To locally test the application without the need of a running service, you cann mock the HTTP responses.make sure that you have the mockServiceWorker.js under the public folder, to create a new one run

```bash
npm run mock:init
```

Please make notice, that all endpoints mocks will be configured in `src/mocks/handlers.ts`.

---


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
