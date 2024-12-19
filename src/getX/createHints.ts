export function makeUnique(array: string[], append: string[]): string[] {
    let newArray: string[] = [];
    append.forEach((hint) => {
        if (!array.includes(hint)) {
            newArray.push(hint);
        }
    });

    return newArray;
}