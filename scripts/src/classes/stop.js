/*
 * Bus stop class for displaying all the stop with in the map.
 */
routely.stop = function () {
	"use strict";

	var _ajax = routely.ajax,
		_api = routely.api,
		_schedule = routely.schedule,
		_templateStopHtml = "<li rel='{{id}}' class='js-stop r-stop' title='Click to see schedule from {{name}} to {{towards}}'>{{name}} <span>to</span> {{towards}}</li>",
		_templateStop = Handlebars.compile(_templateStopHtml),
		_html = null,
		
		/*
		 * For getting list of bus stops for given location
		 */
		_getStops = function(model, bounds) {
			
			var _url = _api.getStops(bounds),
				_serviceContainer = model.serviceContainer,
				_scheduleContainer = model.scheduleContainer;

			_serviceContainer.html("<p><img src='images/ajax-loader.gif' alt='loading' /></p>");
			_scheduleContainer.html("");

			_ajax.get(model, _url, null, _getStopsDone);
		},

		/*
		 * A callback for get stops
		 */
		_getStopsDone = function(response) {
			if(response.Success) {

				var _data = response.Data,
					_markers = _data.markers,
					_model = response.Model,
					_map = _model.map,
					_serviceContainer = _model.serviceContainer,
					_scheduleContainer = _model.scheduleContainer;

				if(_markers.length > 0) {

					_html = "";
					
					// adding marker to map
					for(var i = 0; i < _markers.length; i++) {
						var _marker = _markers[i],
							_latLng = new google.maps.LatLng(_marker.lat, _marker.lng),
							marker = new google.maps.Marker({
								position: _latLng,
								map: _map
							});

						_html += _render(_marker);
						//_bindMarkerEvents(_marker, _scheduleContainer);
					}

					_renderList(_serviceContainer, _scheduleContainer, _html);

				} else {
					_serviceContainer.html("<p>No bus stops in this area.</p>");
				}
			}
		},

		/*
		 * For rendering html for a stop
		 */
		_render = function (marker) {
			return _templateStop(marker);
		},

		/*
		 * For rendering all stop name in service section
		 */
		_renderList = function(serviceContainer, scheduleContainer, html) {
			
			serviceContainer.html(html);
			var _list = serviceContainer.find(".js-stop");
			_bindStopsEvent(serviceContainer, scheduleContainer);
		},

		/*
		 * For binding click event to bus stop service to get it schedule
		 */
		_bindStopsEvent = function(serviceContainer, scheduleContainer) {

			var _list = serviceContainer.find(".js-stop");
			_list.on("click", function(){
				_schedule.get(this, _list, scheduleContainer);
			});
		},

		/*
		 * For binding click event to stops
		 */
		_bindMarkerEvents = function(marker, scheduleContainer) {
			google.maps.event.addListener(marker, 'click', function(event) {
				var $this = this;
				_schedule.get(this, scheduleContainer);
			});
		};

	// public methods
	return {
		getStops: _getStops
	};
}();