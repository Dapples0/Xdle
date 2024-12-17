export function multiple(x: number, num: number): string {
    if (x % num === 0) {
        return `Is a multiple of ${num}`;
    }

    if (num % x === 0) {
        return `${num} is a multiple of x`;
    }

    return '';
}

export function withinRange(x: number, num: number): string {
    if (x - num <= 10000) {
        return `${num} is within 10000 numbers`;
    }

    if (x - num <= 1000) {
        return `${num} is within 1000 numbers`;
    }

    if (x - num <= 100) {
        return `${num} is within 100 numbers`;
    }

    if (x - num <= 10) {
        return `${num} is within 10 numbers`;
    }

    if (x > num) {
        return `Larger than ${num}`
    }

    return `Less than ${num}`;
}

export function contains(x: number, num: number): string[] {
    let strX = x.toString();
    const strNum = num.toString().split("");

    let num_unique : string[] = [];

    for (let digit of strNum) {
        if (!(num_unique.includes(digit)) && strX.includes(digit)) {
            num_unique.push(digit);
        }
    }

    return num_unique.sort();
}

export function length(x: number, num: number): string {
    const strX = x.toString();
    const strNum = num.toString();

    if (strX.length === strNum.length) {
        return `Is ${strNum.length} digits`;
    }

    return '';
}

export function gcd(x: number, num: number): string {
    const gcd = euclidean(x, num);

    if (gcd === 1) {
        return `${num} is coprime with x`
    }

    return `${num} and x share a greatest common divisor of ${gcd}`
}

function euclidean(x: number, num: number): number {
    const remainder = x % num;
    if (remainder === 0) {
        return num;
    }

    return euclidean(num, remainder);
}