-- JOINS


-- Creating a student table and inserting the data into it

CREATE TABLE STUDENT (
  id INT PRIMARY KEY,
  full_name VARCHAR(50),
  age INT,
  gender CHAR(1)
);

INSERT INTO STUDENT (id, full_name, age, gender)
VALUES
  (1, 'Varun', 16, 'M'),
  (2, 'Ajay', 16, 'M'),
  (3, 'Sandhya', 19, 'F'),
  (4, 'Afrin', 16, 'F');


-- Creating a instructor table and inserting the data into it

CREATE TABLE INSTRUCTOR (
  instructor_id INT PRIMARY KEY,
  full_name VARCHAR(50),
  gender CHAR(1)
);

INSERT INTO INSTRUCTOR (instructor_id, full_name, gender)
VALUES
  (101, 'Alex', 'M'),
  (102, 'Arun', 'M'),
  (105, 'Bentlee', 'M');



-- Creating a course table and inserting the data into it

CREATE TABLE COURSE (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(50),
  instructor_id INT,
  FOREIGN KEY (instructor_id) REFERENCES INSTRUCTOR(instructor_id)
);

INSERT INTO COURSE (course_id, course_name, instructor_id)
VALUES
  (201, 'Data Structures', 101),
  (202, 'Algorithms', 102),
  (203, 'Machine Learning', 105);



-- Creating a review table and inserting the data into it


CREATE TABLE REVIEW (
  id INT PRIMARY KEY,
  course_id INT,
  content VARCHAR(100),
  created_at DATE,
  student_id INT,
  FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
  FOREIGN KEY (student_id) REFERENCES STUDENT(id)
);


INSERT INTO REVIEW (id, course_id, content, created_at, student_id)
VALUES
  (1, 201, 'Great course', '2021-01-19', 1),
  (2, 202, 'Good explanation', '2021-01-19', 2),
  (3, 203, 'Cyber Security is awesome', '2021-01-20', 2);


-- Creating a student course and inserting the data into it


CREATE TABLE STUDENT_COURSE (
  id INT PRIMARY KEY,
  student_id INT,
  course_id INT,
  score INT,
  enrollment_date DATE,
  FOREIGN KEY (student_id) REFERENCES STUDENT(id),
  FOREIGN KEY (course_id) REFERENCES COURSE(course_id)
);


INSERT INTO STUDENT_COURSE (id, student_id, course_id, score, enrollment_date)
VALUES
  (1, 1, 201, 80, '2021-01-16'),
  (2, 2, 202, 60, '2021-01-17'),
  (3, 3, 203, 90, '2021-01-19');


-- Natural JOIN


-- Fetch the details of courses that are being taught by "Alex".
-- Solving this problem involves querying on data stored in two tables, i.e.,course&instructor. 
-- Both the tables have common columninstructor_id. Hence, we use Natural JOIN

SELECT course.name,
  instructor.full_name
FROM course
  NATURAL JOIN instructor
WHERE instructor.full_name = "Alex";

-- NATURAL JOIN on multiple common Columns
-- If the two tables contain multiple common columns , then NATURAL JOIN combines the tables based on the multiple common columns.

-- Example
-- Fetch the details of reviews for courses where student got greater than 70 score.
-- Solving this problem involves querying on data stored in two tables i.e., 
-- review & student_course. Both the tables have multiple common columns id,student_id and course_id .

-- So the NATURAL JOIN will match rows where the id,student_id and course_id are same in both tables.

SELECT
  review.course_id,
  review.content,
  review.created_at,
  student_course.score
FROM
  review NATURAL
  JOIN student_course
WHERE
  student_course.score > 70;

-- INNER JOIN
-- Get the reviews of course “Cyber Security” (course with id=15)


SELECT student.full_name,
   review.content,
   review.created_at
FROM student
   INNER JOIN review 
ON student.id = review.student_id
WHERE review.course_id = 201;


-- LEFT JOIN
-- Fetch the full_name of students who have not enrolled for any course

SELECT student.full_name
FROM student
   LEFT JOIN student_course
ON student.id = student_course.student_id
WHERE student_course.id IS NULL;


-- RIGHT JOIN
-- Following query performs RIGHT JOIN on course and instructor tables
SELECT course.name,
        instructor.full_name
FROM course
   RIGHT JOIN instructor
ON course.instructor_id = instructor.instructor_id;

-- FULL JOIN
-- Following query performs FULL JOIN ON course and instructor tables

SELECT course.name,
        instructor.full_name
FROM course
   FULL JOIN instructor
ON course.instructor_id = instructor.instructor_id;

-- CROSS JOIN
-- In CROSS JOIN, each row from the first table is combined with all rows in the second table. 
-- Cross Join is also called as CARTESIAN JOIN
-- Following query performs CROSS JOIN on course and instructor tables


SELECT course.name AS course_name,
        instructor.full_name AS instructor_name
FROM course
   CROSS JOIN instructor;



--    SELF JOIN


SELECT sc1.student_id AS student_id1,
  sc2.student_id AS student_id2, sc1.course_id
FROM
   student_course AS sc1
   INNER JOIN student_course sc2 ON sc1.course_id = sc2.course_id
WHERE
    sc1.student_id < sc2.student_id;

-- Joins on Multiple Tables
-- Fetch all the students who enrolled for the courses taught by the instructor “Arun” (id = 102)


SELECT T.name AS course_name,
   student.full_name
FROM (course
   INNER JOIN student_course
ON course.id = student_course.course_id) AS T
   INNER JOIN student
ON T.student_id = student.id
WHERE course.instructor_id = 102;

-- Using joins with other clauses
-- We can applyWHERE,ORDER BY,HAVING,GROUP BY,LIMIT,OFFSETand other clauses (which are used for retrieving data tables) on the temporary joined table as well.



SELECT student.full_name
FROM (course
   INNER JOIN student_course
ON course.id = student_course.course_id) AS T
   INNER JOIN student
ON T.student_id = student.id
WHERE course.name = "Machine Learning"
ORDER BY student_course.score DESC
LIMIT 1;

-- Using joins with aggregations


-- We can apply aggregate functions such as SUM, AVG, COUNT, MAX, MIN and 
-- others to perform calculations on the temporary joined table as well.


-- Get the highest score in each course.



SELECT
  course.name AS course_name,
  MAX(score) AS highest_score
FROM
  course
  LEFT JOIN student_course 
ON course.id = student_course.course_id
GROUP BY
  course.id;