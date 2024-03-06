
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let students = [];


app.get('/', (req, res) => {
    res.render("index");
});

app.get('/view', (req, res) => {
    res.render("view", { students });
});


app.post("/studentForm", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        contact: req.body.contact,
    };
    students.push(newStudent);
    res.redirect("/view");
});

app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    students = students.filter(student => student.id != id);
    res.redirect("/view");
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const student = students.find(student => student.id == id);
    res.render("edit", { student });
});


app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    const updatedStudent = {
        id: parseInt(id),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        contact: req.body.contact,
    };
    students = students.map(student => {
        if (student.id == id) {
            return updatedStudent;
        } else {
            return student;
        }
    });
    res.redirect("/view");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
