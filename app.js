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

// View current departments
function viewDepartments() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res);
    initialChoice();
  });
}
// View current roles
function viewRoles() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    console.table(res);
    initialChoice();
  });
}
// View current employees
function viewEmployees() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    initialChoice();
  });
}
// =========================================================================================
// Add new department
function addDepartments() {
  inquirer.prompt(
      {
        type: "input",
        message: "What department do you want to add?",
        name: "newDepartment"
      }
  ).then(function(answer){
      connection.query("INSERT INTO department SET ?",
      {name: answer.newDepartment}, function(err){
          if (err) throw err;
          console.log("New Department added to table!");
          initialChoice();
      })
  })
};
// Add new roles
function addRoles() {
    let department_ids = [];
    connection.query("SELECT department_id FROM role", function(err, res) {
        if(err) throw err;
        for (let i = 0; i < res.length; i++){
            department_ids.push({department_id: res[i].department_id});
        }
    })

    inquirer.prompt([
        {
          type: "input",
          message: "What role do you want to add?",
          name: "newRole"
        },
        {
          type: "input",
          message: "What is the role's salary?",
          name: "newSalary"
        },
        {
          type: "list",
          message: "What is the role's department ID #?",
          name: "newDept",
          choices: department_ids
        }
    ]
    ).then(function(answer){
        connection.query("INSERT INTO role SET ?",
        {
         title: answer.newRole,
         salary: answer.newSalary,
         department_id: answer.newDept
        }, function(err){
            if (err) throw err;
            console.log("New Role added to table!");
            initialChoice();
        })
    })
  };

// Add new employees
function addEmployees() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        },
        {
            type: "input",
            message: "What is the employee's role ID #?",
            name: "role_id"
        },
        {
            type: "input",
            message: "What is their manager's id #?",
            name: "manager_id",
            default: 0
        }
    ]).then(function(answer){
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role_id,
            manager_id: answer.manager_id
        }, function(err){
            if (err) throw err;
            console.log("New Employee added to table!");
            initialChoice();
        })
    })
}

function updateEmployeeRoles(){
    connection.query("SELECT first_name, last_name, id FROM employee",
    function(err, res){
        if (err) throw err;
        let employee = res.map(employee => ({
            name: employee.first_name + " " + employee.last_name, value: employee.id
        }))

        inquirer.prompt ([
            {
                type: "list",
                message: "Which employee's role do you want to change?",
                name: "employeeName",
                choices: employee
            },
            {
                type: "input",
                message: "What is the employee's new role?",
                name: "newRole"
            },
            {
                type: "input",
                message: "What is the employee's new salary amount?",
                name: "newSalary"
            }
        ]).then(function(answer){
            connection.query("UPDATE role SET ? WHERE ?",
            [{
                title: answer.newRole,
                salary: answer.newSalary
            },
            {
                id: answer.employeeName
            }
            ],
            function (err, res){
                if (err) throw err;
                console.log("Employee data updated!");
                initialChoice();
            }
            )
        })
    })
}