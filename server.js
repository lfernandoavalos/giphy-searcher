const path = require('path');
const express = require('express');
const app = express();
const indexPath = path.join(__dirname, './index.html');
const publicPath = express.static(path.join(__dirname, './'));

app.use('/', publicPath);
app.get('/', (_, res) => { res.sendFile(indexPath); });


const port = (process.env.PORT || 8080);

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
