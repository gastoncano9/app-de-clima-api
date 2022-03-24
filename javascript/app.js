'use strict';

let contenedorClima = document.querySelector(".contenedor-clima");
let formulario = document.getElementById("formulario");
let temperatura = document.getElementById("temperatura");
let icono = document.getElementById("icono");
let descripcion = document.getElementById("descripcion");
let temperaturaMinima = document.getElementById("minimo");
let temperaturaMaxima = document.getElementById("maximo");
let ciudad = document.getElementById("ciudad");
let ciudadDiv = document.getElementById("ciudad-campo");
let actualizar = document.getElementById("actualizar");


const obtenerData = (ciudad) =>
{
    fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${ciudad}&units=%20metric&lang=sp`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "f00d49ceb7mshf01c1507b7cca46p102f61jsnc0c40fb4fad4"
        }
    })
    .then(response => response.json())
    .then(response =>
    {
        cambiarFondo(response);
        escribirDatos(response);
    })
    .catch(error => 
    {
        error = "Introduzca una ciudad valida";
        alert(error);
    });

}

const cambiarFondo = (objeto) =>
{
    let datoEspaniol = new Date(objeto.list[4].dt*1000).toLocaleString("es-ES",
    {
        timeStyle:"short",
        dateStyle:"long"
    });

    console.log(datoEspaniol);

    const horaDia = new Date(objeto.list[4].dt*1000).getHours();

    if(horaDia < 6 && horaDia > 19)
    {
        contenedorClima.classList.remove("dia");
        contenedorClima.classList.add("noche");
    }
    else
    {
        contenedorClima.classList.remove("noche");
        contenedorClima.classList.add("dia");
    }

    actualizar.innerHTML = `Ultima actualización ${datoEspaniol}`;
}

const escribirDatos = (objeto) =>
{
    console.log(objeto);
    temperatura.innerHTML = Math.floor(farenheitAcelsius(objeto.list[0].main.temp));
    descripcion.innerHTML = objeto.list[0].weather[0].description.toUpperCase();
    ciudadDiv.innerHTML = objeto.list[0].name.toUpperCase(); 
    temperaturaMinima.innerHTML = `Min ${Math.floor(farenheitAcelsius(objeto.list[0].main.temp_min))}ºc`;
    temperaturaMaxima.innerHTML = `Max ${Math.floor(farenheitAcelsius(objeto.list[0].main.temp_max))}ºc`;
}

formulario.addEventListener("submit", (e) =>
{
    e.preventDefault();
    obtenerData(ciudad.value);
});

window.onload = () =>
{
    obtenerData("Buenos aires");
}

const farenheitAcelsius = (numero) =>
{
    numero = numero - 273.15;

    return numero;
}