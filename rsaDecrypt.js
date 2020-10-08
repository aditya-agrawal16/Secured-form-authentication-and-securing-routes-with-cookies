const rsaWrapper = require("./components/rsa-wrapper");

const private = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDl6oVVlVlY+1ys
RL2cHHXBJMJs+I688FVheRiQypcXs1OVIyMbkKxdwFHS3RnwDTi/CM1iU48S7E5u
dL6NiXBGntHZHBxaYgLdBFEWvKLrkhoFBNsJdrttnKmsa3iTsjI7quMWv1BLKzXQ
9y7AQ1fjri+W9dRILbKu39yIv5/sgSBLd/94n0b2vCYUjnfF5vnF40P8PQLVr17L
G1PN3PdYpJfJOLVI3/9alzuln+yspYKZHbu+6IG6VDTcAcM382Uxq6WLnbcGx31j
fmt0FtT2Ig8c3FXx88j0OCCrY6z1MFWc6tbC+Sr8W0BQTXKWULveZ+ivpz6sCn3v
Ai2XKeuVAgMBAAECggEAdSU5KpIeJChu35dmxNP7a52/Mqayk7IgzrlUuvF+aqUE
QUjV6oWcTWhgSIA/ZwBVmYBypVbN32Znz//L13HfsxvY8DZSe/rUWqiIaH1UxZJ7
j3MZ54iHlyHrkd5wYVC6J4y6iCySTLqHgSFwwKWPcoKd3N0EfIJMOK33P/XjFiz9
bgeM+hk64NVL4gXPpuwHVt1GXFRlhcQHu3gGmelzC1ape6Jf4M0nKVdI0Hc5GhEQ
bIjskU2m1Ze//bU57sNngFoIVNpVyWv6fp+AahdLbb7lia+i6hCxKkg88jP83Ud/
iE/j1ktzcziCXvTiOWVF8l0U7s2ywQkl5rUTIrMWAQKBgQD3+NeewlOYkFD+oEA2
o1U4nN6LR6Q00suOdjwriLTvUw/cb6h0juWnb4mk9Kjc6Ha6AfyeYp12b4rdTwYj
aq4TTTzysBkmg+vIJzmdnrHsU4BaJJrV2aWMKI1dhxO11Wytua6MOnXoqjHe9C6k
l/5vM30rkf77Vfls/19b+K8nHQKBgQDtXAiO0jcofxKdpXsi/BX/8Su//d4Yg15f
2jWeoEuglEmf2wGBl2jNgNZ+9SqB1YXq1QDIxDvk35bC9m8dgIDi+aQ8fsNo3KKE
Ng8VpCWSXR/nMjx/SNpbQTrWUe+uX+JYpehrHU9MJO33z7yqEOiw0191gvUpV1Mh
AZVfe1mU2QKBgFw5SkgbUeft1JG+m+M2P928SfBXBrU2qMolIx+1ykUwCTgctvQS
qUrqarDU5XCzbGSllIR7fMCtn2HLoCbP6En5ce94mwH+ElTwcbczbEzOiW/9KTDb
r3w/IMRmFmiMJc0+v7Ibk/qiQcX/3tEMTm6hIa5wr/pd8VQebiLQjKPpAoGAUPBt
SqaMgJa0dmWTk956cgh/brzXG2zQpcb3OdxXba6jXIuF+/bxmgIxIqHfmN6DCA0S
c2PXOLi15E28nkbPrJaMVsSzRfLWyFbW1f5fgYWX93K+BnmFXFDmC2dtX/z6ZlhM
5RndjI2bSEHih+u0LXgmuR+rEinhAwRTN3gMmCECgYAseCXW53pQP8OFmuVi9U63
+L33yICeS6rSrvkiroH8D9CidofGJFRlm3l3zEPESCgRPaOwnRy+CPJFehIoSMCT
jSAqjNdmNqYTSjeD95s0vLnhMhDlRA4ps7dYyCQCP36Ahrv764ul6l2ULWUH/jrV
Sw1Gh3mjPk6fgbBw9+MZXg==
-----END PRIVATE KEY-----`;

module.exports = {
  decrypt: (req, res, next) => {
    const data = req.body.payload;
    try {
      const decoded_ = JSON.parse(rsaWrapper.decrypt(private, data));
      req.body = decoded_;
    } catch (err) {
      console.log(err);
      return res.status(503).send("error");
    }

    next();
  },
};
