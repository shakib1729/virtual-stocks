<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img width="318" alt="logo" src="https://github.com/user-attachments/assets/22bf4552-3a0f-479b-ab7e-918ba37860b4">
  <p align="center">
    <br />
    Visit:  https://virtual-stocks-sha.vercel.app
<br />
    Demo: https://youtu.be/X02m-iZ_EXA
    <br />
    <a href="https://github.com/shakib1729/virtual-stocks/issues/new">Report Bug</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>   
      <ul>
        <li><a href="#project-overview">Project Overview</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#workflow">Workflow</a></li>
        <li><a href="#database-schema">Database Schema</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
  </ol>
</details>

## About The Project

### Project Overview

- Play with virtual stocks:
  - Users on registering get a $1000 credit using which they can purchase stocks.
  - Learn basic stock trading without using real money.

- Portfolio summary:
  - Get an overview of the entire portfolio, including individual profit/loss and overall profit/loss.

- Explore stocks:
  - Search for the stocks: Enter some keywords and get the suggestions.
  - Analyze the past stock trend: the value of the stock on each day, week and month.

<img width="1716" alt="Screen Shot 2024-09-05 at 06 08 32" src="https://github.com/user-attachments/assets/69d5b0f8-ee1a-409f-9227-d4474efebeb3">

<img width="1719" alt="Screen Shot 2024-09-05 at 06 08 24" src="https://github.com/user-attachments/assets/e84e1350-0eba-4db4-a2d7-2a2addbe27a5">

<img width="1727" alt="Screen Shot 2024-09-05 at 06 07 52" src="https://github.com/user-attachments/assets/eed11eb9-12c7-4577-b86f-57c9704087ce">

<img width="1722" alt="Screen Shot 2024-09-05 at 07 57 04" src="https://github.com/user-attachments/assets/a8096829-143c-414d-ad03-cd9187449328">

### Built With

This web app is developed using the following:

- Frontend (with some route handling via `Server Actions`): [Next.js](https://nextjs.org/) (based on [React](https://react.dev/))
- Backend: [Spring Boot](https://spring.io/projects/spring-boot) (with [Spring Security](https://spring.io/projects/spring-security))
- Database: [MySQL](https://www.mysql.com/)
- Deployment:
  - For Backend and Database: [Railway](https://railway.app/)
  - For Frontend: [Vercel](https://vercel.com/)
- APIs:
  - Stock search results, company details, latest quotes: [Finnhub](https://finnhub.io/docs/api/introduction)
  - Past trends: [Alpha Vantage](https://www.alphavantage.co/documentation/)
- Additional libraries/packages used: [Java JWT](https://github.com/jwtk/jjwt), [Tailwind](https://tailwindcss.com/), [Recharts](https://recharts.org/en-US), [Hero Icons](https://www.npmjs.com/package/@heroicons/react)

### Workflow:

- **Authentication**

  - **Spring Security** handles the authentication flow.
  - Exposed the following endpoints for handling authentication: `/register`, `/authenticate`, `/logout`
  - On registering, the details of the user (name, email, password (encrypted), balance) are stored in a **MySQL** database.
  - During authentication (Log in), the server verifies the credentials and returns a [JSON Web Token (JWT)](https://jwt.io/) as a **Cookie**.
  - This cookie has the following properties:
    - `httpOnly`: Can't be accessed by JavaScript
    - `secure`: Only sent to the server with an encrypted request over the HTTPS protocol
    - `SameSite=None`: To allow cookies in cross-site requests (since the backend and frontend are deployed on different domains).
    - Expiry: 1 day
      <img width="1529" alt="image" src="https://github.com/user-attachments/assets/c7844ec8-e1bc-42c5-b570-4b52ee98c0a2">
  - In all subsequence calls to the server, the browser automatically attaches this Cookie.
  - For every request on the server, we extract the subject (user) from the Cookie and fetch/store the data from/to the database accordingly.
  - On log out, the server resets the cookie on the client side by sending a cookie with the same properties but expiring immediately.
  - Encoded/Decoded value of Cookie on [jwt.io](https://jwt.io/):
    <img width="1237" alt="image" src="https://github.com/user-attachments/assets/031804af-d248-4cff-9d78-9312bae58b76">

- **Explore stocks**

  - The usage of external APIs for stock data (Finnhub and Alpha Vantage) is handled by **Server Actions** in **Next.js**.
  - Using the following external APIs:
    - Stock search results: https://finnhub.io/docs/api/symbol-search
    - Company details: https://finnhub.io/docs/api/company-profile2
    - Price: https://finnhub.io/docs/api/quote
    - Past daily, weekly, monthly time series data: https://www.alphavantage.co/documentation
  - Plotting the past trends using `AreaChart` from **Recharts**: https://recharts.org/en-US/api/AreaChart

- **Purchase/Sell stocks**

  - User enters the quantity of the stock to purchase/sell.
  - On submission, we send the updated `stocks[]` and `balance` of the user to the server endpoint `/updateStocksAndBalance` which then stores it in the database.

- **Stocks Portfolio**
  - As soon the user logs in, we fetch user details (name, email, balance, stocks) using the `/user` endpoint in the `layout` file of the `dashboard`.
  - Then for each stock in the portfolio, we fetch the current price using the external API.
  - Then calculate individual and overall profit/loss and display them accordingly.

### Database Schema

![image](https://github.com/user-attachments/assets/b575f879-a3e5-47e6-af10-6d62de03e847)

`_user`: contains user information

![image](https://github.com/user-attachments/assets/8c7f29a3-54ac-4d5f-9457-d3cf6a116761)

![image](https://github.com/user-attachments/assets/4a94c12e-08bc-4ebb-8d66-60dfd9464ced)

`_user_seq`: internal table created by spring

![image](https://github.com/user-attachments/assets/7b83191e-6c5f-4c84-bade-192b9f963c1f)

![image](https://github.com/user-attachments/assets/67325662-9284-427e-80cc-4dfa50178951)

`user_stocks`: contains stocks of the users

![image](https://github.com/user-attachments/assets/efac3870-6b34-4059-b9eb-4954b3a8bddb)

![image](https://github.com/user-attachments/assets/10444072-6490-467b-8c6f-549122bf0e91)

## Usage

The live version of this web app is deployed at: https://virtual-stocks-sha.vercel.app
<br />

To set up locally, follow these steps:

### Setup database

1. Install `Docker`: https://docs.docker.com/desktop
2. Install `mysqlsh`: https://dev.mysql.com
3. Launch MySQL as Docker Container
   ```sh
   docker run --detach --env MYSQL_ROOT_PASSWORD=dummypassword --env MYSQL_USER=stocks-db-user --env MYSQL_PASSWORD=dummypassword --env MYSQL_DATABASE=stocks-db --name stocks-api-mysql --publish 3306:3306 mysql:8-oracle
   ```
4. Run `stocks-api-mysql` container from Docker Desktop.
5. Connect to the database from the terminal.

   ```sh
   mysqlsh
   \connect stocks-db-user@localhost:3306
   \sql
   use stocks-db
   show tables;
   ```

### Setup backend

1. Clone the repo
   ```sh
   git clone https://github.com/shakib1729/stocks-api.git
   ```
2. Create `.env.properties` in the root directory:
   ```
   JWT_SECRET_KEY=824ADC45D2D8A818A32E7AEE5FF34B322F10E64E0A8C2Z87C12AF74ABD8X2D9E
   CORS_ORIGIN=http://localhost:3000
   ENVIRONMENT=DEV
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=stocks-db
   DB_USERNAME=stocks-db-user
   DB_PASSWORD=dummypassword
   ```
3. Run `stock-api` as a Java Application from Eclipse.

### Setup frontend

1. Clone the repo
   ```sh
   git clone https://github.com/shakib1729/virtual-stocks.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create `.env.local` in the root directory:
   ```
   NEXT_PUBLIC_API_URL = 'http://localhost:8080/api/v1'
   FINNHUB_API_KEY=YOUR_FINNHUB_API_KEY
   ALPHAVANTAGE_API_KEY=YOUR_ALPHAVANTAGE_API_KEY
   ```
4. Run the project
   ```sh
   npm run dev
   ```
