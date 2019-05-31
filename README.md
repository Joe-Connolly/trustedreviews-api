# API Server for Trusted Reviews

See frontend repo for the main README that containes team details and photos. The README below just contains backend related information:

## Architecture

* ExpressJS backend framework
* Mongoose for Object Relational Mapping (ORM)
* MongoDB for database
* Yarn for package management
* PassportJS for authentication

# Setup

* Clone repo
* Navigate to root directory of repo
* Run `yarn` to install dependencies
* Run `yarn start` to run the app

## Deployment

* Create a project on Heroku
* Follow Heroku instructions on deploying an app using Heroku git: https://devcenter.heroku.com/articles/git
    *  Navigate to root directory of repo
    *  Install Heroku CLI
    * Run `git remote add heroku heroku-git-url`
    * commit changes to your master branch
    * Run `git push heroku master`

## Authors

* RJ Yang
* Soren Thompson
* Shreyas Agnihotri
* Joe Connolly

## Acknowledgments
* Tim Tregubov for helping make a great starter pack. 
* Tim and TAs for helping answer our questions.
* The creators of mongoose-voting for making voting on reviews much easier to implement: https://www.npmjs.com/package/mongoose-voting
