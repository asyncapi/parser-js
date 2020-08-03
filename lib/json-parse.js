module.exports = (txt, reviver, context = 20) => {
  try {
    return JSON.parse(txt, reviver);
  } catch (e) {
    handleJsonNotString(txt);
    const syntaxErr = e.message.match(/^Unexpected token.*position\s+(\d+)/i);
    const errIdxBrokenJson = e.message.match(/^Unexpected end of JSON.*/i) ? txt.length - 1 : null;
    const errIdx = syntaxErr ? +syntaxErr[1] : errIdxBrokenJson;
    handleErrIdxNotNull(e, txt, errIdx, context);
    e.offset = errIdx;
    const lines = txt.substr(0, errIdx).split('\n');
    e.startLine = lines.length;
    e.startColumn = lines[lines.length - 1].length;
    throw e;
  }
};

function handleJsonNotString(txt) {
  if (typeof txt !== 'string') {
    const isEmptyArray = Array.isArray(txt) && txt.length === 0;
    const errorMessage = `Cannot parse ${ 
      isEmptyArray ? 'an empty array' : String(txt)}`;
    throw new TypeError(errorMessage);
  }
}

function handleErrIdxNotNull(e, txt, errIdx, context) {
  if (errIdx !== null) {
    const start = errIdx <= context
      ? 0
      : errIdx - context;
    const end = errIdx + context >= txt.length
      ? txt.length
      : errIdx + context;
    e.message += ` while parsing near '${
      start === 0 ? '' : '...'
    }${txt.slice(start, end)}${
      end === txt.length ? '' : '...'
    }'`;
  } else {
    e.message += ` while parsing '${txt.slice(0, context * 2)}'`;
  }
}
