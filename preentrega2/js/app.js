//PREENTREGA 2 DEBE TENER
//ACOMODAR BIEN LAS CARPETAS
//ARRAY
//FUNCIONES
//METODOS ARAYS YA SEAN FILTER, FOREACH, MAP, FIND, ETC
//ARROW FUNCTION
//FUNCIONES ORDEN SUPERIOR
//CONSOLE LOG ¿?

// Definir variable para mayores de edad
let mayores = 18;

// Array personas
const people = [
    { name: "Juan", age: 25 },
    { name: "Pedro", age: 17 },
    { name: "Ana", age: 19 },
    { name: "Roberto", age: 15 }
];

// Objeto constructor de personas
// VER PARA HACERLO CON CLASS
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    isAdult(mayores) {
        return this.age >= mayores;
    }
}

// Referencia al contenedor de salida
const outputDiv = document.getElementById("output");

// Función para mostrar el resultado en pantalla
function displayOutput(message) {
    outputDiv.innerHTML = message;
}

// ID agregar persona
document.getElementById("agregarPersona").addEventListener("click", () => {
    const name = prompt("Ingresa el nombre de la persona:");
    const age = parseInt(prompt("Ingresa la edad de la persona:"));
    if (!isNaN(age) && name) {
        const newPerson = new Person(name, age);
        people.push(newPerson);
        displayOutput(`Agregaste a ${newPerson.name} (${newPerson.age} años).`);
    } else {
        displayOutput("Datos inválidos. No se agregó ninguna persona.");
    }
});

// ID mostrar adultos
document.getElementById("mostrarMayores").addEventListener("click", () => {
    const adults = people.filter(person => person.age >= mayores);
    if (adults.length > 0) {
        const message = adults.map(person => `${person.name}, ${person.age} años`).join("<br>");
        displayOutput("Personas mayores de 18:<br>" + message);
    } else {
        displayOutput("No hay personas mayores de 18.");
    }
});

// ID buscar persona
document.getElementById("buscarPersona").addEventListener("click", () => {
    const searchName = prompt("Ingresa el nombre que buscas:");
    const foundPerson = people.find(person => person.name.toLowerCase() === searchName.toLowerCase());
    if (foundPerson) {
        displayOutput(`Persona encontrada: ${foundPerson.name}, ${foundPerson.age} años.`);
    } else {
        displayOutput(`No se encontró a nadie con el nombre "${searchName}".`);
    }
});
