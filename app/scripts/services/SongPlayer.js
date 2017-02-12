(function() {
	/*
	* @function SongPlayer
	* @desc Service providing song player functionality.
	* @returns {Object}
	*/
	function SongPlayer() {
		/*
		* @desc Object representing the song player service. Used to expose public attributes and functions.
		* @type {Object}
		*/
		var SongPlayer = {};

		/*
		* @desc Current song
		* @type {Object}*/
		var currentSong = null;

		/*
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;


		/*
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}
		
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			currentSong = song;
		};

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
		* @function play
		* @desc If there is a different currently playing song, stops that song, sets the current song to the passed in song,
		* and plays that song; otherwise, if the current song is paused, plays that song.
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);
			
			} else if (currentSong === song) {
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
			currentBuzzObject.pause();
			song.playing = false;
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', [SongPlayer]);
})();