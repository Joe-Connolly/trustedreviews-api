# API Server for Trusted Reviews

See [frontend repo](https://github.com/Joe-Connolly/trustedreviews) for the main README that containes team details and photos. The README below just contains backend related information:

## Architecture

* ExpressJS backend framework
* Mongoose for Object Relational Mapping (ORM)
* MongoDB for database
* Yarn for package management
* PassportJS for authentication

# Setup

* Clone repo
* Navigate to root directory of repo
* To setup PassportJS:
    * Create a new .env file in the root directory
    * In the file create a new variable `AUTH_SECRET` and set it equal to a new string (in doublequotes). This string can be anything, but should be relatively long (30+ characters).
    * This secret will be used to generate Json Web Tokens used to authenticate users. Make sure that `.env` is included in your .gitignore file, so this will not be uploaded to git.
* Run `yarn` to install dependencies
* Run `yarn start` to run the app

## Deployment

* Create a project on Heroku
* Follow Heroku instructions on deploying an app using Heroku git: https://devcenter.heroku.com/articles/git
    * Under the 'settings' tab in your Heroku project, create a new Config Var named `AUTH_SECRET`.
    * Set the value of `AUTH_SECRET` to a string, or use the string you chose for your .env file during setup.
*  Navigate to root directory of repo
*  Install Heroku CLI
* Run `git remote add heroku heroku-git-url`
* Commit changes to your master branch
* Run `git push heroku master`

## Authors

* Joe Connolly
* RJ Yang
* Soren Thompson
* Shreyas Agnihotri

## Acknowledgments
* Tim Tregubov for helping make a great starter pack. 
* Tim and TAs for helping answer our questions.
* The creators of mongoose-voting for making voting on reviews much easier to implement: https://www.npmjs.com/package/mongoose-voting
