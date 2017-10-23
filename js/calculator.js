$(document).ready(function() {
	var result = 0.0;
	var final = 0.0;
	var history = "";
	var symbol = 1;
	var txt;
	var num;
	var decimal = false;
	var decimalDiv = 1;
	var decimalBase = 0;
	var lastSymbol = "";
	var operationHappened = false;

	$('button').click(function(){
		txt = $(this).val();
		if(!isNaN(txt)){
			operationHappened = true;
			num = parseInt(txt);
			result = Math.abs(result);
			if(decimal){
				decimalDiv *= 10;
				decimalBase += 1;
				result = (result + num/decimalDiv).toFixed(decimalBase);
			}else{
				result = result*10 + num;
			}
			result = symbol * result;
			if(result.toString().length > 8){
					$('#result').html('<p>DIGIT OVERFLOW</p>');
					$('#history').html('<p>DIGIT OVERFLOW</p>');
				}
			$('#result').html('<p>'+result.toString()+'</p>');
		}else if(txt == "NEG"){
			operationHappened = true
			symbol = (-1) * symbol;
			result = symbol * result;
			$('#result').html('<p>'+result.toString()+'</p>');
			console.log(result.toString());
		}else if(txt == "."){
			decimal = true;
		}else if(txt == "="){
			if(operationHappened){
				operationHappened = false;
				final = doArithmatic(final, lastSymbol, result, decimalBase);
				history = history.concat(lastSymbol).concat(result.toString()).concat('<END>');
				result = 0;
				decimal = false;
				decimalDiv = 1;
				decimalBase = 0;
				symbol = 1;
				if(history.length > 20 || final.toString().length > 8){
					$('#result').html('<p>DIGIT OVERFLOW</p>');
					$('#history').html('<p>DIGIT OVERFLOW</p>');
				}
				$('#history').html('<p>'+history+'</p>');
				$('#result').html('<p>'+final.toString()+'</p>');
				final = 0;
				lastSymbol = "";
			}
		}else if(txt == 'AC'){
			operationHappened = false;
			history = "";
			final = 0;
			lastSymbol = "";
			result = 0;
			decimal = false;
			decimalDiv = 1;
			decimalBase = 0;
			symbol = 1;
			$('#result').html('<p>'+final.toString()+'</p>');
			$('#history').html('<p>'+history+'</p>');
		}else if(txt == 'CE'){
			operationHappened = false;
			result = 0;
			decimal = false;
			decimalDiv = 1;
			decimalBase = 0;
			symbol = 1;
			$('#result').html('<p>'+result.toString()+'</p>');
		}else{
			if(operationHappened){
				operationHappened = false;
				final= doArithmatic(final, lastSymbol, result, decimalBase);
				history = history.concat(lastSymbol).concat(result.toString());
				result = 0;
				decimal = false;
				decimalDiv = 1;
				decimalBase = 0;
				symbol = 1;
				lastSymbol = txt;
				if(history.length > 20 || final.toString().length > 8){
					$('#result').html('<p>DIGIT OVERFLOW</p>');
					$('#history').html('<p>DIGIT OVERFLOW</p>');
				}
				$('#result').html('<p>'+final.toString()+'</p>');
				$('#history').html('<p>'+history+'</p>');
			}
		}



	});

});

function doArithmatic(final, lastSymbol, result, decimalBase){
	var finalStr = final.toString().split('.');
	var resultStr = result.toString().split('.');
	var finalLen = 0;
	var resultLen = 0;
	if(finalStr.length>1){
		finalLen = finalStr[1].length;
	}
	if(resultStr.length>1){
		resultLen = resultStr[1].length;
	}
	baseVal = Math.max(finalLen,resultLen,decimalBase);
	switch(lastSymbol){
		case '+': return (parseFloat(final)+parseFloat(result)).toFixed(baseVal);
		case '-': return (parseFloat(final)-parseFloat(result)).toFixed(baseVal);
		case '*': return (parseFloat(final)*parseFloat(result)).toFixed(baseVal);
		case '/': return (parseFloat(final)/parseFloat(result)).toFixed(baseVal);
		default: return result.toFixed(baseVal);
	}
}
