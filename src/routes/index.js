/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-12 01:26:53
*------------------------------------------------------- */

const routes = module.exports = require('next-routes')(); // eslint-disable-line

routes.add({ pattern: '/profile/edit/:id', page: 'profile' });
routes.add({ pattern: '/profile/:id', page: 'profile' });

routes.add({ pattern: '/ticket-buying/:id', page: 'mobile-flight-detail' });
routes.add({ pattern: '/ticket-selling/:id', page: 'mobile-flight-detail' });
