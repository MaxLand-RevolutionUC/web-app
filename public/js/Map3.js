document.addEventListener('DOMContentLoaded', function() {
  let propertyData = requestFile("../data/property.csv"),
      recommendationsOn = false;

  function requestFile(filename) {
      let request_obj = new XMLHttpRequest();
      request_obj.responseType = 'text';
      request_obj.open("GET", filename);
      request_obj.send();
      request_obj.onload = function () {
          displayResponse(request_obj.responseText);
      };
  }

  function displayResponse(content) {
    let foreclosures = L.featureGroup([L.marker([39.1031, -84.5120], { title:"Cincinnati" }).bindPopup("Cincinnati").openPopup()]);
    let htmlData = "";
    var rowString = content.split('\n');
    var promise3 = new Promise(function(resolve, reject) {
      let that = this;
      let noValuePopup = "<div class='text-center'><h3>No Recommendation Data Available, view data source:</h3><a href='https://maxland-a79e2.firebaseapp.com/data/property.csv' class='btn btn-success'>Data</a></div>";

      //HIDES Foreclosure FeatureGroup on ClickListener
      $("#toggleRecommendations").click( function() {
        if(recommendationsOn) {
          mymap.removeLayer(recommendations);
        } else {
          mymap.addLayer(recommendations);
        }
        recommendationsOn = !recommendationsOn;
      })
      for (var i = 1; i < rowString.length; i++) {
        let row = rowString[i].split(',');
        let currentAddress = row[0],
            propCode = row[1],
            parcelCode = row[2];
        let recommendation = getPropertyRecommendation(propCode, parcelCode);
        console.log(recommendation);
        let htmlTable = '<table class="table"><thead><tr><th scope="col">CRITERIA</th><th scope="col">VALUE</th></tr></thead><tbody><tr><td>Min</td><td>' + "min" + '</td></tr><tr><td>Max</td><td> ' + "max" + '</td></tr><tr><td>Average</td><td> ' + "total/count" + '</td></tr></tbody></table>';
        if (currentAddress) {
          L.marker([row[8], row[9]], { title:row[0] }).bindPopup( '<h4>' + row[0] + '</h4><table class="table"><thead><tr><th scope="col">CRITERIA</th><th scope="col">VALUE</th></tr></thead><tbody> ' +
              '<tr><td>  Neighborhood</td><td> ' + row[10] + '</td></tr>' +
              '<tr><td>Sub Type</td><td>' + row[1] + '</td></tr>' +
              '<tr><td>Sub Desc</td><td> ' + row[2] + '</td></tr>' +
              '<tr><td>  Status</td><td> ' + row[4] + '</td></tr>' +
              '<tr><td>  URL</td><td><a href=' + row[6] + ' target="_blank"> link</a></td></tr>' +
              '</tbody></table>').openPopup().addTo(foreclosures);
        }
       }
       resolve('Success!');
     });
     promise3.then(function(value) {
       if (recommendationsOn) {
         foreclosures.addTo(mymap);
       }
     });
  }

  function getPropertyRecommendation(propcode, parcelcode) {
    if (propcode >= 500 &&  propcode<600){
   		if (propcode == 501 || propcode == 500 || propcode == 510){
     			if (parcelcode >3){
        			return "Apartment, Townhome, Condominium" ;
        			}
    		else if (parcelcode ==3){
        		return "Apartment, Townhome, Condominium, Mutlfamily, Triplex, Duplex" ;
        }
      	else{
        		return "Triplex, Duplex" ;
        }
      }
     	else if (propcode ==520 ){
     		if (parcelcode >3){
        	return "Apartment, Townhome, Condominium, Mutlfamily," ;
        }
    		else if (parcelcode ==3){
        	return "Apartment, Townhome, Condominium, Mutlfamily, Triplex" ;
        }
         else{
        	return "Mutlfamily, Triplex" ;
        }
      }
     	else if (propcode ==530 || propcode == 502 ){
     		if (parcelcode >3){
        	return "Apartment, Townhome, Condominium," ;
        }
    		else {
        	return "Apartment, Townhome, Condominium, Mutlfamily" ;
        }
      }
      if (propcode == 503 || propcode == 504 || propcode == 505){
        	return "Apartment, Townhome, Condominium" ;
      }

    } else if (propcode >= 400 &&  propcode<500){
        //Extended means put more ontop of the building
    		if (propcode == 401 || propcode == 402 || propcode == 403 || propcode == 404){
        		return "Extended Apartment, Extended Condominium" ;
          } else if (propcode > 418 && propcode < 451){
    	       return "No minimum parking: Mixed use Apartment, Mixed use Condominium" ;
           } else if (propcode > 699 && propcode < 800){
    	       return "No minimum parking: Mixed use Apartment, Mixed use Condominium, Apartments, Condominiums, Townhomes" ;
           } else {
              return "Currently cannot determine use"
          }
    }
  }

});