// Code to extract ERA5 data at specific location and given time
// Nicola Deluigi, 2022
// RIVER lab, EPFL, Lausanne
// https://river.epfl.ch


// Daily mean 2m air temperature
//var era5_2mt = ee.ImageCollection('ECMWF/ERA5/DAILY')
//                   .select('mean_2m_air_temperature')
//                   .filter(ee.Filter.date('2015-01-01', '2022-04-01'));

// Daily mean sea-level pressure
//var era5_mslp = ee.ImageCollection('ECMWF/ERA5/DAILY')
//                    .select('mean_sea_level_pressure')
//                    .filter(ee.Filter.date('2019-07-01', '2022-04-01'));

// Daily mean surface pressure
//var era5_sp = ee.ImageCollection('ECMWF/ERA5/DAILY')
//                  .select('surface_pressure')
//                  .filter(ee.Filter.date('2019-07-01', '2022-04-01'));
                  
// Daily mean net radiation
var era5_radiation = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
                  .select('surface_net_solar_radiation')
                  .filter(ee.Filter.date('2019-01-01', '2022-10-01'));  
                  
                  // Daily mean surface pressure
var era5_sp = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
                  .select('surface_pressure')
                  .filter(ee.Filter.date('2019-01-01', '2022-10-01'));  
                  
var era5_2mt = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
                   .select('temperature_2m')
                   .filter(ee.Filter.date('2019-01-01', '2022-10-01'));                  


// Convert pressure levels from Pa to hPa - Example for surface pressure
//var era5_sp = era5_sp.map(function(image) {
//  return image.divide(100).set(
//      'system:time_start', image.get('system:time_start'));
//});

// Convert air temp to Celsius
//var era5_2mt = era5_2mt.map(function(image) {
//  return image.subtract(273.15).set(
//      'system:time_start', image.get('system:time_start'));
//});


// Visualization palette for temperature (mean, min and max) and 2m dewpoint
// temperature
var vis2mt = {
  opacity: 0.2,
  min: 250,
  max: 320,
  palette: [
    '#000080', '#0000D9', '#4000FF', '#8000FF', '#0080FF', '#00FFFF', '#00FF80',
    '#80FF00', '#DAFF00', '#FFFF00', '#FFF500', '#FFDA00', '#FFB000', '#FFA400',
    '#FF4F00', '#FF2500', '#FF0A00', '#FF00FF'
  ]
};


// Visualization palette for pressure (surface pressure, mean sea level
// pressure) - adjust min and max values for mslp to min:990 and max:1050
var visPressure = {
  opacity: 0.2,
  min: 500,
  max: 1150,
  palette: [
    '#01FFFF', '#058BFF', '#0600FF', '#DF00FF', '#FF00FF', '#FF8C00', '#FF8C00'
  ]
};


// Visualization palette for pressure
var visRad = {
  opacity: 0.2,
  min: 1000000,
  max: 10000000,
  palette: [
    '#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'
  ]
};


var when = '2022-07-01T12:00:00';
var lat = 45.91641;
var lon =	7.2669;

Map.setCenter(lon,lat, 13);

Map.addLayer(ee.Geometry.Point(lon,lat), {color: 'red'}, 'Googleplex');

// Add layer to map
//Map.addLayer(
//    era5_2mt.filter(ee.Filter.date(when)), vis2mt,
//    'Daily mean 2m air temperature');

//Map.addLayer(
//    era5_sp.filter(ee.Filter.date(when)), visPressure,
//    'Daily mean surface pressure');

Map.addLayer(
    era5_2mt.filter(ee.Filter.date(when)), vis2mt,
    'Daily mean 2m air temperature');    
    
Map.addLayer(
    era5_sp.filter(ee.Filter.date(when)), visPressure,
    'Daily mean surface pressure');    
    
Map.addLayer(
    era5_radiation.filter(ee.Filter.date(when)), visRad,
    'Daily mean radiation');


