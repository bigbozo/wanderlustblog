var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      title: "Global Imagery",
      source: new ol.source.TileWMS({
        url: 'http://maps.opengeo.org/geowebcache/service/wms',
        params: {LAYERS: 'bluemarble', VERSION: '1.1.1'}
      })
    })
  ],
  view: new ol.View({
    projection: 'EPSG:4326',
    center: [51, 7],
    zoom: 8,
    maxResolution: 0.703125
  })
});