package org.example.demofullstack.repository;

import org.example.demofullstack.models.Movies;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MoviesRepository {

    private final JdbcTemplate jdbcTemplate;

    public MoviesRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    protected static final RowMapper<movies> rowMapper = ((rs, rowNum) ->
            new Movies(
                    rs.getLong("id")
            ){}
}