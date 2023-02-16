function ensenarPista(letras){
    letras=this.value;
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
            }
        }
        solicitud.open("GET","obtenerPista.php?letra="+letras,true);
        solicitud.send();
    }
}

window.onload = (event) => {
    let campoDeTexto=document.getElementById("ciudad");
    campoDeTexto.addEventListener('keyup',ensenarPista);
};