const sass = require('node-sass');
const { writeFileSync, readFileSync } = require('fs');
const program = require('commander');
const pkg = require('./package.json');

const write = (data, outFile, outputStyle = 'compressed') => {
    const result = sass.renderSync({
        data,
        outputStyle,
    });

    writeFileSync(outFile, result.css);
};

program
    .version(pkg.version)
    .usage('[options] <file ...>')
    .option('-i, --in <string>', 'path/to/input.css')
    .option('-o, --out <string>', 'path/to/output.css')
    .option(
        '-f, --format <string>',
        'Default: `compressed` node-sass outputStyles https://github.com/sass/node-sass#outputstyle'
    )
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

    write(data, program.out, program.format);
}
