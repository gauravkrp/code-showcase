# Documentation and Relevant Info

### Requirements to run
You will need:
- Node > v12
- A text editor or IDE. VS Code is recommended

## Tool & Technology
- Next.js 12
- Axios for http requests
- SCSS for styling and Purged unused styles using postcss.
- Jest and React Testing Library for unit testing the **selection component**
- CyPress for form E2E testing

## Steps to run locally
- Clone the project
- Install the dependencies by running `npm install`
- Start the development server - `npm run dev`
- Open the browser at `http://localhost:3000`
- Run `npm run lint` for linting
- Run `npm run lint-format` to lint and format using prettier
- Run `npm run test` to unit test component using Jest
- Run `npm run cypress` to run e2e testing
- Run `npm run deploy` for a production build

## Testing, Linting and Accessibility
  - Entire codebase is linted using eslint and formatted using prettiers
  - Web Accessibility: WCAG AA level. Tested using eslint js-a11y plugin and [WAVE Chrome extenstion](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
  - unit-test for selection component using Jest and React Testing Library.
  - e2e tests for form using Cypress.

## Deployment
  - Can be deployed on Vercel/Netlify as a serverless deployment