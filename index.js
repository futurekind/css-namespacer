const sass = require('node-sass');
const { writeFileSync, readFileSync } = require('fs');
const program = require('commander');
const pkg = require('./package.json');

const write = (data, outFile) => {
    const result = sass.renderSync({
        data,
        outputStyle: 'expanded',
    });

    writeFileSync(outFile, result.css);
};

program
    .version(pkg.version)
    .usage('[options] <file ...>')
    .option('-i, --in <string>', 'path/to/input.css')
    .option('-o, --out <string>', 'path/to/output.css')
    .option(
        '-ns, --namespace <string>',
        'Namespace Selector (Default: `.blat`)'
    )
    .parse(process.argv);

if (program.in && program.out) {
    const namespace = program.namespace || '.blat';

    const css = readFileSync(program.in);

    const data = `
        ${namespace} {
            ${css}
        }
    `;

    write(data, program.out);
}
