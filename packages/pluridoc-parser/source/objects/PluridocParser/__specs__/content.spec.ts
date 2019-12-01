import PluridocParser from '..';



describe('Pluridoc Parser reads content', () => {
    it('reads a basic plane content plurid syntax', () => {
        const text = `
<<<
plane content
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    'plane content',
                ],
                metadata: {},
            }
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });

    it('reads multiline content', () => {
        const text = `
<<<
plane content line one
plane content line two
    plane content indented
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    'plane content line one',
                    'plane content line two',
                    '    plane content indented',
                ],
                metadata: {},
            }
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });

    it('reads plurid-plane content', () => {
        const text = `
<<<
plane 1
>>>

<<<
plane 2
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    'plane 1',
                ],
                metadata: {},
            },
            {
                text: [
                    'plane 2',
                ],
                metadata: {},
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });

    it('reads plurid-plane content', () => {
        const text = `
<<<
plane 1a

plane 1b
>>>

<<<
plane 2
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    'plane 1a',
                    '',
                    'plane 1b',
                ],
                metadata: {},
            },
            {
                text: [
                    'plane 2',
                ],
                metadata: {},
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });

    it.only('reads plurid-plane content with metadata', () => {
        const text = `
<<< id: one
plane 1
>>>

<<< id: two
plane 2
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    'plane 1',
                ],
                metadata: {
                    id: 'one',
                },
            },
            {
                text: [
                    'plane 2',
                ],
                metadata: {
                    id: 'two',
                },
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });
});
