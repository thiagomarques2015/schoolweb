<?php

error_reporting(0);
ini_set(“display_errors”, 0 );

include("Conexao.php");

Class Turma{
	function Turma(){

	}

	function inserirAluno($matricula, $nome, $idade, $email){
		$query = "INSERT INTO aluno (matricula, nome, idade, email) VALUES ('$matricula', '$nome', '$idade', '$email')";
		return mysql_query($query);
	}

	function inserirNotaAluno($nota1, $nota2, $aluno){
		
		if( !mysql_fetch_array($this->consultarDadosAluno($aluno), MYSQL_ASSOC) )
			return false;

		$query = "UPDATE aluno SET pf1='$nota1', pf2='$nota2' WHERE matricula='$aluno' OR nome='$aluno'";
		mysql_query($query);
		return true;
	}

	function calcularMediaAluno($aluno){
		$query = "SELECT (pf1+pf2)/2 as media, nome FROM aluno WHERE matricula='$aluno' OR nome='$aluno'";
		return mysql_query($query);
	}

	function consultarDadosAluno($aluno){
		$query = "SELECT * FROM aluno WHERE matricula='$aluno' OR nome='$aluno'";
		return mysql_query($query);
	}

	function alterarAluno($matricula, $nome, $idade, $email){
		$query = "UPDATE aluno SET nome = '$nome', idade = '$idade', email ='$email' WHERE matricula = '$matricula'";
		mysql_query($query);
	}

	function excluirAluno($aluno){
		if( !mysql_fetch_array($this->consultarDadosAluno($aluno), MYSQL_ASSOC) )
			return false;

		$query = "DELETE FROM aluno WHERE matricula = '$aluno' OR nome = '$aluno'";
		mysql_query($query);
		return true;
	}

	function listarAlunos(){
		$query = "SELECT * FROM aluno";
		return $this->getRows(mysql_query($query));
	}

	private function getRows($result)
	{	
		$index = 0;

		while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			$rows[$index] = $row;
			$index++;
		}

		return (isset($rows))? $rows : null;
	}

}

$turma = new Turma();

if(!isset($_REQUEST['operacao']))
	exit(0);

switch ($_REQUEST['operacao']) {
	case 'cadastrar':
		
		$json = array(
				"msg" => "Aluno cadastrado com sucesso",
				"code" => 1
				);

		if( !$turma->inserirAluno($_REQUEST['matricula'], $_REQUEST['nome'], $_REQUEST['idade'], $_REQUEST['email']) ){
			$json['code'] = -1;
			$json['msg'] = "Matrícula já existe";
		}

		break;
	case 'cadastrarNota':
		$json = array(
				"msg" => "Notas cadastradas",
				"code" => 2
				);

		if( !$turma->inserirNotaAluno($_REQUEST['nota1'], $_REQUEST['nota2'], $_REQUEST['aluno']) ){
			$json['code'] = -1;
			$json['msg'] = "Aluno não existe";
		}
		break;
	case 'calcularMedia' :
		$aluno = mysql_fetch_array($turma->calcularMediaAluno($_REQUEST['aluno']), MYSQL_ASSOC);
		$json = array(
				"msg" => "Média gerada",
				"aluno" => $aluno,
				"code" => 3
				);
		break;
	case 'consultar' :
		$aluno = mysql_fetch_array($turma->consultarDadosAluno($_REQUEST['aluno']), MYSQL_ASSOC );
		$json = array(
				"msg" => "Aluno encontrado",
				"aluno" => $aluno,
				"code" => 4
				);
		break;
	case 'alterar' :
		$turma->alterarAluno($_REQUEST['matricula'], $_REQUEST['nome'], $_REQUEST['idade'], $_REQUEST['email']);
		$json = array(
				"msg" => "Aluno alterado com sucesso",
				"code" => 5
				);
		break;
	case 'excluir' :
		
		$json = array(
				"msg" => "Aluno excluido",
				"code" => 6
				);

		$res = $turma->excluirAluno($_REQUEST['aluno']);

		if(!$res){
			$json['code'] = -1;
			$json['msg'] = "Aluno especificado não existe";
		}
	
		break;
	case 'relatorio':
		$alunos = $turma->listarAlunos();
		$json = array(
				"msg" => "Lista de Alunos",
				"alunos" => $alunos,
				"code" => 6
				);
		break;

}
	
	if(isset($json))
		exit(json_encode($json));
?>