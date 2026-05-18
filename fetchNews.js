const API_KEY = "296e932c05294076b012b645bd70de34";

// Example using NewsAPI.org. Replace the endpoint with any other news provider if needed.
const endpoint = new URL("https://newsapi.org/v2/top-headlines");
endpoint.searchParams.set("country", "us");
endpoint.searchParams.set("pageSize", "10");
endpoint.searchParams.set("apiKey", API_KEY);

async function fetchLiveNews() {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    console.error("Please set your API key in fetchNews.js before running.");
    process.exit(1);
  }

  try {
    const response = await fetch(endpoint.toString());
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error(`API returned error: ${JSON.stringify(data)}`);
    }

    console.log(`Fetched ${data.articles.length} articles:`);
    data.articles.forEach((article, index) => {
      console.log(`\n${index + 1}. ${article.title}`);
      console.log(`   Source: ${article.source.name}`);
      if (article.description) console.log(`   Description: ${article.description}`);
      if (article.url) console.log(`   URL: ${article.url}`);
    });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    process.exit(1);
  }
}

fetchLiveNews();
