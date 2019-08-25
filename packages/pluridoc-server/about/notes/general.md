starting the server reads the files from the current directory
and checks if there are any .plurid or .pluridoc files

if there are .plurid or .pluridoc files, it parses them using the PluridocParser
renders them using the plurid framework
and listens for changes in the browser
saving the changes back to the files


localhost:33500/<filename>.plurid
localhost:33500/<filename>.pluridoc
