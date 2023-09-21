# Trading Economics Metric Comparison: Sweden vs Thailand

This app is a single-page application that renders two sets of data about Thailand and Sweden:

## Dataset 1 (Direct Indicator Comparison):
![Screenshot 2023-09-21 at 20 22 49](https://github.com/thiagolos/tradingeconomics/assets/128632331/21d0e887-43aa-4523-af5c-38246155ed1d)
- The most recent data provided by the Trading Economics (TE) API on Sweden and Thailand.
- Metrics have been filtered to include only data provided for both countries.
- All local currencies have been converted to USD (using the rates most recently provided by TE) for better comparison.

## Dataset 2 (Time Series GDP Comparison):
![Screenshot 2023-09-21 at 20 22 54](https://github.com/thiagolos/tradingeconomics/assets/128632331/d21c6631-5f0f-4313-bbc8-c30ef051c4b4)
- Time Series GDP data collected yearly for both Sweden and Thailand since the year 2000 are displayed on a single chart for easy comparison.

The application is responsive and thus utilizes responsive CSS rules and media queries to adapt to changes in screen size.

**Tech Stack:**

**Frontend:**

- Javascript
- React
- Axios
- Chart.js

**Backend:**

- Javascript
- Express.js
- Trading Economics API

**To Use the Application:**

1. Clone this repository.
2. Set up the frontend by navigating to the /client directory and running `npm install`.
3. Similarly, set up the backend by going to the /server directory and running `npm install`.
4. Start the backend server using `node index.js` in the /server directory.
5. Start the frontend development server using `npm run start` in the /client directory.

**Note:**
In the `te.controller.js` file, I have my free Trading Economics API key, which is subject to restrictions. Please be aware that switching between the datasets in the app too frequently/quickly can cause the requests to be throttled, which may crash the app. However, restarting the backend server and connecting to
