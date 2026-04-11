# Fullstack Demo: Movies CRUD App

En steg-for-steg guide for å bygge en fullstack applikasjon med **Spring Boot**, **JDBC**, **PostgreSQL** og **JavaScript**.

Vi bygger **én feature om gangen** — det betyr at vi jobber i alle lagene (database → backend → frontend) for hver feature før vi går videre.

---

## Oppsett

Før du begynner, sørg for at du har:

- Et Spring Boot-prosjekt med disse dependencies i `pom.xml`:
    - `spring-boot-starter-webmvc`
    - `spring-boot-starter-data-jdbc`
    - `postgresql`
    - `spring-boot-devtools`
- PostgreSQL kjørende lokalt
- `application.properties` konfigurert:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/movies
spring.datasource.username=postgres
spring.datasource.password=dittpassord
```

Filstruktur:
```
src/main/java/org/example/demofullstack/
├── models/Movies.java
├── repository/MoviesRepository.java
└── controller/MoviesController.java

src/main/resources/static/
├── index.html
├── script.js
└── style.css
```

---

## Steg 1: Database

Opprett tabellen i PostgreSQL (pgAdmin eller psql):

```sql
CREATE TABLE movies
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(150) NOT NULL,
    age_limit INT,
    type      VARCHAR(150),
    director  VARCHAR(150)
);

INSERT INTO movies(name, age_limit, type, director)
VALUES ('Fast and The Furious', 12, 'Action, Crime, Adventure, Drama', 'Rob Cohen'),
       ('Bad Boys', 15, 'Comedy, Action, Drama', 'Michael Bay'),
       ('The Avengers', 12, 'Action, Comedy, Science-Fiction', 'Joss Whedon');
```

Test at det fungerer med `SELECT * FROM movies;`

---

## Steg 2: Model

Lag `Movies.java` — denne klassen representerer én rad i databasen.

```java
package org.example.demofullstack.models;

public class Movies {
    // TODO: Lag feltene som matcher kolonnene i tabellen:
    //       id (Long), name (String), age_limit (int), type (String), director (String)
    //       Husk: bruk Long (ikke long) for id, fordi id kan være null ved POST


    // TODO: Lag en tom konstruktør (Jackson trenger denne for å lage objekter fra JSON)


    // TODO: Lag en konstruktør som tar inn alle feltene


    // TODO: Lag getters og setters for alle feltene

}
```

---

## Steg 3: HTML — Tabellen

Lag `index.html` med en tabell og to knapper:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Movies</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="script.js" defer></script>
</head>
<body class="container mt-4">
<div class="container mt-4">
    <h1 class="text-center mb-4">Movie Management</h1>
    <table class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age Limit</th>
            <th>Genre</th>
            <th>Director</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody id="deviceTableBody">
        <!-- Data fra databasen vil bli lagt inn her med JavaScript -->
        </tbody>
    </table>
    <div class="d-flex gap-2">
        <button type="button" id="loadMovies" class="btn btn-primary">Load Movies</button>
        <button type="button" id="addRow" class="btn btn-success">+ Add Movie</button>
    </div>
</div>
</body>
</html>
```

---

## Feature 1: Les (READ) — Hent og vis alle filmer

### Backend: Repository

Lag `MoviesRepository.java`:

```java
package org.example.demofullstack.repository;

@Repository
public class MoviesRepository {

    private final JdbcTemplate db;

    public MoviesRepository(JdbcTemplate jdbcTemplate) {
        this.db = jdbcTemplate;
    }

    // TODO: Lag en RowMapper som mapper en rad fra databasen til et Movies-objekt.
    //       Bruk rs.getLong("id"), rs.getString("name"), osv.
    //       Hint: RowMapper<Movies> moviesRowMapper = (rs, i) -> new Movies(...);


    // TODO: Lag metoden getAllMovies() som kjører "SELECT * FROM movies"
    //       og returnerer en List<Movies> ved å bruke db.query(sql, moviesRowMapper)

}
```

### Backend: Controller

Lag `MoviesController.java`:

```java
package org.example.demofullstack.controller;

@RestController
@RequestMapping("/api/movies")
public class MoviesController {

    private final MoviesRepository repository;

    public MoviesController(MoviesRepository repository) {
        this.repository = repository;
    }

    // TODO: Lag et GET-endepunkt som returnerer alle filmer.
    //       Hint: @GetMapping og return repository.getAllMovies()

}
```

**Test:** Start appen og gå til `http://localhost:8080/api/movies` i nettleseren. Du skal se JSON med filmene.

### Frontend: JavaScript

Lag `script.js`:

```js
const moviesTable = document.getElementById("deviceTableBody");

// TODO: Legg til en click-listener på "loadMovies"-knappen som:
//       1. Fetcher GET api/movies
//       2. Parser responsen som JSON
//       3. Tømmer tabellen (moviesTable.innerHTML = "")
//       4. Looper gjennom dataen og kaller addMovieRow(movie) for hver film


// Helper: Legger til en rad i tabellen
function addMovieRow(movie) {
    // TODO: Lag en <tr> med en <td> for hver kolonne (id, name, age_limit, type, director)
    //       Legg også til en <td> med en Delete-knapp og en Edit-knapp
    //       Hint: bruk template literals (`...`) og innerHTML
    //       Husk data-id="${movie.id}" på knappene

}
```

**Test:** Åpne `http://localhost:8080`, klikk "Load Movies" og se at tabellen fylles.

---

## Feature 2: Opprett (CREATE) — Legg til ny film

### Frontend: Ny rad med input-felter

```js
// TODO: Legg til en click-listener på "addRow"-knappen som:
//       1. Lager en ny <tr> med input-felter (text, number, text, text)
//       2. Legger til Save og Cancel knapper i siste <td>
//       3. Appender raden til moviesTable
//       4. Legger til click-listeners:
//          - Save-knappen kaller saveRow(row)
//          - Cancel-knappen fjerner raden med row.remove()
```

### Frontend: Send data til backend

```js
// TODO: Lag funksjonen saveRow(row) som:
//       1. Henter verdiene fra input-feltene med row.querySelectorAll("input")
//       2. Lager et payload-objekt med name, age_limit, type, director
//       3. Fetcher POST api/movies med JSON-body
//       4. Hvis response.ok: fjern input-raden og kall addMovieRow(created)
//       5. Hvis ikke ok: vis en feilmelding
```

### Backend: Repository

```java
    // TODO: Lag metoden addMovie(Movies movie) som:
    //       1. Kjører INSERT med "RETURNING id" for å få tilbake ID-en PostgreSQL genererer
    //       2. Setter ID-en på movie-objektet
    //       Hint: db.queryForObject(sql, Long.class, ...)
```

### Backend: Controller

```java
    // TODO: Lag et POST-endepunkt som:
    //       1. Tar inn en Movies fra @RequestBody
    //       2. Kaller repository.addMovie(movie)
    //       3. Returnerer movie-objektet (med ID) tilbake til frontend
```

**Test:** Klikk "+ Add Movie", fyll inn feltene, klikk Save. Filmen skal dukke opp i tabellen med riktig ID.

---

## Feature 3: Slett (DELETE) — Fjern en film

### Frontend

```js
// TODO: Legg til en click-listener på moviesTable som:
//       1. Sjekker om knappen som ble klikket har klassen "btn-delete"
//       2. Henter id fra data-id attributtet
//       3. Fetcher DELETE api/movies/{id}
//       4. Hvis response.ok: fjern raden med row.remove()
//       5. Hvis ikke ok: vis feilmelding
//       Hint: bruk event delegation — én listener på hele tabellen
```

### Backend: Repository

```java
    // TODO: Lag metoden deleteMovie(int id) som kjører "DELETE FROM movies WHERE id = ?"
    //       Hint: db.update(sql, id)
```

### Backend: Controller

```java
    // TODO: Lag et DELETE-endepunkt på "/{id}" som:
    //       1. Tar inn id med @PathVariable
    //       2. Kaller repository.deleteMovie(id)
```

**Test:** Klikk Delete på en film. Raden skal forsvinne. Refresh og last inn på nytt for å bekrefte at den er borte fra databasen.

---

## Feature 4: Rediger (UPDATE) — Endre en film

### Frontend

```js
// TODO: I den samme click-listeneren på moviesTable, legg til håndtering for "btn-edit":
//       1. Hent innholdet fra cellene i raden
//       2. Bytt ut cellene med input-felter som har nåværende verdier som value
//       3. Bytt ut knappene med en "Save"-knapp (klasse "btn-update")

// TODO: Legg til håndtering for "btn-update":
//       1. Hent verdiene fra input-feltene
//       2. Lag et payload-objekt med id, name, age_limit, type, director
//       3. Fetch PUT api/movies/{id} med JSON-body
//       4. Hvis response.ok: fjern raden og kall addMovieRow(payload)
```

### Backend: Repository

```java
    // TODO: Lag metoden updateMovie(Movies movie) som kjører:
    //       "UPDATE movies SET name=?, age_limit=?, type=?, director=? WHERE id=?"
    //       Hint: db.update(sql, movie.getName(), ...)
```

### Backend: Controller

```java
    // TODO: Lag et PUT-endepunkt på "/{id}" som:
    //       1. Tar inn id med @PathVariable og movie med @RequestBody
    //       2. Setter id på movie-objektet
    //       3. Kaller repository.updateMovie(movie)
    //       4. Returnerer movie
```

**Test:** Klikk Edit, endre en verdi, klikk Save. Filmen skal oppdateres. Refresh og last inn for å bekrefte.

---

## Bonusoppgaver

Når du er ferdig med alle fire features, prøv disse:

1. **Sortering:** Lag en `sortTable()` funksjon som sorterer radene etter ID. Kall den etter load, save og update.

2. **Validering:** Legg til `@NotBlank` og `@Min` i `Movies.java` og `@Valid` i controlleren.

3. **Error handling:** Hva skjer om du prøver å slette en film som ikke finnes? Legg til try-catch i backend.

4. **Automatisk lasting:** Last filmene automatisk når siden åpnes, uten at brukeren trenger å klikke "Load Movies".