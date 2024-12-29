const JSONManager = {
    guardarEnLocalStorage: (clave, datos) => {
      try {
        localStorage.setItem(clave, JSON.stringify(datos));
      } catch (error) {
        console.error("Error al guardar en localStorage:", error);
      }
    },
  
    obtenerDeLocalStorage: (clave) => {
      try {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : null;
      } catch (error) {
        console.error("Error al obtener datos de localStorage:", error);
        return null;
      }
    },
  
    eliminarDeLocalStorage: (clave) => {
      try {
        localStorage.removeItem(clave);
      } catch (error) {
        console.error("Error al eliminar de localStorage:", error);
      }
    },
  };
  
  export default JSONManager;
  