package org.example.demofullstack.controller;

import org.example.demofullstack.repository.moviesRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
public class moviesController {
    private final moviesRepository repository;
    public moviesController(moviesRepository repository) {
        this.repository = repository;
    }
}
