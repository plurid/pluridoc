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
        expect(pluridoc.getPlanesContent()).toStrictEqual(planesContent);
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
        expect(pluridoc.getPlanesContent()).toStrictEqual(planesContent);
    });

    it('reads basic metadata tags', () => {
        const text = `
<<<
<<< location: root
<<< content: javascript
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
                    content: ['javascript'],
                },
            }
        ];
        expect(pluridoc.getPlanesContent()).toStrictEqual(planesContent);
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
        expect(pluridoc.getPlanesContent()).toStrictEqual(planesContent);
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
        expect(pluridoc.getPlanesContent()).toStrictEqual(planesContent);
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
        expect(pluridoc.getPlanesContent()).toStrictEqual(planesContent);
    });
});
