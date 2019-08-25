const PluridocServer = require('@plurid/pluridoc-server');

const options = {
    verbose: true,
}

const pluridocServer = new PluridocServer(options);

pluridocServer.start();
