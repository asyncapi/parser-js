const ref = require('ref');
const ArrayType = require('ref-array');
const StructType = require('ref-struct');

const types = module.exports = {};

// define object GoString to map:
// C type struct { const char *p; GoInt n; }
types.GoString = StructType({
    p: "string",
    n: "longlong"
});

// typedef
types.CString = ref.types.CString

// define the "char **" type
types.CStringArray = ArrayType(types.CString)

// define object GoString to map:
// C type struct { const char *p; GoInt n; }
types.ParseResult = StructType({
    result: "CString",
    err: types.CStringArray,
    errCount: ref.types.int,
    hasErrors: ref.types.bool,
});