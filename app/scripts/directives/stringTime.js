(function () {
	function stringTime() {
		return {
			templateUrl: '/templates/directives/string_time.html',
			replace: true,
			restrict: 'E',
			scope: {},
			link: function(scope, element, attributes) {
				scope.stClass = attributes.stClass;
				var timeInSeconds = 0;

				attributes.$observe('seconds', function(newValue) {

					timeInSeconds = newValue || 0;
				});

				scope.formatTime = function() {
					var seconds = Number.parseFloat(timeInSeconds);
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
		}
	}

	angular
		.module('blocJams')
		.directive('stringTime', stringTime);
})();