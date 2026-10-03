# Practice tasks

Do these one at a time, in order. Each one is written the way an interviewer might say it. Aim for about 10 to 15 minutes per task.

## Routine for every task

1. Create a branch: `git checkout -b task-1-price-filter`
2. Ask your AI tool to make the change (a starter prompt is given for each task).
3. Read the changes it made. Say out loud what each changed file does.
4. Run the app and check it in the browser. Run `npm test`.
5. Commit: `git add .` then `git commit -m "Add max price filter"`

## Warm-up (do this first)

Before changing anything, ask your AI tool:

> Explain this project's structure. Where are the API routes, the React components, and the data? How does the frontend talk to the backend, and how do I run the app and the tests?

Being able to explain the codebase is the first thing an interviewer looks for.

---

## Task 1: Max price filter and sort by mileage

**The request:** "Users want to set a maximum price and sort the results by mileage, lowest first."

**Done when:**

- There is a "Max price" input next to the Make dropdown.
- Typing 20000 shows only cars priced at $20,000 or less.
- There is a "Sort by" option with at least "Mileage: low to high".
- Both work together with the Make filter and with pagination.

**Starter prompt:**

> Add a max price filter and a sort-by-mileage option to the car listings. Follow the same pattern the existing make filter uses, from the Filters component through api.js to the server. Keep the change small and tell me how to test it.

---

## Task 2: Single car endpoint

**The request:** "We need an endpoint that returns one car by its id."

**Done when:**

- `GET /api/cars/3` returns the car with id 3.
- `GET /api/cars/999` returns status 404 with a JSON error message.
- `GET /api/cars/makes` still works.
- There is a test for both the found and not-found cases.

**Starter prompt:**

> Add GET /api/cars/:id to the cars router. Return the car as JSON, or a 404 with a JSON error if it does not exist. Make sure the existing /makes route still works, and add tests in the same style as server/tests/cars.test.js.

---

## Task 3: Save to favourites

**The request:** "Let users save cars they like."

**Done when:**

- Each car card has a "Save" button.
- Clicking it calls the API and the button changes to "Saved".
- Clicking again removes the car from favourites.
- The saved state is still correct after changing page and coming back.

**Starter prompt:**

> Add a favourites feature. On the server, add endpoints to list, add and remove favourite car ids, stored in memory like the enquiries route. On the client, add a Save button to CarCard that calls those endpoints and shows whether the car is saved. Put the fetch calls in api.js like the existing ones.

---

## Task 4: Validate the contact form

**The request:** "People are sending empty enquiries. Add validation."

**Done when:**

- Name, email and message are required.
- Email must look like an email address.
- Phone is optional, but if filled in it must look like a phone number.
- Each invalid field shows its own error message, and the form is not sent.
- The server also rejects invalid enquiries with status 400.

**Starter prompt:**

> Add validation to ContactForm: name, email and message are required, email must be a valid format, phone is optional but must be valid if provided. Show an error under each invalid field and do not submit while there are errors. Also validate on the server in the enquiries route and return 400 with the errors. Add a server test.

---

## Task 5: Fix the pagination bug

**The request:** "A customer says some cars are missing. The page says 22 cars found, but they cannot reach all of them. Also, when they filter by Toyota it says 'Page 1 of 0'."

**Done when:**

- You can explain what caused the bug.
- All 22 cars can be reached through the page buttons.
- Filtering by Toyota shows "Page 1 of 1".
- There is a new test that would have caught the bug.

**Starter prompt:**

> The listings page says 22 cars found but I can only page through 18 of them, and filtering by Toyota shows "Page 1 of 0". Find the cause, explain it to me before changing anything, then fix it and add a test that would have caught it.

---

## Task 6: Add unit tests

**The request:** "The filter logic has no unit tests. Add some."

**Done when:**

- There is a new test file for `filterCars`.
- It covers: no filters, a matching make, a make with different capital letters, a make with no matches, and (if you did Task 1) max price and sorting.
- `npm test` passes.

**Starter prompt:**

> Write unit tests for server/src/utils/filterCars.js using Vitest, in the same style as the existing tests. Cover the normal cases and the edge cases, and use a small made-up list of cars rather than the real data file.

---

## Extra practice

If you finish all six, try these without a starter prompt:

- Show a "No cars match your search" message with a "Clear filters" button.
- Add a search box that matches make or model.
- Add a fuel type filter (Gasoline, Hybrid, Electric).
- Close the contact form when the Escape key is pressed.
