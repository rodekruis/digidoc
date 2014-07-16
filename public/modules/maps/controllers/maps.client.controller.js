'use strict';

/*global google */

angular.module('maps').controller('MapsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Maps', '$window', 'leafletData', '$compile', 'layerService', '$parse', 'CartoDB', //'L', 'cartodb',
	function($scope, $stateParams, $location, Authentication, Maps, $window, leafletData, $compile, layerService, $parse, CartoDB) { //, 
		$scope.authentication = Authentication;
		$scope.L = $window.L;
		$scope.cartodb = $window.cartodb;
		$scope.LMap = null;
		$scope.subLayers = [];
				   
		$scope.create = function() {
			var map = new Maps({
				title: this.title,
				//content: this.content
			});
			map.$save(function(response) {
				$location.path('maps/' + response._id);
			}, function(errorResponse) {
				$scope.addAlert('danger', errorResponse.data.message);
			});

			this.title = '';
			//this.content = '';
		};

		$scope.remove = function(map) {
			if (map) {
				map.$remove();

				for (var i in $scope.maps) {
					if ($scope.maps[i] === map) {
						$scope.maps.splice(i, 1);
					}
				}
			} else {
				$scope.map.$remove(function() {
					$location.path('maps');
				});
			}
		};

		$scope.update = function() {
			var map = $scope.map;

			map.$update(function() {
				$location.path('maps/' + map._id);
			}, function(errorResponse) {
				$scope.addAlert('danger', errorResponse.data.message);
			});
		};

		$scope.find = function() {
			Maps.query(function(data) {
				$scope.maps = data;
			    }, function(error) {
				$scope.addAlert('danger', error.data.message);
			    });
		};

		$scope.findOne = function() {
			Maps.get({mapId: $stateParams.mapId},
			    function(data) {
				$scope.map = data;
			    },
			    function(error) {
				$scope.addAlert('danger', error.data.message);
			    });
		};
		
		$scope.alerts = [];
		    
		$scope.addAlert = function(messageType, message) {
			$scope.alerts.push({type: messageType, msg: message});
		};
		    
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.$watchCollection('checkModel', function(newValues, oldValues) {
			if ($scope.LMap !== null) {
				var layers = $scope.LMap.layers;
				console.log($scope.LMap);
				// Use newValues to determine active layers
				for (var i in newValues) {
					// detect change
					if (newValues[i] !== oldValues[i]) {
						if (newValues[i] === false) {
							$scope.LMap.removeLayer(layers[i]);
						} else {
							$scope.LMap.addLayer(layers[i]);
						}
					}
				}
			}
			
		}, true);
		
		$scope.loadSearchControl = function(cartomap) {
			var geocoder = new google.maps.Geocoder();

			function googleGeocoding(text, callResponse)
			{
				geocoder.geocode({address: text}, callResponse);
			}
		
			function filterJSONCall(rawjson)
			{
				var json = {},
					key, loc, disp = [];
		
				for(var i in rawjson)
				{
					key = rawjson[i].formatted_address;
					
					loc = $scope.L.latLng( rawjson[i].geometry.location.lat(), rawjson[i].geometry.location.lng() );
					
					json[ key ]= loc;	//key,value format
				}
		
				return json;
			}
		
			cartomap.addControl( new $scope.L.Control.Search({
					wrapper: 'findbox',
					text: 'Zoeken...',			//placeholder value	
					textCancel: 'Cancel',			//title in cancel button
					textErr: 'Locatie niet gevonden',	//error message
					callData: googleGeocoding,
					filterJSON: filterJSONCall,
					markerLocation: true,
					autoType: false,
					autoCollapse: true,
					minLength: 2,
					zoom: 13
				}) );
		};
		
		$scope.loadLayers = function() {
			// set function
			
			var addVisualisation = function(cartomap, visualisation){
				$scope.cartodb.createLayer(cartomap, visualisation.apiUrl)
				.addTo(cartomap)
				.on('done', function(layer) {
					/*var table = visualisation.tableName;
					
					 //tableNames[val['name']] = val['table_name'];
	      
					CartoDB.get({
						table: table
					}).$promise.then(function(subL) {
						var subll = subL;
					});
						      
					 var subLayerOptions = {
						      sql: 'SELECT * FROM ' + table
					 };
	      
					 // get sublayer
					 var sublayer = layer.getSubLayer(0);
					 sublayer.set(subLayerOptions);
					*/					      
					 layer.setInteraction(true);
	      
					 // Add layer to control
					 $scope.layerControl.addOverlay(layer, visualisation.name);
	      
					 layer.on('featureOver', function(e, pos, latlng, data) {
					   $scope.cartodb.log.log(e, pos, latlng, data);
					 });
	      
					 layer.on('error', function(err) {
					   $scope.cartodb.log.log('error: ' + err);
					 });
				}).on('error', function() {
					 $scope.cartodb.log.log('some error occurred');
				});
			};
				
			var addWmsLayer = function(cartomap, wmsLayer){
				
				var wms = null;
				
				if (wmsLayer.tiled) {
					if (wmsLayer.featureInfo) {
						wms = $scope.L.tileLayer.betterWms(wmsLayer.url, {
						layers: wmsLayer.layers,
						format: wmsLayer.format,
						transparent: wmsLayer.transparent,
						version: wmsLayer.version
					    });
					} else {
					wms = $scope.L.tileLayer.wms(wmsLayer.url, {
						layers: wmsLayer.layers,
						format: wmsLayer.format,
						transparent: wmsLayer.transparent,
						version: wmsLayer.version
					    });
					}
				}
				else {
					wms = new $scope.L.NonTiledLayer.WMS(wmsLayer.url, {
							layers: wmsLayer.layers,
							format: wmsLayer.format,
							transparent: wmsLayer.transparent,
							version: wmsLayer.version,
							pane: cartomap.getPanes().tilePane,
							zIndex: wmsLayer.zIndex,
							opacity: wmsLayer.opacity
						    }, wmsLayer.featureInfo);
				}
				
				if (wms !== null) {
					// Add layer to map
					wms.addTo(cartomap);
					
					// Add layer to layer control
					$scope.layerControl.addOverlay(wms, wmsLayer.name);
				
					// Get layer legends
					var legendOptions = wmsLayer.legendOptions;
					if (wmsLayer.legendOptions !== '') {
						legendOptions = JSON.parse(wmsLayer.legendOptions);
					}
					var legends = wms.getLegendGraphic(legendOptions);
					
					// add legends to map
					for (var l in legends) {
						var legendControl = $scope.L.control({position: 'bottomright'});
						addLegend(legendControl, l, legends[l]);
										
						legendControl.addTo(cartomap);
					}
				}
				
			};
			
			/*
			 * Function to load png in legend when added to map
			 */
			var addLegend = function(legendControl, legend, url){
				legendControl.onAdd = function (cartomap) {
						var div = $scope.L.DomUtil.create('div', 'legend ' + legend);
						    div.innerHTML +=
						    '<img src="' + url + '" alt="legend">';
						return div;
					};
			};
			
			// Get leaflet map object
			leafletData.getMap().then(function(cartomap) {
				
				$scope.LMap = cartomap;
				
				// Get map object
				Maps.get({
					mapId: $stateParams.mapId
				}).$promise.then(function(map) {
					var baseMap = map.baseMap;
					
					var baselayers = {};	
					
					if (map.baseMap !== undefined) {
						//var activeBaseLayer = $scope.L.Control.ActiveLayers.getActiveBaseLayer();
						//for(var i in layers.baselayers){
						//	cartomap.removeLayer(layers.baselayers(i)(iLayer));
						//}
							
						// add base layer
						var layer = $scope.L.tileLayer(baseMap.url, {attribution: '&copy; <a href="http://www.rodekruis.nl" target="_new">Rode Kruis</a>'});
						cartomap.addLayer(layer);
					
						// Set default base layer
						baselayers[baseMap.name] = layer;
					}
					
					// Add layer control with base layers
					$scope.layerControl = $scope.L.control.activeLayers(baselayers, {}, {collapsed:false});
					
					// Set map center
					var mapCenter = map.mapCenter;
					cartomap.setView(new $scope.L.latLng(mapCenter.lat, mapCenter.lng), mapCenter.zoom);
					
					/*
					 * Couldn't get the map bounds to work.
					 * Idea is to fit the map to preset bounds, so that on each resolution the map displays properly
					 * Possibly something to do with asynchronous loading of map
					/*
					var mapBounds = map.mapBounds;
					var 	southWest = $scope.L.latLng(mapBounds.latSW, mapBounds.lngSW),
						northEast = $scope.L.latLng(mapBounds.latNE, mapBounds.lngNE),
						bounds = $scope.L.latLngBounds(southWest, northEast);
						
					var mapCenter = bounds.getCenter();
					var zoom = cartomap.getBoundsZoom(bounds);
					
					cartomap.fitBounds(bounds, {reset: true});
					*/
    
					$scope.radioModel = '';
					$scope.checkModel = {};
		      
					var layers = [];			
					for (var vId in map.visualisation) {
						var visualisation = map.visualisation[vId];
						addVisualisation(cartomap, visualisation);
						
						layers.push({id: visualisation._id, name: visualisation.name});	
					}
					
					for (var wmsId in map.wmsLayer) {
						var wmsLayer = map.wmsLayer[wmsId];
						addWmsLayer(cartomap, wmsLayer);
						
						layers.push({id: wmsLayer._id, name: wmsLayer.name});	
					}
					
					layerService.setLayers(layers);
					
					layerService.setBaseLayers([
								    {id: '1234', name:baseMap.name}
								   ]);
				});
					
				// add layers and sublayers to arrayp
				//layerControls.push(layercontrol);
				
				cartomap.invalidateSize();
				
				$scope.loadSearchControl(cartomap);
			});
		};
		
	}
]);