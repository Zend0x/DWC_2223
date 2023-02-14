<?php
    header("access-control-allow-origin: *");
    header("Content-type:aplication/json");
    ini_set('display_errors', 1);
    ini_set('html_errors', 1);
    $letra=$_GET['letra'];
    if($letra!=""){
        function obtener($letra){
            $conexion=mysqli_connect('localhost','root','12345');
            if(mysqli_connect_errno()){
                echo "Error al conectar a MySQL.";
            }
            mysqli_select_db($conexion,'world');
            $consulta=mysqli_prepare($conexion,'SELECT Name FROM city;');
            $consulta->execute();
            $result=$consulta->get_result();
    
            $resultados=array();
            foreach($result as $resultado){
                array_push($resultados,$resultado);
            }

            $pista="";
            foreach($resultados as $ciudad) {
                if (stristr($letra, substr($ciudad, 0, strlen($letra)))) {
                  if ($pista === "") {
                    $pista = $ciudad;
                  } else {
                    $pista .= ", $ciudad";
                  }
                }
        }
    }
}