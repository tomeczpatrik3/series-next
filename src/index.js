const express = require('express');
const session = require('express-session');

const TvmazeService = require('./service/tvmaze.service');
const dbService = require('./service/db.service');
const mySeriesRouter = require('./my-series');

const PORT = 3000;
const app = express();

app.use((req, res, next) => {
  res.setHeader('X-Received-At', new Date().toDateString());
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());
app.use(session({
  secret: 'alma fa',
  resave: false,
  saveUninitialized: false,
}));

app.post('/login', (req, res, next) => {
  req.session.name = req.body.name;
  dbService.getInformationByName(req.body.name)
    .then((doc) => {
      if (doc) {
        return;
      } else {
        dbService.saveInfo({ name: req.body.name, mySeries: [] })
      }
    })
    .then(
      () => {
        req.session.save(
          () => {
            res.sendStatus(200);
            next();
          }
        );
      }
    );
});

app.get('/series/:titleFragment', (req, res, next) => {
  const titleFragment = req.params.titleFragment;
  const tvmazeService = new TvmazeService();
  tvmazeService.searchSeries(titleFragment)
    .then(
      (series) => res.send(series)
    )
    .then(
      () => next()
    );
});

app.use('/my-series', (req, res, next) => {
  if (req.session.name) {
    next();
  } else {
    res.sendStatus(401);
  }
}, mySeriesRouter);

app.listen(PORT, () => {
  console.log(`App started on port: ${PORT}`);
});
