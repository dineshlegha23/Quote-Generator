async function getQuotes() {
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    const quote = document.querySelector("#quote");
    const random = Math.floor(Math.random() * data.length);
    quote.textContent = data[random].text;

    console.log(data);
  } catch (error) {}
}

getQuotes();
