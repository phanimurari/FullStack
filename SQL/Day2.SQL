-- In operator

-- Example
-- Get the details of all the products fromproducttable, where thebrandis either "Puma", "Mufti", "Levi's", "Lee" or "Denim".

SELECT
  *
FROM
  product
WHERE
  brand IN ( "Puma", "Levi's", "Mufti", "Lee", "Denim");


  -- Between Operator

SELECT
  name,
  price,
  brand
FROM
  product
WHERE
  price BETWEEN 1000
  AND 5000;



--   Order By and Distinct


-- Example
-- Get all products in the order of lowestprice first in "Puma" brand.

SELECT
  name,
  price,
  rating
FROM
  product
WHERE
  brand = "Puma"
ORDER BY
  price DESC;

-- ORDER BY with Multiple Columns

SELECT
  name,
  price,
  rating
FROM
  product
WHERE
  name = "Blue Shirt"
ORDER BY
  rating DESC,
  price ASC;


-- DISTINCT

  SELECT
  DISTINCT brand
FROM
  product
ORDER BY
  brand;

-- LIMIT


  SELECT
  name,
  price,
  rating
FROM
  product
WHERE
  brand = "Puma"
ORDER BY
  rating DESC
LIMIT 2;

-- OFFSET
-- Get the details of 5 top-rated products, starting from 7th row.

SELECT
  name,
  price,
  rating
FROM
  product
ORDER BY
  rating DESC
LIMIT 5 
OFFSET 6;

-- Aggregation functions

-- Get the total runs scored by "Ram" from the player_match_details table.

SELECT
  MAX(score)
FROM
  player_match_details
WHERE
  name = "Ram";


--   Get the highest and least scores among all the matches that happened in the year 2011.


-- COUNT Variants
-- Calculate the total number of matches played in the tournament.

 SELECT COUNT(*)    
 FROM player_match_details;

  SELECT COUNT(1)    
 FROM player_match_details;

  SELECT COUNT()    
 FROM player_match_details;


--  Alias

SELECT
  name AS player_name
FROM
  player_match_details;


-- HAVING Clause

SELECT
  name,
  COUNT(*) AS half_centuries
FROM
  player_match_details
WHERE
  score >= 50
GROUP BY
  name
HAVING
  half_centuries > 1;


--   SQL FUnctions

-- 1. Get the movie title and release year for every movie from the database.

SELECT 
    name, 
    strftime('%Y', release_date) AS release_year
FROM
    movie;

-- 2. Get the number of movies released in each month of the year 2010

SELECT 
    strftime('%m', release_date) AS month,
    COUNT(*) AS total_movies
FROM
    movie
WHERE
    strftime('%Y', release_date) = '2010'
GROUP BY
    month;

-- CAST Function Syntax and Examples

CAST(strftime('%Y', release_date) AS INTEGER)

SELECT
  strftime('%m', release_date) AS month,
  COUNT(*) AS total_movies
FROM
  movie
WHERE
  CAST(strftime('%Y', release_date) AS INTEGER) = 2010
GROUP BY
  month;



