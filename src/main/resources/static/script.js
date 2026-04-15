const moviesTable = document.getElementById("deviceTableBody");

// 1. Load movies
document.getElementById("loadMovies").addEventListener("click", async () => {
    const response = await fetch("api/movies");
    const data = await response.json();
    moviesTable.innerHTML = "";
    data.forEach(movie => addMovieRow(movie));
});

// 2. Add empty row
document.getElementById("addRow").addEventListener("click", () => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>-</td>
        <td><input class="form-control" type="text"></td>
        <td><input class="form-control" type="number"></td>
        <td><input class="form-control" type="text"></td>
        <td><input class="form-control" type="text"></td>
        <td>
            <button class="btn btn-primary btn-sm btn-save">Save</button>
            <button class="btn btn-secondary btn-sm btn-cancel">Cancel</button>
        </td>
    `;
    moviesTable.append(row);
    row.querySelector(".btn-save").addEventListener("click", () => saveRow(row));
    row.querySelector(".btn-cancel").addEventListener("click", () => row.remove());
});

// 3. Save new row
async function saveRow(row) {
    const inputs = row.querySelectorAll("input");
    const payload = {
        name: inputs[0].value.trim(),
        age_limit: Number(inputs[1].value),
        type: inputs[2].value.trim(),
        director: inputs[3].value.trim()
    };

    const response = await fetch("api/movies", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    if (!response.ok) { alert("Failed to add movie"); return; }

    const created = await response.json();
    row.remove();
    addMovieRow(created);
    sortTable();
}

// 4. Helper: add movie row
function addMovieRow(movie) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${movie.id}</td>
        <td>${movie.name}</td>
        <td>${movie.age_limit}</td>
        <td>${movie.type}</td>
        <td>${movie.director}</td>
        <td>
            <button class="btn btn-warning btn-sm btn-edit" data-id="${movie.id}">Edit</button>
            <button class="btn btn-danger btn-sm btn-delete" data-id="${movie.id}">Delete</button>
        </td>
    `;
    moviesTable.appendChild(row);
}

// 5. Delete and Edit handler (one listener for both)
moviesTable.addEventListener("click", async (event) => {
    const btn = event.target;
    const row = btn.closest("tr");
    const id = btn.dataset.id;

    // Delete
    if (btn.classList.contains("btn-delete")) {
        const response = await fetch(`api/movies/${id}`, {method: "DELETE"});
        response.ok ? row.remove() : alert("Failed to delete");
    }

    // Edit: swap cells to inputs
    if (btn.classList.contains("btn-edit")) {
        const cells = row.querySelectorAll("td");
        row.innerHTML = `
            <td>${id}</td>
            <td><input class="form-control" value="${cells[1].textContent}"></td>
            <td><input class="form-control" type="number" value="${cells[2].textContent}"></td>
            <td><input class="form-control" value="${cells[3].textContent}"></td>
            <td><input class="form-control" value="${cells[4].textContent}"></td>
            <td><button class="btn btn-success btn-sm btn-update" data-id="${id}">Save</button></td>
        `;
    }

    // Save edit
    if (btn.classList.contains("btn-update")) {
        const inputs = row.querySelectorAll("input");
        const payload = {
            id: Number(id),
            name: inputs[0].value.trim(),
            age_limit: Number(inputs[1].value),
            type: inputs[2].value.trim(),
            director: inputs[3].value.trim()
        };

        const response = await fetch(`api/movies/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        if (response.ok) { row.remove(); addMovieRow(payload); }
        else { alert("Failed to update"); }
    }
});