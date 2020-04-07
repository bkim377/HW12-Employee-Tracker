// Require the MySQL, Inquirer, and console.table packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// establish initial connection to MySQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql5021",
  database: "employeesDB"
});

// first prompt upon starting up the application
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  console.log(connection.state);
  initialChoice();
});

function initialChoice() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add departments",
        "Add roles",
        "Add employees",
        "Update employee roles",
        "End application"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View departments":
        //   console.log("View departments ==>");
          viewDepartments();
          break;

        case "View roles":
        //   console.log("View roles ==>");
          viewRoles();
          break;

        case "View employees":
        //   console.log("View roles ==>");
          viewEmployees();
          break;

        case "Add departments":
        //   console.log("Add departments ==>");
          addDepartments();
          break;

        case "Add roles":
        //   console.log("Add roles ==>");
          addRoles();
          break;

        case "Add employees":
        //   console.log("Add employees ==>");
          addEmployees();
          break;

        case "Update employee roles":
        //   console.log("Update employee roles ==>");
          updateEmployeeRoles();
          break;

        case "End application":
          connection.end();
          break;
      }
    });
}

// View departments, roles, employees
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].name);
    }
    console.log("-----------------------------------");
  });
}

function viewAllRoles() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].id +
          " | " +
          res[i].title +
          " | " +
          res[i].salary +
          " | " +
          res[i].department_id
      );
    }
    console.log("-----------------------------------");
  });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].id +
          " | " +
          res[i].first_name +
          " | " +
          res[i].last_name +
          " | " +
          res[i].role_id +
          " | " +
          res[i].manager_id
      );
    }
    console.log("-----------------------------------");
  });
}

// logs the actual query being run
//   console.log(query.sql);
//   connection.end();
