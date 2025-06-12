-- Create View
-- To create a view in the database, use theCREATE VIEW statement.

-- Example
-- Createuser_base_detailsview with id, name, age, gender and pincode.


CREATE VIEW user_base_details AS 
SELECT id, name, age, gender, pincode
FROM user;


-- In general, views are read only.
-- We cannot perform write operations like updating, deleting & inserting rows in the base tables through views.


-- Querying Using View
-- We can use its name instead of writing the original query to get the data.


-- Querying Using View

-- We can use its name instead of writing the original query to get the data.


SELECT *
FROM user_base_details;


-- List All Available Views

SELECT
  name
FROM
  sqlite_master
WHERE
  TYPE = 'view';

-- Delete View

-- Syntax: 

DROP VIEW view_name;


DROP VIEW user_base_details;



-- SubQueries


SELECT name
FROM employees
WHERE department_id = (
  SELECT id
  FROM departments
  WHERE name = 'Sales'
);



SELECT
  name,
  ROUND(
    (
      SELECT
        AVG(rating)
      FROM
        product
      WHERE
        category = "WATCH"
    ) - rating,
    2
  ) AS rating_variance
FROM
  product
WHERE
  category = "WATCH";