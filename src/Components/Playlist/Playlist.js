import React from 'react';
import './Playlist.css';
import '../Tracklist'; //double check this.

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange() {
    this.props.onNameChange = e.target.value;
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.props.handleNameChange}/>
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
    );
  }
}

export default Playlist;