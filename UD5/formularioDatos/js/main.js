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
        inputNombre.addEventListener('keyup',this.validarForm);
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
        inputApellidos.addEventListener('keyup',this.validarForm);
        nodoForm.appendChild(inputApellidos);
        nodoForm.appendChild(document.createElement('br'));
        nodoForm.appendChild(document.createElement('br'));

        let labelEmail=document.createElement('label');
        labelEmail.id="labelEmail";
        labelEmail.setAttribute('for','email');
        labelEmail.innerHTML="Email";
        nodoForm.appendChild(labelEmail);
        nodoForm.appendChild(document.createElement('br'));

        let inputEmail=document.createElement('input');
        inputEmail.id='email';
        inputEmail.setAttribute('type','text');
        inputEmail.setAttribute('name','email');
        inputEmail.setAttribute('class','inputIncorrecto');
        inputEmail.addEventListener('keyup',this.validarForm);
        nodoForm.appendChild(inputEmail);
        nodoForm.appendChild(document.createElement('br'));
        nodoForm.appendChild(document.createElement('br'));
    }

    validarForm(){
        let patron=/^[A-Za-zÁÉÍÓÚÀÈÌÒÙÖÜáéíóúàèìòùöüñÑçÇ]{2,}$/;

        this.nombreClase="";
        if(patron.test(this.value)){
            this.nombreClase="inputBien"
        }

        let patronVisa= `[4]([0-9]{12}|[0-9]{15})`;
        let patronMasterCard=`5[1-5][0-9]{14}`;
        let patronDiscover=`(6011[0-9]{14})|(5[0-9]{14})`;
        let patronAmEx=`(34|37)[0-9]{13}`;
        let patronDiners=`(30[0-5][0-9]{11})|(36|38)[0-9]{12})`;
        let patronJCB=`(2131|1800[0-5][0-9]{11})|(35[0-9]{14})`;

        let tarjetas=`^(${patronVisa}|${patronMasterCard}|${patronDiscover}|${patronAmEx}|${patronDiners}|${patronJCB})$`;
        let patronTarjetas=new RegExp(`${tarjetas}`);
    }
}

window.onload=()=>{
    let formulario=new FormularioConJS();
    formulario.crearFormulario();
}