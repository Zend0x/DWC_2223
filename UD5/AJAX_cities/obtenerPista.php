<?php
    header("access-control-allow-origin: *");
    header("Content-type:aplication/json");
    ini_set('display_errors', 1);
    ini_set('html_errors', 1);
    $letra="a";
    if($letra!=""){
        function obtener($letra){
            $conexion=mysqli_connect('localhost','root','12345');
            if(mysqli_connect_errno()){
                echo "Error al conectar a MySQL.";
            }
            mysqli_select_db($conexion,'world');
            $consulta=mysqli_prepare($conexion,'SELECT Name FROM city
            WHERE Name="(?)%";');
            $letra_sanitized=mysqli_real_escape_string($conexion,$letra);
            $consulta->bind_param("s",$letra_sanitized);
            $consulta->execute();
            $resultado=$consulta->get_result();
    
            $resultados=array();
            foreach($resultado as $result){
                array_push($resultados,$result);
            }
            return $resultados;
        }
    }