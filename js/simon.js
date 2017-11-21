var globalCounter = 0;
var globalReset = false;
var globalColor = '';
var globalTimer = 0;
var blinkArray = [];
var tempArr;
var gameState;
var switchOn = false;
var strictMode = false;
var round =  0;
var userArray = [];

$(document).ready(function() {
	


	$('.switchState').attr('checked', false);
	$('.switchState').prop('checked',false);

	$('.switchState').click(function(){
		switchOn = $('.switchState').is(":checked");
		if(switchOn){
			round = 0;
			blinkArray = [];
			strictMode = false;
			userArray = [];
			$('.score').html('00');
			$('.score').css('color','#ff0000');
		}else{
			$('.score').html('88');
			$('.score').css('color','#a51818');
		}
		
	});

	$('.startBut').click(function(){
		if(switchOn){
			round = 1;
			$('.score').html(('0'+round).slice(-2));
			blinkLights(round);
		}
	});

	$('.strictBut').click(function(){
		if(!switchOn){
			return true;
		}
		if(strictMode){
			strictMode = false;
			$('.strictIndicate').css('background-color','black');
		}else{
			strictMode = true;
			$('.strictIndicate').css('background-color','#ff0000');
		}
	});

	var cba = function(){ return callbackAction();};

	$('.topLeftCircle').click(function(){
		if(!switchOn){
			return true;
		}
		tempArr = [];
		userArray.push(getColorId('topLeftCircle'));
		tempArr.push(userArray[userArray.length-1]);
		globalCounter = 0;
		globalReset = false;
		globalTimer  = setInterval(function(){ changeBackgroundColor(tempArr, cba);},500);
		
		return true;
 	});

 	$('.topRightCircle').click(function(){
 		if(!switchOn){
			return true;
		}
 		tempArr = [];
		userArray.push(getColorId('topRightCircle'));
		tempArr.push(userArray[userArray.length-1]);
		globalCounter = 0;
		globalReset = false;
		globalTimer  = setInterval(function(){ changeBackgroundColor(tempArr, cba);},500);
		
		return true;
 	});
 	$('.botLeftCircle').click(function(){
 		if(!switchOn){
			return true;
		}
 		tempArr = [];
		userArray.push(getColorId('botLeftCircle'));
		tempArr.push(userArray[userArray.length-1]);
		globalCounter = 0;
		globalReset = false;
		globalTimer  = setInterval(function(){ changeBackgroundColor(tempArr, cba);},500);
	
		return true;
 	});
 	$('.botRightCircle').click(function(){
 		if(!switchOn){
			return true;
		}
 		tempArr = [];
		userArray.push(getColorId('botRightCircle'));
		tempArr.push(userArray[userArray.length-1]);
		globalCounter = 0;
		globalReset = false;
		globalTimer  = setInterval(function(){ changeBackgroundColor(tempArr, cba);},500);
		
		return true;
 	});
});

function callbackAction(){
	gameState = checkCorrectness(userArray, blinkArray);
	console.log(userArray);
	if(gameState == 2){
		round = round + 1;
		$('.score').html(('0'+round).slice(-2));
		userArray = [];
		blinkLights(round);
	}else if(gameState == 0){
		if(strictMode){
			round = 1;
		}
		$('.score').html(('0'+round).slice(-2));
		userArray = [];
		blinkLights(round);
	}

	return true;
}

function checkCorrectness(userArr, actualArr){
	//return: 0(fail), 1(ongoing), 2(success)
	for(var i = 0; i < userArr.length; i++){
		if(userArr[i] != actualArr[i]){
			return 0;
		}
	}

	if(userArr.length == actualArr.length){
		return 2;
	}else{
		return 1;
	}
}

function getColorId(className){
	switch(className){
		case 'topLeftCircle': return 0;
		case 'topRightCircle': return 1;
		case 'botRightCircle': return 2;
		case 'botLeftCircle': return 3;
	};
}

function getColorValue(id){
	switch(id){
		case 0: return 'topLeftCircle';
		case 1: return 'topRightCircle';
		case 2: return 'botRightCircle';
		case 3: return 'botLeftCircle';
	};
}

function getRandomInt(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  if(num > max){
  	return getRandomInt(min,max);
  }else{
  	return num;
  }
}

function changeBackgroundColor(arr, callback){
	var className = getColorValue(arr[globalCounter]);	
	var classVal = $('.'+className).css('background-color');
	if(globalReset){
		$('.'+className).css('background-color',globalColor);
		globalCounter = globalCounter+1;
		globalReset = false;
	}else{
		globalReset = true;
		globalColor = $('.'+className).css('background-color');
		$('.'+className).css('background-color','white');
	}

	if(globalCounter == arr.length){
		clearInterval(globalTimer);
		callback();
	}
}

function blinkLights(round){
	var outArr = [];
	var num;
	var className;
	var timeoutVar;
	var classVal;
	for(var i=0; i < round; i++){
		outArr.push(getRandomInt(0,3));
	}
	blinkArray = outArr;
	var callback = function(){return true;};

	globalCounter = 0;
	globalReset = false;
	globalTimer  = setInterval(function(){ changeBackgroundColor(outArr, callback);},500);

	return true;
}
