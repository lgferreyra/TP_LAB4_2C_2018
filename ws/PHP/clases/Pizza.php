<?php 
require_once"AccesoDatos.php";
class Pizza {
	public $nombre;
	public $descripcion;
	public $pchico;
    public $pgrande;

	public static function TraerPizza($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pizzas WHERE id =:id");
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$pizzaBuscada = $consulta->fetchObject('pizza');
		return $pizzaBuscada;
	}
    
    public static function InsertarPizza($pizza) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO pizzas (nombre, descripcion, pgrande, pchico) VALUES (:nombre,:descripcion,:pgrande,:pchico)");

        $consulta->bindValue(':nombre', $pizza['nombre'], PDO::PARAM_STR);
        $consulta->bindValue(':descripcion', $pizza['descripcion'], PDO::PARAM_STR);
        $consulta->bindValue(':pgrande', $pizza['pgrande'], PDO::PARAM_STR);
        $consulta->bindValue(':pchico', $pizza['pchico'], PDO::PARAM_STR);
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public static function TraerTodasLasPizzas(){
    	$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pizzas ORDER BY id");
		
		$consulta->execute();			
		$arrPizzas= $consulta->fetchAll(PDO::FETCH_CLASS, "pizza");	
		return $arrPizzas;
    }
}
 ?>