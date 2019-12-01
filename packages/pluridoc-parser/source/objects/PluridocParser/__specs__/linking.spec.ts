import PluridocParser from '..';



describe('Pluridoc Parser reads content', () => {
    it.only('reads a basic link', () => {
        const text = `
<<<
plane content '[linkName](linkTo)
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    "plane content '[linkName](linkTo)",
                ],
                metadata: {},
            }
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });
});
