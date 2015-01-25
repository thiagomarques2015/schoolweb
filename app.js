var app = angular.module('app', ['ngRoute']).


config(function($routeProvider, $locationProvider){

	//remove o # da url
	// $locationProvider.html5Mode(true);

	$routeProvider

	//Para a rota '/', carregamos o template home.html e o controller 'HomeCtrl'
	.when('/', {
		templateUrl : 'views/home.html',
		controller  : 'HomeCtrl'
	})

	.when('/cadastrar', {
		templateUrl : 'views/cadastrar_aluno.html',
		controller  : 'CadastrarCtrl'
	})

	.when('/cadastrar-nota-aluno', {
		templateUrl : 'views/cadastrar_nota_do_aluno.html',
		controller  : 'CadastrarNotaAlunoCtrl'
	})

	.when('/media-aluno', {
		templateUrl : 'views/media_do_aluno.html',
		controller  : 'MediaAlunoCtrl'
	})

	.when('/consultar-aluno', {
		templateUrl : 'views/consultar_aluno.html',
		controller  : 'ConsultarAlunoCtrl'
	})

	.when('/consultar-alterar-aluno', {
		templateUrl : 'views/consultar_alterar_aluno.html',
		controller  : 'AlterarAlunoCtrl'
	})

	.when('/alterar-aluno/:matriculaAluno', {
		templateUrl : 'views/alterar_aluno.html',
		controller  : 'AlterarAlunoCtrl'
	})

	.when('/excluir-aluno', {
		templateUrl : 'views/excluir_aluno.html',
		controller  : 'ExcluirAlunoCtrl'
	})

	.when('/dados-aluno/:alunoId', {
		templateUrl : 'views/dados_aluno.html',
		controller  : 'DadosAlunoCtrl'
	})

	.when('/relatorio', {
		templateUrl : 'views/relatorio_de_alunos.html',
		controller  : 'RelatorioCtrl'
	})

	// Caso não seja nenhum desses, redirecione para a rota '/'
	.otherwise({ redirectTo : '/' });
}).

factory('Server', function () {
    return {
        path : "php/Escola.php"
    };
});