var intervalId;
var work = true;
var pause = true;

$(document).ready(function() {
	var symbol,value;
	$('.stopSym').css('cursor','pointer');
	$('.workSym').css('cursor','pointer');
	$('.innerCircle').css('cursor','pointer');

	$('.stopSym').click(function(){
		symbol = $(this).text();
		value = parseInt($('.stopVal').text());
		value = arith(value,symbol);
		$('.stopVal').text(value);
		if(!work){
			$('#timeLeft').text($('.stopVal').text()+':00');
		}
  	});

	$('.workSym').click(function(){
		symbol = $(this).text();
		value = parseInt($('.workVal').text());
		value = arith(value,symbol);
		$('.workVal').text(value);
		if(work){
			$('#timeLeft').text($('.workVal').text()+':00');
		}
  	});

  	$('.innerCircle').click(function(){
  		if(pause){
  			clearInterval(intervalId);
  			pause = false;
  		}else{
  			intervalId = setInterval(publishTime,100);
  			pause = true;
  		}
  	});
  	
  	intervalId = setInterval(publishTime,100);
});


function arith(value, symbol){
	switch(symbol){
			case '+': value = value+1;
				break;
			case '-': value = value-1;
	}
	if(value<1){
		value = 1;
	}
	return(value);

}

function countdown(timeArr){
	timeArr[1]--;
	if(timeArr[1] < 0){
		timeArr[0]--;
		timeArr[1] = 59;
	}
	if(timeArr[0] < 0){
		timeArr[0] = 0;
		timeArr[1] = 0;
	}

	return(timeArr);
}

function publishTime(){
	var timeText = $('#timeLeft').text().split(':').map(function(x){ return(parseInt(x,10));});
	timeText = countdown(timeText);
  	$('#timeLeft').text(timeText.map(function(x){return(('0'+x).slice(-2));}).join(':'));
  	if(timeText[0]==0 & timeText[1]==0){
  		if(work){
  			$('#timeLeft').text($('.stopVal').text()+':00');
  			$('#status').text('~Break~');
  			$('.innerCircle').css('background','green');
  			work = false;
  		}else{
  			$('#timeLeft').text($('.workVal').text()+':00');
  			$('#status').text('!Work!');
  			$('.innerCircle').css('background','red');
  			work = true;
  		}
  	}
  	return(true);
}