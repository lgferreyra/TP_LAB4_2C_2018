<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;


/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
//require 'PHP/clases/Personas.php';
require 'PHP/clases/Usuario.php';
require 'PHP/clases/Pizza.php';
require 'PHP/clases/Actividad.php';
//require 'PHP/clases/AccesoDatos.php';
require 'vendor/autoload.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
date_default_timezone_set('America/Argentina/Buenos_Aires');
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);

//$app = new Slim\App();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, XMLHttpRequest')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});


/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
 * GET: Para consultar y leer recursos
 * POST: Para crear recursos
 * PUT: Para editar recursos
 * DELETE: Para eliminar recursos
 */

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->get('/test', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');

    $result = Usuario::Test();
    $json = json_encode($result);
    $response->write($json);

    return $response;
});

$app->post('/loginUsuario', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    $email = $parsedBody['email'];
    $password = $parsedBody['password'];
    $result = Usuario::LoginUsuario($email, $password);

    if ($result != null) {


        $time = time();
        $key = '123456';

        $token = array(
            'iat' => $time, // Tiempo que inició el token
            'exp' => $time + (60 * 60), // Tiempo que expirará el token (+1 hora)
            'data' => [ // información del usuario
                'perfil' => $result->perfilID,
                'nombre' => $result->nombre,
                'id' => $result->usuarioID
            ]
        );


        $jwt = JWT::encode($token, $key);
        $myArray["token"] = $jwt;
        $myArray["result"] = "OK";
        $myArray["perfilID"] = $result->perfilID;
        Actividad::RegistrarLogin($result->usuarioID);
    } else {
        return $response
            ->withStatus(401)
            ->withHeader('Content-Type', 'text/html')
            ->write('unauthorized!');
    }
    $response->write(json_encode($myArray));
    return $response;
});

$app->post('/getProfile', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    $token = $parsedBody['token'];
    $key = '123456';
    $decoded = JWT::decode($token, $key, array('HS256'));
    $decoded_array = (array)$decoded;
    $response->write((int)$decoded_array['data']->perfil);
    return $response;
});

$app->post('/getUserInfo', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    $token = $parsedBody['token'];
    $key = '123456';
    $decoded = JWT::decode($token, $key, array('HS256'));
    $decoded_array = (array)$decoded;
    $response->write(json_encode($decoded_array));
    return $response;
});

$app->get('/usuario[/{id}]', function ($request, $response, $args) {
    $respuesta = Usuario::TraerUsuario($args['id']);
    $usuarioJson = json_encode($respuesta);
    $response->write($usuarioJson);
    return $response;
});

// $app->get('/usuarios[/{perfil}]', function ($request, $response, $args) {
//     if (isset($args['perfil'])) {
//         $respuesta = Usuario::TraerTodosLosUsuarios($args['perfil']);
//     } else {
//         $respuesta = Usuario::TraerTodosLosUsuarios();
//     }
//     $usuariosJson = json_encode($respuesta);
//     $response->write($usuariosJson);
//     return $response;
// });

$app->post('/usuario/crear', function ($request, $response, $args) {

    $idInsertado = 0;
    $usuario = $request->getParsedBody();
    $pdo = AccesoDatos::dameUnObjetoAcceso();
    

    $sql = "INSERT INTO usuario(nombre, apellido, codigo, email, fecha, perfilID, borrado, suspendido, clave) 
    VALUES (?,?,?,?,?,?,?,?,?)";

    $consulta = $pdo->RetornarConsulta($sql);

    $consulta->execute(
        array(
            $usuario['nombre'],
            $usuario['apellido'],
            $usuario['apellido'],
            $usuario['email'],
            $usuario['fecha'],
            $usuario['perfilID'],
            0,
            0,
            $usuario['password']
        )
    );

    $idInsertado = $pdo->RetornarUltimoIdInsertado();
    
    $json = json_encode($idInsertado);

    $response->write($json);
    return $response;
});

$app->get('/usuarios', function (Request $request, Response $response, array $args) {

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT u.usuarioID, u.nombre, u.apellido, u.email, u.fecha, u.borrado, u.suspendido, p.nombre as perfil, u.perfilID
    FROM usuario u
    INNER JOIN perfil p ON p.perfilID = u.perfilID
    WHERE u.borrado <> 1
    ORDER BY u.usuarioID
    ");
    $consulta->execute();
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->post('/usuario/eliminar', function ($request, $response, $args) {

    $usuario = $request->getParsedBody();

    try {
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        
        $pdo->beginTransaction();

        $sqlUsuario = "UPDATE usuario SET borrado=1 
        WHERE usuarioID=?";

        $consulta = $pdo->RetornarConsulta($sqlUsuario);

        $consulta->execute(
            array(
                $usuario['usuarioID']
            )
        );
        
        
        $pdo->commit();
    }
    catch (Exception $e) {
        echo $e->getMessage();

        $pdo->rollBack();

        $response->error_log('Hubo un error :(');
    }

    $json = json_encode($usuario);
    $response->write($json);
    return $response;
});

$app->post('/usuario/suspender', function ($request, $response, $args) {

    $usuario = $request->getParsedBody();

    try {
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        
        $pdo->beginTransaction();

        $sqlUsuario = "UPDATE usuario SET suspendido=?
        WHERE usuarioID=?";

        $consulta = $pdo->RetornarConsulta($sqlUsuario);

        $consulta->execute(
            array(
                $usuario['suspendido'],
                $usuario['usuarioID']
            )
        );
        
        $pdo->commit();
    }
    catch (Exception $e) {
        echo $e->getMessage();

        $pdo->rollBack();

        $response->error_log('Hubo un error :(');
    }

    $json = json_encode($usuario);
    $response->write($json);
    return $response;
});

//PERFIL

$app->get('/perfiles', function (Request $request, Response $response, array $args) {

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT perfilID, nombre FROM perfil
    WHERE perfilID > 1
    ORDER BY perfilID
    ");
    $consulta->execute();
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

//PEDIDO

$app->get('/pedido/consulta/{pedido}/{mesa}', function (Request $request, Response $response, array $args) {

    $mesa = $args['mesa'];
    $pedido = $args['pedido'];

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT pd.pedidoDetalleID, pd.itemMenuID, im.nombre AS item, pd.cantidad, pd.fechaInicio, m.codigo mesa, pd.precio * pd.cantidad as precio,
    pd.fechaFin, pd.tiempoEstimado, pd.estadoPedidoID, ep.nombre AS estado, pd.pedidoID, p.codigo pedido, pd.precio as precioUnitario, p.nombreCliente
    FROM pedido p
    INNER JOIN pedidodetalle pd ON pd.pedidoID = p.pedidoID
    INNER JOIN itemmenu im ON im.itemMenuID = pd.itemMenuID
    INNER JOIN estadopedido ep ON ep.estadoPedidoID = pd.estadoPedidoID
    INNER JOIN mesa m ON m.MesaID = p.mesaID
    WHERE p.codigo = ?
    AND m.codigo = ?
    ORDER BY pd.pedidoDetalleID
    ");
    $consulta->execute(array($pedido, $mesa));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/pedido/existe/{pedido}/{mesa}', function (Request $request, Response $response, array $args) {

    $mesa = $args['mesa'];
    $pedido = $args['pedido'];

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT COUNT(IF(p.pedidoID, 1, 0)) as existe
    FROM pedido p
    INNER JOIN mesa m ON m.MesaID = p.mesaID
    WHERE p.estadoPedidoID <> 5 AND p.codigo = ? AND m.codigo = ?
    ");
    $consulta->execute(array($pedido, $mesa));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta[0]);
    $response->write($json);
    return $response;
});

$app->get('/pedido/encuenta/check/{pedidoID}', function (Request $request, Response $response, array $args) {

    $pedidoID = $args['pedidoID'];

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT COUNT(IF(e.pedidoID, 1, 0)) as existe
    FROM encuesta e
    WHERE e.pedidoID = ?
    ");
    $consulta->execute(array($pedidoID));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta[0]);
    $response->write($json);
    return $response;
});

$app->post('/pedido/encuesta', function ($request, $response, $args) {
    
    try {
        $idInsertado = 0;
        $encuesta = $request->getParsedBody();
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        
        $pdo->beginTransaction();

        $sqlEncuesta = "INSERT INTO encuesta(pedidoID, fecha, mesaValor, restauranteValor, mozoValor, cocineroValor, comentario) 
        VALUES (?,?,?,?,?,?,?)";

        $consulta = $pdo->RetornarConsulta($sqlEncuesta);

        $consulta->execute(
            array(
                $encuesta['pedidoID'],
                date("Y-m-d H:i:s"),
                $encuesta['mesa'],
                $encuesta['restaurante'],
                $encuesta['mozo'],
                $encuesta['cocinero'],
                $encuesta['comentarios']
            )
        );

        $idInsertado = $pdo->RetornarUltimoIdInsertado();
        
        $pdo->commit();
        
        $json = json_encode($idInsertado);

    }
    catch (Exception $e) {
        echo $e->getMessage();

        $pdo->rollBack();

        $response->error_log('Hubo un error :(');
    }


    $response->write($json);
    return $response;
});

$app->get('/pedido/estado/{estado}', function (Request $request, Response $response, array $args) {

    $estado = $args['estado'];

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT p.pedidoID, p.mozoID, u.nombre, u.apellido, p.mesaID, m.codigo AS codigoMesa, p.codigo AS codigoPedido,
     p.nombreCliente, p.foto, p.fechaCreacion, p.estadoPedidoID, ep.nombre
    FROM pedido p 
    INNER JOIN mesa m ON m.MesaID = p.mesaID
    INNER JOIN usuario u ON u.usuarioID = p.mozoID
    INNER JOIN estadopedido ep ON ep.estadoPedidoID = p.estadoPedidoID
    WHERE p.estadoPedidoID = ?
    ");
    $consulta->execute(array($estado));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/pedido', function (Request $request, Response $response, array $args) {

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT p.pedidoID, p.mozoID, u.nombre as nombreMozo, u.apellido, p.mesaID, m.codigo AS codigoMesa, p.codigo AS codigoPedido,
     p.nombreCliente, p.foto, p.fechaCreacion, p.estadoPedidoID, ep.nombre as estado
    FROM pedido p 
    INNER JOIN mesa m ON m.MesaID = p.mesaID
    INNER JOIN usuario u ON u.usuarioID = p.mozoID
    INNER JOIN estadopedido ep ON ep.estadoPedidoID = p.estadoPedidoID
    WHERE ep.estadoPedidoID < 4
    Order by p.estadoPedidoID, p.fechaCreacion
    ");
    $consulta->execute();
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->post('/pedido', function ($request, $response, $args) {
    
    try {
        $idInsertado = 0;
        $pedido = $request->getParsedBody();
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        
        $pdo->beginTransaction();

        $sqlPedido = "INSERT INTO pedido(mozoID, mesaID, codigo, nombreCliente, foto, fechaCreacion, estadoPedidoID) 
                        VALUES (?,?,?,?,?,?,?)";

        $consulta = $pdo->RetornarConsulta($sqlPedido);

        $consulta->execute(
            array(
                $pedido['mozo'],
                $pedido['mesa'],
                substr(hash('ripemd160', date("Y-m-d H:i:s")), 0, 5),
                $pedido['cliente'],
                $pedido['foto'],
                date("Y-m-d H:i:s"),
                '1'
            )
        );

        $idInsertado = $pdo->RetornarUltimoIdInsertado();

        $detalles = $pedido['pedidoDetalles'];

        foreach ($detalles as &$detalle) {
            
            $sqlDetalle = "INSERT INTO pedidodetalle(itemMenuID, cantidad, precio, pedidoID, estadoPedidoID) 
            VALUES (?,?,?,?,?)";
            $consulta = $pdo->RetornarConsulta($sqlDetalle);
            $consulta->execute(
                array(
                    $detalle['item']['itemMenuID'],
                    $detalle['cantidad'],
                    $detalle['item']['precio'],
                    $idInsertado,
                    '1'
                )
            );
        }
        
        $pdo->commit();
        $consulta = $pdo->RetornarConsulta("
        SELECT p.pedidoID, p.mozoID, u.nombre as nombreMozo, u.apellido, p.mesaID, m.codigo AS codigoMesa, p.codigo AS codigoPedido,
         p.nombreCliente, p.foto, p.fechaCreacion, p.estadoPedidoID, ep.nombre as estado
        FROM pedido p 
        INNER JOIN mesa m ON m.MesaID = p.mesaID
        INNER JOIN usuario u ON u.usuarioID = p.mozoID
        INNER JOIN estadopedido ep ON ep.estadoPedidoID = p.estadoPedidoID
        WHERE p.pedidoID = ?
        ");
        $consulta->execute(array($idInsertado));
        $respuesta = $consulta->fetchAll();
        $json = json_encode($respuesta[0]);

        Actividad::RegistrarAltaPedido($pedido['mozo'], $idInsertado);
    }
    catch (Exception $e) {
        echo $e->getMessage();

        $pdo->rollBack();

        $response->error_log('Hubo un error :(');
    }


    $response->write($json);
    return $response;
});

$app->post('/pedido/cancelar', function ($request, $response, $args) {
    
    try {
        $pedido = $request->getParsedBody();
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        
        $pdo->beginTransaction();

        $sqlPedido = "UPDATE pedido SET estadoPedidoID = ?, fechaFin= ?
                        WHERE pedidoID = ?";

        $consulta = $pdo->RetornarConsulta($sqlPedido);

        $consulta->execute(
            array(
                $pedido['estadoPedidoID'],
                date("Y-m-d H:i:s"),
                $pedido['pedidoID']
            )
        );

        $sqlDetalle = "UPDATE pedidodetalle SET estadoPedidoID = ?, fechaFin= ?
                        WHERE pedidoID = ?";
        $consulta = $pdo->RetornarConsulta($sqlDetalle);
        $consulta->execute(
            array(
                $pedido['estadoPedidoID'],
                date("Y-m-d H:i:s"),
                $pedido['pedidoID']
            )
        );
        
        $pdo->commit();
        $json = json_encode($pedido);

    }
    catch (Exception $e) {
        echo $e->getMessage();

        $pdo->rollBack();

        $response->error_log('Hubo un error :(');
    }

    $response->write($json);
    return $response;
});


$app->post('/pedido/estado', function ($request, $response, $args) {

    $pedido = $request->getParsedBody();

    try {
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        
        $pdo->beginTransaction();

        $sqlPedido = "UPDATE pedido SET fechaFin=?,estadoPedidoID=? 
        WHERE pedidoID=?";

        $consulta = $pdo->RetornarConsulta($sqlPedido);

        $consulta->execute(
            array(
                date("Y-m-d H:i:s"),
                $pedido['estadoPedidoID'],
                $pedido['pedidoID']
            )
        );
            
        $sqlPedidoDetalle= "UPDATE pedidodetalle SET estadoPedidoID=?
        WHERE pedidoID=?";
        $consulta = $pdo->RetornarConsulta($sqlPedidoDetalle);
        $consulta->execute(
            array(
                $pedido['estadoPedidoID'],
                $pedido['pedidoID']
            )
        );
        
        $pdo->commit();
    }
    catch (Exception $e) {
        echo $e->getMessage();

        $pdo->rollBack();

        $response->error_log('Hubo un error :(');
    }

    return $response;
});

//PEDIDODETALLE

$app->post('/pedidoDetalle/estado', function ($request, $response, $args) {

    $pedidoDetalle = $request->getParsedBody();

    if ($pedidoDetalle['estadoPedidoID'] == 2){

        try {
            $pdo = AccesoDatos::dameUnObjetoAcceso();
            
            $pdo->beginTransaction();
    
            $sqlPreparacion = "UPDATE pedidodetalle SET fechaInicio=?,tiempoEstimado=?,estadoPedidoID=?,usuarioID=? 
            WHERE pedidoDetalleID=?";
    
            $consulta = $pdo->RetornarConsulta($sqlPreparacion);
    
            $consulta->execute(
                array(
                    date("Y-m-d H:i:s"),
                    $pedidoDetalle['tiempoEstimado'],
                    $pedidoDetalle['estadoPedidoID'],
                    $pedidoDetalle['usuarioID'],
                    $pedidoDetalle['pedidoDetalleID']
                )
            );
                
            $sqlPedido= "UPDATE pedido SET estadoPedidoID=?
            WHERE pedidoID=?";
            $consulta = $pdo->RetornarConsulta($sqlPedido);
            $consulta->execute(
                array(
                    $pedidoDetalle['estadoPedidoID'],
                    $pedidoDetalle['pedidoID']
                )
            );
            
            $pdo->commit();
        }
        catch (Exception $e) {
            echo $e->getMessage();
    
            $pdo->rollBack();
    
            $response->error_log('Hubo un error :(');
        }
    } elseif ($pedidoDetalle['estadoPedidoID'] == 3){

        try {
            $pdo = AccesoDatos::dameUnObjetoAcceso();
            
            $pdo->beginTransaction();
    
            $sqlPreparacion = "UPDATE pedidodetalle SET fechaFin=?,estadoPedidoID=?
            WHERE pedidoDetalleID=?";

            $consulta = $pdo->RetornarConsulta($sqlPreparacion);
    
            $consulta->execute(
                array(
                    date("Y-m-d H:i:s"),
                    $pedidoDetalle['estadoPedidoID'],
                    $pedidoDetalle['pedidoDetalleID']
                )
            );
               
            //Verifico el status del pedido
            $sqlStatus = "SELECT SUM(1) AS total, SUM(estadoPedidoID=1) as pendiente, SUM(estadoPedidoID=2) as preparacion, SUM(estadoPedidoID=3) as terminados, SUM(estadoPedidoID=4) as entregado
            FROM pedidodetalle 
            WHERE pedidoID= ?";
            $consulta = $pdo->RetornarConsulta($sqlStatus);
            $consulta->execute(
                array(
                    $pedidoDetalle['pedidoID']
                )
            );
            $respuesta = $consulta->fetchAll();

            if($respuesta[0]["terminados"]==$respuesta[0]["total"]){

                $sqlPedido= "UPDATE pedido SET estadoPedidoID=?
                WHERE pedidoID=?";
                $consulta = $pdo->RetornarConsulta($sqlPedido);
                $consulta->execute(
                    array(
                        $pedidoDetalle['estadoPedidoID'],
                        $pedidoDetalle['pedidoID']
                    )
                );
            }
            
            $pdo->commit();
        }
        catch (Exception $e) {
            echo $e->getMessage();
    
            $pdo->rollBack();
    
            $response->error_log('Hubo un error :(');
        }
    }


    $userID = $pedidoDetalle['usuarioID'];

    $consulta = $pdo->RetornarConsulta("
    SELECT pd.pedidoDetalleID, pd.itemMenuID, im.nombre AS item, im.sectorID, pd.cantidad, pd.fechaInicio,
    pd.fechaFin, pd.tiempoEstimado, pd.estadoPedidoID, ep.nombre AS estado, pd.pedidoID, p.codigo, pd.usuarioID
    FROM usuario u 
    INNER JOIN perfilsector ps ON ps.perfilID = u.perfilID
    INNER JOIN sector s ON s.sectorID = ps.sectorID
    INNER JOIN itemmenu im ON im.sectorID = s.sectorID
    INNER JOIN pedidodetalle pd ON pd.itemMenuID = im.itemMenuID
    INNER JOIN pedido p ON p.pedidoID = pd.pedidoID
    INNER JOIN estadopedido ep ON ep.estadoPedidoID = pd.estadoPedidoID
    WHERE u.usuarioID = ?
    AND ep.estadoPedidoID <> 4
    AND (pd.usuarioID = ? OR pd.usuarioID is null)
    ORDER BY p.fechaCreacion, ep.estadoPedidoID
    ");
    $consulta->execute(array($userID,$userID));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/pedidoDetalle/pedido/{pedidoID}', function (Request $request, Response $response, array $args) {

    $pedidoID = $args['pedidoID'];

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT pd.pedidoDetalleID, pd.itemMenuID, im.nombre AS item, im.sectorID, pd.cantidad, pd.fechaInicio,
     pd.fechaFin, pd.tiempoEstimado, pd.estadoPedidoID, ep.nombre AS estado, pd.pedidoID, p.codigo
    FROM pedidodetalle pd
    INNER JOIN itemmenu im ON im.itemMenuID = pd.itemMenuID
    INNER JOIN estadopedido ep ON ep.estadoPedidoID = pd.estadoPedidoID
    INNER JOIN pedido p ON p.pedidoID = pd.pedidoID
    WHERE p.pedidoID = ?
    ");
    $consulta->execute(array($pedidoID));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/pedidoDetalle/dashboard/{userID}', function (Request $request, Response $response, array $args) {

    $userID = $args['userID'];

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT pd.pedidoDetalleID, pd.itemMenuID, im.nombre AS item, im.sectorID, pd.cantidad, pd.fechaInicio,
    pd.fechaFin, pd.tiempoEstimado, pd.estadoPedidoID, ep.nombre AS estado, pd.pedidoID, p.codigo, pd.usuarioID
    FROM usuario u 
    INNER JOIN perfilsector ps ON ps.perfilID = u.perfilID
    INNER JOIN sector s ON s.sectorID = ps.sectorID
    INNER JOIN itemmenu im ON im.sectorID = s.sectorID
    INNER JOIN pedidodetalle pd ON pd.itemMenuID = im.itemMenuID
    INNER JOIN pedido p ON p.pedidoID = pd.pedidoID
    INNER JOIN estadopedido ep ON ep.estadoPedidoID = pd.estadoPedidoID
    WHERE u.usuarioID = ?
    AND ep.estadoPedidoID <> 4
    AND (ep.estadoPedidoID <> 5 OR pd.fechaFin > NOW() - INTERVAL 30 MINUTE)
    AND (pd.usuarioID = ? OR pd.usuarioID is null)
    ORDER BY ep.estadoPedidoID, p.fechaCreacion
    ");
    $consulta->execute(array($userID,$userID));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/itemMenu', function (Request $request, Response $response, array $args) {

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT im.*
    FROM itemmenu im
    INNER JOIN sector s on s.sectorID = im.sectorID
    ");
    $consulta->execute();
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/itemMenu/sector/{sectorID}', function (Request $request, Response $response, array $args) {

    $sectorID = $args['sectorID'];

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT im.*
    FROM itemmenu im
    INNER JOIN sector s on s.sectorID = im.sectorID
    WHERE s.sectorID = ?
    ");
    $consulta->execute(array($sectorID));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/mesas', function (Request $request, Response $response, array $args) {

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT *
    FROM mesa
    ");
    $consulta->execute();
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/reporte/empleado/accesos', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT a.usuarioID, a.fecha, u.nombre, u.apellido, p.nombre as perfil FROM actividad a
    inner join usuario u on u.usuarioID = a.usuarioID
    inner join perfil p on p.perfilID = u.perfilID
    AND a.fecha BETWEEN ? AND ?
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/reporte/empleado/operaciones', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT s.sectorID, s.nombre, COUNT(1) as operaciones FROM pedidodetalle pd
    INNER JOIN itemmenu im ON im.itemMenuID = pd.itemMenuID
    INNER JOIN sector s ON s.sectorID = im.sectorID
    WHERE (pd.estadoPedidoID = 4 OR pd.estadoPedidoID = 3)
    AND pd.fechaFin BETWEEN ? AND ?
    GROUP BY s.sectorID, s.nombre
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta["bySector"] = $consulta->fetchAll();

    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT CONCAT(u.nombre, ' ', u.apellido) as nombre, COUNT(1) as operaciones FROM pedidodetalle pd
    INNER JOIN usuario u ON u.usuarioID = pd.usuarioID
    WHERE (pd.estadoPedidoID = 4 OR pd.estadoPedidoID = 3)
    AND pd.fechaFin BETWEEN ? AND ?
    GROUP BY nombre
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta["byEmpleado"] = $consulta->fetchAll();

    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/reporte/pedido/ventas', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT im.nombre, COUNT(IF((pd.estadoPedidoID=3 OR pd.estadoPedidoID=4)AND pd.fechaFin BETWEEN ? AND ?,1, NULL)) as cantidad FROM itemmenu im
    LEFT JOIN pedidodetalle pd ON im.itemMenuID = pd.itemMenuID 
    GROUP BY im.nombre
    ORDER BY cantidad DESC
    LIMIT 5
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta["mas"] = $consulta->fetchAll();

    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT im.nombre, COUNT(IF((pd.estadoPedidoID=3 OR pd.estadoPedidoID=4) AND pd.fechaFin BETWEEN ? AND ?,1, NULL)) as cantidad FROM itemmenu im
    LEFT JOIN pedidodetalle pd ON im.itemMenuID = pd.itemMenuID 
    GROUP BY im.nombre
    ORDER BY cantidad ASC
    LIMIT 5
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta["menos"] = $consulta->fetchAll();

    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});


$app->get('/reporte/pedido/demorados', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("

    SELECT s.nombre,
    COUNT(IF((pd.estadoPedidoID=3 OR pd.estadoPedidoID=4) AND pd.fechaFin BETWEEN ? AND ?,1, NULL)) as cantidad,
    COUNT(IF((pd.estadoPedidoID=3 OR pd.estadoPedidoID=4) AND pd.fechaFin BETWEEN ? AND ? AND pd.fechaFin NOT BETWEEN pd.fechaInicio AND DATE_ADD(pd.fechaInicio,INTERVAL pd.tiempoEstimado MINUTE),1, NULL)) as demorados
    FROM sector s 
    LEFT JOIN itemmenu im ON im.sectorID = s.sectorID
    LEFT JOIN pedidodetalle pd ON im.itemMenuID = pd.itemMenuID 
    GROUP BY s.nombre
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"],$params["fechaDesde"],$params["fechaHasta"]));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/reporte/pedido/cancelados', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT
    COUNT(IF(p.estadoPedidoID=4 AND p.fechaFin BETWEEN ? AND ?,1, NULL)) as completados,
    COUNT(IF(p.estadoPedidoID=5 AND p.fechaCreacion BETWEEN ? AND ?,1, NULL)) as cancelados
    FROM pedido p
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"],$params["fechaDesde"],$params["fechaHasta"]));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/reporte/mesa/usos', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT m.codigo, COUNT(IF(p.estadoPedidoID=4 AND p.fechaFin BETWEEN ? AND ?,1, NULL)) as usos 
    FROM mesa m
    LEFT JOIN pedido p ON m.MesaID = p.mesaID 
    GROUP BY m.codigo
    ORDER BY usos DESC
    LIMIT 5
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta["mas"] = $consulta->fetchAll();

    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT m.codigo, COUNT(IF((p.estadoPedidoID=3 OR p.estadoPedidoID=4) AND p.fechaFin BETWEEN ? AND ?,1, NULL)) as usos 
    FROM mesa m
    LEFT JOIN pedido p ON m.MesaID = p.mesaID 
    GROUP BY m.codigo
    ORDER BY usos ASC
    LIMIT 5
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta["menos"] = $consulta->fetchAll();

    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/reporte/mesa/topfacturaciones', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT m.codigo, SUM(IF((p.estadoPedidoID = 4) AND p.fechaFin BETWEEN ? AND ?,pd.precio * pd.cantidad,0)) as facturado
    FROM mesa m
    LEFT JOIN pedido p ON p.mesaID = m.MesaID
    LEFT JOIN pedidodetalle pd ON pd.pedidoID = p.pedidoID
    GROUP BY m.codigo
    ORDER BY facturado DESC
    LIMIT 5
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta["mas"] = $consulta->fetchAll();

    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT m.codigo, SUM(IF((p.estadoPedidoID = 4) AND p.fechaFin BETWEEN ? AND ?,pd.precio * pd.cantidad,0)) as facturado
    FROM mesa m
    LEFT JOIN pedido p ON p.mesaID = m.MesaID
    LEFT JOIN pedidodetalle pd ON pd.pedidoID = p.pedidoID
    GROUP BY m.codigo
    ORDER BY facturado ASC
    LIMIT 5
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta["menos"] = $consulta->fetchAll();

    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/reporte/mesa/importes', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    (
        SELECT p.codigo as pedido, m.codigo as mesa, SUM(pd.precio * pd.cantidad) as total
        FROM pedido p
        INNER JOIN pedidodetalle pd ON pd.pedidoID = p.pedidoID
        INNER JOIN mesa m ON m.MesaID = p.mesaID
        WHERE p.estadoPedidoID = 4
        AND p.fechaFin BETWEEN ? AND ?
        GROUP BY pedido, mesa
        ORDER BY total DESC
        LIMIT 1
    )
    UNION
    (
        SELECT p.codigo as pedido, m.codigo as mesa, SUM(pd.precio * pd.cantidad) as total
        FROM pedido p
        INNER JOIN pedidodetalle pd ON pd.pedidoID = p.pedidoID
        INNER JOIN mesa m ON m.MesaID = p.mesaID
        WHERE p.estadoPedidoID = 4
        AND p.fechaFin BETWEEN ? AND ?
        GROUP BY pedido, mesa
        ORDER BY total ASC
        LIMIT 1
    )
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"],$params["fechaDesde"],$params["fechaHasta"]));
    $respuesta = $consulta->fetchAll();
    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/reporte/mesa/facturaciones', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT m.codigo, SUM(IF((p.estadoPedidoID = 4) AND p.fechaFin BETWEEN ? AND ?,pd.precio * pd.cantidad,0)) as facturado
    FROM mesa m
    LEFT JOIN pedido p ON p.mesaID = m.MesaID
    LEFT JOIN pedidodetalle pd ON pd.pedidoID = p.pedidoID
    GROUP BY m.codigo
    ORDER BY m.MesaID
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta = $consulta->fetchAll();

    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});

$app->get('/reporte/mesa/comentarios', function (Request $request, Response $response, array $args) {

    $params = $request->getQueryParams();

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("
    SELECT 
    m.codigo,
    AVG(e.cocineroValor) as cocinero,
    AVG(e.mesaValor) as mesa,
    AVG(e.restauranteValor) as restaurante,
    AVG(e.mozoValor) as mozo,
    AVG((e.mozoValor + e.mozoValor + e.restauranteValor + e.cocineroValor)/4) as promedio
    FROM mesa m
    LEFT JOIN pedido p ON p.mesaID = m.MesaID
    LEFT JOIN encuesta e ON e.pedidoID = p.pedidoID AND p.estadoPedidoID = 4 AND p.fechaFin BETWEEN ? AND ?
    GROUP BY m.codigo
    ORDER BY m.MesaID
    ");
    $consulta->execute(array($params["fechaDesde"],$params["fechaHasta"]));
    $respuesta = $consulta->fetchAll();

    $json = json_encode($respuesta);
    $response->write($json);
    return $response;
});
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
