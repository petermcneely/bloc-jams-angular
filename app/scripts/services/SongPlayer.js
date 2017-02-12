(function() {
	/*
	* @function SongPlayer
	* @desc Service providing song player functionality.
	* @returns {Object}
	*/
	function SongPlayer(Fixtures) {
		/*
		* @desc Object representing the song player service. Used to expose public attributes and functions.
		* @type {Object}
		*/
		var SongPlayer = {};

		/*
		* @desc The album to be played.
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();

		/*
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		/*
		* @function getSongIndex
		* @desc Gets the index of the passed in song within the current album.
		* @param {Object} song
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		}

		/*
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			stopCurrentSong();
		
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			SongPlayer.currentSong = song;
		};

		/*
		* @function stopCurrentSong
		* @desc Stops current buzz object audio file and sets the current song's playing status to null if there is a valid buzz object.
		*/
		var stopCurrentSong = function() {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}
		}

		/*
		* @function playSong
		* @desc Plays current buzz object audio file and sets the song's playing status to true if there is a valid buzz object.
		* @param {Object} song
		*/
		var playSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.play();
				song.playing = true;
			}
		}

		/*
		* @desc Current song
		* @type {Object}*/
		SongPlayer.currentSong = null;

		/*
		* @function play
		* @desc If there is a different currently playing song, stops that song, sets the current song to the passed in song,
		* and plays that song; otherwise, if the current song is paused, plays that song.
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong || currentAlbum.songs[0];
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};

		/*
		* @function pause
		* @desc Pauses the passed in song.
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/*
		* @function previous
		* @desc Skips to the previous song in the album.
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if (currentSongIndex < 0) {
				stopCurrentSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['Fixtures', SongPlayer]);
})();