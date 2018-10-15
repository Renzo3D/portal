require("dotenv").config();
const loopback = require("loopback");
const boot = require("loopback-boot");
const loopbackPassport = require("loopback-component-passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const path = require("path");
const cron = require("node-cron");
const app = (module.exports = loopback());
const PassportConfigurator = loopbackPassport.PassportConfigurator;
const passportConfigurator = new PassportConfigurator(app);
const axios = require("axios");

let config = {};
try {
  config = require("../providers.js");
} catch (err) {
  console.trace(err);
  process.exit(1);
}

app.set("views", path.join(__dirname, "./views/pages"));
app.set("view engine", "ejs");

boot(app, __dirname, function(err) {
  if (err) throw err;
});

app.middleware("parse", bodyParser.json());
app.middleware("parse", bodyParser.urlencoded({ extended: true }));
app.middleware("auth", loopback.token({ model: app.models.accessToken }));
app.middleware("session:before", cookieParser(app.get("cookieSecret")));
app.middleware(
  "session",
  session({ secret: "kitty", saveUninitialized: true, resave: true })
);
passportConfigurator.init();

app.use(flash());

passportConfigurator.setupModels({
  userModel: app.models.customUser,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}

var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

app.get("/", function(req, res, next) {
  if (!req.user) {
    return res.render("home-page");
  } else {
    res.redirect("/auth");
  }
});

cron.schedule("0 0 0 * * *", () => {
  const student = app.models.student;
  axios({
    url: `https://www.hackerrank.com/x/api/v3/tests/192596/candidates?limit=100&offset=0`,
    method: "get",
    auth: { username: process.env.HACKERRANK_API, password: "" }
  })
    .then(response => {
      combineStudents(response.data.data);
    })
    .catch(error => console.log(error));
  const combineStudents = scores => {
    for (let i = 0; i < scores.length; i++) {
      const score = scores[i].score;
      const id = scores[i].id;
      student.findOne(
        { where: { email: scores[i].email } },
        (err, studentData) => {
          if (studentData === null) {
          } else {
            studentData.updateAttributes(
              {
                hackerRankScore: score,
                hackerRankId: id,
                hackerRankUpdated: new Date()
              },
              (err, instance) => {
                err && console.log(err);
              }
            );
          }
          if (err) {
            console.log(err);
          }
        }
      );
    }
  };
});

app.get("/api/hackerRank", function(req, res, next) {
  axios({
    url: `https://www.hackerrank.com/x/api/v3/tests/192596/candidates?limit=100&offset=0`,
    auth: { username: process.env.HACKERRANK_API, password: "" }
  })
    .then(response => res.send(response.data.data))
    .catch(err => console.log(err));
});

app.get("/auth/logout", function(req, res, next) {
  app.models.accessToken
    .remove({ userId: req.user.id })
    .then(token => console.log("DELETED: ", token)); //Remove token from database
  res.clearCookie("access_token"); //clear cookie
  res.clearCookie("userId"); //clear cookie
  req.logout(); //Log out
  res.redirect("/"); //Redirect to landing page
});

app.post("/api/filteredStudents", function(req, res, next) {
  var studentqueries = app.models.student;
  var fitleredRelocate = false;
  var filteredrole = "Business Analyst";
  studentqueries.find(
    {
      where: { desiredRole: filteredrole, openToRelocate: fitleredRelocate }
    },
    function(err, studentData) {
      if (err) {
        console.log(err);
      }
      if (studentData) {
        res.json(studentData);
      }
    }
  );
});

app.get("/auth*", ensureLoggedIn("/login"), function(req, res, next) {
  const { userType, id } = req.user;
  if (!userType) {
    return res.redirect("/signup");
  }
  //IF THERES NO ACCESSTOKEN SET, GO FIND THE ACCESSTOKEN
  if (!req.accessToken) {
    app.models.accessToken
      .findOne({ userId: req.user.id })
      .then(token => {
        req.accessToken = token;
        console.log("TOKEN: ", token);
        res.cookie("access_token", token.id, {
          signed: true,
          maxAge: 1000 * token.ttl
        });
        res.cookie("userId", token.userId, {
          signed: true,
          maxAge: 1000 * token.ttl
        });
      })
      .then(() => res.redirect("/auth/"));
  } else {
    //IF THERE IS AN ACCESSTOKEN, GO DO THIS GARBAGE CODE
    const student = app.models.student;
    const employee = app.models.employee;
    const admin = app.models.admin;
    var specificUserModel = "";
    switch (userType) {
      case "STUDENT":
        specificUserModel = student;
        break;
      case "ADMIN":
        specificUserModel = admin;
        break;
      case "EMPLOYEE":
        specificUserModel = employee;
        break;
      default:
        req.flash("error", "No user type sent");
        break;
    }
    specificUserModel.findOne(
      {
        where: { userId: id }
      },
      function(err, currentUser) {
        if (err) {
          req.flash("error", err.message);
          return res.render("signup");
        }
        currentUser.updateAttribute(
          "timeStamp",
          new Date(),
          (err, instance) => {
            err && console.log(err);
          }
        );

        const { __data } = currentUser;
        __data.userType = userType;
        const user = __data;
        user.accessToken = req.accessToken;

        if (userType === "STUDENT") {
          const skill = app.models.skill;
          skill.find(
            {
              where: { studentId: currentUser.id }
            },
            function(err, skills) {
              if (err) {
                req.flash("error", err.message);
                return res.render("signup");
              }
              user.skills = skills;
              return res.render("index", {
                user
              });
            }
          );
        } else {
          return res.render("index", {
            user
          });
        }
      }
    );
  }
});

app.get("/complete_signup", ensureLoggedIn("/login"), function(req, res, next) {
  res.render("complete-signup");
});

app.post("/complete_signup", function(req, res, next) {
  const { id } = req.user;
  const { userType, firstName, lastName } = req.body;
  const user = app.models.customUser;
  const student = app.models.student;
  const employee = app.models.employee;
  const admin = app.models.admin;
  var specificUserModel = "";
  switch (userType) {
    case "STUDENT":
      specificUserModel = student;
      break;
    case "ADMIN":
      specificUserModel = admin;
      break;
    case "EMPLOYEE":
      specificUserModel = employee;
      break;
    default:
      req.flash("error", "No user type sent");
      break;
  }
  user.updateAll({ id }, { userType }, function(err) {
    if (err) {
      req.flash("error", err.message);
      return res.render("complete_signup");
    }
  });
  specificUserModel.create(
    {
      firstName,
      lastName,
      userId: id,
      email
    },
    function(err) {
      if (err) {
        req.flash("error", err.message);
        return res.render("complete_signup");
      }
    }
  );
  return res.redirect("/login");
});

app.get("/signup", function(req, res, next) {
  res.render("signup");
});

app.post("/signup", function(req, res, next) {
  const { email, firstName, lastName, password } = req.body;
  const newUser = { email, password, userType: "STUDENT" };
  const newStudent = {
    firstName,
    lastName,
    email,
    userType: "STUDENT",
    enabled: true,
    visible: false
  };
  const user = app.models.customUser;
  user.create(newUser, function(err, currentUser) {
    if (err) {
      req.flash("error", err.message);
      return res.render("signup");
    } else {
      currentUser.student.create(newStudent, function(err) {
        if (err) {
          req.flash("error", err.message);
          return res.render("signup");
        }
      });
      req.login(currentUser, function(err) {
        if (err) {
          req.flash("error", err.message);
          return res.render("signup");
        }
        return res.redirect("/auth");
      });
    }
  });
});

app.get("/employer_signup", function(req, res, next) {
  res.render("employer-signup");
});

app.post("/employer_signup", function(req, res, next) {
  const { email, firstName, lastName, password, companyName } = req.body;
  const newUser = { email, password, userType: "EMPLOYEE" };
  const newEmployee = {
    firstName,
    lastName,
    email,
    userType: "EMPLOYEE",
    enabled: true,
    companyName
  };
  const user = app.models.customUser;
  user.create(newUser, function(err, currentUser) {
    if (err) {
      req.flash("error", err.message);
      return res.render("employer-signup");
    } else {
      currentUser.employee.create(newEmployee, function(err) {
        if (err) {
          req.flash("error", err.message);
          return res.render("employer-signup");
        }
      });
      req.login(currentUser, function(err) {
        if (err) {
          req.flash("error", err.message);
          return res.render("employer-signup");
        }
        return res.redirect("/login");
      });
    }
  });
});

app.get("/login", function(req, res, next) {
  res.render("login");
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit("started");
    var baseUrl = app.get("url").replace(/\/$/, "");
    console.log("Web server listening at: %s", baseUrl);
    if (app.get("loopback-component-explorer")) {
      var explorerPath = app.get("loopback-component-explorer").mountPath;
      console.log("Browse your REST API at %s%s", baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
