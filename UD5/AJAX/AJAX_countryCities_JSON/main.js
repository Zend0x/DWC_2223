function cargarPaises() {
  let solicitud = new XMLHttpRequest();
  solicitud.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let objetoParseado = JSON.parse(solicitud.responseText);
      let select = document.getElementById("paises");
      for (let i = 0; i < objetoParseado.length; i++) {
        let nuevaOption = document.createElement("option");
        nuevaOption.value = objetoParseado[i]["Name"];
        nuevaOption.innerHTML = objetoParseado[i]["Name"];
        select.appendChild(nuevaOption);
      }
    }
  };
  solicitud.open("GET", "seleccionPaises.php", true);
  solicitud.send();
}

function limpiarCiudades(nodoSelect) {
  let elementosOption = nodoSelect.getElementsByTagName("option");
  for (let i = elementosOption.length; i <= elementosOption.length; i--) {
    nodoSelect.removeChild(elementosOption[i]);
  }
}

function cargarCiudades(paisSeleccionado) {
  paisSeleccionado = this.value;
  let solicitud = new XMLHttpRequest();
  let divDistrito = document.getElementById("distrito");
  limpiarDistrito(divDistrito);
  solicitud.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let select = document.getElementById("ciudades");
      select.innerHTML = "";
      let objetoParseado = JSON.parse(solicitud.responseText);
      let nodoSelect = document.getElementById("ciudades");
      for (let i = 0; i < objetoParseado.length; i++) {
        let nuevaOption = document.createElement("option");
        nuevaOption.value = objetoParseado[i]["ID"];
        nuevaOption.innerHTML = objetoParseado[i]["nombreCiudad"];
        nodoSelect.appendChild(nuevaOption);
      }
    }
  };
  solicitud.open("GET", "seleccionPaises.php?nombrePais=" + paisSeleccionado, true);
  solicitud.send();
}

function cargarDistritos(ciudadSeleccionada) {
  ciudadSeleccionada = this.value;
  let solicitud = new XMLHttpRequest();
  solicitud.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let objetoParseado = JSON.parse(solicitud.responseText);
      let divDistrito = document.getElementById("distrito");
      limpiarDistrito(divDistrito);
      for (let i = 0; i < objetoParseado.length; i++) {
        let tituloCiudad = document.createElement("h1");
        let nombreDistrito = document.createElement("p");
        let poblacionDistrito = document.createElement("p");

        tituloCiudad.innerHTML = objetoParseado[i].Name;
        nombreDistrito.innerHTML = "Distrito: <b>"+objetoParseado[i].District+"</b>";
        poblacionDistrito.innerHTML = "Población: <b>"+objetoParseado[i].Population+"</b>";

        divDistrito.appendChild(tituloCiudad);
        divDistrito.appendChild(nombreDistrito);
        divDistrito.appendChild(poblacionDistrito);
      }
    }
  }
  solicitud.open("GET", "seleccionPaises.php?id_ciudad="+ciudadSeleccionada, true);
  solicitud.send();
}
function limpiarDistrito(distrito) {
  distrito.innerHTML = "";
}

window.onload = function () {
  let paises = document.getElementById("paises");
  paises.addEventListener("click", cargarCiudades);
  let ciudades = document.getElementById("ciudades");
  ciudades.addEventListener("click", cargarDistritos)
  cargarPaises();
}