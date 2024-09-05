<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img width="318" alt="logo" src="https://github.com/user-attachments/assets/22bf4552-3a0f-479b-ab7e-918ba37860b4">
  <p align="center">
    <br />
    Visit:  https://virtual-stocks-sha.vercel.app
    <br />
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

- Play with virtual stocks.
    - Users on registering get a $1000 credit using which they can purchase stocks.
    - Learn stock trading without the fear of losing money.

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
    - ** Spring Security ** handles the authentication flow.
    - Exposed the following endpoints for handling authentication: `/register`, `/authenticate`, `/logout`
    - On registering, the details of the user (name, email, password (encrypted), balance) are stored in a **MySQL** database.
    - On authenticating (log in), the server verifies the credentials and returns a [JSON Web Token (JWT)](https://jwt.io/) as a **Cookie**.
    - This cookie has the following properties:
        - `httpOnly`: Can't be accessed by JavaScript
        - `secure`: Only sent to the server with an encrypted request over the HTTPS protocol
        - `SameSite=None`: To allow cookies in cross-site requests (since the backend and frontend are deployed on different domains).
        - Expiry: 1 day
          <img width="1529" alt="image" src="https://github.com/user-attachments/assets/c7844ec8-e1bc-42c5-b570-4b52ee98c0a2">
    - In all subsequence calls to the server, the browser automatically attaches this Cookie.
    - For every request on the server, we extract the subject (user) from the Cookie and fetch/store the data from/to the database accordingly.
    - On log out, the server resets the cookie on the client side by sending a cookie with all the same properties but expiring immediately.
    - Encoded/Decoded value of Cookie on [jwt.io](https://jwt.io/):
      <img width="1237" alt="image" src="https://github.com/user-attachments/assets/031804af-d248-4cff-9d78-9312bae58b76">




- Explore stocks:
    - The usage of external APIs for stock data (Finnhub and Alpha Vantage) is handled by **Server Actions** in **Next.js**.
    - Using the following external APIs:
        - Stock search results: https://finnhub.io/docs/api/symbol-search
        - Company details: https://finnhub.io/docs/api/company-profile2
        - Price: https://finnhub.io/docs/api/quote
        - Past daily, weekly, monthly time series data: https://www.alphavantage.co/documentation
    - Plotting the past trends using `AreaChart` from **Recharts**: https://recharts.org/en-US/api/AreaChart

- Purchase/Sell stocks:
    - User enters the quantity of the stock to purchase/sell.
    - On submission, we send the updated `stocks[]` and `balance` of the user to the server endpoint `/updateStocksAndBalance` which then stores it in the database.

- Stocks Portfolio:
    - As soon the user logs in, we fetch user details (name, email, balance, stocks) using the `/user` endpoint in the `layout` file of the `dashboard`.
    - Then for each stock in the portfolio, we fetch the current price using the external API.
    - Then calculate individual and overall profit/loss and display them accordingly.

### Database Schema


## Usage

The live version of this web app is deployed at: https://virtual-stocks-sha.vercel.app
<br />
To set up locally, follow these steps:

### Setup backend
1. Clone the repo
   ```sh
   git clone https://github.com/shakib1729/stocks-api.git
   ```

### Setup frontend
1. Clone the repo
   ```sh
   git clone https://github.com/shakib1729/virtual-stocks.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Setup `.env.local` in the root directory:
   ```
   FINNHUB_API_KEY=YOUR_FINNHUB_API_KEY
   ALPHAVANTAGE_API_KEY=YOUR_ALPHAVANTAGE_API_KEY
   NEXT_PUBLIC_API_URL=https
   ```
4. Run the project
   ```sh
   npm run dev
   ```