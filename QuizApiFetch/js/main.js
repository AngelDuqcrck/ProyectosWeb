document.addEventListener("DOMContentLoaded", function () {

    const colombiaInfo = document.getElementById("colombia-info");
    if (colombiaInfo) {
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
    }

    const regionesList = document.getElementById("regiones-list");
    const departamentList = document.getElementById("departamentos-list");
    const departmentButton = document.getElementById("department-button");

    // Función para mostrar las regiones naturales de Colombia
    function displayRegiones(data) {
        regionesList.innerHTML = "";
        data.forEach(function (region) {
            const regionItem = document.createElement("li");
            const regionButton = document.createElement("button");
            regionButton.textContent = "Departamentos de la Region " + region.name;
            regionButton.classList.add("btn", "btn-primary");
            regionButton.addEventListener("click", () => {
                window.location.href = `departamentos.html?regionId=${region.id}`;
            });
            regionItem.innerHTML = `<strong>${region.name}:</strong> ${region.description || "Sin descripción"} <br>`;
            regionItem.appendChild(regionButton);
            regionesList.appendChild(regionItem);


        });

        

    }
    //Funcion para mostrar los departamentos por region natural
    function displayDepartment(data) {

        departamentList.innerHTML = "";
        data.forEach(function (department) {

            const departmentItem = document.createElement("li");
            const departmentButton = document.createElement("button");
            departmentButton.textContent = "Sitios turisticos de " + department.name;
            departmentButton.classList.add("btn", "btn-primary");
            departmentButton.addEventListener("click", () => {
                window.location.href = `sitios.html?departmentId=${department.id}`;
            });
            departmentItem.innerHTML = `<strong>${department.name}:</strong> ${department.description || "Sin descripción"} <br>`;
                departmentItem.appendChild(departmentButton);
                departamentList.appendChild(departmentItem);

        });

        departmentButton.addEventListener("click", () => {
            fetch(`https://api-colombia.com/api/v1/Department`)
                .then((response) => response.json())
                .then((departamentosData) => {
                    displayDepartment(departamentosData);
                })
                .catch((error) => {
                    console.error("Error al cargar los departamentos", error);
                });
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
