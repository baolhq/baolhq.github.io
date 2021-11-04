let timeElement = document.getElementById("time");
let dateElement = document.getElementById("date");

document.addEventListener("DOMContentLoaded", () => {
  updateDateTime();
  updateQuote();

  setInterval(() => {
    updateDateTime();
  }, 1000);
});

// Mine is UTC+7, so I use this
function updateDateTime() {
  let dateTime = Date.parse(new Date().addHours(7)).toString().split(" ");
  let time = dateTime[4];

  [1, 1, 1, 1].forEach((_) => {
    dateTime.pop();
  });

  let date = dateTime.join(" ");
  let removedSecondsTime = time.split(":");

  // Pop out the seconds
  removedSecondsTime.pop();

  timeElement.innerHTML = removedSecondsTime.join(":");
  dateElement.innerHTML = date;
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
