/*
 * A module for initialising the app.
 */
routely.app = function (argument) {
	"use strict";
	var _ajax = routely.ajax,
		_api = routely.api,
		_map = new routely.map(),
		_mapContainer = null,
		_serviceContainer = null,
		_scheduleContainer = null,
		
		/*
		 * For checking null, will be move into utils
		 */
		_isNull = function (element){
			return typeof element === undefined;
		},

		/*
		 * For initialising map plugin
		 */
		_loadMap = function(){

			_map.init({
				containerId: _mapContainer,
				serviceContainerId: _serviceContainer,
				scheduleContainerId: _scheduleContainer,
				zoom: 17,
				latitude: 51.50722,
				longitude: -0.12750
			});
		};

	// public methods
	return {

		/*
		 * For initialising app
		 */
		init: function(args){

			if(_isNull(args) || 
				_isNull(args.mapContainerId) || 
				_isNull(args.serviceContainerId) ||
				_isNull(args.scheduleContainerId)) {
				return;
			}

			_serviceContainer = $(args.serviceContainerId);
			_mapContainer = $(args.mapContainerId);
			_scheduleContainer = $(args.scheduleContainerId);

			if(_isNull(_serviceContainer) ||
				_isNull(_mapContainer) ||
				_isNull(_scheduleContainer)){
				return;
			}

			_loadMap();
		}
	};
};