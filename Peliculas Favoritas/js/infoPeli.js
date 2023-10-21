
// Obtén el ID de la película de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get("movieId");


const getMovie = async () => {
    const http = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${movieId}`, {
        headers: {
            'X-RapidAPI-Key': 'd8885b373amsheb88d6ff1960571p13159bjsn56abd111ad7c',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
    });
    const res = await http.json()
    return res.results
}


// Función para mostrar los detalles de la película
const mostrarDetallesPelicula = async () => {
    const movie = await getMovie()
    const infoPeliculas = document.getElementById('info-peli-container');
    infoPeliculas.innerHTML = '';

    const imagen = document.createElement('img');
    if (movie.primaryImage && movie.primaryImage.url) {
        imagen.src = movie.primaryImage.url;
        imagen.alt = movie.titleText && movie.titleText.text ? movie.titleText.text : "Título no disponible";
    }

    const titulo = document.createElement('h2');
    titulo.textContent = movie.titleText && movie.titleText.text ? movie.titleText.text : "Título no disponible";

    const descripcion = document.createElement('p');
    descripcion.textContent = movie.primaryImage && movie.primaryImage.caption.plainText ? `Descripcion: ${movie.primaryImage.caption.plainText}`  : "Descripción no disponible";

    const año = document.createElement('p');
    año.textContent = movie.releaseYear && movie.releaseYear.year ? `Año de realización: ${movie.releaseYear.year}` : "Año no disponible";

    infoPeliculas.appendChild(imagen);
    infoPeliculas.appendChild(titulo);
    infoPeliculas.appendChild(descripcion);
    infoPeliculas.appendChild(año);
};

mostrarDetallesPelicula()
