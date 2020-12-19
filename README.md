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

- can be scale to microservice architecture easily
- can be used by any other service to authenticate and for authorization
- hosted on heroku platform

## Supported Routes

```

/signup : (method:post) - create user accout

/login : (method:post) - get jwt token and authenticate yourself using the creds (email,password)

/auth : to restrict the user from accessing the resources on route /blogs so send token in authorization header as bearer token


```

