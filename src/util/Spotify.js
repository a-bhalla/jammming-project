let accessToken = '';
const clientID = '2f20eecc53c84e53906a8261897337ee';
const redirectURI = 'https://jammming_test0.surge.sh';


const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    } else {
      const url = window.location.href;
      const hasToken = url.match(/access_token=([^&]*)/);
      const hasExpired = url.match(/expires_in=([^&]*)/);
        // Check if an access token and expiration time are in the URL
        if (hasToken && hasExpired) {
          accessToken = hasToken[1];
          expiresIn = hasExpired[1];
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
          return apiKey;
    } else {
      //redirects to another site.
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&${redirectURI}=`
    }
  }
},

search(searchTerm) {
  const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
  headers: {
    Authorization: `Bearer ${accessToken}` }
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
            URI: track.uri
          }
    ));
      } else {
       return [];
    }
  });
 }
},

savePlaylist(playlistName, trackURIs) {
 if (!playlistName || !trackURIs) {
   return;
 }
 const accessToken = Spotify.getAccessToken();
 const header = {Authorization: `Bearer ${accessToken}`};
 let userID = '';

 //request to return user's Spotify username.
 return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(response => {
   headers: headers,
   method: 'POST',
   body: JSON.stringify({ name: playlistName })
 }).then(response => {
   if(response.ok) {
     return response.json();
   }
   throw new Error ('Request failed!');
 }, networkError => {
   console.log(networkError.message)
 }).then(jsonResponse => {
   const playlistID = jsonResponse.id;
 })
}

//POST request to create a new playlist in the user's a/c and return a playlist ID.
return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
  headers: headers,
  method: 'POST',
  body: JSON.stringify({ name: playlistName })
}).then(response => {
  if(response.ok) {
    return response.json();
  }
  throw new Error('Request failed!');
}, networkError => console.log(networkError.message)).then(jsonResponse => {
  const playlistID = jsonResponse.id;
});

//POST request to add new tracks to a playlist.
return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
  headers: headers,
  method: 'POST',
  body: JSON.stringify({ uris: trackURIs })
});

export default Spotify;
