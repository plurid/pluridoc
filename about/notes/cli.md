# `pluridoc` CLI



> pluridoc start

creates a `newFile.pluridoc` in the current directory and opens it in the browser. the file has injected all the scripts/styles so it can render and write to the file system

> pluridoc start --plurid

creates a `newFile.plurid`


> pluridoc file.plurid --output javascript

reads the existing `file.plurid` from the current directory and creates a folder named `file` with an `index.js` and all the containing planes as files imported into the index
