const express = require("express");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const WebpackConfig = require("./webpack.config");

require("./server");

const app = express();
const compiler = webpack(WebpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/__build__/",
    stats: {
      colors: true,
      chunks: false,
    },
  })
);

app.use(webpackHotMiddleware(compiler));

app.use(
  express.static(__dirname, {
    setHeaders(res) {
      res.cookie("XSRF-TOKEN-D", "1234abc");
    },
  })
);

app.use(bodyParser.json());
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get("/simple/get", function (req, res) {
  res.json({
    msg: "hello world!",
  });
});

app.use(router);

const port = process.env.PORT || 10033;
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});