const convertPropType = require("./convert-prop-type");

const convertMethods = function(methods) {
  let retStr = "";
  for(const method of methods) {
    if(method.name.startsWith("_")) continue;

    const methodParams = method.params.map(t => `${t.name}:${convertPropType(t.type || {})}`).join(", ");

    if(method.docblock) {
      retStr += `\t/* ${method.docblock.replace(/\n/g, "\n\t")} */\n`;
    }

    if(method.modifiers.length) {

    }

    let returnType = 'any';
    if(method.modifiers.length && method.modifiers.indexOf("async") > -1) {

      returnType = "Promise<any>";
    }
    retStr += `\tpublic ${method.name}(${methodParams}):${returnType};\n`;
  }
  return retStr;
}

module.exports = convertMethods;
