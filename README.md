# Code Habit
Welcome to Code Habit, a place for programmers to practice algorithms. Using Spaced Repetition, Code Habit allows users to review problems they've previously solved and rate the difficulty. Commonly found in flashcard apps, Spaced Repetition ensures that you retain the new concepts you've learned.

## How's it work?
After creating an account, a user may solve algorithmic word problems provided by Code Habit. Using the embedded editor, a user will submit their solution which is then run against many test cases. If the tests pass, the user will be prompted to rate the difficulty of the problem. The user's solution is then saved to the database.

After a user solves a problem and rates the difficulty, a review timer is started. The user will encounter that review within N days depending on several things including difficulty rating. The more difficult a problem, the sooner the review appears. Once Code Habit deems a problem too easy for the user, reviews will no longer be generated.

Users may also view their stats and progress in various ways on the profile page.

## The future
Moving forward, I plan to build out the backend as a Django REST API. I'd also like to implement Docker for running a test suite on the user's code externally. Even further down the line, forums and befriending other users will become features. 


## Tech Used
* HTML5
* CSS3
* React + Hooks
* Javascript
* Chart.js
* SM2 Algorithm