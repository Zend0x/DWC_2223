
function ocultarMostrar(paragrafo,enlace){
    let paragrafoAOcultar=(document.getElementById(paragrafo));
    let botonACambiar=(document.getElementById(enlace));

    if(paragrafoAOcultar.getAttribute("class")=="visible"){
        paragrafoAOcultar.setAttribute("class","ocult");
        botonACambiar.innerHTML="Mostrar";
    }else if(paragrafoAOcultar.getAttribute("class")=="ocult"){
        paragrafoAOcultar.setAttribute("class","visible");
        botonACambiar.innerHTML="Ocultar";
    }
}

