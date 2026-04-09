document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded");
})

// Get tableBody from the HTML file
const tablebodyEl = document.getElementById("deviceTableBody");

// Arrow func
// TODO: fetch data from the API-Endpoints from the Controller use DOM and add {id, name, age_limit, type, director} to "tablebodyEl"
document.getElementById("loadMovies").addEventListener("click", async () => {
    // Step 1: Fetch the response
    const response = await fetch("/api/movies")
    const data = await response.json()
    tablebodyEl.innerHTML = "";
    // Step 2: When adding the elements to the DOM include a delete <button> (Will be added later)
    data.forEach(element => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.age_limit}</td>
        <td>${element.type} </td>
        <td>${element.director} </td>
        <td>
        <button class="btn btn-danger" id="slett">Delete</button>
        </td>
        `
        tablebodyEl.append(row);
    });
})

// function call
// TODO: Add new movies to the table, with the method "POST", CREATE from CRUD
document.getElementById("Add").addEventListener("click", addMovies);

async function addMovies(event) {
    //
    event.preventDefault();

    // Step 1: Get the values from the 4 inputs in the form "addMovie" in the HTML-file.


    // Step 2: Fetch the response from api-endpoint from the controller


    // Step 3: Append the data to the tablebodyEL using a new tableRow (tr) with table data (td) and handle response not ok. (!Remember to give the user an error message)

}

// TODO: Create a function to Update movies from the movie table, with the method "PUT"
document.getElementById("update").addEventListener("click", async (event) => {
    event.preventDefault();
    // Step 1: Get the values from the 5 inputs in the form "updateMovie" in the HTML-file.


    // Step 2: Fetch the response from api-endpoint from the controller.


    // Step 3: Update the data to the tablebodyEL and handle response not ok. (!Remember to give the user an error message)
})

// TODO: Create a function to delete movies from the movie table, using the method "DELETE"

tablebodyEl.addEventListener("click", async (event) => {
    event.preventDefault();

    // Step 1: Use the delete-button created earlier, and delete a movie.

    // Step 2: Make sure the table is updated after the deletion.
});