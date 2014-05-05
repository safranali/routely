/*
 * A service for getting RESTful api endpoints.
 */
routely.api = function (){
	"using strict";

	var _baseUrl = "http://digitaslbi-id-test.herokuapp.com";

	// public methods
	return {
		
		/*
		 * For getting bus stops api url
		 */
		getStops: function (bounds) {

			var _arr = bounds.split(","),
				_url = _baseUrl + "/bus-stops";

			_url += "?northEast=";
			_url += _arr[0] + "," + _arr[1];
			_url += "&southWest=";
			_url += _arr[2] + "," + _arr[3];

			return _url;
		},

		getStop: function(id) {
			return _baseUrl + "/bus-stops/" + id;
		}
	};
}();