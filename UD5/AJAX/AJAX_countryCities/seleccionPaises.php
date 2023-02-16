<?php
  header("access-control-allow-origin: *");
  ini_set('display_errors', 1);
  ini_set('html_errors', 1);
  $letra = $_REQUEST['letra'];
  $conexion = mysqli_connect('localhost', 'root', '12345');
  if (mysqli_connect_errno()) {
    echo "Error al conectar a MySQL.";
  }
  mysqli_select_db($conexion, 'world');
  $consulta = mysqli_prepare($conexion, 'SELECT Name FROM country;');
  $consulta->execute();
  $result = $consulta->get_result();

  $resultados = array();
  while ($myrow = $result->fetch_assoc()) {
    array_push($resultados, $myrow);
  }

  echo '<select name="seleccionPaises" id="seleccionPaises">';
  foreach($resultados as $pais){
    echo '<option value="'.$pais['Nombre'].'">'.$pais['Nombre'].'</option>';
  }
  echo "</select>";