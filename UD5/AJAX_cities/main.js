function ensenarPista(letras){
    if(letras.length==0){
        let sugerencias=document.getElementById("sugerencias");
        console.log(sugerencias);
        sugerencias.innerHTML="";
        return;
    }else{
        console.log("xD");
        const solicitud=new XMLHttpRequest();
        solicitud.onreadystatechange=function(){
            let sugerencias=document.getElementById("sugerencias");
            sugerencias.innerHTML="Prueba con: "+this.responseText;
            console.log(solicitud.responseText);
        }
        solicitud.open("GET","obtenerPista.php?letra="+letras);
        solicitud.send;
    }
}