const request = require("superagent");
const mapValues = require("lodash/mapValues");
const path = require("path");
const fs = require("fs");

/**
 * Ensure the hiearchy of parent directories for given path to exist
 * @param {String} filePath
 */
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function writeFile(filePath, content) {
  // Ensure availablity of hiearchy of directories
  ensureDirectoryExistence(filePath);

  // Write file
  return new Promise((resolve, reject) => {
    fs.writeFile(
      filePath,
      content,
      err => (err != null ? reject(err) : resolve()), // eslint-disable-line no-confusing-arrow
    );
  });
}

request.get("https://www.cryptocompare.com/api/data/coinlist/").then(res => {
  const { Data: coinsMap } = res.body;
  const coinIconsMap = mapValues(coinsMap, coinInfo => coinInfo.ImageUrl);
  writeFile(
    path.resolve(__dirname, "../config/coins.js"),
    `module.exports = ${JSON.stringify(coinIconsMap, null, 2)}`,
  );
});
