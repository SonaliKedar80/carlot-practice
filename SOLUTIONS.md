# Solution notes

Short notes to check your work against after you finish each task. There is more than one correct way to do most of these.

## Task 1: Max price filter and sort by mileage

Files you would expect to change:

- `client/src/components/Filters.jsx`: a number input for max price and a select for sorting.
- `client/src/App.jsx`: `maxPrice` and `sort` added to the `filters` state.
- `client/src/api.js`: `maxPrice` and `sort` added to the query string.
- `server/src/routes/cars.js`: read `maxPrice` and `sort` from `req.query`.
- `server/src/utils/filterCars.js`: filter on `car.price <= maxPrice`; sorting can go here or in a separate helper.

Things to check: the query value arrives as text, so it needs converting to a number. Sorting must happen before pagination, and should not change the original `cars` array (sort a copy).

## Task 2: Single car endpoint

- A new `router.get('/:id', ...)` in `server/src/routes/cars.js`.
- It must be placed **after** the `/makes` route. Otherwise Express treats "makes" as an id and `/api/cars/makes` returns a 404.
- `req.params.id` is text, so convert it with `Number(...)` before comparing.

## Task 3: Save to favourites

- New file `server/src/routes/favourites.js` with `GET /`, `POST /` and `DELETE /:carId`, mounted in `app.js`.
- New functions in `client/src/api.js`.
- Favourites state held in `App.jsx` and passed down to `CarCard`, so the state survives page changes.

Things to check: adding the same car twice should not create a duplicate, and the button should not break if the request fails.

## Task 4: Validate the contact form

- Client: an `errors` object in `ContactForm.jsx`, filled by a `validate(form)` function that runs on submit.
- Server: the same rules in `server/src/routes/enquiries.js`, returning `400` and a list of errors.
- Validation on the client is for the user's convenience. Validation on the server is what actually protects the data, so both are needed.

## Task 5: Fix the pagination bug

The cause is in `server/src/utils/paginate.js`:

```js
const totalPages = Math.floor(total / pageSize);
```

`Math.floor` rounds down, so 22 cars at 6 per page gives 3 pages (18 cars) and the last 4 cars are unreachable. Four Toyotas gives 0 pages. It should round up:

```js
const totalPages = Math.ceil(total / pageSize);
```

A test that catches it: paginate 22 items with a page size of 6 and expect `totalPages` to be 4.

## Task 6: Add unit tests

A new file such as `server/tests/filterCars.test.js` that imports `filterCars`, builds a small list of three or four cars, and checks each case with `expect(...)`.

## What interviewers usually look for

- You understood the codebase before changing it.
- Your prompts were specific and pointed the AI at existing patterns.
- You read the AI's changes and could explain them.
- You ran the app and the tests instead of assuming it worked.
- You noticed when the AI did too much or got something wrong, and corrected it.
- Small, clear commits.
