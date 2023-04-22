function ensenarPaises(letra){
    letra=this.value;
    if(letra==""){
        document.getElementById("paises").innerHTML="";
        return;
    }
    const solicitud=new XMLHttpRequest();
    solicitud.onload=function(){
        if(this.readyState == 4 && this.status == 200){
            let divPaises=document.getElementById("paises");
            divPaises.innerHTML="";
            let jsonDatos=JSON.parse(this.responseText);
            console.log(jsonDatos[0]);
            let nodoTabla=document.createElement("table");
            nodoTabla.id="tablaPaises";
            let nodoCaption=document.createElement("caption");
            nodoCaption.innerHTML="Países"
            nodoTabla.appendChild(nodoCaption);
            for(let i=0;i<jsonDatos.length;i++){
                let nodoFila=document.createElement("tr");
                nodoTabla.appendChild(nodoFila);
                let nodoColumna=document.createElement("td");
                nodoColumna.innerHTML=jsonDatos[i]['Name'];
                nodoFila.appendChild(nodoColumna);
            }
            divPaises.appendChild(nodoTabla);
        }
    }
    solicitud.open("GET","paises.php?letra="+letra);
    solicitud.send();
}

window.onload = function() {
    let seleccion=document.getElementById("letraInicial");
    seleccion.addEventListener('change',ensenarPaises); 
}