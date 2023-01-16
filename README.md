# Welcome to the iQuestion Angular Application

This is an Angular application that requires initialization when running for the first time. The initialization process now includes logging in with an API provided by the system administrator.

## Getting Started

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Run `npm install` to install all necessary dependencies.
4. Run `ng serve` to start the development server.
5. Navigate to `http://localhost:4200/` in your browser to view the app.

## Initialization

When running the app for the first time, you will need to initialize the application by following these steps:
1. Navigate to the `/login` route in your browser.
2. Fill out and submit the login form on the page using the credentials provided by the system administrator.
3. The base URL for the API is located at `src/app/interceptors/http-interceptor.service.ts`. Please update this with the correct URL provided by the system administrator.
4. The app will now be fully functional and ready for use.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
