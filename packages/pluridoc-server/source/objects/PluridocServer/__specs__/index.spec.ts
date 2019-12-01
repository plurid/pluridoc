import PluridocServer from '../';



describe('Pluridoc Server basic', () => {
    it('works', () => {
        const options = {
            port: 3333,
            verbose: true,
        }
        const pluridocServer = new PluridocServer(options);
        pluridocServer.start();
        pluridocServer.stop();
        expect(true).toBe(true);
    });
});
