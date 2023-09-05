-- Insertes data into the departments table
INSERT INTO departments (name)
VALUES
  ('HR'),
  ('Finance'),
  ('Engineering');

-- Inserted data into the roles table
INSERT INTO roles (title, salary, department_id)
VALUES
  ('HR Manager', 60000.00, 1),
  ('Accountant', 50000.00, 2),
  ('Software Engineer', 80000.00, 3);

-- Inserted data into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ash', 'Ketchum', 1, NULL),        -- Ash is the manager
  ('Brock', 'Harrison', 2, 1),
  ('Misty', 'Williams', 3, 1), 
  ('Gary', 'Oak', 2, 1),
  ('May', 'Maple', 3, 1),
  ('Dawn', 'Stone', 3, 1);
