app.controller('HomeCtrl', function($rootScope, $location){
	$rootScope.activetab = $location.path();
}).

controller('CadastrarCtrl', function($rootScope, $scope, $location, $http, Server){
	$rootScope.activetab = $location.path();

	console.log($rootScope.activetab);

	$scope.cadastrar = function(){
		$http({ 
			method : "POST", url : Server.path, params : 
			{ 
				operacao : "cadastrar", matricula : $scope.matricula, nome : $scope.nome, idade : $scope.idade, email : $scope.email 
			} 
		}).success(function(data, status, headers, config){
			if(data.code == -1){
				alert(data.msg);
			}else{
				$location.path("/relatorio");
				$location.replace();
			}
		});
	}
}).

controller('CadastrarNotaAlunoCtrl', function($rootScope, $scope, $location, $http, Server){
	$rootScope.activetab = $location.path();

	$scope.cadastrarNota = function(){
		$http({ 
			method : "POST", url : Server.path, params : 
			{ 
				operacao : "cadastrarNota", aluno : $scope.aluno, nota1 : $scope.pf1, nota2 : $scope.pf2
			} 
		}).success(function(data, status, headers, config){
			if(data.code == -1){
				alert(data.msg);
			}else{
				alert(data.msg);
				$location.path("/relatorio");
				$location.replace();
			}
		});
	}
}).

controller('MediaAlunoCtrl', function($rootScope, $scope, $location, $http, Server){
	$rootScope.activetab = $location.path();

	$scope.calcularMedia = function(){
		$http({ 
			method : "POST", url : Server.path, params : 
			{ 
				operacao : "calcularMedia", aluno : $scope.aluno
			} 
		}).success(function(data, status, headers, config){
			if(data.aluno){
				alert("A média de " + data.aluno.nome + " é " + data.aluno.media);
			}else{
				alert("O aluno não existe");
			}
		});
	}
}).

controller('ConsultarAlunoCtrl', function($rootScope, $scope, $location, $http, Server){
	$rootScope.activetab = $location.path();

	$scope.consultar = function(){
		$location.path("/dados-aluno/"+$scope.aluno);
		$location.replace();
	}
}).

controller('DadosAlunoCtrl', function($rootScope, $scope, $location, $http, $routeParams, Server){
	$rootScope.activetab = $location.path();

	$http({ 
		method : "POST", url : Server.path, params : 
		{ 
			operacao : "consultar", aluno : $routeParams.alunoId
		} 
	}).success(function(data, status, headers, config){
		if(data.aluno){
			$scope.aluno = data.aluno;
		}
	});
}).

controller('AlterarAlunoCtrl', function($rootScope, $scope, $location, $http, Server, $routeParams){
	$rootScope.activetab = $location.path();

	if($routeParams.matriculaAluno){
		$http({ 
		method : "POST", url : Server.path, params : 
		{ 
			operacao : "consultar", aluno : $routeParams.matriculaAluno
		} 
		}).success(function(data, status, headers, config){
			console.log(data);
			if(data.code > 0){
				// $scope.aluno = data.aluno;
				$scope.matricula = parseInt(data.aluno.matricula, 10);
				$scope.nome = data.aluno.nome;
				$scope.idade = parseInt(data.aluno.idade, 10);
				$scope.email = data.aluno.email;
			}else{
				alert("O aluno não existe");
			}
		});
	}

	$scope.consultar = function(){
		$http({ 
			method : "POST", url : Server.path, params : 
			{ 
				operacao : "consultar", aluno : $scope.aluno
			} 
			}).success(function(data, status, headers, config){
				if(data.aluno){
					$location.path("/alterar-aluno/"+$scope.aluno);
					$location.replace();
				}else{
					alert("O aluno não existe");
				}
		});
	}

	$scope.alterar = function(){
		$http({ 
			method : "POST", url : Server.path, params : 
			{ 
				operacao : "alterar", matricula : $scope.matricula, nome : $scope.nome, idade : $scope.idade, email : $scope.email 
			} 
			}).success(function(data, status, headers, config){
				if(data.code > 0){
					$location.path("/relatorio");
					$location.replace();
				}else{
					alert("O aluno não existe");
				}
		});
	}
}).

controller('ExcluirAlunoCtrl', function($rootScope, $scope, $location, $http, Server){
	$rootScope.activetab = $location.path();

	$scope.excluir = function(){
		$http({ 
			method : "POST", url : Server.path, params : 
			{ 
				operacao : "excluir", aluno : $scope.aluno
			} 
			}).success(function(data, status, headers, config){
				if(data.code != -1){
					$location.path("/relatorio");
					$location.replace();
				}else{
					alert(data.msg);
				}
		});
	}
}).

controller('RelatorioCtrl', function($rootScope, $scope, $location, $http, Server){
	$rootScope.activetab = $location.path();

	$http({ 
			method : "POST", url : Server.path, params : 
			{ 
				operacao : "relatorio", aluno : $scope.aluno
			} 
			}).success(function(data, status, headers, config){
				if(data.alunos){
					$scope.alunos = data.alunos;
				}else{
					alert("Não existe alunos cadastrados");
				}
	});
});