const fetch = require('cross-fetch');

module.exports = class QuotesService {
  static getAllQuotes() {

    const programmingQuote = fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
      .then((quote) => quote.json())
      .then((parsedQuote) => {
        return {
          author: parsedQuote.author,
          content: parsedQuote.en
        };
      });

    const futuramaQuote = fetch('https://futuramaapi.herokuapp.com/api/quotes/1')
      .then((quote) => quote.json())
      .then((parsedQuote) => {
        return {
          author: parsedQuote[0].character,
          content: parsedQuote[0].quote
        };
      });

    const quotableQuote = fetch('https://api.quotable.io/random')
      .then((quote) => quote.json())
      .then((parsedQuote) => {
        return {
          author: parsedQuote.author,
          content: parsedQuote.content
        };
      });


    return Promise.all([
      programmingQuote,
      futuramaQuote,
      quotableQuote
    ]);
  }
};
