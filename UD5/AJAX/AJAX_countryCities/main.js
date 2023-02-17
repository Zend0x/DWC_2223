function cargarPaises() {
    var solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            var select = document.getElementById("paises");
            select.innerHTML=solicitud.responseText;
        }
    };
    solicitud.open("GET", "seleccionPaises.php", true);
    solicitud.send();
  }

  function cargarCiudades(paisSeleccionado){
    paisSeleccionado=this.value;
    var solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            var select = document.getElementById("ciudades");
            select.innerHTML=solicitud.responseText;
        }
    };
    solicitud.open("GET", "seleccionPaises.php?nombrePais="+paisSeleccionado, true);
    solicitud.send();
  }
  
  function cargarDistritos(ciudadSeleccionada){
    ciudadSeleccionada=this.value;
    var solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            var select = document.getElementById("distrito");
            select.innerHTML=solicitud.responseText;
        }
    };
    solicitud.open("GET", "seleccionPaises.php?nombreCiudad="+ciudadSeleccionada, true);
    solicitud.send();
  }

window.onload = function() {
    let paises=document.getElementById("paises");
    paises.addEventListener("change",cargarCiudades);
    let ciudades=document.getElementById("ciudades");
    ciudades.addEventListener("change",cargarDistritos)
    cargarPaises();
};