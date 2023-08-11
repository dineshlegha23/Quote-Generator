let apiQuotes = [];

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  loading();
  const quote = apiQuotes;
  authorText.textContent = quote.quoteAuthor;
  quoteText.textContent = quote.quoteText;

  if (quote.quoteText.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.quoteText;
  complete();
}

async function getQuotes() {
  loading();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  // const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote();
  } catch (error) {
    console.log("EERRRRRR" + error);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

function xLogoAdd() {
  twitterBtn.classList.remove("fa-brands");
  twitterBtn.classList.remove("fa-x-twitter");

  twitterBtn.classList.add("fa-brands");
  twitterBtn.classList.add("fa-twitter");
}

function twitterLogoAdd() {
  twitterBtn.classList.remove("fa-brands");
  twitterBtn.classList.remove("fa-twitter");

  twitterBtn.classList.add("fa-brands");
  twitterBtn.classList.add("fa-x-twitter");
}

newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);
twitterBtn.addEventListener("mouseover", xLogoAdd);
twitterBtn.addEventListener("mouseleave", twitterLogoAdd);

getQuotes();
