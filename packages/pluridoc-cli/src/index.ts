import program from 'commander';

import PluridocServer from '@plurid/pluridoc-server';



const serverOptions = {
    verbose: true,
}
const pluridocServer = new PluridocServer(serverOptions);


program
    .version('0.0.1', '-v, --version')
    .description("Create and edit .plurid and .pluridoc files.")
    .option('-p, --plurid', 'create and edit a new .plurid file')
    .option('-d, --pluridoc', 'create and edit a new .pluridoc file')
    .parse(process.argv);


if (process.argv.length === 2) {
    pluridocServer.start();
}

if (program.plurid) {
    pluridocServer.newPlurid();
}

if (program.pluridoc) {
    pluridocServer.newPluridoc();
}
