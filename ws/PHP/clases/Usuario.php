<?php 
require_once"AccesoDatos.php";
class Usuario {
	public $id;
	public $username;
	public $password;
	public $nombre;
	public $apellido;
	public $nrodoc;
    public $email;
	public $tipo_usuario_id;
    public $cuil;	
	public $fecha;
	public $domicilio_id;
	public $foto;
	public $habilitado;

	public static function LoginUsuario($email, $password){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
            select * 
            from usuarios 
            where email =:email 
            and password = :password
            and habilitado = 1");
		$consulta->bindValue(':email', $email, PDO::PARAM_STR);
		$consulta->bindValue(':password', $password, PDO::PARAM_STR);
		$consulta->execute();
		$usuarioBuscado = $consulta->fetchObject('usuario');
		return $usuarioBuscado;
	}

	public static function TraerUsuario($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios where id =:id");
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscado = $consulta->fetchObject('usuario');
		return $usuarioBuscado;
	}
    
    public static function InsertarUsuario($usuario) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        if($usuario['perfil']!=null && $usuario['perfil']=='cliente'){

        	$consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (username, password, nombre, apellido, email, perfil, nrodoc, fecha, partido, localidad, direccion, numero, departamento, foto) VALUES (:username,:password,:nombre,:apellido,:email,:perfil,:nrodoc,:fecha,:partido,:localidad,:direccion,:numero,:departamento,:foto)");

        } else if($usuario['perfil']!=null && ($usuario['perfil']=='encargado' || $usuario['perfil']=='chofer')){

        	$consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (username, password, nombre, apellido, email, perfil, nrodoc, cuil, fecha, foto) VALUES (:username,:password,:nombre,:apellido,:email,:perfil,:nrodoc,:cuil,:fecha,:foto)");
        }

        $consulta->bindValue(':username', $usuario['username'], PDO::PARAM_STR);
        $consulta->bindValue(':password', $usuario['password'], PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $usuario['nombre'], PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $usuario['apellido'], PDO::PARAM_STR);
        $consulta->bindValue(':email', $usuario['email'], PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $usuario['perfil'], PDO::PARAM_STR);
        $consulta->bindValue(':nrodoc', $usuario['nrodoc'], PDO::PARAM_STR);
        if(array_key_exists('cuil', $usuario)){
        	$consulta->bindValue(':cuil', $usuario['cuil'], PDO::PARAM_STR);
        }
        $consulta->bindValue(':fecha', $usuario['fecha'], PDO::PARAM_STR);
        if(array_key_exists('partido', $usuario)){
        	$consulta->bindValue(':partido', $usuario['partido'], PDO::PARAM_STR);
        }
        if(array_key_exists('localidad', $usuario)){
        	$consulta->bindValue(':localidad', $usuario['localidad'], PDO::PARAM_STR);
        }
        if(array_key_exists('direccion', $usuario)){
        	$consulta->bindValue(':direccion', $usuario['direccion'], PDO::PARAM_STR);
        }
        if(array_key_exists('numero', $usuario)){
        	$consulta->bindValue(':numero', $usuario['numero'], PDO::PARAM_STR);
        }
        if(array_key_exists('departamento', $usuario)){
        	$consulta->bindValue(':departamento', $usuario['departamento'], PDO::PARAM_STR);
        }
        $consulta->bindValue(':foto', $usuario['foto'], PDO::PARAM_STR);
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public static function TraerTodosLosUsuarios($perfil = null){
    	$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    	if($perfil!=null){
    		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios where perfil = :perfil");
    		$consulta->bindValue(':perfil', $perfil, PDO::PARAM_STR);
    	} else {
    		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios");	
    	}
		
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrUsuarios;
    }
}
 ?>