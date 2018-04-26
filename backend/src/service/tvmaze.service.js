const axios = require('axios');

const TVMAZE_URL = 'http://api.tvmaze.com/'

class TvmazeService {

  getSeriesInfo(seriesId) {
    return axios.get(TVMAZE_URL + 'shows/' + seriesId)
      .then(response => response.data);
  }

  getSeriesNextEpisode(seriesId) {
    return axios.get(`${TVMAZE_URL}shows/${seriesId}/episodes`)
      .then(episodes => {
        return episodes.data
          .filter(episode =>
            episode.airstamp > (new Date()).toISOString()
          )[0];
      })
      .catch(console.log);
  }

  searchSeries(titleFragment) {
    return axios.get(`${TVMAZE_URL}search/shows?q=${titleFragment}`)
      .then(response => response.data);
  }
}

module.exports = TvmazeService;
