const express = require('express');
const bodyparser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/vancouver-commute.tech/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/vancouver-commute.tech/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const routes = require('./routes');
const logger = require('./config/winstonLogger');
const apiLogger = require('./config/expressWinstonLogger');

// const app = ;
const app = https.createServer(credentials, express());
const port = 443;

app.use(helmet());
app.use(compression());

app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyparser.json({ limit: '10mb' }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(apiLogger);

// All UI static files are served from "public" folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(routes);

app.get('*', (req, res) => {
  res.render('index');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err.message);
  if (err.output) {
    res.status(err.output.statusCode).send(err.message);
  } else {
    res.status(500).send(err);
  }
});

app.listen(port, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`App is running on port: ${port}`);
  }
});
