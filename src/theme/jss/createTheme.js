/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-12 11:04:40
*------------------------------------------------------- */
export default () => ({
	palette: {
		primary: {
			'50': '#E8EAF6',
			'100': '#C5CAE9',
			'200': '#9FA8DA',
			'300': '#7986CB',
			'400': '#5C6BC0',
			'500': '#4368C4',
			'600': '#3949AB',
			'700': '#303F9F',
			'800': '#283593',
			'900': '#1A237E',
		},
		secondary: {
			'50': '#FFF3E0',
			'100': '#FFE0B2',
			'200': '#FFCC80',
			'300': '#FFB74D',
			'400': '#FFA726',
			'500': '#FF8100',
			'600': '#FB8C00',
			'700': '#F57C00',
			'800': '#EF6C00',
			'900': '#E65100',
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)',
			icon: 'rgba(0, 0, 0, 0.38)',
			divider: 'rgba(0, 0, 0, 0.12)',
			lightDivider: 'rgba(0, 0, 0, 0.075)',
			white: 'rgba(255,255,255, 1);',
			light: 'rgba(0, 0, 0, 0.25)',
		},
	},
	radius: {
		small: 2,
		default: 8,
		large: 30,
	},
	breakpoints: {
		up: {
			sm: '@media (min-width: 576px)',
			md: '@media (min-width: 768px)',
			lg: '@media (min-width: 992px)',
			xl: '@media (min-width: 1200px)',
		},
		down: {
			xs: '@media (max-width: 575.98px)',
			sm: '@media (max-width: 767.98px)',
			md: '@media (max-width: 991.98px)',
			lg: '@media (max-width: 1199.98px)',
		},
		only: {
			xs: '@media (max-width: 575.98px)',
			sm: '@media (min-width: 576px) and (max-width: 767.98px)',
			md: '@media (min-width: 768px) and (max-width: 991.98px)',
			lg: '@media (min-width: 992px) and (max-width: 1199.98px)',
			xl: '@media (min-width: 1200px)',
		},
	},
});
