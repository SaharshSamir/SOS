# How to set up in dev environment
## First, you need to have these installed:
  1. Nodejs
  2. npm
  3. nodemon
## Steps to set up:
  1. clone the repository in your local machine
  2. cd into the root directory of the project (`cd sos`) and run `npm install`.
  3. cd into the frontend folder (`cd frontend`) and run `npm install`.
  4. Inside the config folder, make a new file `dev.js` and add in your **mongo conection string** and your **jwt secret**, like in prod.js.
  5. cd back to the root dir (`cd ..`) and run the command `npm run dev`
