export function generateX(): string {
    const max = 999999;
    return Math.floor(Math.random() * max).toString();
}

export function addInput(inputX: string, input: string): string {
    if (inputX.length < 6) {
        return inputX + input;
    }
    return inputX;
}

export function checkInput(inputX: string, input: string): string {
    if (inputX === input) {
        return `X was ${inputX}`;
    }

    return 'rice';
}
