document.addEventListener("DOMContentLoaded", function () {

    const colombiaInfo = document.getElementById("colombia-info");

    function displayColombiaInfo(data) {
        colombiaInfo.innerHTML = `
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <p>Capital: ${data.stateCapital}</p>
                <p>Población: ${data.population}</p>
                <p>Idiomas: ${data.languages.join(", ")}</p>
                <p>Zona Horaria: ${data.timeZone}</p>
                <p>Moneda: ${data.currency} (${data.currencyCode})</p>
                <p>Código ISO: ${data.isoCode}</p>
                <p>Dominio de Internet: ${data.internetDomain}</p>
                <p>Prefijo Telefónico: ${data.phonePrefix}</p>
            `;
    }


    const regionesList = document.getElementById("regiones-list");
    const departamentList = document.getElementById("departamentos-list");
    const departmentButton = document.getElementById("department-button");

    // Función para mostrar las regiones naturales de Colombia
    function displayRegiones(data) {
        regionesList.innerHTML = "";
        data.forEach(function (region) {
            const regionItem = document.createElement("li");
            const departButton = document.createElement("button");
            departButton.textContent = "Departamentos de  la Region "+region.name;
            departButton.classList.add("btn", "btn-primary");
            departButton.setAttribute("data-id", region.id);

            departButton.addEventListener("click", function () {
                const regionId = this.getAttribute("data-id");
                window.location.href = `departamentos.html?regionId=${regionId}`;
            });

            
            regionItem.innerHTML = `<strong> Region ${region.name} <br></strong> ${region.description || "Sin descripción"} <br>`;
            regionItem.appendChild(departButton);
            regionesList.appendChild(regionItem);


        });



    }
    // Realiza una solicitud GET a la API para cargar la información de Colombia
    fetch("https://api-colombia.com/api/v1/country/Colombia")
        .then((response) => response.json())
        .then((colombiadata) => {
            displayColombiaInfo(colombiadata);

            // Luego, realiza una solicitud GET a la API para cargar las regiones
            return fetch("https://api-colombia.com/api/v1/Region");
        })
        .then((response) => response.json())
        .then((regionesData) => {
            displayRegiones(regionesData);

        })

        .catch((error) => {
            console.error("Error al cargar la información de Colombia y las regiones y departamentos", error);
        });


});
