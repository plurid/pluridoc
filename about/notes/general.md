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
