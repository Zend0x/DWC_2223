function ensenarPista(letras){
    if(letras.length==0){
        let sugerencias=document.getElementById("sugerencias");
        console.log(sugerencias);
        sugerencias.innerHTML="";
        return;
    }else{
        const solicitud=new XMLHttpRequest();
        solicitud.onreadystatechange=function(){
            if(solicitud.readyState==4 && solicitud.status==200){
                let sugerencias=document.getElementById("sugerencias");
                sugerencias.innerHTML="Prueba con: "+this.responseText;
                console.log(solicitud.responseText);
            }else{
                console.log("no lol");
            }
        }
        console.log("obtenerPista.php?letra="+letras);
        solicitud.open("GET","obtenerPista.php?letra="+letras);
        solicitud.send;
    }
}