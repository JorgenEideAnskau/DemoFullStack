DROP TABLE movies CASCADE;

CREATE TABLE movies
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(150) NOT NULL,
    age_limit int,
    type      varchar(150),
    director  varchar(150)
);

INSERT INTO movies(name, age_limit, type, director)
VALUES ('Fast and The Furious', 12, 'Action, Crime, Adventure, Drama', 'Rob Cohen'),
       ('Bad Boys', 15, 'Comedy, Action, Drama', 'Michael Bay'),
       ('The Avengers', 12, 'Action, Comedy, Science-Fiction', 'Joss Whedon');

SELECT * FROM movies;

SELECT m.name      AS MovieName,
       m.age_limit AS AgeLimit,
       m.type      AS Type,
       m.director  AS Director
FROM movies m
ORDER BY m.name;
