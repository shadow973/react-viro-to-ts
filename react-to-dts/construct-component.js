const fs = require('fs');

const convertPropType = require("./convert-prop-type");
const convertMethods = require("./convert-methods");

const reactDocs = require('react-docgen');

const getPropsInterface = function(component, props) {
  let propStr = `interface ${component}Props {\n`;

  for(const [propName, definition] of Object.entries(props || {})) {
    if(definition.description) {
      propStr += `\t/* ${definition.description.replace(/\n/g, "\n\t")} */\n`;
    }
    propStr += `\t${propName}${definition.required ? "" : "?"}:`;
    propStr += convertPropType(definition.type || {});
    propStr += "\n";
  }
  propStr += "}\n";
  return propStr;
}

const constructComponent = function(modulePath, path, componentName) {
  const fileContent = fs.readFileSync(`${modulePath}${path}${componentName}.js`, 'utf-8');
  let component = "";
  try {
    const docs = reactDocs.parse(fileContent);
    const propInterface = getPropsInterface(componentName, docs.props);
    //console.log(propInterface);

    const methods = convertMethods(docs.methods);

    component += docs.description ? `/* ${docs.description} */\n` : '';
    component += `${propInterface}export class ${componentName} extends Component<${componentName}Props> {\n${methods}`;
    component += "}";


  } catch(e) {
    if(/No suitable component/.test(e.message)) {
      console.log(`No component found for ${path}${componentName}, exporting const with type 'any'.`)
    } else {
      console.error(e);
    }
    component = `export const ${componentName}:any;`
  }
  return component;
}

module.exports = constructComponent;
