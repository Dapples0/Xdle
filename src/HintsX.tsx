import { multiple, withinRange, length, gcd, lessOrGreaterThan } from './getX/hints'

export interface hints {
    range: string[],
    multiple: string[],
    length: string,
    gcd: string[],
    contains: string[],
    lessOrGreater: string[],
  }

export class HintsX {
  public constructor() {}

  public addHintRange(appendHint: hints, hintResults: hints, x:number, inputX:string) {
    const rangeResult = withinRange(x, parseInt(inputX));
    if (hintResults.range.includes(rangeResult) || rangeResult.length === 0) {
      return;
    }
    appendHint.range.push(rangeResult);
    const newRangeDiv = document.createElement('div');
    const rangeDiv = document.getElementById('hint-range')!;
    newRangeDiv.setAttribute('class', 'hint-text-container');
    newRangeDiv.appendChild(document.createTextNode(rangeResult));
    rangeDiv.appendChild(newRangeDiv);

    }

    public addHintEquality(appendHint: hints, hintResults: hints, x:number, inputX:string) {
      const equalityResult = lessOrGreaterThan(x, parseInt(inputX));
      if (hintResults.lessOrGreater.includes(equalityResult)) {
        return;
      }
      appendHint.lessOrGreater.push(equalityResult);
      const newEqualityDiv = document.createElement('div');
      const equalityDiv = document.getElementById('hint-equality')!;
      newEqualityDiv.setAttribute('class', 'hint-text-container');
      newEqualityDiv.appendChild(document.createTextNode(equalityResult));
      equalityDiv.appendChild(newEqualityDiv);
    }

    public addHintMultiple(appendHint: hints, hintResults: hints, x:number, inputX:string) {
      const multipleResult = multiple(x, parseInt(inputX));
      if (hintResults.lessOrGreater.includes(multipleResult) || multipleResult.length === 0) {
        return;
      }
      appendHint.multiple.push(multipleResult);
      const newMultipleDiv = document.createElement('div');
      const multipleDiv = document.getElementById('hint-multiple')!;
      newMultipleDiv.setAttribute('class', 'hint-text-container');
      newMultipleDiv.appendChild(document.createTextNode(multipleResult));
      multipleDiv.appendChild(newMultipleDiv);

    }

    public addHintLength(appendHint: hints, hintResults: hints, x:number, inputX:string) {
        if (hintResults.length.length === 0) {
          appendHint.length = length(x, parseInt(inputX));
        } else {
          appendHint.length = hintResults.length;
        }

    }

    public addHintGcd(appendHint: hints, hintResults: hints, x:number, inputX:string) {
      const gcdResult = gcd(x, parseInt(inputX));
      if (hintResults.lessOrGreater.includes(gcdResult) || gcdResult.length === 0) {
        return;
      }
      appendHint.gcd.push(gcdResult);
      const newGcdDiv = document.createElement('div');
      const gcdDiv = document.getElementById('hint-gcd')!;
      newGcdDiv.setAttribute('class', 'hint-text-container');
      newGcdDiv.appendChild(document.createTextNode(gcdResult));
      gcdDiv.appendChild(newGcdDiv);

    }

    public addHintContains(appendHint: hints, listContains: string[]) {
      if (listContains.length === 0) {
        return;
      }
      appendHint.contains.push(...listContains);
      const newContainsDiv = document.createElement('div');
      const containsDiv = document.getElementById('hint-contains')!;
      containsDiv.innerHTML = '';
      let containsStr = "Contains "
      for (let c of listContains) {
        if (listContains.indexOf(c) === listContains.length - 1) {
          containsStr += c;
        } else {
          containsStr += c + ", ";
        }

      }
      newContainsDiv.setAttribute('class', 'hint-text-container');
      newContainsDiv.appendChild(document.createTextNode(containsStr));
      containsDiv.appendChild(newContainsDiv);
    }
}