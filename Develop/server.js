

const express = require('express');
const path = require('path');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
//const { Post, Comment, User } = require('../../models');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({
  extname: 'hbs',
});

const app = express();
const PORT = process.env.PORT || 3001;

// Helper registration
const Handlebars = require('handlebars');
Handlebars.registerHelper('formatDate', function(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening @ http://localhost:' + PORT));
});
