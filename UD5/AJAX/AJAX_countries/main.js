function ensenarPaises(letra){
    letra=this.value;
    if(letra==""){
        document.getElementById("paises").innerHTML="";
        return;
    }
    const solicitud=new XMLHttpRequest();
    solicitud.onload=function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("paises").innerHTML=this.responseText;
        }
    }
    solicitud.open("GET","paises.php?letra="+letra);
    solicitud.send();
}


window.onload = (event) => {
    let seleccion=document.getElementById("letraInicial");
    seleccion.addEventListener('change',ensenarPaises);
};