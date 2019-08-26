# `pluridoc` metadata


the default metadata attributes are


+ id - plane id, must be unique, if not specified a random one will be generated

+ title - plane title, not required to be unique

+ location - specifies how to handle the positioning of the plurid planes. it is not required and the planes will be placed one near another, but if specified there must a plane with the value 'root' and the others will be defined according to it. if more roots are required than a number can be attached, e.g. 'location: root-2', and then the further plurid planes will need to have the location described based on their root, e.g. 'location: root-2 left'
    the possible location values are: left, right, above, below, adjacent-left, adjacent-right
    adjacent specifies that the plane will be rotated with 90 degrees and placed on the left/right of the root

+ processor - a series of comma-separated strings describing how to convert/compute/transpile the written content of the plane, default is text. some processors can be grouped, for example 'math, javascript' allowing to write valid JavaScript syntax and math (LaTeX) equations in the JavaScript comments (or outside them, but then the JavaScript won't be valid)
    processors: javascript, python, math, markdown, yaml, etc.

+ extradata - a stringified JSON object containing arbitrary data



---



the plane_id must be unique across the file

the plane_title is not required to be unique

the extradata metadata attribute may consist of a stringified JSON object


    <<< id: plane_id | title: plane_title | processor: javascript
    <<< extradata: {"lastEdited":12313124,"editedBy":"JanC"}
        // write code here
        import functionFromOtherPlane from '(plane_id)
    >>>

    <<< id: plane_id | title: plane_title
    <<< extradata: {"lastEdited":12313124,"editedBy":"JanC"}
        // write code here
        function functionFromOtherPlane() {}
    >>>
