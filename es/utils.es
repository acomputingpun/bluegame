export function median3 (a, b, c) {
    return a+b+c - Math.max(a, b, c) - Math.min(a, b, c);
}

export function toRoman(n) {
    return [null, "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"][n];
}

export function hrDelta(n) {
    //TODO
    return "hrDelta " + n
}

export function valueToHR(n) {
    if (n < 10000) {
        let nStr = `${n}`;
        nStr = nStr.slice(0, 5);
        return nStr
    } else {
        let exponent = 1;
        while (n >= 10) {
            n = n / 10;
            exponent += 1;
        }
//        let nStr = n.toFixed(2);
        let nStr = `${n}.00`;
        nStr = nStr.slice(0, 4);
        return `${nStr}e${exponent}`;
    }
}

export function secondsToHR(s) {
    if (s < 1) {
        return "0s"
    } else if (s < 60) {
        return `${s}s`
    } 
    let m = Math.floor(s/60);
    s = s % 60;
    if (m < 60) {
        return `${m}m ${s}s`
    }
    let h = Math.floor(m/60);
    m = m % 60;
    if (m < 60) {
        return `${h}h ${m}m`
    }
    
    let d = Math.floor(m/24);
    h = h % 60;
    if (d < 14) {
        return `${d}d ${h}h`
    } else {
        return "-"
    }
}

var LOG_PRECISION = 100000
export function log(base, n) {
    return Math.round((Math.log(n) * LOG_PRECISION) / Math.log(base)) / LOG_PRECISION
}


export function toHalfbell(raw) {
    if (raw <= 0) {
        return 0;
    } else if (raw >= 1) {
        return 0;
    } else {
        return log(0.5, raw);
    }
}

export function aRemove(arr, item) {
    let index = arr.indexOf(item);
    arr.splice(index, 1);
    return item;
}
export function aReduce(arr, rfunc) {
    let out = arr[0]
    for (let x of arr.slice(1)) {
        out = rfunc(out, x)
    }
    return out
}
export function aSum(arr) {
    return aReduce(arr, (a,b)=>a+b)
}
export function aZip(a, b) {
    return a.map( (x, i) => [x, b[i]] )
}
export function aWithout(arr, item) {
    let k = [...arr]
    aRemove(k, item)
    return k
}

export function integerSplit(domain, fractions) {
    let floorSplits = [];
    let remainders = [];
    for (let fraction of fractions) {
        let floatSplit = domain*fraction;
        let intSplit = Math.floor(split)
        let remainder = floatSplit - intSplit;
    }
}



export function fromRLE(runs) {
    let values = [];
    for (let j=0; j<runs.length; j+=2) {
        for (let k = 0; k<runs[j]; k++) {
            values.push(runs[j+1])
        }
    }
    return values;
}

export function toRLE(values) {
    if (values.length == 0) {
        return [];
    }
    let runs = [];
    let len = 0;
    let cur = null;
    for (let value of values) {
        if (len == 0 || value == cur) {
            cur = value;
            len += 1;
        } else {
            runs.push(len)
            runs.push(cur)
            cur = value;
            len = 1;
        }
    }
    runs.push(len)
    runs.push(cur)
    return runs;
}

