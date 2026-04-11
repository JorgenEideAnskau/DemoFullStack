package org.example.demofullstack.models;

import org.jetbrains.annotations.NotNull;

public class Movies {
    private Long id;
    private String name;
    private int age_limit;
    private String type;
    private String director;

    public Movies(Long id, String name, int age_limit, String type, String director) {
        this.id = id;
        this.name = name;
        this.age_limit = age_limit;
        this.type = type;
        this.director = director;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge_limit() {
        return age_limit;
    }

    public void setAge_limit(int age_limit) {
        this.age_limit = age_limit;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }
}
