const fetch = require("node-fetch");
const fs = require("fs");

const downloadFile = url => {
  const writeStream = fs.createWriteStream("./db.json");

  return fetch(url, {
    method: "get",
    responseType: "stream"
  })
    .then(
      response => response.body.pipe(writeStream),
      writeStream.on("finish", () => console.log("finish"))
    )
    .catch(error => {
      writeStream.on("error", () => console.log(error));
    });
};
module.exports = downloadFile;
