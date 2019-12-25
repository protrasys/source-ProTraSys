// Importing Dependencies
const router = require('express').Router();

router.get('/student', (req, res) => {
  res.send('Routes API Working');
});

module.exports = router;
