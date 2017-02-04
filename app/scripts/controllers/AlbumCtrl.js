(function() {
	function AlbumCtrl() {
		this.album = angular.copy(albumPicasso);
	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();