# Node Your Workers: An Employee Tracker

## Description

This application allows the user to keep track of employees of a company based on:
- Auto generated unique identifier (id)
- First name
- Last name
- Department
- Job Title
- Salary
- Manager (null if employee is the manager)


## Installation

1. Clone repository to your desired folder.
2. Use command line to download packages: <code>npm i</code>.
3. Insert your mysql password in the <code>.env</code> file.
    - <code>DB_NAME='staff'
DB_USER='USER'
DB_PW='PASSWORD'</code>
4. Login into your mysql using: <code>mysql -u root -p</code>
5. Populate the database and tables with the commands found within the db folder.
    - Optionally use the commands within the seeds.sql file to seed the db for viewing purposes.
6. Quit out of the mysql shell and use command <code>npm start</code> to start the application.

## Technologies

- console.table
- dotenv
- Inquirer
- MySQL2
- Node.js

## Video 

https://photos.app.goo.gl/tbH5XBGy9LzSUmug8

https://user-images.githubusercontent.com/92832005/163878781-e069869e-04c0-476d-879b-8363af92cfc9.mp4
