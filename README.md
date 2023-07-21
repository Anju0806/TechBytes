# TechBytes
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

The Tech Bytes is a dynamic and user-friendly CMS-style website designed specifically for developers. It provides a platform for developers to publish their blog posts, share their thoughts, and engage in meaningful discussions within the tech community.

## Description

This project utilizes MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents

 - Installation
 - Usage
 - TechBytes features
 - License
 - The URL of the deployed application(Heroku)
 - Contributing
 - Screenshots
 - Questions

## Installation

To install the TechBytes application, please follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal and navigate to the project's root directory.
3. Run the command npm install to install the required dependencies.
4. If you want to populate data into database for testing - Run the command: source db/schema.sql;
and then npm run seed
5. Run the command node server.js to start the application
6. Open Heroku to test the application.

## Usage

1. To start using the TechBytes application, please follow these steps:
2. Edit the .env file by adding your DB_USER and DB_PASSWORD.
3. Navigate to the project's root directory and Open the integrated terminal with server.
4. Run the command node server.js to start the application.

## TechBytes features
TechBytes provides the following features:

1. A homepage in http://localhost:3001/ ,which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard. 

2. The option to log in/signup and log out.

3. When clicked on an existing blog post,presented with the post title, contents, post creator’s username, and date created for that post, comments and with the option to leave a comment.

3. A user can add a post or comment once logged in, and can leave only one comment to a post.

4. A logged in user can see existing posts in the dashboard, and can delete or update any post.

5. When idle on the site for more than a minute,will have to login again to add blogs or comments.

## License

This project is licensed under the MIT .

## The URL of the deployed application(Heroku)


## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your contribution.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request explaining your changes.

## Screenshots



## Questions
If you have any questions about the repo, please open an issue or contact me at anjualfino@gmail.com. 
