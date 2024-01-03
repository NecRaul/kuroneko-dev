document.addEventListener("DOMContentLoaded", function () {
  randomKuroneko();
});

function randomKuroneko() {
  const apikey = "AIzaSyBW0EY5NjW4myOnykm69UQGRCckboaCKp0";
  const search_url =
    "https://tenor.googleapis.com/v2/search?q=ruri+gokou&key=AIzaSyBW0EY5NjW4myOnykm69UQGRCckboaCKp0&client_key=kuroneko-dev&limit=50";
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      const response_objects = JSON.parse(xmlHttp.responseText);
      top_10_gifs = response_objects["results"];
      document.getElementById("kuroneko").src =
        top_10_gifs[Math.floor(Math.random() * 50)]["media_formats"]["gif"][
          "url"
        ];
    }
  };
  xmlHttp.open("GET", search_url, true);
  xmlHttp.send(null);
}

