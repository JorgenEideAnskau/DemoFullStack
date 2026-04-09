package org.example.demofullstack.repository;

import org.example.demofullstack.models.movies;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class moviesRepository {

    private final JdbcTemplate jdbcTemplate;

    public moviesRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    protected static final RowMapper<movies> rowMapper = ((rs, rowNum) ->
            new Movies(
                    rs.getLong("id")
            ){}
}
