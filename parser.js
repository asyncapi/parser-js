var ffi = require('ffi')
var ref = require('ref')
var ArrayType = require('ref-array')
var StructType = require('ref-struct')

function parse(yamlOrJSONDocument) {
    // console.log(yamlOrJSONDocument);
  // define object GoString to map:
  // C type struct { const char *p; GoInt n; }
  var GoString = StructType({
      p: "string",
      n: "longlong"
  });

  // typedef
  var CString = ref.types.CString

  // define the "char **" type
  var CStringArray = ArrayType(CString)

  // define object GoString to map:
  // C type struct { const char *p; GoInt n; }
  var ParseResult = StructType({
      result: "CString",
      err: CStringArray,
      errCount: ref.types.int,
      hasErrors: ref.types.bool,
  });

  yamlOrJSONGoString = new GoString();
  yamlOrJSONGoString['p'] = yamlOrJSONDocument;
  yamlOrJSONGoString['n'] = yamlOrJSONGoString['p'].length-1;

  var parser = ffi.Library("cparser.so", {
      Parse: [ParseResult, [GoString]],
  });

  const p = parser.Parse(yamlOrJSONGoString)

  if (p.hasErrors) {
    p.err.length = p.errCount;
    var tmp = [];
    for (let i = 0; i < p.errCount; i++) {
      tmp.push(p.err[i]);
    }
    console.log(tmp)
  } 
  // else {
  //   console.log(p.result);
  // }
    return p;
}

module.exports = parse;