document.addEventListener("DOMContentLoaded", function () {
    const sitiosList = document.getElementById("sitios-list");

    // Función para mostrar los sitios turísticos
    function displaySitios(data) {
        sitiosList.innerHTML = "";
        data.forEach(function (sitio) {
            const sitioItem = document.createElement("li");
            sitioItem.innerHTML = `
                <h2>${sitio.name ||"Sin nombre"}</h2>
                <p>${sitio.description || "Sin descripción"}</p>
                <p>Ciudad: ${sitio.city.name || "Desconocida"}</p>
                <img src="${sitio.images[0]}" alt="${sitio.name}">
            `;
            sitiosList.appendChild(sitioItem);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get("departmentId");

    // Realiza una solicitud GET a la API para cargar los sitios turísticos del departamento
    fetch(`https://api-colombia.com/api/v1/Department/${departmentId}/touristicattractions`)
        .then((response) => response.json())
        .then((sitiosData) => {
            displaySitios(sitiosData);
        })
        .catch((error) => {
            console.error("Error al cargar los sitios turísticos", error);
        });
});
