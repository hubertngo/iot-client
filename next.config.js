/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-12 01:16:17
*------------------------------------------------------- */

module.exports = {
	webpack: (config) => {
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
