DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL
);

INSERT INTO department (id, name)
VALUES ("1", "Human Resources")

INSERT INTO role (id, title, salary, department_id)
VALUES ("1", "HR Manager", "$50,000", "1")

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("1", "Brandon", "Kim", "0", "1")