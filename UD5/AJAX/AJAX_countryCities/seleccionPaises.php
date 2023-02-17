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
  $paises="";
  foreach($resultados as $pais){
    if ($paises === "") {
      $paises = $pais['Name'];
    } else {
      $paises .= ", " . $pais['Name'];
    }
  }
  echo $paises;

}else if(isset($_GET['nombrePais'])&&!empty($_GET['nombrePais'])){
  header("access-control-allow-origin: *");
  $paisSeleccionado=$_GET['nombrePais'];
  $conexion = mysqli_connect('localhost', 'root', '12345');
  if (mysqli_connect_errno()) {
    echo "Error al conectar a MySQL.";
  }
  mysqli_select_db($conexion, 'world');
  $consulta = mysqli_prepare($conexion, 'SELECT city.Name, city.countryCode FROM city 
  INNER JOIN country ON countryCode=country.Code
  WHERE country.Name = "'.$paisSeleccionado.'";');
  $consulta->execute();
  $result = $consulta->get_result();

  $resultados = array();
  while ($myrow = $result->fetch_assoc()) {
    array_push($resultados, $myrow);
  }
  
  $ciudades="";
  foreach($resultados as $ciudad){
    if ($ciudades === "") {
      $ciudades = $ciudad['Name'];
    } else {
      $ciudades .= ", " . $ciudad['Name'];
    }
  }
  echo $ciudades;

}else if(isset($_GET['nombreCiudad'])&&!empty($_GET['nombreCiudad'])){
  header("access-control-allow-origin: *");
  $ciudadSeleccionada=$_GET['nombreCiudad'];
  $conexion = mysqli_connect('localhost', 'root', '12345');
  if (mysqli_connect_errno()) {
    echo "Error al conectar a MySQL.";
  }
  mysqli_select_db($conexion, 'world');
  $consulta = mysqli_prepare($conexion, 'SELECT city.Name, city.district, city.population
  FROM city 
  INNER JOIN country ON countryCode=country.Code
  WHERE city.Name = "'.$ciudadSeleccionada.'" AND city.CountryCode LIKE country.Code;');
  $consulta->execute();
  $result = $consulta->get_result();

  $resultados = array();
  while ($myrow = $result->fetch_assoc()) {
    array_push($resultados, $myrow);
  }
 
  $datosDistrito="";
  foreach($resultados as $distrito){
    if ($datosDistrito === "") {
      $datosDistrito = $distrito['Name'].", ".$distrito['district'].", ".$distrito['population'];
    } else {
      $datosDistrito .= ", " . $distrito['Name'].", ".$distrito['district'].", ".$distrito['population'];
    }
  }
  echo $datosDistrito;
}