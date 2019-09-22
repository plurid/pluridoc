import {
    pluridocDataToPluridocString,
} from '../';



describe('pluridocDataToPluridocString', () => {
    it('converts a basic plane content plurid syntax', () => {
        const planesContent = [
            {
                text: [
                    'plane content',
                ],
                metadata: {},
            }
        ];
        const text = `
<<<
plane content
>>>
        `;
        const textPrepared = text.trim() + '\n';
        const result = pluridocDataToPluridocString(planesContent);

        expect(result).toBe(textPrepared);
    });

    it('converts a basic plane content with a single metadata item', () => {
        const planesContent = [
            {
                text: [
                    'plane content',
                ],
                metadata: {
                    id: '1-one',
                },
            }
        ];
        const text = `
<<< id: 1-one
plane content
>>>
        `;
        const textPrepared = text.trim() + '\n';
        const result = pluridocDataToPluridocString(planesContent);

        expect(result).toBe(textPrepared);
    });

    it('converts a basic plane content with a multiple metadata items', () => {
        const planesContent = [
            {
                text: [
                    'plane content',
                ],
                metadata: {
                    id: '1-one',
                    title: 'foo',
                },
            }
        ];
        const text = `
<<< id: 1-one | title: foo
plane content
>>>
        `;
        const textPrepared = text.trim() + '\n';
        const result = pluridocDataToPluridocString(planesContent);

        expect(result).toBe(textPrepared);
    });

    it('converts two plane contents with a multiple metadata items', () => {
        const planesContent = [
            {
                text: [
                    'plane content',
                ],
                metadata: {
                    id: '1-one',
                    title: 'foo',
                },
            },
            {
                text: [
                    'plane content 2a',
                    'plane content 2b',
                ],
                metadata: {
                    id: '2-two',
                    title: 'foo-2',
                },
            },
        ];
        const text = `
<<< id: 1-one | title: foo
plane content
>>>

<<< id: 2-two | title: foo-2
plane content 2a
plane content 2b
>>>
        `;
        const textPrepared = text.trim() + '\n';
        const result = pluridocDataToPluridocString(planesContent);

        expect(result).toBe(textPrepared);
    });
});
