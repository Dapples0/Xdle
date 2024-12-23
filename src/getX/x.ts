export function generateX(): number {
    const max = 99999;
    return Math.floor(Math.random() * max);
}

export function addInput(inputX: string, input: string): string {
    if (inputX === "0") {
        return inputX
    }

    if (inputX.length < 5) {
        return inputX + input;
    }
    return inputX;
}

export function checkInput(inputX: string, input: string): boolean {
    if (inputX === input) {
        return true;
    }

    return false;
}
