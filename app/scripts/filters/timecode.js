(function () {
	function timecode() {
		return function(timeInSeconds) {
			return buzz.toTimer(timeInSeconds);
        }
	}

	angular
		.module('blocJams')
		.filter('timecode', timecode);
})();