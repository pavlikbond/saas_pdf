//handler for getting lyrics from musixmatch api using fetch
export default async function handler(req, res) {
  console.log("hello");
  let songTitle = "10,000 Reasons";
  let artistName = "Matt Redman";
  const apiKey = "de62b0ba235444f95dda62c84a98d0c7";
  const apiUrl = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${encodeURIComponent(
    songTitle
  )}&q_artist=${encodeURIComponent(artistName)}&apikey=${apiKey}`;
  console.log(artistName);
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Assuming the structure of the response, you can access the lyrics
    const lyrics = data.message.body.lyrics.lyrics_body;
    console.log(lyrics);
    //return 200 response
    res.status(200).json({ lyrics });
  } catch (error) {
    console.error("Error fetching song lyrics:", error);
    //return 500 response
    res.status(500).json({ error });
  }
}
