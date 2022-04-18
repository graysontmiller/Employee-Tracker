INSERT INTO departments (department_name)
VALUES
('Accounting'),
('IT'),
('Sales');


INSERT INTO roles (title, salary, department_id)
VALUES
('Accountant', 70000, 1),
('CFO', 350000, 1),
('Software Engineer', 90000, 2),
('CIO', 180000, 2),
('Marketing Coordinator', 75000, 3),
('Salesman', 100000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Jonathan', 'Gano', 1, null),
('Gabriel', 'Brooks', 2, null),
('Grayson', 'Miller', 3, null),
('Silly', 'Goose', 3, 3),
('Sil', 'Lygoose', 5, 8),
('Kaladin', 'Stormblessed', 6, null),
('Shallan', 'Davar', 4, null),
('Adolin', 'Kholin', 5, null);
