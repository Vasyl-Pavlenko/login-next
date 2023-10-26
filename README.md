# Test task: Web application for authorisation and working with a table

This web application is created as part of a test assignment. It presents a page for user authorisation and a page for working with a table of data obtained via API.

[Live Demo](https://login-next-vasyl-pavlenko.vercel.app/) 

## Features

- A page for entering login and password for authorisation is implemented.
- On successful authorisation, the user is redirected to the page with the table.
- The following features are available in the table:
  - Data search.
  - Data pagination.
  - Sorting data by different fields in two directions.
  - Editing and saving data.
  - Data validation.
- Data for the table is loaded using API at the address: [https://technical-task-api.icapgroupgmbh.com/api/table/](https://technical-task-api.icapgroupgmbh.com/api/table/).
- Error handling and visual display of errors is implemented.

## Technologies

- Next.js 
- React
- Redux
- Redux Toolkit
- TypeScript
- React Bootstrap
- Axios

## Getting Started
To run the Users App locally on your machine, follow these steps:

1. Clone the GitHub repository:
 
```sh
git clone https://github.com/Vasyl-Pavlenko/login-next.git
cd login-next
```

2. Install dependencies:
```sh
npm install
# or
yarn install
```
3. Run the application:
```sh
npm run dev
# or
yarn run dev
```
The application should now be running locally at http://localhost:3000

## Author
The author of this project is:  **Vasyl Pavlenko**
