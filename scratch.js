var five = require('johnny-five');
var board = five.Board({port: 'COM3'});
module.exports = function (events) {
    board.on('ready', function () {
        // Initialize the RGB LED
        var led = new five.Led.RGB({
            pins: {
                red: 10,
                green: 11,
                blue: 9
            }
        });

        events.on('toggle', function (state) {
            if (state === true) {
                led.on();
            } else if (state === false) {
                led.off();
            } else {
                led.toggle();
            }
        });

        events.on('color', function (color) {
            led.on();
            led.color(color);
        });
    });
};
