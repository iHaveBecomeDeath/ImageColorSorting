	icf.maximumNumberOfColorsInPalette = 5;
	icf.allFoundColors = {};
	icf.allNamedColorsFound = {};
	icf.calculateTheImages = function(callback) {
		imagesLoaded(document.querySelector("body"), function(){
			var tjuven = new ColorThief();
			[].forEach.call(
				document.querySelectorAll('.clrImg'), 
				function(imgElement) {
						try{
							var pal = tjuven.getPalette(imgElement, icf.maximumNumberOfColorsInPalette);
							var containerDiv = document.createElement("div");
							var dominantDiv = icf.makeColorDiv(pal[0], "dominant");
							icf.addOrIncrementColorCount(pal[0], imgElement.src);
							containerDiv.appendChild(dominantDiv);
							if (pal[1]){
								pal.slice(1).forEach(function(paletteColor){
					 			  var colorDiv = icf.makeColorDiv(paletteColor, paletteColor.concat());
								  icf.addOrIncrementColorCount(paletteColor, imgElement.src);
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
	icf.addOrIncrementColorCount = function(rgbArray, imgSrc){
		var assocName = rgbArray.concat().toString().replace(/,/g,"_");
		if (!icf.allFoundColors[assocName]){
			icf.allFoundColors[assocName] = {
				r: rgbArray[0],
				g: rgbArray[1],
				b: rgbArray[2],
				count:1,
				imageList: [imgSrc]
			};
		}
		else {
			icf.allFoundColors[assocName].count += 1;
			icf.allFoundColors[assocName].imageList.push(imgSrc);
		}
	}

	icf.makeColorDiv = function(rgbArray, description) {
		var colorDiv = document.createElement("div");
		colorDiv.className = "clrDiv";
	 	colorDiv.style.background = "rgb(" + rgbArray.concat() + ")";
	 	colorDiv.innerHTML = description;	
	 	return colorDiv;
	};

	icf.printHeadResult = function(){
		var headElement = document.querySelector(".allNamedColors");
		var subHeader = document.createElement("h3");
		subHeader.innerHTML = "Found these matching named colors (see bottom for more)";
		headElement.appendChild(subHeader);
		for (var foundColor in icf.allNamedColorsFound){
			var namedColor = icf.allNamedColorsFound[foundColor];
			var rgb = [namedColor.r, namedColor.g, namedColor.b];
			var listOfMatchesForHTML = "";
			namedColor.matchedFrom.forEach(function(matchedRGB){
				listOfMatchesForHTML +=
				 	"<li>"
					+ matchedRGB.replace(/_/g, ',')
					+"</li>"
				;
			});
			var descHTML = 
				namedColor.name + " (" + rgb + ")"
				+ "<br/ > count: " 
			 	+ namedColor.count 
				+ "<br /> matched from: "
				+ "<ul>" 
				+ listOfMatchesForHTML
				+ "</ul>"
			;
			var colorElement = icf.makeColorDiv(rgb, descHTML);
			headElement.appendChild(colorElement); 
		}
	}
	
	icf.printFootResult = function(){
		var containerElement = document.querySelector(".totalResult");
		var subHeader = document.createElement("h3");
		subHeader.innerHTML = "Found " + icf.sortedColors.length + " colors in total";
		containerElement.appendChild(subHeader);
		for (var sortedColor in icf.sortedColors) {
			var foundColor = icf.allFoundColors[icf.sortedColors[sortedColor][0]];
			var rgb = foundColor.r + "," + foundColor.g + "," + foundColor.b;
			var countForColor = foundColor.count;
			var colorElement = icf.makeColorDiv([foundColor.r, foundColor.g, foundColor.b], rgb + " (count: " + countForColor + ")");
			containerElement.appendChild(colorElement);
		}
	}
		
	icf.printResults = function(){
		icf.sortedColors = icf.sortTheResults();
		icf.allNamedColorsFound = icf.calculateTheNamedResults();
		icf.printHeadResult();
		icf.printFootResult();
	}
	
	icf.calculateTheNamedResults = function(){
		var returnObj = {};
		for (var colorIndex in icf.allFoundColors){
			var nearestMatch = icf.findNearestColor(icf.allFoundColors[colorIndex]);
			if (!returnObj[nearestMatch]){
				returnObj[nearestMatch] = icf.colorDefinitions[nearestMatch];
				returnObj[nearestMatch].count = 1;
				returnObj[nearestMatch].matchedFrom = [colorIndex];
				returnObj[nearestMatch].imageList = icf.allFoundColors[colorIndex].imageList;
			}
			else{
				returnObj[nearestMatch].count += 1;
				returnObj[nearestMatch].matchedFrom.push(colorIndex);
				returnObj[nearestMatch].imageList.push(icf.allFoundColors[colorIndex].imageList);
			}
		}
		return returnObj;
	}
	icf.sortTheResults = function(){
		var sortable = [];
		for (var color in icf.allFoundColors){
		      sortable.push([color, icf.allFoundColors[color].count]);
		}
		sortable.sort(function(a, b) {return b[1] - a[1]});
		return sortable;
	}

	icf.calculateTheImages(icf.printResults);