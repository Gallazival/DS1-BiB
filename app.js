const express = require('express')

const helpers = require("./helpers/helpers");

const path = require('path')
const bodyParser = require('body-parser');
const app = express();
// added at 08/14/23
const flash = require('express-flash');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.set("trust proxy", 1);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto", maxAge: 600000 },
  })
);
app.use(express.static(__dirname + '/public'))

const appRoutes = require("./routes/approutes")

// handlebars configuration
const handlebars = require("express-handlebars")
const handlebars_mod = require("handlebars")

const { allowInsecurePrototypeAccess } = require ("@handlebars/allow-prototype-access")

app.engine('handlebars', handlebars.engine({ 
	defaultLayout: false,
	handlebars: allowInsecurePrototypeAccess(handlebars_mod),
  helpers: helpers
}));


sequelize
  .sync()
  .then(() => {
    console.log("Database synced sucessfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// view settings
app.set('views', path.join("./views"))
app.set('view engine','handlebars')
// middlewere to treat flash messages

app.use('/users', (req, res, next) => {
	console.log('will run before users route');
	next();
});
app.use(flash());
app.use(appRoutes)

app.listen(3000, () => {
	console.log('app is running');
});

app.get('/');
