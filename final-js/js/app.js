// Constructor y almacenamiento
class Mascota {
    constructor(nombre, edad, raza) {
      this.nombre = nombre;
      this.edad = edad;
      this.raza = raza;
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
  
  const mascotas = [];
  let mascotaSeleccionada = new Mascota("Ejemplo", 3, "Golden");
  mascotas.push(mascotaSeleccionada);
  
  // Variables DOM
  const agregarDatoBtn = document.getElementById('agregarDatoBtn');
  const popupForm = document.getElementById('popupForm');
  const cerrarPopupBtn = document.getElementById('cerrarPopupBtn');
  const cargarDosisBtn = document.getElementById('cargarDosisBtn');
  const tablaVacunas = document.getElementById('tablaVacunas');
  const ordenarFechasBtn = document.getElementById('ordenarFechas');
  const cargarImagen = document.getElementById('cargarImagen');
  const imagenCarga = document.getElementById('imagenCarga');
  
  // Abrir el formulario pop-up
  agregarDatoBtn.addEventListener('click', () => {
    popupForm.classList.remove('oculto');
    document.getElementById('vacunaNombre').value = '';
    document.getElementById('fechaAplicacion').value = '';
    document.getElementById('fechaProxima').value = '';
  });
  
  // Cerrar el formulario pop-up
  cerrarPopupBtn.addEventListener('click', () => {
    popupForm.classList.add('oculto');
  });
  
  // Autoformato para las fechas
  document.querySelectorAll('#fechaAplicacion, #fechaProxima').forEach(input => {
    input.addEventListener('input', (e) => {
      const value = e.target.value.replace(/\D/g, '');
      e.target.value = value
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2}\/\d{2})(\d+)/, '$1/$2');
    });
  });
  
  // Cargar nueva dosis
  cargarDosisBtn.addEventListener('click', () => {
    const vacunaNombre = document.getElementById('vacunaNombre').value;
    const fechaAplicacion = document.getElementById('fechaAplicacion').value;
    const fechaProxima = document.getElementById('fechaProxima').value;
  
    if (!vacunaNombre || !fechaAplicacion || !fechaProxima) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    const nuevaVacuna = new Vacuna(vacunaNombre, fechaAplicacion, fechaProxima);
    mascotaSeleccionada.vacunas.push(nuevaVacuna);
  
    actualizarTabla();
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
        </tr>
      `)
      .join('');
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
        imagenCarga.innerHTML = `<img src="${event.target.result}" alt="Foto de Mascota">`;
      };
      reader.readAsDataURL(file);
    }
  });

  