const superagent = require("superagent");
const express = require("express");
require("dotenv").config();

const app = express();
const { CLIENT_ID: client_id, CLIENT_SECRET: client_secret } = process.env;
app.get("/", (req, res) => res.status(200).send("Hi server is Live 🚀"));
app.get("/callback", async (req, res) => {
  const { code } = req.query;
  let { body } = await superagent.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id,
      client_secret,
      code,
    }
  );
  res.redirect(`http://localhost:3000/auth/github?token=${body.access_token}`);
});
app.listen(8888, () => {
  console.log(`The server is running at http://localhost:8888`);
});
