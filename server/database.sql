CREATE TABLE employees (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30)NOT NULL,
job_title VARCHAR(80)NOT NULL,
annual_salary INT NOT NULL
);

SELECT * FROM employees; 

INSERT INTO employees(first_name, last_name, job_title, annual_salary)
VALUES ('Lawrence', 'Fishbourne', 'Actor', 3000000);