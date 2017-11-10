$(document).ready(function() {
	var matrix = cleanMatrix(3);
	fillMatrix(matrix);
	var myTurn = true;
	var cellId, cellIdArr;
	var sym = ['O','X'];
	var turn = ['Computer Turn','Your Turn'];
	$('.cell').click(function(){
		cellId = $(this).attr('id');
		if($(this).html() != '&nbsp;'){
			return true;
		}
		cellIdArr = cellId.split('');
		matrix[parseInt(cellIdArr[1])][parseInt(cellIdArr[2])] = sym[myTurn ? 1 : 0];
		fillMatrix(matrix);
		if(checkGame(matrix)){
			$('.guide').html('Game Over');
			matrix = cleanMatrix(3);
			fillMatrix(matrix);
			$('#playerScore').html(parseInt($('#playerScore').html())+1);
			myTurn = true;
		}else{
			matrix = computerPlayPlan(matrix,sym[!myTurn ? 1 : 0],sym[myTurn ? 1 : 0]);
			fillMatrix(matrix);
			$('.guide').html(turn[myTurn ? 1 : 0]);
			if(checkGame(matrix)){
				$('.guide').html('Game Over');
				matrix = cleanMatrix(3);
				fillMatrix(matrix);
				$('#computerScore').html(parseInt($('#computerScore').html())+1);
				myTurn = false;
				matrix = computerPlayPlan(matrix,sym[!myTurn ? 1 : 0],sym[myTurn ? 1 : 0]);
				fillMatrix(matrix);
				$('.guide').html('Your Turn');
			}
		}
	});	


});



function cleanMatrix(size){
	var matrix = [];
	for(var i = 0; i < size; i++){
		matrix[i] = []
		for(var j = 0; j < size; j++){
			matrix[i][j] = '&nbsp;';
		}
	}
	return matrix
}

function fillMatrix(matrix){
	var idVal;
	for(var i = 0; i < matrix.length; i++){
		for(var j = 0; j < matrix[i].length; j++){
			idVal = ['c',i.toString(),j.toString()].join('');
			$('#'+idVal).html(matrix[i][j]);
		}
	}
	return true;
}

function consolePrint(matrix){
	for(var i = 0; i < matrix.length; i++){
		for(var j = 0; j < matrix[i].length; j++){
			console.log(matrix[i][j]);
		}
	}
	return true;
}

function checkGame(matrix){
	var flatArr = matrix.reduce(function(acc,cur){
		return acc.concat(cur);
	}, []);
	var checkLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	return checkLines.map(function(cur){
		var val = Array.from(new Set(cur.map(function(val){
			return flatArr[val];
		})));
		if( val.length == 1 & (val[0] == 'X' | val[0] == 'O')){
			return true;
		}
		return false;
	}).reduce(function(acc, cur){
		return acc | cur;
	}, false);
}

function computerPlayRandom(matrix, sym){
	var flatArr = matrix.reduce(function(acc,cur){
		return acc.concat(cur);
	}, []);

	var scope = [];
	for(var i=0; i<flatArr.length; i++){
		if(flatArr[i] == '&nbsp;'){
			scope.push(i);
		}
	}
	if(scope.length == 0){
		return cleanMatrix(3);
	}
	var computerCell = scope[Math.floor(Math.random()*scope.length)];
	matrix[Math.floor(computerCell/3)][computerCell%3] = sym;
	
	return matrix;
}

function computerPlayPlan(matrix, sym, humanSym){
	var flatArr = matrix.reduce(function(acc,cur){
		return acc.concat(cur);
	}, []);

	var scope = [];
	for(var i=0; i<flatArr.length; i++){
		if(flatArr[i] == '&nbsp;'){
			scope.push(i);
		}
	}
	if(scope.length == 0){
		return cleanMatrix(3);
	}
	var copyMatrix, score;
	var scoreArr = [];
	var maxScore = -36000;
	var thisScore;
	for(var i=0; i<scope.length; i++){
		copyMatrix = copier(matrix);
		copyMatrix[Math.floor(scope[i]/3)][scope[i]%3] = sym;
		thisScore = winChance(copyMatrix,sym,humanSym)
		scoreArr.push(thisScore);
		if(thisScore > maxScore){
			maxScore = thisScore;
		}
	}	

	
	var newScope = [];
	for(var i=0; i<scope.length; i++){
		if(scoreArr[i] == maxScore){
			newScope.push(scope[i]);
		}
	}

	var computerCell = newScope[Math.floor(Math.random()*newScope.length)];
	matrix[Math.floor(computerCell/3)][computerCell%3] = sym;
	return matrix;

}

function copier(matrix){
	var newMatrix = [];
	for(var i =0; i<matrix.length; i++){
		newMatrix.push(matrix[i].slice());
	}
	return newMatrix;
}

function permute(arr){
	if(arr.length == 1){
		return [arr];
	}

	var firstElem, newArr, newPerm, perm, temp;
	var out = [];
	for(var i=0; i<arr.length; i++){
		firstElem = arr[i];
		newArr = arr.slice();
		newArr.splice(i,1);
		newPerm = permute(newArr);
		perm = newPerm.map(function(x){
			return [firstElem].concat(x);
		})
		out = out.concat(perm);
	}
	return out;
}

function winChance(matrix, mySym, oppSym){
	var flatArr = matrix.reduce(function(acc,cur){
		return acc.concat(cur);
	}, []);

	var sym = [mySym,oppSym];
	var turn = true;

	var scope = [];
	for(var i=0; i<flatArr.length; i++){
		if(flatArr[i] == '&nbsp;'){
			scope.push(i);
		}
	}

	if(scope.length == 0){
		return 0;
	}

	var scopePerm = permute(scope);
	var copyMatrix;
	var score = 0;

	for(var i=0; i<scopePerm.length; i++){
		copyMatrix = copier(matrix);
		turn = true;
		for(var j=0; j<scopePerm[i].length; j++){
			copyMatrix[Math.floor(scopePerm[i][j]/3)][scopePerm[i][j]%3] = sym[turn ? 1 : 0];
			if(checkGame(copyMatrix)){
				score = score + (turn ? -1 : 1);
				break;
			}
			turn = !turn;
		}
	}

	return score

}

