const express = require('express');
const app = express();
const auth = require('./routes/auth');
const PORT = process.env.PORT || 8080;

app.use('/api/v1', auth);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})