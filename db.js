//var fs = require('file-system');
const fs = require('fs');
const jsonFile = "./db/db.txt";

export const readJSON = () => {
  let rawdata = fs.readFileSync(jsonFile);
  return JSON.parse(rawdata);
};
