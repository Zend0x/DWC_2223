<?php
  ini_set('display_errors', 1);
  ini_set('html_errors', 1);

if(!isset($_GET['nombrePais'])&&!isset($_GET['nombreCiudad'])){
  header("access-control-allow-origin: *");
  $conexion = mysqli_connect('localhost', 'root', '12345');
  if (mysqli_connect_errno()) {
    echo "Error al conectar a MySQL.";
  }
  mysqli_select_db($conexion, 'world');
  $consulta = mysqli_prepare($conexion, 'SELECT Name, Code FROM country;');
  $consulta->execute();
  $result = $consulta->get_result();

  $resultados = array();
  while ($myrow = $result->fetch_assoc()) {
    array_push($resultados, $myrow);
  }

  echo json_encode($resultados);

}else if(isset($_GET['nombrePais'])&&!empty($_GET['nombrePais'])){
  header("access-control-allow-origin: *");
  $paisSeleccionado=$_GET['nombrePais'];
  $conexion = mysqli_connect('localhost', 'root', '12345');
  if (mysqli_connect_errno()) {
    echo "Error al conectar a MySQL.";
  }
  mysqli_select_db($conexion, 'world');
  $consulta = mysqli_prepare($conexion, 'SELECT city.ID, city.Name as "nombreCiudad", city.countryCode, country.Name FROM city 
  INNER JOIN country ON countryCode=country.Code
  WHERE country.Name = "'.$paisSeleccionado.'";');
  $consulta->execute();
  $result = $consulta->get_result();

  $resultados = array();
  while ($myrow = $result->fetch_assoc()) {
    array_push($resultados, $myrow);
  }
  echo json_encode($resultados);
  
}else if(isset($_GET['nombreCiudad'])&&!empty($_GET['nombreCiudad'])){
  header("access-control-allow-origin: *");
  $ciudadSeleccionada=$_GET['nombreCiudad'];
  $id_ciudad=$_GET['id_ciudad'];
  $conexion = mysqli_connect('localhost', 'root', '12345');
  if (mysqli_connect_errno()) {
    echo "Error al conectar a MySQL.";
  }
  mysqli_select_db($conexion, 'world');
  $consulta = mysqli_prepare($conexion, 'SELECT city.ID, city.Name, city.district, city.population
  FROM city 
  INNER JOIN country ON countryCode=country.Code
  WHERE city.Name = "'.$ciudadSeleccionada.'" AND WHERE city.ID='.$id_ciudad.';');
  $consulta->execute();
  $result = $consulta->get_result();

  $resultados = array();
  while ($myrow = $result->fetch_assoc()) {
    array_push($resultados, $myrow);
  }
  echo json_encode($resultados);
}