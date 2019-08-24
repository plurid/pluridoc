import PluridocParser from './';



describe('Pluridoc Parser basic', () => {
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


    it('reads basic metadata tags', () => {
        const text = `
<<< location: root
plane content
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    'plane content',
                ],
                metadata: {
                    location: 'root',
                },
            }
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });

    it('reads basic metadata tags', () => {
        const text = `
<<<
<<< location: root
<<< processor: javascript
plane content
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    'plane content',
                ],
                metadata: {
                    location: 'root',
                    processor: ['javascript'],
                },
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

    it('reads plurid-plane content with metadata', () => {
        const text = `
<<<
<<< location: root
plane 1a

plane 1b
>>>

<<< location: left
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
                metadata: {
                    location: 'root',
                },
            },
            {
                text: [
                    'plane 2',
                ],
                metadata: {
                    location: 'left',
                },
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });

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

    it.only('reads metadata written on the same line', () => {
        const text = `
<<< location: root | processor: javascript, math
plane content
>>>
        `;
        const pluridoc = new PluridocParser(text);
        const planesContent = [
            {
                text: [
                    'plane content',
                ],
                metadata: {
                    location: 'root',
                    processor: ['javascript', 'math'],
                },
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });
});
