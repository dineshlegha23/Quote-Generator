let apiQuotes = [];

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  console.log(quote);
}

async function getQuotes() {
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
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

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
twitterBtn.addEventListener("mouseover", xLogoAdd);
twitterBtn.addEventListener("mouseleave", twitterLogoAdd);

getQuotes();
