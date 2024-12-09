// DOM
const resultadoDiv = document.getElementById('resultado');
const guardarBtn = document.getElementById('guardarBtn');
const leerBtn = document.getElementById('leerBtn');

// Evento: Guardar datos en LocalStorage
guardarBtn.addEventListener('click', () => {
    // Programación Defensiva: Asegurarse que los datos a guardar sean válidos
    const datos = {
        nombre: 'Juan',
        edad: 30
    };
    
    // Usando JSON para convertir los datos a formato string
    try {
        localStorage.setItem('usuario', JSON.stringify(datos));
        resultadoDiv.textContent = 'Datos guardados correctamente';
    } catch (error) {
        resultadoDiv.textContent = 'Error al guardar los datos';
    }
});

// Evento: Leer datos de LocalStorage
leerBtn.addEventListener('click', () => {
    // Intentamos obtener los datos guardados
    try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));

        // Si los datos no están, mostrar mensaje de error
        if (!usuario) {
            resultadoDiv.textContent = 'No se encontraron datos guardados';
        } else {
            // Desestructuración: Extraemos el nombre y la edad
            const { nombre, edad } = usuario;

            // Usando el operador OR para mostrar un valor por defecto en caso de que la edad no esté definida
            resultadoDiv.textContent = `Nombre: ${nombre}, Edad: ${edad || 'No disponible'}`;
        }
    } catch (error) {
        resultadoDiv.textContent = 'Error al leer los datos';
    }
});
