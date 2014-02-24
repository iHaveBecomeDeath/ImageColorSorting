	icf.maximumNumberOfColorsInPalette = 5;
	icf.allFoundColors = {};
	icf.calculateTheImages = function(callback) {
		imagesLoaded(document.querySelector("body"), function(){
			var tjuven = new ColorThief();
			[].forEach.call(
				document.querySelectorAll('.clrImg'), 
				function(imgElement) {
						try{
							var pal = tjuven.getPalette(imgElement, icf.maximumNumberOfColorsInPalette);
							console.log(pal);
							var containerDiv = document.createElement("div");
							var dominantDiv = icf.makeColorDiv(pal[0], "dominant");
							icf.addOrIncrementColorCount(pal[0]);
							containerDiv.appendChild(dominantDiv);
							if (pal[1]){
								pal.slice(1).forEach(function(paletteColor){
					 			  console.log("heya", paletteColor);
					 			  var colorDiv = icf.makeColorDiv(paletteColor, paletteColor.concat());
								  icf.addOrIncrementColorCount(paletteColor);
								  containerDiv.appendChild(colorDiv); 
				 			 	});
							}
							imgElement.parentElement.appendChild(containerDiv);
						}
						catch(err){console.log(err);}	
				}
			);
			callback();
		});
	}
	icf.addOrIncrementColorCount = function(rgbArray){
		var assocName = rgbArray.concat().toString().replace(/,/g,"_");
		if (!icf.allFoundColors[assocName]){
			icf.allFoundColors[assocName] = {
				r: rgbArray[0],
				g: rgbArray[1],
				b: rgbArray[2],
				count:1
			};
			console.log("created entry", assocName);
		}
		else {
			icf.allFoundColors[assocName].count += 1;
			console.log("added count to", assocName);
		}
	}

	icf.makeColorDiv = function(rgbArray, description) {
		var colorDiv = document.createElement("div");
		console.log(rgbArray.concat());
		colorDiv.className = "clrDiv";
	 	colorDiv.style.background = "rgb(" + rgbArray.concat() + ")";
	 	colorDiv.innerHTML = description;	
	 	return colorDiv;
	};

	icf.printFootResult = function(){
		var headElement = document.querySelector(".totalResult");
		icf.sortedColors = icf.sortTheResults();
		console.log(icf.sortedColors);
		var subHeader = document.createElement("h3");
		subHeader.innerHTML = "Found " + icf.sortedColors.length + " colors in total";
		headElement.appendChild(subHeader);
		for (var sortedColor in icf.sortedColors) {
			var foundColor = icf.allFoundColors[icf.sortedColors[sortedColor][0]];
			var rgb = foundColor.r + "," + foundColor.g + "," + foundColor.b;
			var countForColor = foundColor.count;
			var colorElement = icf.makeColorDiv([foundColor.r, foundColor.g, foundColor.b], rgb + " (count: " + countForColor + ")");
			headElement.appendChild(colorElement);
		}
	}

	icf.sortTheResults = function(){
		var sortable = [];
		for (var color in icf.allFoundColors){
		      sortable.push([color, icf.allFoundColors[color].count]);
			  console.log("sorting", color, icf.allFoundColors[color].count);
		}
		sortable.sort(function(a, b) {return b[1] - a[1]});
		return sortable;
	}

	icf.calculateTheImages(icf.printFootResult);