DROP TABLE movies_2 CASCADE;
DROP TABLE reviews CASCADE;

CREATE TABLE movies_2
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(150) NOT NULL,
    age_limit varchar(50),
    type      varchar(150),
    director  varchar(150)
);

CREATE TABLE reviews
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(150) UNIQUE NOT NULL,
    review   TEXT,
    ranking  VARCHAR(50),
    movie_id INT REFERENCES movies_2 (id) ON UPDATE CASCADE
);

INSERT INTO movies_2(name, age_limit, type, director)
VALUES ('Fast and The Furious', '12+', 'Action, Crime, Adventure, Drama', 'Rob Cohen'),
       ('Bad Boys', '15+', 'Comedy, Action, Drama', 'Michael Bay'),
       ('The Avengers', '12+', 'Action, Comedy, Science-Fiction', 'Joss Whedon');

INSERT INTO reviews(name, review, ranking)
VALUES ('F1', 'The movie features impressive car stunts and high-speed races', '9/10'),
       ('B&B',
        'The film is packed with gunfights, car chases, and memorable one-liners, making it a quintessential buddy cop movie.',
        '8/10'),
       ('Marvel',
        'The film unites iconic characters like Iron Man, Captain America, and Thor, creating a thrilling narrative.',
        '8/10');

UPDATE reviews
SET movie_id = (SELECT id FROM movies_2 WHERE name = 'Fast and The Furious')
WHERE name IN ('F1');

UPDATE reviews
SET movie_id = (SELECT id FROM movies_2 WHERE name = 'Bad Boys')
WHERE name IN ('B&B');

UPDATE reviews
SET movie_id = (SELECT id FROM movies_2 WHERE name = 'The Avengers')
WHERE name IN ('Marvel');

SELECT *
FROM movies_2;

SELECT m.name      AS MovieName,
       m.age_limit AS AgeLimit,
       m.type      AS Type,
       m.director  AS Director,
       r.name      AS ShortForm,
       r.review    AS review,
       r.ranking   AS Ranking
FROM movies_2 m
         INNER JOIN reviews r ON m.id = r.movie_id
ORDER BY m.name;
