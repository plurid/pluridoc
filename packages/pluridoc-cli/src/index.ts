import program from 'commander';

import PluridocServer from '@plurid/pluridoc-server';



const serverOptions = {
    verbose: true,
}
const pluridocServer = new PluridocServer(serverOptions);


program
    .version('0.0.1', '-v, --version')
    .description("Create and edit .plurid and .pluridoc files.")
    .option('-p, --plurid', 'create and edit a new .plurid file; specify <filename>')
    .option('-d, --pluridoc', 'create and edit a new .pluridoc file; specify <filename>')
    .parse(process.argv);


if (process.argv.length === 2) {
    pluridocServer.start();
}

if (process.argv.length <= 4 && program.plurid) {
    const filename = process.argv[3] || 'newplurid';
    pluridocServer.newPlurid(filename);
}

if (process.argv.length <= 4 && program.pluridoc) {
    const filename = process.argv[3] || 'newpluridoc';
    pluridocServer.newPluridoc(filename);
}
