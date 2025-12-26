const express = require('express');
const router = express.Router();

// ejemplo
router.get('/test', (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
