let accessToken = '';
const clientID = '2f20eecc53c84e53906a8261897337ee';
const redirectURI = 'https://jammming_test0.surge.sh';

const Spotify = {
  getAccessToken() {
    if(accessToken !== '') {
      return accessToken;
    }
      const hasToken = window.location.href.match(/access_token=([^&]*)/);
      const hasExpired = window.location.href.match(/expires_in=([^&]*)/);
        // Check if an access token and expiration time are in the URL
        if (hasToken && hasExpired) {
          accessToken = hasToken[1];
          let expiresIn = Number(hasExpired[1]);
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
          return accessToken;
    }
      //redirects to another site.
      console.log('Redirecting to Spotify ⏳');
      const spotifyUrl =  `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&${redirectURI}=`
      window.location = spotifyUrl;
  },

search(term) {
  const accessToken = Spotify.getAccessToken();
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
  }
  }).then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error ('Request failed!');
    }).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => (
          {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
      }
       return [];
    })
},

savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
 }).then(jsonResponse => {
   const playlistId = jsonResponse.id;
 })

//POST request to create a new playlist in the user's a/c and return a playlist ID.
return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  headers: headers,
  method: 'POST',
  body: JSON.stringify({ name: name })
}).then(response => {
  if(response.ok) {
    return response.json();
  }
  throw new Error('Request failed!');
}, networkError => console.log(networkError.message)).then(jsonResponse => {
  const playlistId = jsonResponse.id;


//POST request to add new tracks to a playlist.
return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
  headers: headers,
  method: 'POST',
  body: JSON.stringify({ uris: trackUris })
  });
});
}
};

export default Spotify;
