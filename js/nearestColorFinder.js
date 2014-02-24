	Array.min = function(array) {return Math.min.apply(Math, array);};
	icf.indexedArrayOfColors = [];
	// feels like going the wrong way about this, but it might work
	for (var cdi in icf.colorDefinitions){
		var crclr = icf.colorDefinitions[cdi];
		icf.indexedArrayOfColors.push(crclr.r + ',' + crclr.g + ',' + crclr.b + ',' + cdi);
	};
	icf.findNearestColor = function(currentColor) {
		//currentColor is an object with r,g and b values
		var nearnessOrDifference = [];
		for (var colorDefIndex in icf.indexedArrayOfColors)
		{
			//var colorDef = icf.colorDefinitions[colorDefIndex];
			var curClrArray = icf.indexedArrayOfColors[colorDefIndex].split(',');
			var colorDef = {
				r: curClrArray[0],
				g: curClrArray[1],
				b: curClrArray[2],
				name: curClrArray[3]
			};
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
 		var indexOfFoundNearestColor = nearnessOrDifference.indexOf(Array.min(nearnessOrDifference));
		return icf.indexedArrayOfColors[indexOfFoundNearestColor].split(',')[3]; // name of color
	}
 
 	icf.hex2rgb = function(hexColor) {
		var r,g,b;
		var startIndex = hexColor.indexOf('#') > 0 ? 1: 0;
 
		r = parseInt(hexColor.substr(startIndex, 2), 16);
		g = parseInt(hexColor.substr(startIndex + 2, 2), 16);
		b = parseInt(hexColor.substr(startIndex + 4, 2), 16);
		return [r,g,b];
	}