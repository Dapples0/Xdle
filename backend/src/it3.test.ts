import { contains, gcd } from './hints';

describe('X contains certain numbers', () => {
	test('X is all the same number', () => {
		expect(contains(9999,9)).toStrictEqual(["9"]);
	});

	test('Contains all numbers but wrong order', () => {
		expect(contains(12345679,96172543)).toStrictEqual(["1", "2", "3", "4", "5", "6", "7", "9"]);
	});
});

describe('gcd', () => {
	test('Not coprime', () => {
		expect(gcd(78,66)).toStrictEqual("66 and x share a greatest common divisor of 6");
	});

	test('Contains all numbers but wrong order', () => {
		expect(gcd(9999,9998)).toStrictEqual("9998 is coprime with x");
	});
});