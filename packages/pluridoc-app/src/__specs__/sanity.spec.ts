import PluridocApp from '../';



/**
* Pluridoc Server sanity test
*/
describe('Pluridoc App sanity test', () => {
    it('works if true is truthy', () => {
        expect(true).toBeTruthy();
    });

    it('PluridocApp is instantiable', () => {
        expect(new PluridocApp({}))
            .toBeInstanceOf(PluridocApp);
    });
});
