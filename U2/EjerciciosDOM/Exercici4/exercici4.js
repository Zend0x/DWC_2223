function habilitarSelect(id_elemento){
    let elementoFormulario=document.getElementById(id_elemento);

    elementoFormulario.disabled=false;
}

function retornaValor(objetoFormulario){
    let contenidoObjeto=objetoFormulario.value;
    return contenidoObjeto;
}

function validarFormulario(id_formulario){
    let formulario=document.getElementById(id_formulario);
    let stringFinal="";
    for(let i=0;i<formulario.length-1;i++){
        stringFinal=stringFinal+" "+retornaValor(formulario[i]);
    }
    let textoFinal=document.createElement("p");
    document.body.appendChild(textoFinal);
    textoFinal.innerHTML=stringFinal;
}