class FormularioConJS{
    constructor(){

    }
    
    crearFormulario(){
        let contenedor=document.createElement('div');
        contenedor.setAttribute("class","contenedor");
        document.body.appendChild(contenedor);

        let nodoForm=document.createElement('form');
        contenedor.appendChild(nodoForm);

        let labelNombre=document.createElement('label');
        labelNombre.id="label";
        labelNombre.setAttribute('for','primerNombre');
        labelNombre.innerHTML="Nombre"
        nodoForm.appendChild(labelNombre);
        nodoForm.appendChild(document.createElement('br'));

        let inputNombre=document.createElement('input');
        inputNombre.id='primerNombre';
        inputNombre.setAttribute('type','text');
        inputNombre.setAttribute('name','primerNombre');
        inputNombre.setAttribute('class','inputIncorrecto');
        nodoForm.appendChild(inputNombre);
        nodoForm.appendChild(document.createElement('br'));
        nodoForm.appendChild(document.createElement('br'));

        let labelApellidos=document.createElement('label');
        labelApellidos.id="label";
        labelApellidos.setAttribute('for','apellidos');
        labelApellidos.innerHTML="Apellidos"
        nodoForm.appendChild(labelApellidos);
        nodoForm.appendChild(document.createElement('br'));

        let inputApellidos=document.createElement('input');
        inputApellidos.id='primerNombre';
        inputApellidos.setAttribute('type','text');
        inputApellidos.setAttribute('name','apellidos');
        inputApellidos.setAttribute('class','inputIncorrecto');
        nodoForm.appendChild(inputApellidos);
        nodoForm.appendChild(document.createElement('br'));
        nodoForm.appendChild(document.createElement('br'));

        let labelEmail=document.createElement('label');
        labelEmail.id="label";
        labelEmail.setAttribute('for','email');
        labelEmail.innerHTML="Email";
        nodoForm.appendChild(labelEmail);
        nodoForm.appendChild(document.createElement('br'));

        let inputEmail=document.createElement('input');
        inputEmail.id='email';
        inputEmail.setAttribute('type','text');
        inputEmail.setAttribute('name','email');
        inputEmail.setAttribute('class','inputIncorrecto');
        nodoForm.appendChild(inputEmail);
        nodoForm.appendChild(document.createElement('br'));
        nodoForm.appendChild(document.createElement('br'));
    }
}

window.onload=()=>{
    let formulario=new FormularioConJS();
    formulario.crearFormulario();
}