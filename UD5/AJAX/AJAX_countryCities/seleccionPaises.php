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

  echo '<option value="">Selecciona un país.</option>';
  foreach($resultados as $pais){
    echo '<option value="'.$pais['Name'].'">'.$pais['Name'].'</option>';
  }

}else if(isset($_GET['nombrePais'])&&!empty($_GET['nombrePais'])){
  header("access-control-allow-origin: *");
  $paisSeleccionado=$_GET['nombrePais'];
  $conexion = mysqli_connect('localhost', 'root', '12345');
  if (mysqli_connect_errno()) {
    echo "Error al conectar a MySQL.";
  }
  mysqli_select_db($conexion, 'world');
  $consulta = mysqli_prepare($conexion, 'SELECT city.Name as "nombreCiudad", city.countryCode, country.Name FROM city 
  INNER JOIN country ON countryCode=country.Code
  WHERE country.Name = "'.$paisSeleccionado.'";');
  $consulta->execute();
  $result = $consulta->get_result();

  $resultados = array();
  while ($myrow = $result->fetch_assoc()) {
    array_push($resultados, $myrow);
  }
  
  echo '<option value="">Selecciona una ciudad</option>';
  foreach($resultados as $ciudad){
    echo '<option value="'.$ciudad['nombreCiudad'].'">'.$ciudad['nombreCiudad'].'</option>';
  }
}else if(isset($_GET['nombreCiudad'])&&!empty($_GET['nombreCiudad'])){
  header("access-control-allow-origin: *");
  $ciudadSeleccionada=$_GET['nombreCiudad'];
  $conexion = mysqli_connect('localhost', 'root', '12345');
  if (mysqli_connect_errno()) {
    echo "Error al conectar a MySQL.";
  }
  mysqli_select_db($conexion, 'world');
  $consulta = mysqli_prepare($conexion, 'SELECT city.Name, city.district, city.population FROM city 
  WHERE city.Name = "'.$ciudadSeleccionada.'";');
  $consulta->execute();
  $result = $consulta->get_result();

  $resultados = array();
  while ($myrow = $result->fetch_assoc()) {
    array_push($resultados, $myrow);
  }
  foreach($resultados as $ciudad){
    echo '<h1>'.$ciudad['Name'].'</h1>';
    echo '<p>Distrito: <strong>'.$ciudad['district'].'</strong></p>';
    echo '<p>Población: <strong>'.$ciudad['population'].'</strong></p>';
  }
}