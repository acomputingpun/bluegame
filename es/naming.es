import * as pseudo from '/es/pseudo.es';

export class Namer {
    constructor(seed, nameList) {
        this.unusedNameIDs = [];
        for (let k = 1; k<nameList.length; k++) {
            this.unusedNameIDs.push(k);
        }
        pseudo.shuffle(seed, this.unusedNameIDs);
        this.nameList = nameList
    }
    getNameID() {
        if (this.unusedNameIDs.length > 0) {
            return this.unusedNameIDs.pop();
        } else {
            return 0;
        }
    }
    getName() {
        return this.nameList[this.getNameID()]
    }
}    

