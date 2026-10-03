# CarLot practice project

A small used-car listings app for practising AI-assisted coding. It has a Node.js (Express) API and a React frontend, and it is deliberately unfinished: `TASKS.md` lists six small features and fixes for you to add with your AI tool.

## What you need

- Git
- Node.js (current LTS). Check with: `node --version && npm --version`
- A code editor (VS Code, Cursor, WebStorm)
- Your AI coding tool, signed in

## Run it

From this folder:

```
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

- The website runs on port 5173.
- The API runs on port 3001. Try http://localhost:3001/api/cars.
- Stop both with `Ctrl + C`.

Run the tests:

```
npm test
```

## How the project is organised

```
carlot-practice/
├── server/                    Node.js API
│   ├── src/
│   │   ├── index.js           starts the server
│   │   ├── app.js             sets up Express and the routes
│   │   ├── routes/
│   │   │   ├── cars.js        GET /api/cars, GET /api/cars/makes
│   │   │   └── enquiries.js   POST /api/enquiries
│   │   ├── utils/
│   │   │   ├── filterCars.js  filtering logic
│   │   │   └── paginate.js    splits results into pages
│   │   └── data/cars.js       the 22 sample cars
│   └── tests/cars.test.js     example API tests
└── client/                    React website
    └── src/
        ├── App.jsx            main page, holds the state
        ├── api.js             all calls to the API
        ├── components/        Filters, CarList, CarCard, Pagination, ContactForm
        └── utils/format.js    price and mileage formatting (with a test)
```

## Practise the "clone" step too

The interview starts with cloning a repo, so rehearse that part as well.

1. Create a new empty repository on github.com (no README).
2. In this folder, run:

   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/carlot-practice.git
   git push -u origin main
   ```

3. Go to a different folder and clone it, the way you will in the interview:

   ```
   git clone https://github.com/YOUR-USERNAME/carlot-practice.git
   cd carlot-practice
   npm install
   npm run dev
   ```

## Next step

Open `TASKS.md` and do the tasks one at a time. `SOLUTIONS.md` has short notes to check your work against afterwards; try not to read it first.
