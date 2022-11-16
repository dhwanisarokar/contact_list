const express = require("express");
const path = require("path");
const port = 5000;

const db = require("./config/mongoose");

const Contact = require("./models/contacts");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

var contactList = [
  {
    name: "Dhwani",
    phone: 8857030056,
  },
  {
    name: "Alka",
    phone: 8600197138,
  },
  {
    name: "Anil",
    phone: 9860264070,
  },
];

app.get("/", (req, res) => {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("error in fetching contacts from db.");
      return;
    }

    return res.render("home", {
      title: "Contact List",
      contact_list: contacts,
    });
  });
});

app.get("/practice", (req, res) => {
  return res.render("practice", {
    title: "Playing around",
  });
});

// Populating the data.
app.post("/create-contact", (req, res) => {
  // contactList.push({
  //     name: req.body.name,
  //     phone: req.body.phone
  // });

  // contactList.push(req.body);

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("Error in creating Contact!");
        return;
      }
      // console.log('****', newContact);
      return res.redirect("back");
    }
  );

  // return res.redirect('/');
});

//deleting contact list
app.get("/delete-contact", function (req, res) {
  //get the id from query in the url.
  let id = req.query.id;

  //find the contact in the database and delete.
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting an object from database.");
      return;
    }

    return res.redirect("back");
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error in running server", err);
  }
  console.log("My Express Server is running on port: ", port);
});
