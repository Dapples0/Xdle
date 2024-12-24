/**
 * Generates a random 5 digit number
 * @returns a 5 digit number
 */
export function generateX(): number {
    const max = 99999;
    return Math.floor(Math.random() * max);
}