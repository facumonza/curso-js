// DOM
const resultadoDiv = document.getElementById('resultado');
const leerBtn = document.getElementById('leerBtn');
const usuarioForm = document.getElementById('usuarioForm');
const nombreInput = document.getElementById('nombre');
const edadInput = document.getElementById('edad');

// EVENTO PARA GUARDAR DATOS EM LS
usuarioForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    // PROGRAMACION DEFENSIVA
    const nombre = nombreInput.value.trim();
    const edad = parseInt(edadInput.value.trim(), 10);

    if (!nombre || isNaN(edad) || edad <= 0) {
        resultadoDiv.textContent = 'Por favor, ingresa datos válidos.';
        return;
    }

    // GUARDAR DATOS EN LS
    const datos = { nombre, edad };

    try {
        localStorage.setItem('usuario', JSON.stringify(datos));
        resultadoDiv.textContent = 'Usuario guardado correctamente.';
        usuarioForm.reset();
    } catch (error) {
        resultadoDiv.textContent = 'Error al guardar los datos.';
    }
});

// LEER DATOS DEL LS
leerBtn.addEventListener('click', () => {
    try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));

        if (!usuario) {
            resultadoDiv.textContent = 'No se encontraron datos guardados.';
        } else {
            const { nombre, edad } = usuario;
            resultadoDiv.textContent = `Nombre: ${nombre}, Edad: ${edad || 'No disponible'}`;
        }
    } catch (error) {
        resultadoDiv.textContent = 'Error al leer los datos.';
    }
});
