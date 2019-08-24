the plane_id must be unique across the file

the plane_title is not required to be unique

the metadata consists of a stringifyied JSON object


    // <<< plane_id <<< plane_title <<<
    // <<< metadata ::: {"lastEdited":12313124,"editedBy":"JanC"}

        // write code here
        import functionFromOtherPlane from link#plane_id

    // >>> plane_id >>> plane_title >>>



    // <<< plane_id <<< plane_title <<<
    // <<< metadata ::: {"lastEdited":12313124,"editedBy":"JanC"}

        // write code here
        function functionFromOtherPlane() {}

    // >>> plane_id >>> plane_title >>>


to have `pluridoc` as a CLI

    > pluridoc start
    // creates a newFile.pluridoc in the current directory
    // and opens it in the browser
    // the file has injected all the scripts/styles
    // so it can render and write to the file




a .pluridoc is a collection of .plurid files (spaces), containing text,
images, videos, sound, 3D objects, whole web-page frozen at a point in time,
and more

a .plurid is a simple text file with multiple planes of text

to obtain a plurid plane, in an arbitrary .plurid file is enough to do:

<<<

enter text here for the first plane

>>>

<<<

enter text here for the second plane

>>>


this will create two planes, one near each other

location could be specified thus:

<<< location: root

enter text here for the first plane

>>>

<<< location: left

enter text here for the second plane

>>>

this will make the first plane a root, and put the second plane to it's left


a system of processors can be conceived in order to be able to write in the plane
math, code, or other

<<< content: math, javascript    --- signifying to use the math and javascript processors


<<<
<<< location: root
<<< content: math

when $x < y$ we have

>>>

to put multiple metadata information on the same line use |

<<< location: root | content: math

when $x < y$ we have

>>>


in order to use a plurid plane divider (<<< or >>>) inside the plane's content,
it must be first escaped

<<<

this plane contains a plurid divider \<<<

>>>





---

for the CLI

to be able to do:

> pluridoc file.plurid --output javascript

and to get a folder name 'file' with index.js and all the containing planes as files

