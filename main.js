// Toggle search box
const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("search-box");

searchIcon.addEventListener("click", () => {
  searchBox.style.display =
    searchBox.style.display === "block" ? "none" : "block";
});