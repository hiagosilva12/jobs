const express = require("express");
const accountRouter = express.Router();
const Account = require("../models/account");
const bcrypt = require("bcryptjs");

accountRouter.get("/create-account", (req, res) => {
  res.render("createAccount");
});

accountRouter.post("/create-account", async (req, res) => {
  const { name, surname, role, companyname, cpf, email, password } = req.body;

  Account.create({
    name,
    surname,
    role,
    companyname,
    cpf,
    email,
    password: await bcrypt.hash(password, 8),
  });
  res.redirect("/login");
});

module.exports = accountRouter;
