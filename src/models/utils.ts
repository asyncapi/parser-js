
function getMapValue(obj: any, key: string, type: any, options?: any) {
    if (typeof key !== 'string' || !obj) return null;
    const v = obj[String(key)];
    if (v === undefined) return null;
    return type ? new type(v, options) : v;
};

export function createMapOfTypes(obj: any, type: any, options?: any) {
    const result: Record<string, any> = {};
    if (!obj) return result;

    for (let [key, value] of Object.entries(obj)) {
        result[String(key)] = new type(value, options);
    }

    return result;
}

export function getMapValueOfType(obj: any, key: string, type: any, options?: any) {
    return getMapValue(obj, key, type, options);
}