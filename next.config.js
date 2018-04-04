/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-12 01:16:17
*------------------------------------------------------- */

function disableCacheDirectory(config) {
	config.module.rules
		.filter(({ loader }) => loader === 'babel-loader')
		.map(l => (l.options.cacheDirectory = false)); // eslint-disable-line
}

module.exports = {
	webpack: (config) => {
		disableCacheDirectory(config);

		config.module.rules.push(
			{
				test: /\.less$/,
				use: [{
					loader: 'emit-file-loader',
					options: {
						name: 'dist/[path][name].[ext]',
					},
				}, {
					loader: 'babel-loader',
				}, {
					loader: 'raw-loader',
				}, {
					loader: 'less-loader',
				}],
				include: /theme/,
			},
		);

		return config;
	},
};
