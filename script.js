document.addEventListener("DOMContentLoaded", () => {
  // Update date and time once on startup
  updateDateTime();
  updateQuote();

  setInterval(() => {
    updateDateTime();
  }, 20000); // 20s reload once, reduce this to increase accuracy
});

async function updateDateTime() {
  const result = await fetch("http://worldtimeapi.org/api/ip");
  const data = await result.json();

  let dateTime = document.querySelector("#date-time");
  let timeElement = document.getElementById("time");
  let dateElement = document.getElementById("date");

  if (result.ok) {
    // Parse date to easy-to-read format
    let parsedDate = Date.parse(new Date(data.datetime));

    // Time in format hh:mm:ss
    let time = parsedDate.toString().split(" ")[4];

    // Remove seconds at the end
    timeElement.innerHTML = time.toString().substring(0, 5);

    // Get date only, the rest behind is eliminated
    dateElement.innerHTML = parsedDate.toString().substring(0, 16);

    // Transparency effect
    dateTime.classList.add("loaded");
  } else {
    console.log(data);
  }
}

async function updateQuote() {
  let quoteContainer = document.querySelector("#quote-container");
  let quote = document.createElement("p");
  quote.setAttribute("id", "quote");
  let author = document.createElement("p");
  author.setAttribute("id", "author");

  // Fetch a random quote from the Quotable API
  const response = await fetch("https://api.quotable.io/random?minLength=100");
  const data = await response.json();

  if (response.ok) {
    // Update DOM elements
    quote.textContent = `"${data.content}"`;
    author.textContent = `-- ${data.author} --`;
  } else {
    quote.textContent = "An error occurred";
    author.textContent = "Please try again";
    console.log(data);
  }

  quoteContainer.appendChild(quote);
  quoteContainer.appendChild(author);

  fadeIn(quote);
  fadeIn(author);
}

function fadeIn(el) {
  el.style.opacity = 0;
  let fadeInTimer = setInterval(() => {
    if (parseFloat(el.style.opacity) < 1) {
      el.style.opacity = parseFloat(el.style.opacity) + 0.1;
    } else clearInterval(fadeInTimer);
  }, 100);
}
