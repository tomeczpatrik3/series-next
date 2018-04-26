const express = require('express');

const TvmazeService = require('./service/tvmaze.service');
const dbService = require('./service/db.service');

const mySeriesRouter = express.Router();

mySeriesRouter
  .delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    dbService.getInformationByName(
      req.session.name
    ).then((userInfo) => {
      userInfo.mySeries = userInfo.mySeries
        .filter(seriesId => seriesId !== id);
      return dbService.saveInfo(userInfo);
    }).then(() => {
      res.sendStatus(200);
      next();
    });
  })
  .post('/', (req, res, next) => {
    const { id } = req.body;
    dbService.getInformationByName(
      req.session.name
    ).then((userInfo) => {
      // TODO létezik-e ilyen sorozat?
      userInfo.mySeries.push(id);
      return dbService.saveInfo(userInfo);
    }).then(() => {
      res.sendStatus(200);
      next();
    });
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    const tvmazeService = new TvmazeService();
    tvmazeService.getSeriesNextEpisode(id)
      .then(
        (episodeInfo) => res.send(episodeInfo)
      )
      .then(
        () => next()
      );
  })
  .get('/', (req, res, next) => {
    const tvmazeService = new TvmazeService();
    dbService.getInformationByName(
      req.session.name
    ).then(({ mySeries }) => {
      const nextEpisodePromises = mySeries
        .map((seriesId) => tvmazeService.getSeriesNextEpisode(seriesId));
      return Promise.all(nextEpisodePromises);
    }).then(
      (nextEpisodes) => res.send(nextEpisodes)
    )
    .then(
      () => next()
    );
  });

module.exports = mySeriesRouter;