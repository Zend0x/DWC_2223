function ensenarPaises(){
    console.log("llamado");
    letra=this.value;
    if(letra==""){
        document.getElementById("pais").innerHTML="";
        return;
    }
    const solicitud=new XMLHttpRequest();
    solicitud.onload=function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("pais").innerHTML=this.responseText;
        }
    }
    solicitud.open("GET","seleccionPaises.php");
    solicitud.send();
}


window.onload = (event) => {
    let seleccion=document.getElementById("pais");
    ensenarPaises();
};