const loginRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const Account = require("../models/account");

loginRouter.get("/login", (req, res) => {
  res.render("login");
});

loginRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Account.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid password" });
  }
  return res.json({ user, token: generateToken({ id: user.id }) });
});

module.exports = loginRouter;
