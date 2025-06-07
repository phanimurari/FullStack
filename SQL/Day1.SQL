-- Create aplayertable to store the following details of players.

-- column_name	data_type
-- name	VARCHAR(200)
-- age	INT/INTEGER
-- score	INT


CREATE TABLE player (
  name VARCHAR(200),
  age INTEGER,
  score INTEGER
);



-- PRAGMA TABLE_INFOcommand returns the information about a specific table in a database.


-- Inserting Rows
-- INSERTclause is used to insert new rows in a table

-- Insertname,ageandscore of 2 players in theplayertable.



INSERT INTO
  player (name, age, score)
VALUES
  ("Rakesh", 39, 35),
  ("Sai", 47, 30);


-- Retrieving Data
-- SELECT clause is used to retrieve data from the table.


SELECT
  name,
  age
FROM
  player;


SELECT *
FROM player;


  SELECT name, age 
FROM player 
WHERE name = "Sai";


-- Update Rows
-- UPDATEclause is used to update the data of an existing table in database. We can update all the rows or only specific rows as per the requirement.


-- Update All Rows

UPDATE
  player
SET
  score = 100;

-- Update Specific Rows

  UPDATE
  table_name
SET
  column1 = value1
WHERE
  column2 = value2;


-- Delete Rows
-- DELETEclause is used to delete existing records from a table.

-- Delete All Rows

DELETE FROM
  table_name;


-- Delete all the rows from the player table. 

DELETE FROM
  player;


--  Delete Specific Rows

  DELETE FROM
  table_name
WHERE
  column1 = value1;



-- Drop Table
-- DROPclause is used to delete a table from the database.

DROP TABLE table_name;


-- Deleteplayertable from the database.

DROP TABLE player;


-- Alter Table


ALTER TABLE
  table_name
ADD
  column_name datatype;


  ALTER TABLE
  player
ADD
  jersey_num INT;



--   Rename Column

ALTER TABLE
  table_name RENAME COLUMN c1 TO c2;


  ALTER TABLE
  player RENAME COLUMN jersey_num TO jersey_number;


--   Drop Column

ALTER TABLE
  player DROP COLUMN jersey_number;



SELECT * from orders
WHERE item LIKE "%use%" NOT amount <=250



-- Logical Operators

SELECT * FROM orders
WHERE brand = "Nike" AND price > 4 OR amount < 100000


-- Precedence
NOT > AND > OR