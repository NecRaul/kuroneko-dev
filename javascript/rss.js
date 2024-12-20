const fs = require("fs");
const path = require("path");

const postsPath = path.join(__dirname, "../posts");
const feedPath = path.join(__dirname, "../feed.xml");

const postsArray = [];

function parseDate(dateStr) {
  const [month, day, year] = dateStr.match(/(\w+) (\d{1,2}), (\d{4})/).slice(1);
  const date = new Date(`${month} ${day}, ${year}`);
  if (isNaN(date)) {
    return null;
  }
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

function generateRSS(postsArray) {
  const rssItems = postsArray
    .map((post) => {
      return `
    <item>
      <title>${post.title}</title>
      <link>https://www.kuroneko.dev/posts/${post.post}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${post.description}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NecRaul's website</title>
    <link>https://www.kuroneko.dev/</link>
    <description>Documenting the voices in my head</description>
    <language>en-us</language>
    <atom:link href="https://www.kuroneko.dev/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
}

fs.readdir(postsPath, (err, posts) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  posts
    .filter((post) => post.endsWith(".html"))
    .forEach((post) => {
      const postPath = path.join(postsPath, post);

      fs.readFile(postPath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading post:", post, err);
          return;
        }

        const titleMatch = data.match(/<title>\s*([\s\S]*?)\s*<\/title>/i);
        const descriptionMatch = data.match(/<h2>(.*?)<\/h2>/i);
        const dateMatch = data.match(/id=["']date["'][^>]*>(.*?)<\/[^>]+>/i);

        const title = titleMatch ? titleMatch[1] : "No title found";
        const description = descriptionMatch
          ? descriptionMatch[1]
          : "No description found";
        const rawDate = dateMatch ? dateMatch[1] : "No date found";
        const parsedDate = parseDate(rawDate) || "Invalid date";

        postsArray.push({ post, title, description, date: parsedDate });

        if (
          postsArray.length ===
          posts.filter((post) => post.endsWith(".html")).length
        ) {
          postsArray.sort((a, b) =>
            a.date > b.date ? -1 : a.date < b.date ? 1 : 0,
          );

          const rssFeed = generateRSS(postsArray);

          fs.writeFile(feedPath, rssFeed, "utf8", (err) => {
            if (err) {
              console.error("Error writing RSS feed:", err);
            } else {
              console.log("RSS feed generated successfully at:", feedPath);
            }
          });
        }
      });
    });
});
