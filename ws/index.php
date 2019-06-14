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
require 'vendor/autoload.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);
//$app = new Slim\App();

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
*
*  GET: Para consultar y leer recursos */

/*$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $response->write("Lista de usuarios");
    
    return $response;
});

$app->get('/usuario[/{id}[/{name}]]', function ($request, $response, $args) {
    $response->write("Datos usuario ");
    var_dump($args);
    return $response;
});

$app->post('/usuario/{id}', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    var_dump($args);
    return $response;
});


$app->put('/usuario/{id}', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    var_dump($args);
    var_dump($response);
    var_dump($request);
    return $response;
});


$app->delete('/usuario/{id}', function ($request, $response, $args) {
    $response->write("borrar !", $args->id);
    var_dump($args);
    return $response;
});*/



//*USUARIOS*

// GET: traer todas las personas
/*$app->get('/personas[/]', function ($request, $response, $args) {
    $respuesta= array();
    $respuesta['listado']=Persona::TraerTodasLasPersonas();
    $arrayJson = json_encode($respuesta);
    $response->write($arrayJson);
    return $response;
});*/


$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

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
	        'exp' => $time + (60*60), // Tiempo que expirará el token (+1 hora)
	        'data' => [ // información del usuario
	            'perfil' => $result->tipo_usuario_id,
	            'nombre' => $result->nombre,
                'id' => $result->id
	        ]
	    );

	    
	    $jwt = JWT::encode($token, $key);
	    $myArray["token"] = $jwt;
	    $myArray["result"] = "OK";  
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
    $decoded_array = (array) $decoded; 
    $response->write((int)$decoded_array['data']->perfil);
    return $response;
});

$app->get('/usuario[/{id}]', function ($request, $response, $args) {
    $respuesta = Usuario::TraerUsuario($args['id']);
    $usuarioJson = json_encode($respuesta);
    $response->write($usuarioJson);
    return $response;
});

$app->get('/usuarios[/{perfil}]', function ($request, $response, $args) {
    if(isset($args['perfil'])){
        $respuesta = Usuario::TraerTodosLosUsuarios($args['perfil']);
    } else {
        $respuesta = Usuario::TraerTodosLosUsuarios();
    }
    $usuariosJson = json_encode($respuesta);
    $response->write($usuariosJson);
    return $response;
});

$app->post('/usuario/crear', function ($request, $response, $args) {
    $parsedBody = $request->getParsedBody();
    var_dump($parsedBody);
    //var_dump($parsedBody);
    $idInserted = Usuario::InsertarUsuario($parsedBody);
    //ob_start();
    //$result = ob_get_clean();
    /*if($idInserted===null){
        header('HTTP/1.0 404 Not Found');
    } else {
        $response->write($idInserted);
        return $response;
    }*/
    var_dump($idInserted);
    $response->write($idInserted);
});

/*//POST: crear un usuario
$app->post('/usuario/{usuario}', function ($request, $response, $args) {
    $usuario = json_decode($args['usuario']);
    $respuesta = Usuario::InsertarUsuario($usuario);
    $response->write($respuesta);
    return $response;
});

//PUT: Para editar una persona
$app->put('/persona/{persona}', function ($request, $response, $args) {
    var_dump($args['persona']);
    $persona = json_decode($args['persona']);
    $respuesta = Persona::ModificarPersona($persona);
    $response->write($respuesta);
    return $response;
});

// DELETE: Para eliminar recursos
$app->delete('/persona/{id}', function ($request, $response, $args) {
    $respuesta = Persona::BorrarPersona($args['id']);
    $response->write($respuesta);
    return $response;
});*/


/*PIZZAS*/

$app->get('/pizzas/id[/{id}]', function ($request, $response, $args) {
    $respuesta = Pizza::TraerPizza($args['id']);
    $pizzaJson = json_encode($respuesta);
    $response->write($pizzaJson);
    return $response;
});

$app->get('/pizzas', function ($request, $response, $args) {
    $respuesta = Pizza::TraerTodasLasPizzas();
    $pizzasJson = json_encode($respuesta);
    $response->write($pizzasJson);
    return $response;
});

$app->post('/pizzas/crear', function ($request, $response, $args) {
    $parsedBody = $request->getParsedBody();
    var_dump($parsedBody);
    $idInserted = Pizza::InsertarPizza($parsedBody);
    $response->write($idInserted);
});


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
