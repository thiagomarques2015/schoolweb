<?php
	
Class Conexao{
	private $servidor = "localhost";
	private $usuario = "root";
	private $senha = "";
	private $db = "turma";

	function abrir(){
		mysql_connect($this->servidor, $this->usuario, $this->senha);
		mysql_select_db($this->db);
	}
}

$con = new Conexao;
$con->abrir();

?>