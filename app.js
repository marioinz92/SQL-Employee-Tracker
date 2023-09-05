const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');


//  Reading and executing schema.sql from the 'db' folder
const schemaSQL = fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf8');

// Execute schemaSQL using your MySQL connection
connection.query(schemaSQL, (err) => {
  if (err) throw err;
  console.log('Schema created.');
});

// Created a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_db_user',
  password: 'anypassword',
  database: 'employee_database',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
  startApp();
});

// Function to display the main menu
function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
}

// functions for each of the menu options.

function viewDepartments() {
  const query = 'SELECT * FROM departments';

  connection.query(query, (err, results) => {
    if (err) throw err;

    console.table(results);

    startApp();
  });
}

function viewRoles() {
  const query = 'SELECT * FROM roles';

  connection.query(query, (err, results) => {
    if (err) throw err;

    console.table(results);

    startApp();
  });
}

function viewEmployees() {
  const query = 'SELECT * FROM employees';

  connection.query(query, (err, results) => {
    if (err) throw err;

    console.table(results);

    startApp();
  });
}


function addDepartment() {
    inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      const query = 'INSERT INTO departments (name) VALUES (?)';

      connection.query(query, [answer.name], (err) => {
        if (err) {
          console.error('Error adding department:', err);
        } else {
          console.log('Department added successfully.');
        }

        startApp();
      });
    });
  // Implemented the function to add a department
}

function addRole() {
    inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the role:',
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answer) => {
      const query =
        'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';

      connection.query(
        query,
        [answer.title, answer.salary, answer.department_id],
        (err) => {
          if (err) {
            console.error('Error adding role:', err);
          } else {
            console.log('Role added successfully.');
          }

          startApp();
        }
      );
    });
  // Implemented the function to add a role
}

function addEmployee() {
    inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Enter the first name of the employee:',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Enter the last name of the employee:',
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the role ID for the employee:',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Enter the manager ID for the employee (or leave blank if none):',
      },
    ])
    .then((answer) => {
      const query =
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';

      connection.query(
        query,
        [answer.first_name, answer.last_name, answer.role_id, answer.manager_id || null],
        (err) => {
          if (err) {
            console.error('Error adding employee:', err);
          } else {
            console.log('Employee added successfully.');
          }

          startApp();
        }
      );
    });
  // Implemented the function to add an employee
}

function updateEmployeeRole() {
    inquirer
        .prompt([
          {
            name: 'employee_id',
            type: 'list',
            message: 'Select the employee to update:',
            choices: employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
          {
            name: 'new_role_id',
            type: 'list',
            message: 'Select the new role for the employee:',
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id,
            })),
          },
        ])
        .then((answer) => {
          const query = 'UPDATE employees SET role_id = ? WHERE id = ?';

          connection.query(
            query,
            [answer.new_role_id, answer.employee_id],
            (err) => {
              if (err) {
                console.error('Error updating employee role:', err);
              } else {
                console.log('Employee role updated successfully.');
              }

              startApp();
            }
          );
        });
  // Implemented the function to update an employee's role
}
