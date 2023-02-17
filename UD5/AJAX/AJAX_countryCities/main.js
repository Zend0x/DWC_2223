function cargarPaises() {
    let solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            let select = document.getElementById("paises");
            let respuestaServer=this.responseText;
            let respuestaDividida=respuestaServer.split(", ");
            for(let i=0;i<respuestaDividida.length;i++){
              let nuevaOption=document.createElement("option");
              nuevaOption.value=respuestaDividida[i];
              nuevaOption.innerHTML=respuestaDividida[i];
              select.appendChild(nuevaOption);
            }
        }
    };
    solicitud.open("GET", "seleccionPaises.php", true);
    solicitud.send();
}

  function cargarCiudades(paisSeleccionado){
    paisSeleccionado=this.value;
    let divDistrito=document.getElementById("distrito");
    limpiarDistrito(divDistrito);
    let solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let select = document.getElementById("ciudades");
          select.innerHTML="";
          let respuestaServer=this.responseText;
          let respuestaDividida=respuestaServer.split(", ");
          for(let i=0;i<respuestaDividida.length;i++){
            let nuevaOption=document.createElement("option");
            nuevaOption.value=respuestaDividida[i];
            nuevaOption.innerHTML=respuestaDividida[i];
            select.append(nuevaOption);
          }
        }
    };
    solicitud.open("GET", "seleccionPaises.php?nombrePais="+paisSeleccionado, true);
    solicitud.send();
  }
  
  function cargarDistritos(ciudadSeleccionada){
    ciudadSeleccionada=this.value;
    let solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let divDistrito = document.getElementById("distrito");
          limpiarDistrito(divDistrito);
          let respuestaServer=solicitud.responseText;
          let respuestaSeparada=respuestaServer.split(", ");
          
          let nodoCiudad=document.createElement("h3");
          let nodoDistrito=document.createElement("p");
          let nodoPoblacion=document.createElement("p");

          nodoCiudad.innerHTML=respuestaSeparada[0];
          nodoDistrito.innerHTML=respuestaSeparada[1];
          nodoPoblacion.innerHTML=respuestaSeparada[2];

          divDistrito.appendChild(nodoCiudad);
          divDistrito.appendChild(nodoDistrito);
          divDistrito.appendChild(nodoPoblacion);
        }
    };
    solicitud.open("GET", "seleccionPaises.php?nombreCiudad="+ciudadSeleccionada,true);
    solicitud.send();
  }

  function limpiarDistrito(distrito){
    distrito.innerHTML="";
  }

window.onload = function() {
    let paises=document.getElementById("paises");
    paises.addEventListener("change",cargarCiudades);
    let ciudades=document.getElementById("ciudades");
    ciudades.addEventListener("change",cargarDistritos)
    cargarPaises();
}