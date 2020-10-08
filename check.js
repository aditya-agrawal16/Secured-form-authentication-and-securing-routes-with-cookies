const path = require("path");
const rsaWrapper = {};
const fs = require("fs");
const NodeRSA = require("node-rsa");
const crypto = require("crypto");
// open and closed keys generation method
const generate = (direction) => {
  let key = new NodeRSA();
  // 2048 — key length, 65537 open exponent
  key.generateKeyPair(2048, 65537);
  //save keys as pem line in pkcs8
  fs.writeFileSync(
    path.resolve(__dirname, "private.pem"),
    key.exportKey("pkcs8-private-pem")
  );
  fs.writeFileSync(
    path.resolve(__dirname, "public.pem"),
    key.exportKey("pkcs8-public-pem")
  );
  return true;
};
generate();
