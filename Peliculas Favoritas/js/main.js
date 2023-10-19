
window.addEventListener('load', () => {
    ejecutarApi();
});

function mostrarGeneros(data) {
    const generosList = document.getElementById('generos-list');

    generosList.innerHTML = '';

    data.results.forEach((genero) => {
        const generoItem = document.createElement('li');
        generoItem.textContent = genero;

        generosList.appendChild(generoItem);
    });
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


