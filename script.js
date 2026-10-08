
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


const cantidadGeneral = document.getElementById("cantidad-general");
const totalGeneral = document.getElementById("total-general");

const precioGeneral = 3500;

if (cantidadGeneral && totalGeneral) {

    cantidadGeneral.addEventListener("input", function () {

        let cantidad = Number(cantidadGeneral.value);

        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 10) {
            totalGeneral.textContent = "Selecciona de 1 a 10 boletos";
            return;
        }

        let total = cantidad * precioGeneral;

        totalGeneral.textContent = total.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0
        });

    });

}
