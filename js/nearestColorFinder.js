	// http://forrst.com/posts/Find_the_closest_nearest_HEX_color_of_a_small-JDB


	var color = '#ffcd00';
	var base_colors=["660000","990000","cc0000","cc3333","ea4c88","993399","663399","333399","0066cc","0099cc","66cccc","77cc33","669900","336600","666600","999900","cccc33","ffff00","ffcc33","ff9900","ff6600","cc6633","996633","663300","000000","999999","cccccc","ffffff"];
 
	//Convert to RGB, then R, G, B
	var color_rgb = hex2rgb(color);
	var color_r = color_rgb.split(',')[0];
	var color_g = color_rgb.split(',')[1];
	var color_b = color_rgb.split(',')[2];
 
	//Create an emtyp array for the difference betwwen the colors
	var differenceArray=[];
 
	//Function to find the smallest value in an array
	Array.min = function( array ){
	       return Math.min.apply( Math, array );
	};
 
 
	//Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
	$.each(base_colors, function(index, value) { 
		var base_color_rgb = hex2rgb(value);
		var base_colors_r = base_color_rgb.split(',')[0];
		var base_colors_g = base_color_rgb.split(',')[1];
		var base_colors_b = base_color_rgb.split(',')[2];
 
		//Add the difference to the differenceArray
		differenceArray.push(Math.sqrt((color_r-base_colors_r)*(color_r-base_colors_r)+(color_g-base_colors_g)*(color_g-base_colors_g)+(color_b-base_colors_b)*(color_b-base_colors_b)));
	});
 
	//Get the lowest number from the differenceArray
	var lowest = Array.min(differenceArray);
 
	//Get the index for that lowest number
	var index = differenceArray.indexOf(lowest);
 
	//Bumm, here is the closest color from the array
	alert(index);
 
	//Function to convert HEX to RGB
	function hex2rgb( colour ) {
		var r,g,b;
		if ( colour.charAt(0) == '#' ) {
			colour = colour.substr(1);
		}
 
		r = colour.charAt(0) + colour.charAt(1);
		g = colour.charAt(2) + colour.charAt(3);
		b = colour.charAt(4) + colour.charAt(5);
	
		r = parseInt( r,16 );
		g = parseInt( g,16 );
		b = parseInt( b ,16);
		return r+','+g+','+b;
	}