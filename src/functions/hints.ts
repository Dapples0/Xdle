/**
 * Returns a multiple hint string
 * @param {number} x - the generated x number
 * @param {number} num - inputted number
 * @returns multiple hint string
 */
export function multiple(x: number, num: number): string {
    if (num === 0 || x === 0) {
        return '';
    }
    if (x % num === 0) {
        return `Is a multiple of ${num}`;
    }

    if (num % x === 0) {
        return `${num} is a multiple of X`;
    }

    return '';
}
/**
 * Returns a range hint string
 * @param {number} x - the generated x number
 * @param {number} num - inputted number
 * @returns range hint string
 */
export function withinRange(x: number, num: number): string {
    const equality = Math.abs(x - num);
    if (equality <= 10) {
        return `${num} is within 10 numbers of X`;
    }

    if (equality <= 100) {
        return `${num} is within 100 numbers of X`;
    }

    if (equality <= 100) {
        return `${num} is within 100 numbers of X`;
    }

    if (equality <= 1000) {
        return `${num} is within 1000 numbers of X`;
    }

    if (equality <= 10000) {
        return `${num} is within 10000 numbers of X`;
    }
    return '';
}

/**
 * Returns a equality hint string
 * @param {number} x - the generated x number
 * @param {number} num - inputted number
 * @returns equality hint string
 */
export function lessOrGreaterThan(x: number, num: number): string {
    if (x > num) {
        return `Larger than ${num}`
    }

    return `Less than ${num}`;
}

/**
 * Returns a contains hint string
 * @param {number} x - the generated x number
 * @param {number} num - inputted number
 * @returns contains hint string array
 */
export function contains(x: number, num: number): string[] {
    const strX = x.toString();
    const strNum = num.toString().split("");

    const num_unique : string[] = [];

    for (const digit of strNum) {
        if (!(num_unique.includes(digit)) && strX.includes(digit)) {
            num_unique.push(digit);
        }
    }

    return num_unique.sort();
}

/**
 * Returns a length hint string
 * @param {number} x - the generated x number
 * @param {number} num - inputted number
 * @returns length hint string
 */
export function length(x: number, num: number): string {
    const strX = x.toString();
    const strNum = num.toString();

    if (strX.length === strNum.length) {
        return `Is ${strNum.length} digits`;
    }

    return '';
}

/**
 * Returns a gcd hint string
 * @param {number} x - the generated x number
 * @param {number} num - inputted number
 * @returns gcd hint string
 */
export function gcd(x: number, num: number): string {
    if (num === 0 || x === 0) {
        return '';
    }

    const gcd = euclidean(x, num);

    if (gcd === 1) {
        return `${num} is coprime with X`
    }

    return `${num} and X share a greatest common divisor of ${gcd}`
}

/**
 * Finds gcd of two numbers
 * @param {number} x - the generated x number
 * @param {number} num - inputted number/remainder
 * @returns num or recursively calls itself
 */
function euclidean(x: number, num: number): number {
    const remainder = x % num;
    if (remainder === 0) {
        return num;
    }

    return euclidean(num, remainder);
}