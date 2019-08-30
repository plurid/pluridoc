<p align="center">
    <a target="_blank" href="https://pluridoc.plurid.com">
        <img src="https://raw.githubusercontent.com/plurid/pluridoc/master/about/identity/pluridoc-logo.png" height="250px">
    </a>
    <br />
    <a target="_blank" href="https://github.com/plurid/pluridoc/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>


<h1 align="center">
    pluridoc
</h1>

+ [General](#general)
+ [Usage](#usage)
+ [Packages](#packages)



## General

a `.plurid` file is a simple text file with separated sectors in the document marked with the `<<<` and `>>>` plurid plane dividers which when rendered by the application will result in multiple planes of text

a `.pluridoc` is a collection of `.plurid` files (spaces), containing text,
images, videos, audio, 3D objects/experiences, whole web pages frozen at a point in time,
and more


to obtain plurid planes in an arbitrary `.plurid` file it is enough to do:

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



## Usage

Install the [pluridoc command line tool][pluridoc-cli]

    npm install -g @plurid/pluridoc-cli

and run

    pluridoc



## Packages


<a target="_blank" href="https://www.npmjs.com/package/@plurid/pluridoc-app">
    <img src="https://img.shields.io/npm/v/@plurid/pluridoc-app.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/pluridoc-app][pluridoc-app] • the pluridoc application

[pluridoc-app]: https://github.com/plurid/pluridoc/tree/master/packages/pluridoc-app



<a target="_blank" href="https://www.npmjs.com/package/@plurid/pluridoc-cli">
    <img src="https://img.shields.io/npm/v/@plurid/pluridoc-cli.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/pluridoc-cli][pluridoc-cli] • the pluridoc command line interface

[pluridoc-cli]: https://github.com/plurid/pluridoc/tree/master/packages/pluridoc-cli



<a target="_blank" href="https://www.npmjs.com/package/@plurid/pluridoc-parser">
    <img src="https://img.shields.io/npm/v/@plurid/pluridoc-parser.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/pluridoc-parser][pluridoc-parser] • the pluridoc parser

[pluridoc-parser]: https://github.com/plurid/pluridoc/tree/master/packages/pluridoc-parser



<a target="_blank" href="https://www.npmjs.com/package/@plurid/pluridoc-server">
    <img src="https://img.shields.io/npm/v/@plurid/pluridoc-server.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/pluridoc-server][pluridoc-server] • the pluridoc server

[pluridoc-server]: https://github.com/plurid/pluridoc/tree/master/packages/pluridoc-server


[@plurid/pluridoc-grammar][pluridoc-grammar] • text editor syntax highlighting

[pluridoc-grammar]: https://github.com/plurid/pluridoc/tree/master/packages/pluridoc-grammar
