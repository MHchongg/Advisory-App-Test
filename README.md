# Advisory App Test
---

### Install Dependencies
- Open your terminal and navigate to the project's root directory.
- Run the following command to install the necessary dependencies: `npm install`

### Configure config/config.json (development only)
```
{
  "development": {
    "username": YOUR_USERNAME,
    "password": YOUR_PASSWORD,
    "database": YOUR_DATABASE,
    "host": YOUR_HOST,
    "port": YOUR_PORT,
    "dialect": "mysql"
  },
}
```

### Create database on MySQL
- based on the name you set in config/config.json

### Run migrations and seed the database
- `npx sequelize-cli db:migrate`
- `npx sequelize-cli db:seed:all`

### Create and configure .env file
```
JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY
```

### Users' email and password (You can also get them in seeders/1-users.js)
- email: admin@gmail.com, password: adminPassword, role_type: a
- email: test40@gmail.com, password: test1234, role_type: u
- email: test41@gmail.com password: test5678, role_type: u

### Run the application
- `node index.js`

---

## The application should be accessible via the local server (http://127.0.0.1:8000/).