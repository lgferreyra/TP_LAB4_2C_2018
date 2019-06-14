<?php
if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $uploadPath = "..". DIRECTORY_SEPARATOR ."..". DIRECTORY_SEPARATOR .'images'.DIRECTORY_SEPARATOR.'users' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    if(move_uploaded_file( $tempPath, $uploadPath )){
    	$answer = array( 'answer' => 'Archivo Cargado!' );
	    $json = json_encode( $answer );
	    echo $json;
    } else {
    	$answer = array( 'answer' => 'Falló la carga!' );
	    $json = json_encode( $answer );
	    echo $json;
    }
    
} else {
    echo false;
}
?>