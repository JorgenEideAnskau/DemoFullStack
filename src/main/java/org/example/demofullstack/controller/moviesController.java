package org.example.demofullstack.controller;

import org.example.demofullstack.models.Movies;
import org.example.demofullstack.repository.MoviesRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class moviesController {
    private final MoviesRepository repository;
    public moviesController(MoviesRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Movies> getAllMovies() {
        return repository.getAllMovies();
    }

}