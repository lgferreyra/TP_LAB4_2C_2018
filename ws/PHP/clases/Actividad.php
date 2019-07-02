<?php 
require_once "AccesoDatos.php";

class Actividad {
	
	public static function RegistrarLogin($usuarioID){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("
			INSERT INTO actividad(tipoActividadID, usuarioID, fecha) 
			VALUES (?,?,?)
		");
		$consulta->execute(array(
			1,
			$usuarioID,
			date("Y-m-d H:i:s")
		));
	}

	public static function RegistrarAltaPedido($usuarioID, $pedidoID){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("
		INSERT INTO actividad (tipoActividadID, usuarioID, fecha, pedidoID) 
		VALUES (?,?,?,?)
		");
		$consulta->execute(array(
			2,
			$usuarioID,
			date("Y-m-d H:i:s"),
			$pedidoID
		));
	}

	public static function RegistrarPrepararPedido($usuarioID, $pedidoDetalleID){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("
		INSERT INTO actividad (tipoActividadID, usuarioID, fecha, pedidoDetalleID) 
		VALUES (?,?,?,?)
		");
		$consulta->execute(array(
			3,
			$usuarioID,
			date("Y-m-d H:i:s"),
			$pedidoDetalleID
		));
	}
}
 ?>