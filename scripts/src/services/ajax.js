
/*
 * Source: http://api.jquery.com/jQuery.ajax/
 */
routely.ajax = function () {
    "use strict";

    var _request = function(requestType, model, url, params, callback) {

        /// <summary>For making get request to server</summary>
        /// <param name="requestType">For specifying the request type, is it a GET or POST.</param>
        /// <param name="model" type="object">The object making the request.</param>
        /// <param name="url">A string containing the URL to which the request is sent.</param>
        /// <param name="params" type="object">Data to be sent to the server. It is converted to a query string, if not already a string.</param>
        /// <param name="callback" type="function">
        ///     A function to call when request is completed, passes back the model = {Success, Status, Model, Url, Params, Data, JqXHR, Exception}
        ///     <field name="Success" type="bool">State result showing request was successful or not</field>
        ///     <field name="Status" type="string">A string explaining current state of the request</field>
        ///     <field name="Model" type="object">An object who made the request</field>
        ///     <field name="Url" type="string">A url to which requests was made</field>
        ///     <field name="Params" type="string">Parameters sent with the request.</field>
        ///     <field name="Data" type="object">Returns data (if any) from the server when request is successful.</field>
        ///     <field name="JqXHR" type="object">The jQuery XMLHttpRequest (jqXHR) object</field>
        ///     <field name="Exception" type="string">Returns an error message when request fails.</field>
        /// </param>

        // standard model object passed between requests and callbacks
        var _model = {
                Success: false,
                Status: "",
                Model: model,
                Url: url,
                Params: params,
                Data: {},
                JqXHR: {}
            };

        // check for null, if not convert json data object to json string
        if (params !== null) {
            // we add a timestamp to the POST to stop iphone 5 from caching the response
            params = JSON.stringify(params);
        }

        // Perform an asynchronous HTTP (Ajax) request
        $.ajax({
            type: requestType,
            url: url,
            //contentType: "application/json",
            dataType: "jsonp",
            //data: params,
            success: function(data, textStatus, jqXHR) {

                _model.Success = true;
                _model.Data = data;
                _model.Status = textStatus;
                _model.JqXHR = jqXHR;
            },
            error: function(jqXHR, textStatus, exception) {

                _model.Status = textStatus;
                _model.JqXHR = jqXHR;
                _model.Exception = exception;
            },
            complete: function() {
                if (callback) {
                    callback(_model);
                }
            }
        });

        return this;
    };

    // public methods
    return {

        /*
         * For making get request
         */
        get: function (model, url, params, callback) {

            return _request("GET", model, url, params, callback);
        },

        /*
         * For making post request
         */
        post: function (model, url, params, callback) {

            return _request("POST", model, url, params, callback);
        },

        /*
         * For making put request
         */
        put: function (model, url, params, callback) {

            return _request("PUT", model, url, params, callback);
        },

        /*
         * For making delete request
         */
        delete: function (model, url, params, callback) {

            return _request("DELETE", model, url, params, callback);
        }
    };
}();