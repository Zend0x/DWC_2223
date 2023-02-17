function cargarPaises() {
    let solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let objetoParseado=JSON.parse(solicitud.responseText);
          let select = document.getElementById("paises");
          for(let i=0;i<objetoParseado.length;i++){
            let nuevaOption=document.createElement("option");
            nuevaOption.value=objetoParseado[i]["Name"];
            nuevaOption.innerHTML=objetoParseado[i]["Name"];
            select.appendChild(nuevaOption);
          }
        }
    };
    solicitud.open("GET", "seleccionPaises.php", true);
    solicitud.send();
}

  function cargarCiudades(paisSeleccionado){
    paisSeleccionado=this.value;
    let solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let objetoParseado=JSON.parse(solicitud.responseText);
        console.log(objetoParseado);
        let select = document.getElementById("ciudades");
        select.parentNode.removeChild(select);
        let divCiudad=document.getElementById("ciudad");
        let selectNuevo=document.createElement("select");
        divCiudad.appendChild(selectNuevo);
        selectNuevo.name="ciudades";
        selectNuevo.id="ciudades";

        for(let i=0;i<objetoParseado.length;i++){
          let nuevaOption=document.createElement("option");
          nuevaOption.value=objetoParseado[i]["nombreCiudad"];
          nuevaOption.innerHTML=objetoParseado[i]["nombreCiudad"];
          select.appendChild(nuevaOption);
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
            let select = document.getElementById("distrito");
            select.innerHTML=solicitud.responseText;
        }
    };
    solicitud.open("GET", "seleccionPaises.php?nombreCiudad="+ciudadSeleccionada,true);
    solicitud.send();
  }

window.onload = function() {
    let paises=document.getElementById("paises");
    paises.addEventListener("change",cargarCiudades);
    let ciudades=document.getElementById("ciudades");
    ciudades.addEventListener("change",cargarDistritos)
    cargarPaises();
}