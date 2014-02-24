	// with inspiration from http://forrst.com/posts/Find_the_closest_nearest_HEX_color_of_a_small-JDB

	//Function to find the smallest value in an array
	Array.min = function(array) {return Math.min.apply(Math, array);};
	
	icf.findNearestColor = function(currentColor) {
		//currentColor is an object with r,g and b values
		var nearnessOrDifference = [];
		for (var colorDefIndex in icf.colorDefinitions)
		{
			var colorDef = icf.colorDefinitions[colorDefIndex];
			nearnessOrDifference.push(
				Math.sqrt(
					(currentColor.r-colorDef.r)*
					(currentColor.r-colorDef.r)+
					(currentColor.g-colorDef.g)*
					(currentColor.g-colorDef.g)+
					(currentColor.b-colorDef.b)*
					(currentColor.b-colorDef.b)
				)
			);			
		};
 
		//Get the lowest number from the differenceArray
		var lowest = Array.min(nearnessOrDifference);
 
		//Get the index for that lowest number
		var index = nearnessOrDifference.indexOf(lowest);
 
		//Bumm, here is the closest color from the array
		alert(index);
	}
 
 	icf.hex2rgb = function(hexColor) {
		var r,g,b;
		var startIndex = hexColor.indexOf('#') > 0 ? 1: 0;
 
		r = parseInt(hexColor.substr(startIndex, 2), 16);
		g = parseInt(hexColor.substr(startIndex + 2, 2), 16);
		b = parseInt(hexColor.substr(startIndex + 4, 2), 16);
		return [r,g,b];
	}