const express = require('express');
const path = require('path');
const app = express();
const port = 9001;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
  res.json({
    'route': 'Sorry this page does not exist!'
  });
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
