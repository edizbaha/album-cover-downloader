# Album Cover Downloader

This Node.js script allows you to download highest quality album covers from the iTunes API based on the album name you provide.

## Prerequisites

Before you begin, ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/edizbaha/album-cover-downloader.git
   ```

2. Navigate into the project directory:

   ```bash
   cd album-cover-downloader
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the script:

   ```bash
   node app.js
   ```

2. Follow the prompts:
   - Enter the name of the album you want to download the cover for.
   - The script will search for the album on iTunes and display the cover URL.
   - It will then ask if you want to download another album cover.

3. Album covers will be saved in the `covers` directory within the project folder.

## Features

- Downloads album covers from iTunes based on user input.
- Automatically creates a `covers` directory if it doesn't exist.
- Handles errors gracefully and allows you to continue downloading.

## Additional Information

- The script downloads the album cover in the highest available resolution from the iTunes API.
- Covers are saved in JPEG format with filenames formatted as `Album Name - Artist Name.jpg`.

## Dependencies

- **axios**: Used for making HTTP requests.
- **readline**: Provides an interface for reading lines of input.
- **fs**: Node.js module for interacting with the file system.
- **path**: Node.js module for handling and transforming file paths.

## Contributing

Contributions are welcome! If you find any issues or want to add features, please fork the repository and submit a pull request.

## Credits

- Uses the iTunes Search API to fetch album information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any questions or feedback, please contact:
- GitHub: [edizbaha](https://github.com/edizbaha)
- Email: [ediz@omg.lol](mailto:ediz@omg.lol)