import React, { Component } from 'react';
import './App/App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
        name: "value",
        artist: "value",
        album: "value",
        id: "value",
        }
      ],
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTracks => savedTrack.id === track.id)) {
      return;
    }
    const newPlaylist = this.state.playlistTracks;
    newPlaylist.push(track);
    this.setState({ playlistTracks: newPlaylist });
  };

  removeTrack(track) {
    //accepts a track, uses track id to filter it and sets state of new playlist.
    const newPlaylist = this.state.playlistTracks.filter(removedTrack => removedTrack.id !== track.id);
    this.setState({ playlistTracks: newPlaylist });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: newPlaylist });
  }

  /*Generate array of uri values via playlistTracks.
  Pass track URIs array and playlistName to a method that saves user's playlist to their account.*/
 savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
        });
      });
    }

  search(term) {
    Spotify.search(term).then(() => {
      this.setState({ searchResults: result });
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
          <SearchBar onSearch={this.state.search}/>
    <div className="App-playlist">
          <SearchResults onAdd={this.addTrack}/>
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
          />
  </div>
  </div>
  </div>
    );
    }
  };

export default App;
