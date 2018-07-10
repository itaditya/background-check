# background-check

> A GitHub App built with [probot](https://github.com/probot/probot) that peforms a "background check" to identify users who have been toxic in the past, and shares their toxic activity in the maintainer’s discussion repo.

[![Inline docs](http://inch-ci.org/github/probot/background-check.svg?branch=master)](http://inch-ci.org/github/probot/background-check) ![App Installations](https://img.shields.io/badge/dynamic/json.svg?label=Installations&url=https://probot-background-check.herokuapp.com/probot/stats&query=$.installations&colorB=2196F3&style=flat-green)

![Demo](assets/demonstration.png?raw=true)

## How to Use

* Go to the [github app](https://github.com/apps/background-check) page.
* Install the github app on your repos.
* You'll get an invitation to a private repo, accept it and add other maintainers to the repo as well.

## FAQ

### 1. How does the bot finds the background?

The bot listens to comments on repos in which the bot is installed. When a new user comments, the bot fetches public comments of this user and run sentiment analyser on them. If 5 or more comments stand out as toxic, then the bot concludes that the user is of hostile background and an issue is opened for this user in **probot-background-check/{your-name}-discussions** private repo so that the maintainers can review these toxic comments and discuss whether or not they will like to allow this hostile user to participate in their community.

### 2. What happens if the sentiment analysis is incorrect?

In case of **false positives** where the sentiment analysis flags certain comments as toxic while they are not, the discussion issue would still be created. As the bot posts the toxic comments in the issue description, the maintainers can then verify the toxicity and then close the issue if they find the sentiment analysis incorrect.

### 3. Why does the app maintain a separate org for discussions?

The discussion about a user who has been hostile in the past must ke kept private, so that only maintainers can see it. Because not every account (individual/org) has access to private repo, the app instead uses it's own org. Whenver the app is installed, a private repo for the maintainer's account gets created in the org and the installer is added as collaborator. This way discussions can be held privately.

## How To Contribute

### 1. Setup project in your development machine

* Fork this repo.
* Clone the forked repo in your development machine
* `cd` into the repo directory, `cd background-check` probably.
* Run `npm i` to setup project.

### 2. Setup Environment
* Run `cp .env.example .env`.
* Open `.env` file.
* Generate [API key](https://github.com/conversationai/perspectiveapi/blob/master/quickstart.md) for Perspective API.
* Paste this API key against `PERSPECTIVE_API_KEY` in `.env` file.
* Create an org for the app.
* Create a personal access token and paste that against `GITHUB_ACCESS_TOKEN` in `.env` file.
* Create a Github App and follow [these](https://probot.github.io/docs/development/#configuring-a-github-app) instructions.

**Do `npm start` to check if github app runs correctly in your dev machine. After this create branch, make changes, run tests, commit the changes and make a PR.**

## Common CLI commands

To make the development of the project faster, these CLI commands are created.

```sh
# Install dependencies
npm install

# Run the bot
npm start

# Run bot in dev mode which watches files for changes
npm run dev

# Run Unit Tests
npm test

# Run Unit Tests in watch mode
npm run test:watch

# Run linter and fix the issues
npm run lint

# Serve documentation locally
npm run docs:serve

# Run sandbox
npm run sandbox -- --sandboxName

Eg - npm run sandbox -- --getCommentsOnIssue
```
