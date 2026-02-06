document.addEventListener("DOMContentLoaded", () => {
  const totalGifs = 100;
  const randomIndex = Math.floor(Math.random() * totalGifs) + 1;
  const paddedIndex = String(randomIndex).padStart(3, "0");
  const r2BaseUrl = "https://r2.kuroneko.dev";
  const kuronekoGifUrl = `${r2BaseUrl}/images/kuroneko/${paddedIndex}.gif`;
  document.getElementById("kuroneko").src = kuronekoGifUrl;
});
