const utils = module.exports;

const getMapValue = (obj, key, Type) => {
  if (typeof key !== 'string' || !obj) return null;
  const v = obj[String(key)];
  if (v === undefined) return null;
  return Type ? new Type(v) : v;
};

/**
 * Creates map of given type from object.
 * @private
 * @param  {Object} obj
 * @param  {Any} Type
 */
utils.createMapOfType = (obj, Type) => {
  const result = {};
  if (!obj) return result;

  Object.entries(obj).forEach(([key, value]) => {
    result[String(key)] = new Type(value);
  });

  return result;
};

/**
 * Creates given type from value retrieved from object by key.
 * @private
 * @param  {Object} obj
 * @param  {string} key
 * @param  {Any} Type
 */
utils.getMapValueOfType = (obj, key, Type) => {
  return getMapValue(obj, key, Type);
};

/**
 * Retrieves value from object by key.
 * @private
 * @param  {Object} obj
 * @param  {string} key
 */
utils.getMapValueByKey = (obj, key) => {
  return getMapValue(obj, key);
};

/**
 * Extends a given model with additional methods related to frequently recurring models.
 * @function mix
 * @private
 * @param  {Object} model model to extend
 * @param  {Array<Object>} mixins array with mixins to extend the model with
 */
utils.mix = (model, ...mixins) => {
  let duplicatedMethods = false;
  function checkDuplication(mixin) {
    // check duplication of model in mixins array
    if (model === mixin) return true;
    // check duplication of model's methods
    duplicatedMethods = Object.keys(mixin).some(mixinMethod => model.prototype.hasOwnProperty(mixinMethod));
    return duplicatedMethods;
  }
  
  if (mixins.some(checkDuplication)) {
    if (duplicatedMethods) {
      throw new Error(`invalid mix function: model ${model.name} has at least one method that it is trying to replace by mixin`);
    } else {
      throw new Error(`invalid mix function: cannot use the model ${model.name} as a mixin`);
    }
  }
  mixins.forEach(mixin => Object.assign(model.prototype, mixin));
  return model;
};
