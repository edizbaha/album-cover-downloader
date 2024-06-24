const axios = require('axios');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sanitizeFilename(name) {
  return name.replace(/[/\\?%*:|"<>]/g, '');
}

function askForAlbum() {
  rl.question('Which album cover do you want to download? : ', (albumName) => {
    // Send request to iTunes API
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(albumName)}&country=us&entity=album&limit=1`;

    axios.get(url)
      .then(response => {
        const albums = response.data.results;

        if (albums.length > 0) {
          const album = albums[0];
          let artworkUrl = album.artworkUrl100;

          // Modify the URL
          artworkUrl = artworkUrl.replace('https://is1-ssl.mzstatic.com/image/thumb/', 'https://a5.mzstatic.com/us/r1000/0/');
          artworkUrl = artworkUrl.replace('/100x100bb.jpg', '');

          // Sanitize the album and artist names
          const sanitizedCollectionName = sanitizeFilename(album.collectionName);
          const sanitizedArtistName = sanitizeFilename(album.artistName);

          // Create file name
          const fileName = `${sanitizedCollectionName} - ${sanitizedArtistName}.jpg`;
          const filePath = path.join(__dirname, 'covers', fileName);

          // Create covers directory if it doesn't exist
          if (!fs.existsSync(path.join(__dirname, 'covers'))) {
            fs.mkdirSync(path.join(__dirname, 'covers'));
          }

          // Download and save the image
          axios({
            url: artworkUrl,
            responseType: 'stream'
          }).then(response => {
            response.data.pipe(fs.createWriteStream(filePath))
              .on('finish', () => {
                console.log(`Album cover saved: ${fileName}`);
                askToContinue();
              })
              .on('error', (error) => {
                console.error('An error occurred while saving the file:', error);
                askToContinue();
              });
          }).catch(error => {
            console.error('An error occurred while downloading the image:', error);
            askToContinue();
          });
        } else {
          console.log('Album not found.');
          askToContinue();
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
        askToContinue();
      });
  });
}

function askToContinue() {
  rl.question('Do you want to download another album cover? (Y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      askForAlbum();
    } else {
      rl.close();
    }
  });
}

// Start by asking for the first album
askForAlbum();
