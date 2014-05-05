/*
 * Schedule class responsible for displaying bus stop schedule.
 */
routely.schedule = function () {
	"use strict";

	var _ajax = routely.ajax,
		_api = routely.api,
		_templateScheduleHtml = "<li><span class='r-service'>{{routeId}}</span><span class='r-destination'>{{destination}}</span><span class='r-scheduled'>{{scheduledTime}}</span><span class='r-remaining'>{{estimatedWait}}</span></li>",
		_templateSchedule = Handlebars.compile(_templateScheduleHtml),
		
		/*
		 * For getting schedule for a bus stop.
		 */
		_get = function (caller, list, container) {

			var _stop = $(caller),
				_id = _stop.attr("rel"),
				_url = _api.getStop(_id);

			if(_stop.hasClass("r-selected") === false) { 

				_setSelection(_stop, list);
				container.html("<p><img src='images/ajax-loader.gif' alt='loading' /></p>");
				_ajax.get(container, _url, null, _getDone);
			}
		},

		/*
		 * For selecting the clicked stop.
		 */
		_setSelection = function (stop, list) {
			list.removeClass("r-selected");
			stop.addClass("r-selected");
		},

		/*
		 * A callback for get schedule method
		 */
		_getDone = function (response) {
			if(response.Success) {
				var _data = response.Data,
					_container = response.Model;

				_render(_container, _data);
			}
		},

		/*
		 * For rendering schedule using handlebars.js
		 */
		_render = function (container, data) {
			
			var _arrivals = data.arrivals,
				_html = "<p>No schedule buses for this stop at this time.</p>";

			if(_arrivals.length > 0) {
				_html = "<li class='r-heading'><span class='r-service'>Service</span><span class='r-destination'>Destination</span><span class='r-scheduled'>Scheduled</span><span class='r-remaining'>Remaining</span></li>";

				for(var i=0; i < _arrivals.length; i++) {
					var _arrival = _arrivals[i];
					_html += _templateSchedule(_arrival);
				}
				
			}
			container.html(_html);
		};

	// public methods
	return {
		get: _get
	};
}();