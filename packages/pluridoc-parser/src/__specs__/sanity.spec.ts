import PluridocParser from '../';



/**
* Pluridoc Parser sanity test
*/
describe('Pluridoc Parser sanity test', () => {
    it('works if true is truthy', () => {
        expect(true).toBeTruthy();
    });

    it('PluridocParser is instantiable', () => {
        const text = `
        <<<
            plane content
        >>>
        `;
        expect(new PluridocParser(text))
            .toBeInstanceOf(PluridocParser);
    });
});
