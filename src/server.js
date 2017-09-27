import express  from 'express';
import React    from 'react';
import ReactDom from 'react-dom/server';
import db from './database';
import App      from 'components/App';

const app = express();

app.use((req, res) => {
	const componentHTML = ReactDom.renderToString(<App />);

	return res.end(renderHTML(componentHTML));
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8010' : '/';

function renderHTML(componentHTML) {
	return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Retro Desc</title>
          <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 1003;

app.listen(PORT, () => {
	console.log(`Server listening on: ${PORT}`);
});
