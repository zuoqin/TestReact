import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import colors from 'colors';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
require('./config/routes')(app);

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    /* eslint-disable no-console */

    console.log('Listening server....'.green);
    open(`http://localhost:${port}`);
  }
});
