var Dispatcher = function () {
    this.dataStores = [];
};

Dispatcher.prototype.registerDataStore = function (dataStore) {
    this.dataStores.push(dataStore);
};

Dispatcher.prototype.dispatch = function (commands) {
    this.dataStores.forEach(
    	function (dataStore) {
        	dataStore.processActions(commands);
    	}
    );
};

var VideoDispatcher = new Dispatcher();

module.exports = VideoDispatcher;