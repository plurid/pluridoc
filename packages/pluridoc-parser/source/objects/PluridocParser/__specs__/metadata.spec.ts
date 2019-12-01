import PluridocParser from '..';



describe('Pluridoc Parser reads metadata', () => {
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

    it('reads metadata written on the same line', () => {
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

    it('reads metadata id and title', () => {
        const text = `
<<< id: 123 | title: Page One
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
                    id: '123',
                    title: 'Page One',
                },
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });

    it('reads metadata id and title', () => {
        const text = `
<<< id: 123
<<< title: Page One
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
                    id: '123',
                    title: 'Page One',
                },
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });

    it('reads metadata id and title', () => {
        const text = `
<<< title: Page One | id: 123
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
                    id: '123',
                    title: 'Page One',
                },
            },
        ];
        const result = pluridoc.getPlanesContent();
        expect(result).toStrictEqual(planesContent);
    });
});
