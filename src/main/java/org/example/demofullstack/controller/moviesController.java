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

    @PostMapping()
    public Movies add(@RequestBody Movies movie) {
        repository.addMovie(movie);
        return movie;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        repository.deleteMovie(id);
    }

    // Controller
    @PutMapping("/{id}")
    public Movies update(@PathVariable Long id, @RequestBody Movies movie) {
        movie.setId(id);
        repository.updateMovie(movie);
        return movie;
    }
}