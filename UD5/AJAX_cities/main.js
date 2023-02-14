function ensenarPista(letras){
    if(letras.length==0){
        let sugerencias=document.getElementById("sugerencias");
        sugerencias.innerHTML="";
        return;
    }else{
        const solicitud=new XMLHttpRequest();
        solicitud.onreadystatechange=function(){
            if(this.readyState == 4 && this.status == 200){
                let sugerencias=document.getElementById("sugerencias");
                sugerencias.innerHTML="¿Quieres decir "+this.responseText+"?";
                console.log(solicitud.responseText);
            }
        }
        solicitud.open("GET","php/obtenerPista.php?letra="+letras,false);
        solicitud.send;
    }
}