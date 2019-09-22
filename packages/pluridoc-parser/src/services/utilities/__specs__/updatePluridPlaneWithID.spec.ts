import {
    updatePluridPlaneWithID,
} from '../';



describe.only('updatePluridPlaneWithID', () => {
    it('updated a document with a single plane', () => {
        const text = `
<<< id: foo
text
>>>
`;
        const updatedPluridPlaneText = `text\ntext2`;
        const pluridPlaneID = 'foo';
        const updatedText = `
<<< id: foo
text
text2
>>>
`;
        const result = updatePluridPlaneWithID(text, pluridPlaneID, updatedPluridPlaneText);

        expect(result).toBe(updatedText);
    });

    it('updated a document with two planes', () => {
        const text = `
<<< id: foo
text
>>>

<<< id: boo
text
text2
>>>
`;
        const updatedPluridPlaneText = `text\ntext2\ntext3`;
        const pluridPlaneID = 'boo';
        const updatedText = `
<<< id: foo
text
>>>

<<< id: boo
text
text2
text3
>>>
`;
        const result = updatePluridPlaneWithID(text, pluridPlaneID, updatedPluridPlaneText);

        expect(result).toBe(updatedText);
    });
});
