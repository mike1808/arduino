var debug = require('debug')('arduino:ws');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Application(server) {
    this.io = require('socket.io')(server);

    this.led = new Led();
    this.init();
}

Application.prototype.init = function () {
    require('./scratch')(this.led);

    this.io.on('connection', function (socket) {
        debug('socket connected');

        socket.on('change-color', function (color) {
            this.led.emit('color', color);
        }.bind(this));

        socket.on('toggle', function (state) {
            this.led.emit('toggle', state);
        }.bind(this));
    }.bind(this));
};

function Led() {

}

util.inherits(Led, EventEmitter);

module.exports = Application;