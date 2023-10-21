window.addEventListener('load', () => {
    ejecutarApi();
});

let generoSelected = ''
const selected = document.getElementById('generosP')
const peliculasContainer = document.getElementById('peliculas-container')
const peliculasFavorias = []
const infoPeliculas = document.getElementById('info-peli-container');
selected.addEventListener("change", async (e) => {
    const movies = await getMovies(e.target.value)
    console.log(movies);
    pintarPeliculas(movies)
})


const getMovies = async (genero) => {
    const url = `https://moviesdatabase.p.rapidapi.com/titles?genre=${genero}`;
    const http = await fetch(url, {
        headers: {
            'X-RapidAPI-Key': 'd8885b373amsheb88d6ff1960571p13159bjsn56abd111ad7c',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
    })
    const res = http.json()
    return res;
}

const addMovieToFav = (movie) => {
    peliculasFavorias.push(movie)
    localStorage.setItem("peliculasFav", JSON.stringify(peliculasFavorias))
}

/**
 * 
 *  {
            "_id": "61e57fd65c5338f43c777f6a",
            "id": "tt0000132",
            "primaryImage": {
                "id": "rm1423726592",
                "width": 550,
                "height": 800,
                "url": "https://m.media-amazon.com/images/M/MV5BODQ0NGEyMjgtMDdhMC00ZTc3LWIyMjktNTQyYzFiMmY0OGRhXkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_.jpg",
                "caption": {
                    "plainText": "Gaston Méliès and Georges Méliès in Une partie de cartes (1896)",
                    "__typename": "Markdown"
                },
                "__typename": "Image"
            },
            "titleType": {
                "text": "Short",
                "id": "short",
                "isSeries": false,
                "isEpisode": false,
                "__typename": "TitleType"
            },
            "titleText": {
                "text": "Une partie de cartes",
                "__typename": "TitleText"
            },
            "originalTitleText": {
                "text": "Une partie de cartes",
                "__typename": "TitleText"
            },
            "releaseYear": {
                "year": 1896,
                "endYear": null,
                "__typename": "YearRange"
            },
            "releaseDate": {
                "day": null,
                "month": null,
                "year": 1896,
                "__typename": "ReleaseDate"
            }
        },
 */

const pintarPeliculas = (data) => {
    peliculasContainer.innerHTML = ''
    data.results.forEach(movie => {

        const img = movie.primaryImage ?? ''


        const button = document.createElement('button');
        button.innerText = "Agregar a favoritos";
        button.classList.add('btn')
        button.classList.add('btn-primary')
        
        const button2 = document.createElement('button');
        button2.innerText = "Info Pelicula "+movie.titleText.text;
        button2.classList.add('btn');
        button2.classList.add('btn-primary');
        
        button2.setAttribute("data-id", movie.id);

            button2.addEventListener("click", function () {
                const movieId = this.getAttribute("data-id");
                window.location.href = `infoPeli.html?movieId=${movieId}`;
            });

        button.addEventListener("click", () => addMovieToFav(movie));

        const item = document.createElement('div');
        item.classList.add('card');
        item.style.width = '18rem';
        
        item.innerHTML = `
        <img src=${movie.primaryImage?.url || '/images/peliculadefault.jpg'} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${movie.titleText.text}</h5>
                
            </div>
        `;
        
        item.appendChild(button);
        item.appendChild(button2);
        peliculasContainer.appendChild(item);
    })
}

function mostrarGeneros(data) {
    const generosList = document.getElementById('generosP');

    generosList.innerHTML = '';

    data.results.forEach((genero) => {
        if(genero!== null){
            const generoItem = document.createElement('option');
            generoItem.textContent = genero;
            generoItem.value = genero
            generosList.appendChild(generoItem);
        }
        
    });
}

function mostrarPeliculasFavoritas() {
    const peliculasFavoritas = JSON.parse(localStorage.getItem("peliculasFav"));
    const divResultados = document.getElementById("divResultados");

    if (peliculasFavoritas && peliculasFavoritas.length > 0) {
        const ul = document.createElement("ul");

        peliculasFavoritas.forEach((movie) => {
            const li = document.createElement("li");
            li.textContent = movie.titleText.text;
            ul.appendChild(li);
        });

        divResultados.appendChild(ul);
    } else {
        divResultados.textContent = "No hay películas favoritas almacenadas.";
    }
}

function borrarDatos(){    
    console.log("Borrado");
    window.localStorage.clear();        
    console.log(localStorage.length);
    contador=0;
    document.getElementById("divResultados").innerHTML = "<br><div class='alert alert-success role='alert'>" +
                                                  "Peliculas favoritas borradas correctamente.</div>";
}

if (window.location.pathname.includes("favoritePeli.html")) {
    mostrarPeliculasFavoritas();
}

function ejecutarApi() {
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres';
    fetch(url, {
        headers: {
            'X-RapidAPI-Key': 'd8885b373amsheb88d6ff1960571p13159bjsn56abd111ad7c',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
    })
        .then((response) => response.json())
        .then((data) => mostrarGeneros(data))
        .catch((error) => console.log(error));
}