const { Router } = require('express');
const QuotesService = require('../services/QuotesService');

module.exports = Router()
  .get('/', async (req, res) => {
    return QuotesService.getAllQuotes()
      .then((arrayOfQuotes) => res.send(arrayOfQuotes));
  });
