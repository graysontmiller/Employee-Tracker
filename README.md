# Node Your Workers: An Employee Tracker

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Technologies](#technologies)
- [Video](#video)

## Description

This application allows a user to keep track of employees of a company based on:
- Auto generated unique identifier (id)
- First name
- Last name
- Department
- Job Title
- Salary
- Manager (null if employee is the manager)


## Installation

1. Clone repository to your desired folder
2. Use command line to download packages: <code>npm i</code>
3. Insert your mysql password in the <code>.env</code> file
4. Login into your mysql using: <code>mysql -u root -p</code>
5. Populate the database and tables with these commands in order:
    - <code>USE staff;</code>
    - <code>SOURCE db/schema.sql;</code> (this is for testing purposes)
    - <code>SOURCE db/seeds.sql;</code> (this is for testing purposes)
6. To start the application type: <code>npm start</code> or <code>node server</code>

## Technologies

- console.table
- dotenv
- Inquirer
- MySQL2
- Node.js

## Video

![Video](assets/video/node-your-workers-video.gif)