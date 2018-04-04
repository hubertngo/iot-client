/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-12 01:19:42
*------------------------------------------------------- */
require('dotenv').config();
const { createServer } = require('http');
const next = require('next');
const routes = require('./src/routes');

const port = parseInt(process.env.PORT, 10) || 3004;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare()
	.then(() => {
		createServer(handler)
			.listen(port, (err) => {
				if (err) throw err;
				console.log(`> Ready on http://localhost:${port}`);
			});
	});
