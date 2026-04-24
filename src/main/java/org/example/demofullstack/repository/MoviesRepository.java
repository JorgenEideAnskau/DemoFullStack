package org.example.demofullstack.repository;

import org.example.demofullstack.models.Movies;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MoviesRepository {

    private final JdbcTemplate db;

    protected RowMapper<Movies> moviesRowMapper = (rs, i) -> new Movies(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getInt("age_limit"),
            rs.getString("type"),
            rs.getString("director")
    );

    public MoviesRepository(JdbcTemplate jdbcTemplate) {
        this.db = jdbcTemplate;
    }

    public List<Movies> getAllMovies() {
        return db.query("SELECT * FROM movies", moviesRowMapper);
    }

    public void addMovie(Movies movie) {
        String sql = "INSERT INTO movies (name, age_limit, type, director) VALUES (?,?,?,?)";
        db.update(sql, movies.getName(), movie.getAge_limit(), movie.getType(), movie.getDirector());
    }

    public void deleteMovie(int id) {
        db.update("DELETE FROM movies WHERE id = ?", id);
    }

    public void updateMovie(Movies movie) {
        db.update("UPDATE movies SET name=?, age_limit=?, type=?, director=? WHERE id=?",
                movie.getName(), movie.getAge_limit(), movie.getType(), movie.getDirector(), movie.getId());
    }
}