import numeral from 'numeral';

export const FORMAT_CURRENCY = num => {
	return numeral(num).format('0,0.00');
};

export const ROUND_TO_TWO = num => {
	return Number(Math.round(num + 'e+2') + 'e-2');
};
