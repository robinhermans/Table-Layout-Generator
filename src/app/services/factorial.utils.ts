export class Factorial {
  private static fact: number;
  private fact = 1;

  constructor() {

  }

  public calculate(num: number): number {
    if (num > 0) {
      this.fact = this.fact * num;
      this.calculate(num - 1);
    }
    return this.fact;
  }

  // private generateTree(leafs: Array<string>): Array<any> {
  //   let branches = new Array();

  //   if (leafs.length == 1) {
  //     let value = new Array();
  //     value.push(leafs);
  //     return value;
  //   }
  //   for (let c in leafs) {
  //     let leaf: string = leafs[c];
  //     this.generateTree(leafs.join('').replace(leaf, '').split('')).concat("").map(function (subtree) {
  //       branches.push([leaf].concat(subtree));
  //     });
  //   }
  //   return branches;
  // }

  // https://stackoverflow.com/questions/29910312/algorithm-to-get-all-the-combinations-of-size-n-from-an-array-java
  private generateTree(k: number, input: Array<number>): Array<any> {
    let subsets: Array<any> = new Array<any>();
    let s: Array<number> = new Array(k);
    if (k <= input.length) {
      for (let i = 0; (s[i] = i) < k - 1; i++);
      subsets.push(this.getSubset(input, s));
      for (; ;) {
        let i: number;
        for (i = k - 1; i >= 0 && s[i] == input.length - k + i; i--);
        if (i < 0) {
          break;
        }
        s[i]++;
        for (++i; i < k; i++) {
          s[i] = s[i - 1] + 1;
        }
        subsets.push(this.getSubset(input, s));
      }
    }
    return subsets.map(sub => sub.join(''));
  }

  private getSubset(input: Array<number>, subset: Array<number>): Array<number> {
    let result: Array<number> = new Array<number>(subset.length);
    for (let i = 0; i < subset.length; i++) {
      result[i] = input[subset[i]];
    }
    return result;
  }

  public getCombinations(guestCount: number, guestsPerTable: number): number {
    // Temporary solution for performance issues
    if(guestCount > 20 && guestsPerTable > 4){
      return guestsPerTable;
    }

    let leafs = new Array();
    for (let outer = 1; outer <= guestCount; outer++) {
      leafs[leafs.length] = outer.toString();
    }

    let tree = this.generateTree(guestsPerTable, leafs);
    let count = 0;
    if (tree) {
      let numbers: Array<Array<number>> = new Array();
      for (let t = 0; t < tree.length; t++) {
        if(numbers.filter(numb => numb !== null).filter(numb => numb.length === guestsPerTable-1).length === guestsPerTable){
          break;
        }
        let characters: Array<number> = tree[t].split("").map(char => <number>char);
        let match = true;
        characters.forEach(char => {
          let charNumbers: Array<number> = !numbers[char] ? new Array() : numbers[char];
          let others = characters.filter(numb => numb != char);
          if (charNumbers.filter(numb => others.indexOf(numb) >= 0).length > 0) {
            match = false;
          }
        });
        if (match === true) {
          count = count + 1;
          characters.forEach(char => {
            let charNumbers: Array<number> = !numbers[char] ? new Array() : numbers[char];
            charNumbers = charNumbers.concat(characters.filter(numb => numb != char && charNumbers.indexOf(numb) < 0));
            numbers[char] = charNumbers;
          });
        }
      }

    }

    return count;
  }
}