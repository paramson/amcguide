// Minimal static server for the AMC Guide single-file platform.
// Railway sets PORT; we bind to it. Everything lives in /public.
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
// fall back to the app for any unknown path (keeps deep links working)
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log('AMC Guide serving on port ' + PORT));
