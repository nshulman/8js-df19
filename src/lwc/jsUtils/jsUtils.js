/**
 * Flattens nested results from Apex for data table.
 * @return {String[]} Array with flattened results
 */
export function flatten(obj,prefix=[],current={}) {
    // From StackOverflow: https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
    // Remember kids, null is also an object!
    if (typeof (obj) === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
            this.flatten(obj[key], prefix.concat(key), current);
        });
    } else {
        current[prefix.join('.')] = obj;
    }
    return current;
}

function favoriteBands() {
    let firstBand = 'Daft Punk';
    const secondBand = 'Phantogram';
    console.log(`My favorite bands are ${firstBand}
        and ${secondBand}`);
    // My favorite bands are Daft Punk
    //         and Phantogram


}


