<h1 align="center">Venturus Job Test</h1>
<h2 align="center">

This project was developed as a job test for Venturus.</h1>
<img src="https://img.shields.io/badge/made%20by-joaoricardotg-blue.svg" >

## The App
The app was built with React.js and illustrates an interface for creating and configuring soccer teams. It is composed of two pages, the main one displays all the teams the user has created, a board displaying average ages of players and another board displaying percentages of picks for a chosen team.  
<img src="./1.png" width="100%">
The second page is opened whenever the user wants to create a new team or configure an already existing one, displaying input fields to define the team's name, a description of the team, tags, two radio buttons to define if the team is a fictional or real one and a website URL for the team. The user can also define the formation of the team and position of each player in the field.
<img src="./2.png" width="100%">

## Technologies used
For this app, the frontend was built with React.js, while the API was built by me with Node.js/Express.js and the information about teams and clients was stored in MongoDB Atlas, which acts as an online MongoDB database.

The backend is live at https://venturus.herokuapp.com/ and the frontend is live at https://joaoricardotg-venturus.netlify.app/.

## Backend routes
There are 5 routes for the backend, all POST's receiving JSON as requests. 
### `POST /createUsr` 
Receives an JSON in the format {name, password, email} to create a new account for a client.


### `POST /createTeam`
Receives an JSON in the format {teamName, description, website, type, tags, formation}. Creates a team with a random number of players between 22 and 25 players. The team composition such as names of each player, nacionality, age, number of times each player was chosen, are all generated randomly. Names are provided by the API "names.drycodes", ages are generated between 18 and 40 years, the number of picks for each player varies between 5 and 50 and the player nacionality is provided by the API "REST Countries"

### `POST /updateTeam`
Receives an JSON in the format {id, teamID, teamName, description, website, type, tags, formation}. Id is the ID of the client, which is stored in MongoDB Atlas. The route receives these data and updates the info registered in the database.

### `POST /getUsrInfo`
Receives an JSON in the format {id} for the id of the client present in the database and returns his info, such as the teams present in his/her account.

### `POST /deleteTeam`
Receives an JSON in the format {id, teamID} in order to delete an specific team from the database.

## Implementation

The implementation is composed of an App.js file, that calls all the other components in the app. The app contains 4 mains components, MyTeams, Top5, Statistics and Configure, where the three first components are present in the main page, and the last one is present in the configuration page.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

