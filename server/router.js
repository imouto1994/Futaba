const express = require("express");
const request = require("superagent");
const get = require("lodash/fp/get");

const router = express.Router();

function getMarketTicker(req, res) {
  const { marketId } = req.params;
  request
    .get(
      `https://bittrex.com/api/v1.1/public/getmarketsummary?market=${marketId}`,
    )
    .then(responseData => {
      const summary = get("body.result.0", responseData);
      res.status(200).send(summary);
    });
}

router.get("/market/:marketId", getMarketTicker);

module.exports = router;
