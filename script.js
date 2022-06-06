let themesList = {};
let configs = {};
document.addEventListener("DOMContentLoaded", async () => {
  themesList = await loadThemesList();

  // Load local configs file
  configs = await loadConfig();

  // Change theme base on "theme" in configs file
  changeTheme(configs.theme);

  // Change background with configs backgroundURL
  if (configs.backgroundURL !== "") {
    document.body.style.backgroundImage = backgroundURL;
  }

  // Update date and time once on startup
  await updateDateTime();
  await updateQuote();

  setInterval(async () => {
    await updateDateTime();
  }, 60000); // Reload once each minute, reduce this to increase accuracy
});

const searchBox = document.querySelector("#search-box");
searchBox.addEventListener("keypress", async (e) => {
  let keyword = searchBox.value;
  if (e.key === "Enter") {
    e.preventDefault();
    if (keyword.length === 0 || keyword === "") return;

    // Use t: to change theme
    if (keyword.startsWith("t:")) {
      let selectedTheme = keyword.split(":")[1];

      // Check if themesList contains selected theme
      if (!themesList.hasOwnProperty(selectedTheme) && selectedTheme !== "") return;

      // If selected theme is blank, apply default theme
      if (selectedTheme === "") selectedTheme = "default";

      changeTheme(selectedTheme);
      searchBox.value = "";
      return;
    }

    if (keyword.startsWith("b:")) {
      let backgroundURL = keyword.split(" ")[1];
      document.body.style.backgroundImage = `url(${backgroundURL})`;
      searchBox.value = "";
      return;
    }

    // Check if user type in URL
    if (checkIfURL(keyword)) {
      if (keyword.startsWith("www")) keyword = `https://${keyword}`;
      else if (!keyword.startsWith("www")) keyword = `https://www.${keyword}`;
      location = keyword;
    } else {
      // Search with Google
      keyword = keyword.replace("+", "%2B") // Fix plus sign bug
      let searchKeyword = keyword.split(" ").join("+");
      location = `https://www.google.com/search?q=${searchKeyword}`;
    }
  }
});

let searchIcon = document.querySelector("#search-icon");
searchBox.addEventListener("input", (e) => {
  if (checkIfURL(searchBox.value)) {
    searchIcon.classList.remove("fa-magnifying-glass");
    searchIcon.classList.add("fa-globe");
  } else {
    searchIcon.classList.remove("fa-globe");
    searchIcon.classList.add("fa-magnifying-glass");
  }
});

const checkIfURL = (str) => {
  let expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  return str.match(new RegExp(expression));
};

document.querySelector("#google-doodle").addEventListener("click", () => {
  location = "https://www.google.com/search?q=google+doodle+today";
});

const updateDateTime = async () => {
  const result = await fetch("https://worldtimeapi.org/api/ip");
  const data = await result.json();

  let dateTime = document.querySelector("#date-time");
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date");

  if (result.ok) {
    // Parse date to easy-to-read format
    let parsedDate = Date.parse(new Date(data.datetime));

    // Time in format hh:mm:ss
    let time = parsedDate.toString().split(" ")[4];

    if (configs.showSeconds) {
      timeElement.innerHTML = time.toString();
    } else {
      // Remove seconds at the end
      timeElement.innerHTML = time.toString().substring(0, 5);
    }

    // Get date only, the rest behind is eliminated
    dateElement.innerHTML = parsedDate.toString().substring(0, 16);

    // Transparency effect once
    if (dateTime.classList.contains("not-loaded")) {
      dateTime.classList.remove("not-loaded");
      dateTime.classList.add("loaded");
    }
  } else {
    console.log(data);
  }
};

const updateQuote = async () => {
  let quoteContainer = document.querySelector("#quote-container");
  let quote = document.createElement("p");
  quote.setAttribute("id", "quote");
  let author = document.createElement("a");
  author.setAttribute("id", "author");

  // Fetch a random quote from the Quotable API
  const response = await fetch("https://api.quotable.io/random?minLength=100");
  const data = await response.json();

  if (response.ok) {
    // Update DOM elements
    quote.textContent = `"${data.content}"`;
    author.textContent = data.author;
  } else {
    quote.textContent = "An error occurred while fetching quote data";
    author.textContent = "Please try again";
    console.log(data);
  }

  quoteContainer.appendChild(quote);
  quoteContainer.appendChild(author);

  fadeIn(quote);
  fadeIn(author);

  // Search Google for author on click
  let authorSearchKeyword = author.innerHTML.split(" ").join("+")
  author.setAttribute("href", `https://www.google.com/search?q=${authorSearchKeyword}`)
};

const fadeIn = (el) => {
  el.style.opacity = 0;
  let fadeInTimer = setInterval(() => {
    if (parseFloat(el.style.opacity) < 1) {
      el.style.opacity = parseFloat(el.style.opacity) + 0.1;
    } else clearInterval(fadeInTimer);
  }, 100);
};

// Load themes from local colors.json file
const loadThemesList = async () => {
  return await axios
    .get("./colors.json")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const changeTheme = (themeName) => {
  let root = document.querySelector(":root");
  let theme = themesList[themeName];

  root.style.setProperty("--main-bg-color", theme["--main-bg-color"]);
  root.style.setProperty("--border-color", theme["--border-color"]);
  root.style.setProperty("--border-color-focus", theme["--border-color-focus"]);
  root.style.setProperty("--text-color", theme["--text-color"]);
  root.style.setProperty("--text-color-variant", theme["--text-color-variant"]);

  configs.theme = themeName;
  saveConfig(configs);
};

const loadConfig = async () => {
  let userConfig = localStorage.getItem("configs");

  if (userConfig === null) {
    // If user configs does not exist, create new one
    return await axios
      .get("configs.json")
      .then((res) => {
        saveConfig(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  } else {
    // If configs does exist, load from localStorage
    return JSON.parse(userConfig);
  }
};

const saveConfig = (newConfigs) => {
  localStorage.setItem("configs", JSON.stringify(newConfigs));
};
