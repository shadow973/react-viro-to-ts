const fs = require('fs');
const constructComponent = require("./react-to-dts/construct-component");
const viroContent = fs.readFileSync("./node_modules/react-viro/index.js", 'utf-8');

console.log("Generating typescript defintions for react-viro:");

var re = /require\s?\(\'\.\/components\/([a-zA-Z0-9]+\/)?([a-zA-Z0-9]+)\'\)/g;
var s = viroContent
var m;
const allTypes = [];
do {
    m = re.exec(s);
    if (m) {
      const type = constructComponent("./node_modules/react-viro/components/", m[1] || "", m[2]);
      allTypes.push(type);

    }
} while (m);

const typesJoined = allTypes.join("\n\n");

const output = `
declare module 'react-viro' {
// Imports
import { Component } from "react";

${typesJoined}

}`;

fs.writeFileSync("./@types/react-viro/index.d.ts", output);
