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
});
