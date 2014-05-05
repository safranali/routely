/*
 * Map class for handling Google map.
 */
routely.map = function () {
	"use strict";

	var _cache = {},
		_stop = routely.stop,
		_options = null,
		_map = null,
		_container = null,
		_serviceContainer = null,
		_scheduleContainer = null,

		/*
		 * For setting optiions variable
		 */
		_setOptions = function(zoom, latitude, longitude) {
			
			_options = {
				zoom: zoom,
				center: new google.maps.LatLng(latitude, longitude)
			};
		},

		/*
		 * For loading map in a container
		 */
		_load = function () {
			_map = new google.maps.Map(_container, _options);
			_bindEvent();
		},

		/*
		 * For getting location of map on location change
		 */
		_getLocation = function(event) {
			
			var _bounds = _map.getBounds().toUrlValue(),
				_model = {
					map: _map,
					mapContainer: _container,
					serviceContainer: _serviceContainer,
					scheduleContainer: _scheduleContainer
				};
			_stop.getStops(_model, _bounds);
		},

		/*
		 * For binding event on maps bound change
		 */
		_bindEvent = function (){
			google.maps.event.addListener(_map, 'bounds_changed', function(event) {
				_getLocation(event);
			});
		};

	// public methods
	return {
		init: function(args){

			if(args.containerId) {

				_container = $(args.containerId)[0];
				_serviceContainer = $(args.serviceContainerId);
				_scheduleContainer = $(args.scheduleContainerId);
				_setOptions(args.zoom, args.latitude, args.longitude);
				_load();
			}
		}
	};
};