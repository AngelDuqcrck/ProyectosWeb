
const divResultados = document.getElementById("divResultados");

function pintarPeliculasFavoritas(data) {
    divResultados.innerHTML = '';

    data.forEach(movie => {
        const item = document.createElement('div');
        item.classList.add('card');
        item.style.width = '18rem';

        item.innerHTML = `
            <img src=${movie.primaryImage?.url || '/images/peliculadefault.jpg'} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${movie.titleText.text}</h5>
            </div>
        `;

        divResultados.appendChild(item);
    });
}


function mostrarPeliculasFavoritas() {
    const peliculasFavoritas = JSON.parse(localStorage.getItem("peliculasFav"));

    if (peliculasFavoritas && peliculasFavoritas.length > 0) {
        pintarPeliculasFavoritas(peliculasFavoritas);
    } else {
        document.getElementById("divResultados").innerHTML = "<br><div class='alert alert-success role='alert'>" +
        "No hay peliculas favoritas almacenadas.</div>";
    }
}


function borrarDatos() {
    console.log("Borrado");
    window.localStorage.clear();        
    console.log(localStorage.length);
    contador=0;
    document.getElementById("divResultados").innerHTML = "<br><div class='alert alert-success role='alert'>" +
                                                  "Todas las peliculas favoritas fueron borradas correctamente.</div>";
}

window.addEventListener('load', () => {
    mostrarPeliculasFavoritas();
});
