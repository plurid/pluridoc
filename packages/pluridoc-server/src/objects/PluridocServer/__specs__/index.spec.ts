import PluridocServer from '../';



describe('Pluridoc Server basic', () => {
    it('works', () => {
        const pluridocServer = new PluridocServer();
        pluridocServer.start();
        pluridocServer.stop();
        expect(true).toBe(true);
    });
});
