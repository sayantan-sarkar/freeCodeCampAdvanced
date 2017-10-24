$(document).ready(function() {
	var symbol,value;
	$('.stopSym').css('cursor','pointer');
	$('.workSym').css('cursor','pointer');

	$('.stopSym').click(function(){
		symbol = $(this).text();
		value = parseInt($('.stopVal').text());
		value = arith(value,symbol);
		$('.stopVal').text(value);
  	});

	$('.workSym').click(function(){
		symbol = $(this).text();
		value = parseInt($('.workVal').text());
		value = arith(value,symbol);
		$('.workVal').text(value);
  	});


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