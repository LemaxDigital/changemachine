/* ============================================
===============================================
Authors & copyright: (c) 2016 LemaxDigital.com | changeMachine.js - MIT License
===============================================
=============================================== */

$(document).ready(function(){
	// Set up Tooltips
    $('[data-toggle="tooltip"]').tooltip();
	
 	$("#changeMachineForm").submit(function(event){
		
		// Stop the form from reloading the page after being submitted
		event.preventDefault();
		
		// Grab the input value
		var inputAmount = $("#inputAmount").val(),		
        // Remove Whitespaces
        removeWSpace = inputAmount.replace(/\s/g, ''),
        // Error message to display if inputAmount is not a valid input
        errFormat = "<strong>Please enter a valid amount.</strong> Only enter the number without the '£' symbol, comma or letters.",
        errNegative = "<strong>Please enter a positive amount.</strong> You cannot ask to change -10 or zero pounds ;-)",
        errLength = "<strong>No value received.</strong> Please enter an amount.";
		
		// ---- Validating inputAmount ----    
		if ( document.getElementById("inputAmount").value == "") { // If inputAmount is empty, return an error message
			document.getElementById("outputAmount").innerHTML = errLength;
		}  else if (removeWSpace * 0 != 0) { // If inputAmount is not a number, return an error message
			document.getElementById("outputAmount").innerHTML = errFormat;
		}  else if (removeWSpace < 0.01) { // If inputAmount is a negative number, return an error message
			document.getElementById("outputAmount").innerHTML = errNegative;
		}  else {
			calculate(removeWSpace);
		}
	});
	
	var calculate = function(moneyIn){
		// Multiply moneyIn by 100 to avoid any error using 0.04 type of number
		moneyIn = moneyIn * 100;
		
		var compareTo = [200, 100, 50, 20, 10, 5, 2, 1]
			coins = [" &#8356;2", " &#8356;1", " &#8356;0.50", " &#8356;0.20", " &#8356;0.10", " &#8356;0.05", " &#8356;0.02", " &#8356;0.01"],
			results = [];
		
		// find how many times moneyIn goes into the first data of the array
			// if moneyIn greater or equal to coins[0] then push 2 into results array			
			// Once moneyIn smaller then coins[0] then do the same thing with coins[1] until coins[7].
		for(var i = 0; i <= compareTo.length; i++){
			while(moneyIn >= compareTo[i]){
					moneyIn -= compareTo[i];
					results.push(coins[i]);				
			}		
		}
		$('#outputAmount').html(results.toString());		
	}; 
});