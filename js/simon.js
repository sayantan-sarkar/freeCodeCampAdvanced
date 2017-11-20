var globalCounter = 0;
var globalReset = false;
var globalColor = '';
var globalTimer = 0;

$(document).ready(function() {
	var switchOn = false;
	var strictMode = false;
	var round =  5;
	var blinkArray = [];


	$('.switchState').attr('checked', false);
	$('.switchState').prop('checked',false);

	$('.switchState').click(function(){
		switchOn = $('.switchState').is(":checked");
		if(switchOn){
			$('.score').html('00');
			$('.score').css('color','#ff0000');
			blinkArray = blinkLights(round);
		}else{
			$('.score').html('88');
			$('.score').css('color','#a51818');
		}
		
	});

	$('.strictBut').click(function(){
		if(strictMode){
			strictMode = false;
			$('.strictIndicate').css('background-color','black');
		}else{
			strictMode = true;
			$('.strictIndicate').css('background-color','#ff0000');
		}
	})
});

function getColorId(className){
	switch(className){
		case 'topLeftCirle': return 0;
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

function changeBackgroundColor(arr){
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

	globalCounter = 0;
	globalReset = false;
	globalTimer  = setInterval(function(){ changeBackgroundColor(outArr);},500);

	return outArr;
}
