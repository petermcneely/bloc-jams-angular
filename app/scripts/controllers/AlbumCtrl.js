(function() {
	function AlbumCtrl(Fixtures) {
		this.album = Fixtures.getAlbum();
	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();