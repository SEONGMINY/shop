const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;

app.get('/api/host', (req, res) => {
    res.send({ host : 'cs' });
})

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
})