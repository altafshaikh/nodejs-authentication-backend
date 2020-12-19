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

## Downloading and Running this Project Locally

1. clone the repository
```
git clone https://github.com/ialtafshaikh/authentication-backend.git
```
2. add a ``.env`` file inside the root folder

```
PORT=3001
JWT_SECRET=any random string
LOCAL_DB_URL=your local mongo url
DATABASE_URL=your_atlas_db_url(keep this empty is ur not provoding any url)
DEBUG=true   // set true to use local db and false to use atlas
STORAGE=mongodb  // to switch file storage or mongodb database (mongodb | file)
```

Sample for local
```
PORT=3001
JWT_SECRET=RawSshCaaafuiokld
LOCAL_DB_URL=mongodb://127.0.0.1:27017/auth
DATABASE_URL=
DEBUG=true  // set true to use local db and false to use atlas
STORAGE=mongodb
```

## Supported Routes

```

/signup : (method:post) - create user accout

/login : (method:post) - get jwt token and authenticate yourself using the creds (email,password)

/auth : to restrict the user from accessing the resources on route /blogs so send token in authorization header as bearer token


```

## Deployment

To Host the Project I had used **Heroku Platform**. 
To learn more [refer this gist](https://gist.github.com/ialtafshaikh/8336df5d417109b12c46bd20ccda4e17)

## Live Demo of this Project

[hosted backend server](https://node-authentication-backend.herokuapp.com/)

## References

- [mongoose quick start](https://mongoosejs.com/docs/index.html)
- [mongoDB documentation reference](https://docs.mongodb.com/manual/introduction/)
- [uniquid to generate unique ids](https://www.npmjs.com/package/uniqid)
- [npm express](https://www.npmjs.com/package/express)
- [CORS module to talk between cross-origin resources](https://www.npmjs.com/package/cors)
- [jwt intoduction](https://jwt.io/introduction/)
- [Adapter Design Pattern](https://www.youtube.com/watch?v=2PKQtcJjYvc)


## Author

* **Altaf Shaikh** - *work by* - [ialtafshaikh](https://github.com/ialtafshaikh)

![altaf shaikh](https://raw.githubusercontent.com/ialtafshaikh/static-files/master/coollogo_com-327551664.png)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

