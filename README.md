# Hegemony
Create records (text, voice, recognition) to find, browse and update them.

---

## Technologies
* `HTML` / `*`
* `CSS` / `Sass`
* `React` / `Redux`
* `Node` / `Express` / `Mongoose`

## Quickstart
Created with [create-react-app](https://create-react-app.dev/docs/getting-started)
1. `git clone https://github.com/betelgeuseAS/Hegemony.git`
2. `cd Hegemony` and `npm install`
3. `cd Hegemony\client` and `npm install`
4. `cd Hegemony` and `npm run dev`

If the tab doesn't open on your own browser, then open your web browser to localhost:5000.

## API Routs
Documentation back-end: [Postman](https://web.postman.co/collections/6630209-b3c2e365-60c1-462b-946b-c4602cb818f0?version=latest&workspace=aa8055e5-dfa9-4c7e-807a-0e3ac6ee0674)

## Dependencies
A brief description of each package and the function it will serve (back-end):
* `bcryptjs`: used to hash passwords before we store them in our database
* `body-parser`: used to parse incoming request bodies in a middleware
* `concurrently`: allows us to run our backend and frontend concurrently and on different ports
* `express`: sits on top of Node to make the routing, request handling, and responding easier to write
* `is-empty`: global function that will come in handy when we use validator
* `jsonwebtoken`: used for authorization
* `mongoose`: used to interact with MongoDB
* `passport`: used to authenticate requests, which it does through an extensible set of plugins known as strategies
* `passport-jwt`: passport strategy for authenticating with a JSON Web Token (JWT); lets you authenticate endpoints using a JWT
* `validator`: used to validate inputs (e.g. check for valid email format, confirming passwords match)

A brief description of each package and the function it will serve (front-end):
* `axios`: promise based HTTP client for making requests to our backend
* `classnames`: used for conditional classes in our JSX
* `jwt-decode`: used to decode our jwt so we can get user data from it
* `react-redux`: allows us to use Redux with React
* `react-router-dom`: used for routing purposes
* `redux`: used to manage state between components (can be used with React or any other view library)
* `redux-thunk`: middleware for Redux that allows us to directly access the dispatch method to make asynchronous calls from our actions
* `redux-logger`: middleware for Redux that allows watch on store.
* `lodash`: a modern JavaScript utility library delivering modularity, performance & extras.
