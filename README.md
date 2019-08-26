# pluridoc



a `.plurid` file is a simple text file with separated sectors in the document marked with the `<<<` and `>>>` plurid plane dividers which when rendered by the application will result in multiple planes of text

a `.pluridoc` is a collection of `.plurid` files (spaces), containing text,
images, videos, audio, 3D objects/experiences, whole web-page frozen at a point in time,
and more


to obtain a plurid plane in an arbitrary `.plurid` file it is enough to do:

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

this will make the first plane a root, and place the second plane to it's left


a system of processors can be used in order to be able to write in the plane
math, code, or other, by default it is `text`, serving the content as-written, with the basic plurid syntax for linking

    <<< content: math, javascript --- signifying to use the math and javascript processors

    <<<
    <<< location: root
    <<< content: math
    when $x < y$ we have
    >>>


to make a comment in the metadata part of the plurid plane definition use `---`

    <<< --- this line is a comment


to have multiple metadata information on the same line use `|` for separation

    <<< location: root | content: math
    when $x < y$ we have
    >>>


in order to use a plurid plane divider (`<<<` or `>>>`) inside the plane's content
it must be escaped

    <<<
    this plane contains a plurid divider \<<<
    >>>


for more information see [about/notes](https://github.com/plurid/pluridoc/tree/master/about/notes)
