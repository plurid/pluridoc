// #!/usr/bin/env node

import program from 'commander';

import PluridocCLI from './objects/PluridocCLI';

export default PluridocCLI;


program
    .version('0.0.1')
    .description("Create and edit .plurid and .pluridoc files.")
    .option('-p, --plurid', 'create and edit a new .plurid file')
    .parse(process.argv);
