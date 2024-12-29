import JSONManager from './storage.js';

// Constructor y almacenamiento
class Mascota {
  constructor(nombre, edad, raza, imagen = '') {
    this.nombre = nombre;
    this.edad = edad;
    this.raza = raza;
    this.imagen = imagen;
    this.vacunas = [];
  }
}

class Vacuna {
  constructor(nombre, fechaAplicacion, fechaProxima) {
    this.nombre = nombre;
    this.fechaAplicacion = fechaAplicacion;
    this.fechaProxima = fechaProxima;
  }
}

const mascotas = JSONManager.obtenerDeLocalStorage("mascotas") || [];
let mascotaSeleccionada = mascotas[0] || new Mascota("Nombre", "edad", "Raza");
if (!mascotas.length) mascotas.push(mascotaSeleccionada);

JSONManager.guardarEnLocalStorage("mascotas", mascotas);

// Variables DOM
const agregarDatoBtn = document.getElementById('agregarDatoBtn');
const popupForm = document.getElementById('popupForm');
const cerrarPopupBtn = document.getElementById('cerrarPopupBtn');
const cargarDosisBtn = document.getElementById('cargarDosisBtn');
const tablaVacunas = document.getElementById('tablaVacunas');
const ordenarFechasBtn = document.getElementById('ordenarFechas');
const cargarImagen = document.getElementById('cargarImagen');
const imagenCarga = document.getElementById('imagenCarga');
const nombreMascotaInput = document.getElementById('nombreMascota');
const edadMascotaInput = document.getElementById('edadMascota');
const razaMascotaInput = document.getElementById('razaMascota');

// Inicializar campos con datos existentes
nombreMascotaInput.value = mascotaSeleccionada.nombre;
edadMascotaInput.value = mascotaSeleccionada.edad;
razaMascotaInput.value = mascotaSeleccionada.raza;
if (mascotaSeleccionada.imagen) {
  imagenCarga.innerHTML = `<img src="${mascotaSeleccionada.imagen}" alt="Foto de Mascota">`;
}

// Guardar cambios en nombre, edad y raza
[nombreMascotaInput, edadMascotaInput, razaMascotaInput].forEach(input => {
  input.addEventListener('input', () => {
    mascotaSeleccionada.nombre = nombreMascotaInput.value;
    mascotaSeleccionada.edad = edadMascotaInput.value;
    mascotaSeleccionada.raza = razaMascotaInput.value;
    JSONManager.guardarEnLocalStorage("mascotas", mascotas);
  });
});

// Inicializar Flatpickr
flatpickr('#fechaAplicacion', { dateFormat: 'd/m/Y' });
flatpickr('#fechaProxima', { dateFormat: 'd/m/Y' });

// Mostrar notificación con Toastify
const mostrarNotificacion = (mensaje) => {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    backgroundColor: '#4CAF50',
  }).showToast();
};

// Abrir el formulario pop-up
agregarDatoBtn.addEventListener('click', () => {
  popupForm.classList.remove('oculto');
  document.getElementById('vacunaNombre').value = '';
  document.getElementById('fechaAplicacion').value = '';
  document.getElementById('fechaProxima').value = '';

  cargarDosisBtn.onclick = () => {
    const vacunaNombre = document.getElementById('vacunaNombre').value;
    const fechaAplicacion = document.getElementById('fechaAplicacion').value;
    const fechaProxima = document.getElementById('fechaProxima').value;

    if (!vacunaNombre || !fechaAplicacion || !fechaProxima) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }

    const nuevaVacuna = new Vacuna(vacunaNombre, fechaAplicacion, fechaProxima);
    mascotaSeleccionada.vacunas.push(nuevaVacuna);
    JSONManager.guardarEnLocalStorage("mascotas", mascotas);

    actualizarTabla();
    popupForm.classList.add('oculto');

    // Mostrar notificación
    mostrarNotificacion('¡Agregado con éxito!');
  };
});

// Cerrar el formulario pop-up
cerrarPopupBtn.addEventListener('click', () => {
  popupForm.classList.add('oculto');
});

// Actualizar tabla
const actualizarTabla = () => {
  tablaVacunas.innerHTML = mascotaSeleccionada.vacunas
    .map((vacuna, index) => `
      <tr>
        <td>${vacuna.nombre}</td>
        <td>${vacuna.fechaAplicacion}</td>
        <td>${vacuna.fechaProxima}</td>
        <td>
          <span class="icono-editar" data-index="${index}">✏️</span>
          <span class="icono-eliminar" data-index="${index}">🗑️</span>
        </td>
      </tr>
    `)
    .join('');

  // Asignar eventos a los botones
  document.querySelectorAll('.icono-editar').forEach(btn => {
    btn.addEventListener('click', editarVacuna);
  });

  document.querySelectorAll('.icono-eliminar').forEach(btn => {
    btn.addEventListener('click', eliminarVacuna);
  });
};

// Función para eliminar una fila
const eliminarVacuna = (e) => {
  const index = e.target.getAttribute('data-index');
  mascotaSeleccionada.vacunas.splice(index, 1);
  JSONManager.guardarEnLocalStorage("mascotas", mascotas);
  actualizarTabla();
};

// Función para editar una fila
const editarVacuna = (e) => {
  const index = e.target.getAttribute('data-index');
  const vacuna = mascotaSeleccionada.vacunas[index];

  // Abrir el popup con los datos de la vacuna
  document.getElementById('vacunaNombre').value = vacuna.nombre;
  document.getElementById('fechaAplicacion').value = vacuna.fechaAplicacion;
  document.getElementById('fechaProxima').value = vacuna.fechaProxima;
  popupForm.classList.remove('oculto');

  cargarDosisBtn.onclick = () => {
    vacuna.nombre = document.getElementById('vacunaNombre').value;
    vacuna.fechaAplicacion = document.getElementById('fechaAplicacion').value;
    vacuna.fechaProxima = document.getElementById('fechaProxima').value;

    JSONManager.guardarEnLocalStorage("mascotas", mascotas);
    actualizarTabla();
    popupForm.classList.add('oculto');

    // Mostrar notificación
    mostrarNotificacion('¡Actualizado con éxito!');
  };
};

// Ordenar fechas
let ordenAscendente = true;
ordenarFechasBtn.addEventListener('click', () => {
  mascotaSeleccionada.vacunas.sort((a, b) => {
    const dateA = new Date(a.fechaProxima.split('/').reverse().join('-'));
    const dateB = new Date(b.fechaProxima.split('/').reverse().join('-'));
    return ordenAscendente ? dateA - dateB : dateB - dateA;
  });
  ordenAscendente = !ordenAscendente;
  actualizarTabla();
});

// Cargar imagen
imagenCarga.addEventListener('click', () => {
  cargarImagen.click();
});

cargarImagen.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      mascotaSeleccionada.imagen = event.target.result;
      JSONManager.guardarEnLocalStorage("mascotas", mascotas);
      imagenCarga.innerHTML = `<img src="${event.target.result}" alt="Foto de Mascota">`;
    };
    reader.readAsDataURL(file);
  }
});

// Fetch asíncrono con try-catch
const obtenerDatosEjemplo = async () => {
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!respuesta.ok) throw new Error('Error al obtener los datos');

    const datos = await respuesta.json();
    console.log("Datos obtenidos:", datos);
  } catch (error) {
    console.error("Error en fetch:", error);
  }
};

obtenerDatosEjemplo();

// Actualización inicial de la tabla
actualizarTabla();
