const express = require('express');
const chalk = require('chalk');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('knex');

try {
  require('./load_env');
  const app = express();

  const api = require('./routes');

  const knexPg = new knex({
    client: 'mysql',
    connection: {
      port: process.env.MYSQL_PORT,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  });

  const port = process.env.SERVER_PORT || 3031;

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    helmet(),
    cors({ origin: true, credentials: true }),
    session({
      store: new KnexSessionStore({
        knex: knexPg,
        tablename: process.env.MYSQL_SESSION_TABLE,
      }),
      secret: process.env.SESSION_SECRET,
      rolling: true,
      resave: false,
      saveUninitialized: false,
      name: 'sessionId',
      cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  app.get('/', (req, res) => {
    res.send('Server is Running');
  });

  app.use('/', api);

  http.createServer(app).listen(port, () => {
    console.log(chalk.green(`Server started on port ${port}`));
  });
} catch (err) {
  console.log(err);
}
