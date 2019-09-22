import 'jsdom-global/register';
import program, { CommanderStatic } from 'commander';

import PluridocServer from '@plurid/pluridoc-server';



const serverOptions = {
    verbose: true,
}
const pluridocServer = new PluridocServer(serverOptions);


async function main(program: CommanderStatic) {
    if (process.argv.length === 2) {
        await pluridocServer.start();
    }

    if (process.argv.length <= 4 && program.plurid) {
        const filename = process.argv[3] || 'newplurid';
        await pluridocServer.newPlurid(filename);
    }

    if (process.argv.length <= 4 && program.pluridoc) {
        const filename = process.argv[3] || 'newpluridoc';
        await pluridocServer.newPluridoc(filename);
    }
}


program
    .version('0.0.1', '-v, --version')
    .description("Create and edit .plurid and .pluridoc files.")
    .option('-p, --plurid', 'create and edit a new .plurid file; specify <filename>')
    .option('-d, --pluridoc', 'create and edit a new .pluridoc file; specify <filename>')
    .parse(process.argv);


main(program);
