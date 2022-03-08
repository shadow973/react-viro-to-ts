
const convertPropType = function (propType) {
  switch(propType.name) {
    case 'bool':
    case 'Boolean':
      return 'boolean';
    case 'string':
    case 'String':
      return 'string';
    case 'func':
      return 'Function';
    case 'number':
    case 'Number':
      return 'number';
    case 'Array':
      return 'any[]';
    case 'union':
      return propType.value.map(t => convertPropType(t)).join(" | ");
    case 'shape':
      return "{ " + Object.entries(propType.value).map(([p, v]) => {
        const prop = `${p}${v.required ? '' : '?'}:${convertPropType(v)}`;
        return prop;
      }).join(', ') + " }";
    case 'arrayOf':
      return `${convertPropType(propType.value)}[]`;
    case 'enum':
      return propType.value.map(t => t.value).join(" | ");
    default:
      if(!propType.name) {
        return `any`;
      } else {
        console.warn(`Unknown propType name: ${propType.name}`);
        return `any`;
      }
 }
};

module.exports = convertPropType;
