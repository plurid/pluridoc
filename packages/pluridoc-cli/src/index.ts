import program from 'commander';

// import PluridocCLI from './objects/PluridocCLI';
import PluridocServer from '@plurid/pluridoc-server';



const pluridocServer = new PluridocServer();


program
    .version('0.0.1', '-v, --version')
    .description("Create and edit .plurid and .pluridoc files.")
    .option('-p, --plurid', 'create and edit a new .plurid file')
    .option('-d, --pluridoc', 'create and edit a new .pluridoc file')
    .parse(process.argv);


if (process.argv.length === 2) {
    console.log('start server');
    pluridocServer.start();
}

if (program.plurid) {
    console.log('start server - create new .plurid');
}

if (program.pluridoc) {
    console.log('start server - create new .pluridoc');
}
