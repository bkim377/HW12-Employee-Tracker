// Require the MySQL, Inquirer, and console.table packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

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
    inquirer.prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View departments/roles/employees",
        "Add departments/roles/employees",
        "Update employee roles"
      ]
    })
    .then(function(answer) {
    switch (answer.action) {
        case "View departments/roles/employees":
            // artistSearch();
            console.log("View departments/roles/employees");
            break;
    
          case "Add departments/roles/employees":
            // multiSearch();
            console.log("Add departments/roles/employees");
            break;
    
          case "Update employee roles":
            // rangeSearch();
            console.log("Update employee roles");
            break;
          }
        });
    }
    

// View & add departments, roles, employees
function queryAllDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].name);
      }
      console.log("-----------------------------------");
    });
  }

  function queryAllRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
      }
      console.log("-----------------------------------");
    });
  }
  
  function queryAllEmployees() {
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
      }
      console.log("-----------------------------------");
    });
  }
  
  
  // logs the actual query being run
//   console.log(query.sql);
  connection.end();
