import PluridocParser from '..';



describe('Pluridoc Parser escapes the plane dividers', () => {
    it('escapes the plurid plane dividers when they are in the content', () => {
        const text = `
<<<
\\<<<
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    '<<<'
                ],
                metadata: {},
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });

    it('escapes the plurid plane dividers when they are in the content', () => {
        const text = `
<<<
\\<<<
\\>>>
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    '<<<',
                    '>>>'
                ],
                metadata: {},
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });
});
