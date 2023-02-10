function enseñarPista(letras){
    if(letras.length==0){
        let sugerencias=document.getElementById("sugerencias");
        sugerencias.innerHTML="";
        return;
    }else{
        const solicitud=new XMLHttpRequest();
        solicitud.onload=function(){
            let sugerencias=document.getElementById("sugerencias");
            sugerencias.innerHTML=this.responseText;
        }
        solicitud.open("GET","obtenerPista.php?letra="+letras);
        solicitud.send;
    }
}