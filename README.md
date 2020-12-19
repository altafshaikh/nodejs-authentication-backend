# Authentication Backend

An authentication and authorization backend server build using Express in NodeJS and uses MongoDB to store user dabtabase.

## Getting Started

- [Check the blog frontend application uses this auth backend](https://github.com/ialtafshaikh/blog-frontend)
- [Check the todo frontend application uses this auth backend](https://github.com/ialtafshaikh/todo-app-frontend)

## Features

- user can signup
- user can login and get their JWT token to authorized themselves
- verify JWT token (authozrization)
- uses Adapter pattern to switched between storage and database
- build on MVC architecture


## Additional Features

- used cloud storage cloudinary to upload and store the file
- used multer to accept multipart data
- dataURI to convert the buffer into readable stream support by clodinary
- authentication is done by the auth server and communication is done using axios api calls
- hosted in heroku platform
