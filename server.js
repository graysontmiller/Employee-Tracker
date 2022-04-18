const connection = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const promptUser = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'goToPrompt',
      message: 'Which database would you like to access?',
      choices: ['Departments', 'Roles', 'Employees', 'QUIT']
    })
    .then(answer => {
      if (answer.goToPrompt == 'Departments') {
        return departments();
      }
      else if (answer.goToPrompt == 'Roles') {
        return roles();
      }
      else if (answer.goToPrompt == 'Employees') {
        return employees();
      }
      else {
        return connection.end()
      }
    });
};

// Departments functions BEGIN
function departments() {
  inquirer
    .prompt({
      type: 'list',
      name: 'departmentsOptions',
      message: 'What would you like to do to the departments database?',
      choices: ['View', 'Add', 'Delete', 'QUIT']
    })
    .then(answer => {
      if (answer.departmentsOptions == 'View') {
        return viewDepartments();
      }
      else if (answer.departmentsOptions == 'Add') {
        return addDepartments();
      }
      else if (answer.departmentsOptions == 'Delete') {
        return deleteDepartments();
      }
      else {
        return connection.end()
      }
    });
};

function viewDepartments() {
  const sql = `SELECT departments.id AS id, 
                      departments.department_name AS department 
              FROM departments`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

function addDepartments() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department?'
    })
    .then(answer => {
      const departmentName = answer.departmentName;
      console.log('New department added')

      connection.query(
        `INSERT INTO departments SET ?`,
        {
          department_name: departmentName
        },
        (err, result) => {
          if (err) throw err;
        });
      promptUser();
    });
};

function deleteDepartments() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'What department name would you like to delete?'
    })
    .then(answer => {
      const departmentName = answer.departmentName;
      console.log('Department deleted')

      connection.query(
        `DELETE FROM departments WHERE ?`,
        {
          department_name: departmentName
        },
        (err, result) => {
          if (err) throw err;
        });
      promptUser();
    });
};
// Departments functions ENDS

// Roles functions BEGIN
function roles() {
  inquirer
    .prompt({
      type: 'list',
      name: 'rolesOptions',
      message: 'What would you like to do to the roles database?',
      choices: ['View', 'Add', 'Delete', 'Update', 'QUIT']
    })
    .then(answer => {
      if (answer.rolesOptions == 'View') {
        return viewRoles();
      }
      else if (answer.rolesOptions == 'Add') {
        return addRoles();
      }
      else if (answer.rolesOptions == 'Delete') {
        return deleteRoles();
      }
      else if (answer.rolesOptions == 'Update') {
        return updateRoles();
      }
      else {
        return connection.end()
      }
    });
};

function viewRoles() {
  const sql = `SELECT roles.id,
                      roles.title, 
                      roles.salary, 
                      departments.department_name AS department
              FROM roles
              INNER JOIN departments ON roles.department_id = departments.id`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

function addRoles() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'rolesTitle',
        message: 'What is the role title?'
      },
      {
        type: 'input',
        name: 'rolesSalary',
        message: 'What is the role salary?'
      },
      {
        type: 'input',
        name: 'rolesDepartmentId',
        message: 'What is the role department id?'
      }
    ])
    .then(answer => {
      const rolesTitle = answer.rolesTitle;
      const rolesSalary = answer.rolesSalary;
      const rolesDepartmentId = answer.rolesDepartmentId;
      console.log('New role added')

      connection.query(
        `INSERT INTO roles SET ?`,
        {
          title: rolesTitle,
          salary: rolesSalary,
          department_id: rolesDepartmentId
        },
        (err, result) => {
          if (err) throw err;
        });
      promptUser();
    });
};

function deleteRoles() {
  inquirer
    .prompt({
      type: 'input',
      name: 'roleTitle',
      message: 'What role title would you like to delete?'
    })
    .then(answer => {
      const roleTitle = answer.roleTitle;
      console.log('Role deleted')

      connection.query(
        `DELETE FROM roles WHERE ?`,
        {
          title: roleTitle
        },
        (err, result) => {
          if (err) throw err;
        });
      promptUser();
    });
};

function updateRoles() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'rolesTitle',
        message: 'What title would you like to update?'
      },
      {
        type: 'list',
        name: 'rolesOptions',
        message: 'Which option would you like to change for the roles database?',
        choices: ['Title', 'Salary', 'Department Id', 'Quit']
      },
      {
        type: 'input',
        name: 'rolesUpdated',
        message: 'Please enter the new data:'
      }
    ])
    .then(answer => {
      const rolesTitle = answer.rolesTitle;
      const rolesOptions = answer.rolesOptions;
      const rolesUpdated = answer.rolesUpdated;
      if (rolesTitle == '') {
        console.log('Role was not updated')
        return promptUser();
      }
      if (rolesOptions == 'Title') {
        connection.query(
          `UPDATE roles SET ? WHERE ?`,
          [
            {
              title: rolesUpdated
            },
            {
              title: rolesTitle
            }
          ],
          (err, result) => {
            if (err) throw err;
          }
        )
      }
      else if (rolesOptions == 'Salary') {
        connection.query(
          `UPDATE roles SET ? WHERE ?`,
          [
            {
              salary: rolesUpdated
            },
            {
              title: rolesTitle
            }
          ],
          (err, result) => {
            if (err) throw err;
          }
        )
      }
      else if (rolesOptions == 'Department Id') {
        connection.query(
          `UPDATE roles SET ? WHERE ?`,
          [
            {
              department_id: rolesUpdated
            },
            {
              title: rolesTitle
            }
          ],
          (err, result) => {
            if (err) throw err;
          }
        )
      }
      else {
        connection.end();
      }
      console.log('Role Updated');
      promptUser();
    });
};
// Roles functions ENDS

// Employees functions BEGIN
function employees() {
  inquirer
    .prompt({
      type: 'list',
      name: 'employeesOptions',
      message: 'What would you like to do to the employees database?',
      choices: ['View', 'Add', 'Delete', 'Update', 'QUIT']
    })
    .then(answer => {
      if (answer.employeesOptions == 'View') {
        return viewEmployees();
      }
      else if (answer.employeesOptions == 'Add') {
        return addEmployees();
      }
      else if (answer.employeesOptions == 'Delete') {
        return deleteEmployees();
      }
      else if (answer.employeesOptions == 'Update') {
        return updateEmployees();
      }
      else {
        return connection.end()
      }
    });
};

function viewEmployees() {
  const sql = `SELECT employees.id,
                      employees.first_name,
                      employees.last_name,
                      departments.department_name AS department,
                      roles.title,
                      roles.salary,
                      CONCAT (manager.first_name, ' ', manager.last_name) AS manager  
              FROM employees
              LEFT JOIN roles on employees.role_id = roles.id
              LEFT JOIN departments ON roles.department_id = departments.id
              LEFT JOIN employees manager On employees.manager_id = manager.id
              ORDER BY employees.last_name ASC`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

function addEmployees() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeesFirst',
        message: 'What is the first name of the employee?'
      },
      {
        type: 'input',
        name: 'employeesLast',
        message: 'What is the last name of the employee?'
      },
      {
        type: 'input',
        name: 'employeesRole',
        message: "What is the employee's role id?"
      },
      {
        type: 'confirm',
        name: 'managerConfirm',
        message: "Does this employee have a manager?",
        default: true
      },
      {
        type: 'input',
        name: 'manager',
        message: "What is the manager's employee id? (view employee table for reference)",
        when: ({ managerConfirm }) => {
          if (managerConfirm) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    ])
    .then(answer => {
      const employeesFirst = answer.employeesFirst;
      const employeesLast = answer.employeesLast;
      const employeesRole = answer.employeesRole;
      const manager = answer.manager;
      console.log('New employee added')

      connection.query(
        `INSERT INTO employees SET ?`,
        {
          first_name: employeesFirst,
          last_name: employeesLast,
          role_id: employeesRole,
          manager_id: manager
        },
        (err, result) => {
          if (err) throw err;
        });
      promptUser();
    });
};

function deleteEmployees() {
  inquirer
    .prompt({
      type: 'input',
      name: 'employeesId',
      message: 'What employee would you like to delete? (choose by employee id)'
    })
    .then(answer => {
      const employeesId = answer.employeesId;
      console.log('Employee deleted')

      connection.query(
        `DELETE FROM employees WHERE ?`,
        {
          id: employeesId
        },
        (err, result) => {
          if (err) throw err;
        });
      promptUser();
    });
};

function updateEmployees() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeesId',
        message: "What is the employee's id?"
      },
      {
        type: 'list',
        name: 'employeesOptions',
        message: 'Which option would you like to change for the employee database?',
        choices: ['First Name', 'Last Name', 'Role Id', 'Manager Id', 'Quit']
      },
      {
        type: 'input',
        name: 'employeesUpdated',
        message: 'Please enter the new data:'
      }
    ])
    .then(answer => {
      const employeesId = answer.employeesId;
      const employeesOptions = answer.employeesOptions;
      const employeesUpdated = answer.employeesUpdated;
      if (employeesId == '') {
        console.log('Role was not updated')
        return promptUser();
      }
      if (employeesOptions == 'First Name') {
        connection.query(
          `UPDATE employees SET ? WHERE ?`,
          [
            {
              first_name: employeesUpdated
            },
            {
              id: employeesId
            }
          ],
          (err, result) => {
            if (err) throw err;
          }
        )
      }
      else if (employeesOptions == 'Last Name') {
        connection.query(
          `UPDATE employees SET ? WHERE ?`,
          [
            {
              last_name: employeesUpdated
            },
            {
              id: employeesId
            }
          ],
          (err, result) => {
            if (err) throw err;
          }
        )
      }
      else if (employeesOptions == 'Role Id') {
        connection.query(
          `UPDATE employees SET ? WHERE ?`,
          [
            {
              role_id: employeesUpdated
            },
            {
              id: employeesId
            }
          ],
          (err, result) => {
            if (err) throw err;
          }
        )
      }
      else if (employeesOptions == 'Manager Id') {
        connection.query(
          `UPDATE employees SET ? WHERE ?`,
          [
            {
              manager_id: employeesUpdated
            },
            {
              id: employeesId
            }
          ],
          (err, result) => {
            if (err) throw err;
          }
        )
      }
      else {
        connection.end();
      }
      console.log('Role Updated');
      promptUser();
    });
};
// Employees functions ENDS

promptUser();