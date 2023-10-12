document.addEventListener("DOMContentLoaded", function () {
    const departamentosList = document.getElementById("departamentos-list");

    // Función para mostrar los departamentos
    function displayDepartamentos(data) {
        departamentosList.innerHTML = "";
        data.forEach(function (department) {
            const departmentItem = document.createElement("li");
            
            const viewButton = document.createElement("button");
            viewButton.textContent = "Sitios Turísticos de "+department.name;
            viewButton.classList.add("btn", "btn-primary");
            viewButton.setAttribute("data-id", department.id);

            viewButton.addEventListener("click", function () {
                const departmentId = this.getAttribute("data-id");
                window.location.href = `sitios.html?departmentId=${departmentId}`;
            });

            departmentItem.innerHTML = `<strong>${department.name}:</strong> ${department.description || "Sin descripción"} <br>`;

            departmentItem.appendChild(viewButton);
            
            departamentosList.appendChild(departmentItem);
        });
    }

    // Realiza una solicitud GET a la API para cargar los departamentos
    fetch("https://api-colombia.com/api/v1/Department")
        .then((response) => response.json())
        .then((departamentosData) => {
            displayDepartamentos(departamentosData);
        })
        .catch((error) => {
            console.error("Error al cargar los departamentos", error);
        });
});
