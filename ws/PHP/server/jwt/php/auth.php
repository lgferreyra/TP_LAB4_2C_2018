<?php
include_once '../vendor/autoload.php';
require '../../../clases/Usuario.php';
use \Firebase\JWT\JWT;

$DatosPorPost = file_get_contents("php://input");
$respuesta = json_decode($DatosPorPost);

$result = Usuario::LoginUsuario($respuesta->username, $respuesta->password);

if ($result != null) {


    $time = time();
    $key = '123456';

    $token = array(
        'iat' => $time, // Tiempo que inició el token
        'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
        'data' => [ // información del usuario
            'perfil' => $result->perfil,
            'usuarioName' => $result->nombre
        ]
    );

    /**
    * IMPORTANT:
    * You must specify supported algorithms for your application. See
    * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
    * for a list of spec-compliant algorithms.
    */
    $jwt = JWT::encode($token, $key);
    $myArray["myToken"] = $jwt;
    $myArray["result"] = "OK";
    echo json_encode($myArray);    
} else {
    header("HTTP/1.1 401 Unauthorized");
}



?>