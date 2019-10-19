/**
 * Flattens nested results from Apex for data table.
  * @return {String[]} Array with flat results
 */
export function flatten(obj,prefix=[],current={}) {

    console.log('flattening');
    // Remember kids, null is also an object!
    if (typeof (obj) === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
            this.flatten(obj[key], prefix.concat(key), current);
    })
    } else {
        current[prefix.join('.')] = obj;
    }

    return current;
}