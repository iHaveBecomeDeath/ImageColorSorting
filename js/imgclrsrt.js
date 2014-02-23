	var maximumNumberOfColorsInPalette = 5;
	var allFoundColors = {};
	function calculateTheImages(callback) {
		imagesLoaded(document.querySelector("body"), function(){
			var tjuven = new ColorThief();
			[].forEach.call(
				document.querySelectorAll('.clrImg'), 
				function(imgElement) {
						try{
							var pal = tjuven.getPalette(imgElement, maximumNumberOfColorsInPalette);
							console.log(pal);
							var dominantDiv = makeColorDiv(pal[0], "dominant");
							addOrIncrementColorCount(pal[0]);
							imgElement.parentElement.appendChild(dominantDiv);
							if (pal[1]){
								pal.slice(1).forEach(function(paletteColor){
					 			  console.log("heya", paletteColor);
					 			  var colorDiv = makeColorDiv(paletteColor, paletteColor.concat());
								  addOrIncrementColorCount(paletteColor);
								  imgElement.parentElement.appendChild(colorDiv); 
				 			 	});
							}
						}
						catch(err){console.log(err);}	
				}
			);
			callback();
		});
	}
	function addOrIncrementColorCount(rgbArray){
		var assocName = rgbArray.concat().toString().replace(/,/g,"_");
		if (!allFoundColors[assocName]){
			allFoundColors[assocName] = {
				r: rgbArray[0],
				g: rgbArray[1],
				b: rgbArray[2],
				count:1
			};
			console.log("created entry", assocName);
		}
		else {
			allFoundColors[assocName].count += 1;
			console.log("added count to", assocName);
		}
	}

	function makeColorDiv(rgbArray, description) {
		var colorDiv = document.createElement("div");
		console.log(rgbArray.concat());
		colorDiv.className = "clrDiv";
	 	colorDiv.style.background = "rgb(" + rgbArray.concat() + ")";
	 	colorDiv.innerHTML = description;	
	 	return colorDiv;
	};

	function printHeadResult(){
		document.querySelector(".allTheColors").innerHTML = allFoundColors.toString();
		console.log(sortTheResults());
	}

	function sortTheResults(){
		var sortable = [];
		for (var color in allFoundColors){
		      sortable.push([color, allFoundColors[color].count]);
			  console.log("sorting", color, allFoundColors[color].count);
		}
		sortable.sort(function(a, b) {return b[1] - a[1]});
		return sortable;
	}

	calculateTheImages(printHeadResult);