function ensenarPista(letras){
    letras=this.value;
    if(letras.length==0){
        let sugerencias=document.getElementById("sugerencias");
        sugerencias.innerHTML="";
        return;
    }else{
        //idk hacer que vaya la solicitud (someway)
    }
}

window.onload = (event) => {
    let campoDeTexto=document.getElementById("ciudad");
    campoDeTexto.addEventListener('keyup',ensenarPista);
};