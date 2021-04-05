import { API } from "./api.js";
import * as UI from "./interfaz.js";

UI.formularioBuscar.addEventListener("submit", (e) => {
  e.preventDefault();

  //obtener datos del formulario
  const Artista = document.querySelector("#artista").value,
    Cancion = document.querySelector("#cancion").value;

  //mensaje de error a los campos vacios
  if (Artista === "" || Cancion === "") {
    UI.divMensajes.innerHTML = "ERROR.... Todos los campos obligatorios";
    UI.divMensajes.classList.add("error");
    setTimeout(() => {
      UI.divMensajes.innerHTML = "";
      UI.divMensajes.classList.remove("error");
    }, 3000);
    //formulatio esta completro realizar consulta a la API
  } else {
    const api = new API(artista, cancion);
    api.consultarAPI().then((data) => {
      if (data.respuesta.lyrics) {
        const letra = data.respuesta.lyrics
          UI.divResultado.textContent = letra;
      } else {
        UI.divMensajes.innerHTML =
          "Lo sentimos la cancion no Existe Prueba con otra";
        UI.divMensajes.classList.add("error");
        setTimeout(() => {
          UI.divMensajes.innerHTML = "";
          UI.divMensajes.classList.remove("error");
          UI.formularioBuscar.reset();
        }, 3000);
      }
    });
  }
});
