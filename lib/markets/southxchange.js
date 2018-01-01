var request = require('request');

var base_url = 'https://www.southxchange.com/api';

function get_summary(coin, exchange, cb) {
  var req_url = base_url + "/price/" + coin + "/" + exchange;
  request({uri: req_url, json: true}, function (error, response, body) {
    if (error) {
      return cb(error, null);
    } else {
      if (body.message) {
        return cb(body.message, null)
      } else {
        body['last'] = body['Last'];
        return cb (null, body);
      }
    }
  });
}

module.exports = {
  get_data: function(coin, exchange, cb) {
    var error = null;
      get_summary(coin, exchange, function(err, stats) {
          if (err) { error = err; }
          return cb(error, {buys: [], sells: [], chartdata: [], trades: [], stats: stats});
        });
  }
};
