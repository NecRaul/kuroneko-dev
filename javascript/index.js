document.addEventListener("DOMContentLoaded", function () {
  loadPosts();
});

function loadPosts() {
  let postPairs = new Array();
  const postList = document.getElementById("postList");
  fetch("/posts/")
    .then((response) => response.text())
    .then((data) => {
      const fileNames = data
        .match(/href="([^"]+\.html)"/g)
        .map((match) => match.replace(/href="|"/g, ""));
      return Promise.all(
        fileNames.map((fileName) => {
          let postUrl = "";
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            postUrl = `${fileName}`;
          } else {
            postUrl = `/posts/${fileName}`;
          }
          return fetch(postUrl)
            .then((response) => response.text())
            .then((postContent) => {
              const doc = new DOMParser().parseFromString(
                postContent,
                "text/html",
              );
              const title = doc.title;
              const date = doc.getElementById("date").textContent;
              const listItem = document.createElement("li");
              listItem.className = "postitem";
              listItem.innerHTML = `<a href="${postUrl}">${title}</a> - <em>${date}</em>`;
              postPairs.push([new Date(date), listItem]);
            })
            .catch((error) =>
              console.error(`Error fetching post ${postUrl}: ${error}`),
            );
        }),
      );
    })
    .then(() => {
      postPairs.sort((a, b) => b[0] - a[0]);
      for (let i = 0; i < postPairs.length; i++) {
        if (i == 25 && window.location.pathname == "index.html") {
          break;
        }
        postList.appendChild(postPairs[i][1]);
      }
    })
    .catch((error) => console.error(`Error fetching posts folder: ${error}`));
}
