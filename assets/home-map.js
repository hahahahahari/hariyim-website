const HARI_MAP_PINS = [
  ['Düsseldorf','Germany',6.773,51.227],['Essen','Germany',7.011,51.455],['Duisburg','Germany',6.762,51.435],['Wuppertal','Germany',7.15,51.257],['Remscheid','Germany',7.19,51.18],['Ratingen','Germany',6.849,51.297],['Cologne','Germany',6.96,50.938],['Bonn','Germany',7.099,50.735],['Lohmar','Germany',7.212,50.84],['Bayreuth','Germany',11.578,49.945],['Erlangen','Germany',11.004,49.598],['München','Germany',11.576,48.137],['Dortmund','Germany',7.465,51.514],['Hagen','Germany',7.474,51.358],['Hannover','Germany',9.732,52.375],['Halle (Saale)','Germany',11.97,51.483],['Leipzig','Germany',12.375,51.34],['Berlin','Germany',13.405,52.52],['Potsdam','Germany',13.065,52.39],['Putbus','Germany',13.479,54.362],['Wien','Austria',16.373,48.208],['Salzburg','Austria',13.047,47.797],['Brussels','Belgium',4.352,50.85],['Strasbourg','France',7.752,48.573],['Bratislava','Slovakia',17.107,48.148],['Montecastelli','Italy',10.96,43.155],['Tokyo','Japan',139.691,35.689],['Kyoto','Japan',135.768,35.012],['Tsukuba','Japan',140.112,36.083],['Seoul','Korea',126.978,37.566],['Gyeonggi-do','Korea',126.79,37.49],['Gwangju','Korea',126.852,35.158],['Maryland','USA',-76.938,38.989],['Hanoi','Vietnam',105.834,21.028],['Waterloo','Belgium',4.399,50.719],['Brno','Czech Republic',16.608,49.195],['Montreux','Switzerland',6.911,46.433],['Puidoux','Switzerland',6.841,46.516],['Paris','France',2.347,48.859],['Rennes','France',-1.678,48.117],['Augsburg','Germany',10.898,48.371],['Würzburg','Germany',9.937,49.795],['Bochum','Germany',7.215,51.482],['Aachen','Germany',6.084,50.776],['Saarbrücken','Germany',6.997,49.234]
];

const mapSection = document.querySelector('[data-auto-map]');
let homeMapLoaded = false;

function loadHomeMap() {
  if (homeMapLoaded || !mapSection) return;
  homeMapLoaded = true;
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.css';
  document.head.appendChild(css);
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.js';
  script.onload = () => {
    const mapElement = document.getElementById('loc-map');
    mapElement.style.display = 'block';
    const map = new maplibregl.Map({container:'loc-map',style:'https://tiles.openfreemap.org/styles/dark',center:[20,40],zoom:2.1,minZoom:1,maxZoom:10,scrollZoom:false,attributionControl:true});
    map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-right');
    map.on('load', () => {
      map.addSource('locations',{type:'geojson',data:{type:'FeatureCollection',features:HARI_MAP_PINS.map(p=>({type:'Feature',geometry:{type:'Point',coordinates:[p[2],p[3]]},properties:{name:p[0],country:p[1]}}))}});
      map.addLayer({id:'locations',type:'circle',source:'locations',paint:{'circle-color':'#c8b28c','circle-radius':4,'circle-stroke-color':'#f1e7d5','circle-stroke-width':1}});
      const popup = new maplibregl.Popup({closeButton:false,closeOnClick:false,offset:9,className:'home-map-popup'});
      map.on('mouseenter','locations',e=>{map.getCanvas().style.cursor='pointer';const p=e.features[0].properties;popup.setLngLat(e.features[0].geometry.coordinates).setHTML(`<span class="map-popup-city">${p.name}</span><span class="map-popup-country">${p.country}</span>`).addTo(map);});
      map.on('mouseleave','locations',()=>{map.getCanvas().style.cursor='';popup.remove();});
    });
  };
  document.head.appendChild(script);
}

if (mapSection) {
  const mapObserver = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      loadHomeMap();
      mapObserver.disconnect();
    }
  }, {rootMargin:'300px 0px', threshold:0.01});
  mapObserver.observe(mapSection);
}
