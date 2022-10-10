const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const User = require("../models/userAdmin");
// routers

// detalhe da vaga
router.get("/view/:id", (req, res) =>
  Job.findOne({
    where: { id: req.params.id },
  })
    .then((job) => {
      res.render("view", {
        job,
      });
    })
    .catch((err) => console.log(err))
);

// form da rota de envio
router.get("/add", (req, res) => {
  res.render("add");
});

// add job via post
router.post("/add", (req, res) => {
  const { title, salary, company, description, email, new_job } = req.body;

  // insert
  Job.create({
    title,
    salary,
    company,
    description,
    email,
    new_job,
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// rota de delete
router.get("/delete/:id", (req, res) => {
  Job.destroy({
    where: { id: req.params.id },
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
  if (password !== "admin") {
    return res.status(400).json({ error: "Password invalid" });
  }
  res.redirect("/");
});

module.exports = router;
