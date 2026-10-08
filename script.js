
document.addEventListener("DOMContentLoaded", function () {

    console.log("Festival del Fuego iniciado correctamente");

    const boton = document.querySelector("body > button");

    if (boton) {
        boton.addEventListener("click", function () {
            document.getElementById("festival").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

});
