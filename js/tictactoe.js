$(document).ready(function() {
	var matrix = cleanMatrix(3);
	fillMatrix(matrix);
	var myTurn = true;
	var cellId, cellIdArr;
	var sym = ['O','X'];

	$('.cell').click(function(){
		cellId = $(this).attr('id');
		if($(this).html() != '&nbsp;'){
			return true;
		}
		cellIdArr = cellId.split('');
		matrix[parseInt(cellIdArr[1])][parseInt(cellIdArr[2])] = sym[myTurn ? 1 : 0];
		fillMatrix(matrix);
		if(checkGame(matrix)){
			console.log('Hurray');
			matrix = cleanMatrix(3);
			fillMatrix(matrix);
			$('#playerScore').html(parseInt($('#playerScore').html())+1);
		}else{
			matrix = computerPlayRandom(matrix,sym[!myTurn ? 1 : 0]);
			fillMatrix(matrix);
			if(checkGame(matrix)){
				console.log('Computer Hurray');
				matrix = cleanMatrix(3);
				fillMatrix(matrix);
				$('#computerScore').html(parseInt($('#computerScore').html())+1);
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

	var computerCell = scope[Math.floor(Math.random()*scope.length)];
	matrix[Math.floor(computerCell/3)][computerCell%3] = sym;
	return matrix;
}