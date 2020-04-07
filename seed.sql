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

INSERT INTO department (name)
VALUES ("Human Resources"), ("Quality Assurance"), ("Computing");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", "50000", "404"), ("QA Manager", "40000", "505"), ("Computer Monitor", "45000", "606");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brandon", "Kim", "0", "101"), ("Nikola", "Tesla", "10", "202"), ("Thomas", "Edison", "20", "303");