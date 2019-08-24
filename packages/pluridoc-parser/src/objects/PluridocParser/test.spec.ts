import PluridocParser from './';



describe('Pluridoc Parser basic', () => {
    it('works', () => {
        const data = 'text';
        const pluridoc = new PluridocParser(data);
        expect(true).toBe(true);
    });
});
