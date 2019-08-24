import PluridocParser from '../src';



/**
* Pluridoc Parser sanity test
*/
xdescribe('Pluridoc Parser sanity test', () => {
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
