import PluridocServer from '../';



/**
* Pluridoc Server sanity test
*/
describe('Pluridoc Server sanity test', () => {
    it('works if true is truthy', () => {
        expect(true).toBeTruthy();
    });

    it('PluridocServer is instantiable', () => {
        const text = `
        <<<
            plane content
        >>>
        `;
        expect(new PluridocServer())
            .toBeInstanceOf(PluridocServer);
    });
});
