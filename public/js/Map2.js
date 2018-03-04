
document.addEventListener('DOMContentLoaded', function() {
  let mymap = L.map('mapid').setView([39.1329, -84.5150], 13),
      corner1 = L.latLng(39.235646, -84.684781),
      corner2 = L.latLng(38.991082, -84.236244),
      bounds = L.latLngBounds(corner1, corner2),
      neighborhoods = L.featureGroup([
        L.marker([39.1031, -84.5120], { title:"Cincinnatus" }),
        L.marker([39.1486, -84.5903], { title:"Westwood"}),
        L.marker([39.1139481, -84.5913335], { title:"West Price Hill"}),
        L.marker([39.1118, -84.5248], { title:"West End"}),
        L.marker([39.1405, -84.4802], { title:"Walnut Hills"}),
        L.marker([39.164594, -84.518127], { title:"Spring Grove Village"}),
        L.marker([39.130971, -84.572550], { title:"South Fairmont"}),
        L.marker([39.130971, -84.572550], { title:"South Fairmont"}),
        L.marker([39.1546, -84.5510], { title:"South Cumminsville"}),
        L.marker([39.1546, -84.5510], { title:"Sayler Park"}),
        L.marker([39.1971, -84.4619], { title:"Roselawn"}),
        L.marker([39.0768, -84.6120], { title:"Riverside"}),
        L.marker([39.1800, -84.4304], { title:"Pleasant Ridge"}),
         L.marker([39.1104, -84.5085], { title:"Pendleton"}),
         L.marker([39.1128, -84.5183], { title:"Over-the-Rhine"}),
         L.marker([39.1511, -84.4225], { title:"Oakley"}),
         L.marker([39.1669, -84.5379], { title:"Northside"}),
         L.marker([39.1382, -84.5602], { title:"North Fairmount"}),
         L.marker([39.1615, -84.4776], { title:"North Avondale - Paddock Hills"}),
         L.marker([39.0868, -84.3805], { title:"Mt. Washington"}),
         L.marker([39.1276, -84.4199], { title:"Mt. Lookout"}),
         L.marker([39.1200, -84.5083], { title:"Mt. Auburn"}),
         L.marker([39.1914, -84.5702], { title:"Mt. Airy"}),
         L.marker([39.1091, -84.4947], { title:"Mt. Adams"}),
         L.marker([39.1456, -84.5524], { title:"Millvale"}),
         L.marker([39.1600, -84.3910], { title:"Madisonville"}),
         L.marker([39.1053, -84.5516], { title:"Lower Price Hill"}),
         L.marker([39.1267, -84.4097], { title:"Linwood"}),
         L.marker([39.1842, -84.4094], { title:"Kennedy Heights"}),
         L.marker([39.1314, -84.4435], { title:"Hyde Park"}),
         L.marker([39.2134, -84.4686], { title:"Hartwell"}),
         L.marker([39.1405, -84.4724], { title:"Evanston"}),
         L.marker([39.1501, -84.5668], { title:"East Westwood"}),
         L.marker([39.1252, -84.4776], { title:"East Walnut Hills"}),
         L.marker([39.1061, -84.5694], { title:"East Price Hill"}),
         L.marker([39.1178, -84.4464], { title:"East End"}),
         L.marker([39.1017, -84.5126], { title:"Downtown"}),
         L.marker([39.1274, -84.5258], { title:"CUF"}),
         L.marker([39.1368, -84.5039], { title:"Corryville"}),
         L.marker([39.1152, -84.4361], { title:"Columbia Tusculum"}),
         L.marker([39.2184, -84.5508], { title:"College Hill"}),
         L.marker([39.1531, -84.5196], { title:"Clifton"}),
         L.marker([39.1956, -84.4855], { title:"Carthage"}),
         L.marker([39.1385, -84.5406], { title:"Camp Washington"}),
         L.marker([39.0653, -84.4199], { title:"California"}),
         L.marker([39.1743, -84.4750], { title:"Bond Hill"}),
         L.marker([39.1415, -84.4934], { title:"Avondale"}),
      ]),
      neighborhoodsOn = true;



  neighborhoods.addTo(mymap);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'MaxLand built @ RevolutionUC',
      maxZoom: 18,
      maxBounds: bounds,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoicGF0cmlja3N3ZWV0bWFuIiwiYSI6ImNqZWJ0aWszYjBnbDQyeHBieTE1ZmIycXMifQ.EbwMzqH3TpFlJk6EonENrQ'
  }).addTo(mymap);
  mymap.setMaxBounds([
    corner1,
    corner2
  ]);

  //HIDES neighborhood FeatureGroup on ClickListener
  $("#toggleNeighborhood").click( () => {
    if(neighborhoodsOn) {
      mymap.removeLayer(neighborhoods);
    } else {
      mymap.addLayer(neighborhoods);
    }
    neighborhoodsOn = !neighborhoodsOn;
  })
});