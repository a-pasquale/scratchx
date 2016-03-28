(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/find?q='+location+'&units=imperial&APPID=970a5f84c34283d9585c219ce61a71d9',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Weather extension', descriptor, ext);
})({});