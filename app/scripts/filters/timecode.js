(function () {
	function timecode() {
		return function(timeInSeconds) {
			
			var seconds = Number.parseFloat(timeInSeconds);

			if (Number.isNaN(seconds)) {
				return '-:--';
			}

            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            
            var remainingSeconds = wholeSeconds % 60;
            var output = minutes + ':';
            
            if (remainingSeconds < 10) {
                output += '0';   
            }
            
            output += remainingSeconds;
            return output;
        }
	}

	angular
		.module('blocJams')
		.filter('timecode', timecode);
})();