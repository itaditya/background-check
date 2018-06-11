# background-check

> A GitHub App built with [probot](https://github.com/probot/probot) that peforms a "background check" to identify users who have been toxic in the past, and shares their toxic activity in the maintainer’s repo.

![Demo](assets/demonstration.png?raw=true)

## How to Use

* Go to the [github app](https://github.com/apps/background-check) page.
* Install the github app on your repos and a **maintainers-discussion** private repo.

## FAQ

### 1. How does the bot finds the background?

The bot listens to comments on repos in which the bot is installed. When a new user comments, the bot fetches public comments of this user and run sentiment analyser on them. If 5 or more comments stand out as toxic, then the bot concludes that the user is of hostile background and an issue is opened for this user in **maintainers-discussion** private repo so that the maintainers can review these toxic comments and discuss whether or not they will like to allow this hostile user to participate in their community.

### 2. What happens if the sentiment analysis is incorrect?

In case of **false positives** where the sentiment analysis flags certain comments as toxic while they are not, the issue in **maintainers-discussion** would still be created. As the bot posts the toxic comments in the issue description, the maintainers can then verify the toxicity and then close the issue if they find the sentiment analysis incorrect.

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
* Paste this API key after `PERSPECTIVE_API_KEY` in `.env` file.
* Create a Github App and follow [these](https://probot.github.io/docs/development/#configuring-a-github-app) instructions.

**Do `npm start` to check if github app runs correctly in your dev machine. After this create branch, make changes, run tests, commit the changes and make a PR.**

## Available CLI commands

To make the development of the project faster, these CLI commands are created.

```sh
# Install dependencies
npm install

# Run the bot
npm start

# Run Unit Tests
npm test

# Run sandbox
npm run sandbox -- --sandboxName

Eg - npm run sandbox -- --getCommentsOnIssue
```
