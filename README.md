# Treehouse FSJS Techdegree
### Project 5: Public API Requests
Author - Hans Steffens

## Project Overview
This project is about to build an app for a fictional company called Awesome Startup, a distributed company with remote employees working all over the world. The company needs a smart way for employees to share contact information with each other.

## Features

This app uses the Random User Generator API (https://randomuser.me/) to grab information for 12 random “employees,” and use that data to build a prototype for an Awesome Startup employee directory.

The app will request a JSON object from the API and parse the data so that 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee’s image or name will open a modal window with more detailed information, such as the employee’s birthday and address.

## Project Style changes details (`style.css`):

- The `background` property value for the `body` selector was changed to: `#e7f0f6` on line `19`.
- A `box-shadow` property was applied to the `.card` selector on line `93` to add shadow effects around the card elements.
- Several psuedo-elements related to the `input[type="search"]` selector were set to `display:none` in order to remove the `X` from the search box. The `X` is a built-in feature that comes with chrome and IE for input type = "Search". The changes can be found on line `262` onwards.