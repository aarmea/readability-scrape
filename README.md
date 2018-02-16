readability-cli
===============

readability-cli is a command line tool to download simplified versions of
webpages. It uses [Readability.js](https://github.com/mozilla/readability), the
library used in Firefox's reader view, to do this.

Installation
------------

readability-cli is available via npm:

    npm install -g readability-cli

Usage
-----

Pass in the URL of a webpage to retrieve it as plain text:

    readability-cli https://example.com/path

Use the `--html` option to get simplified HTML output:

    readability-cli --html https://example.com/path

Use `--json` to get Readability's full output as JSON:

    readability-cli --json https://example.com/path

The JSON output will contain at least these properties:

* `uri`: original `uri` object that was passed to constructor
* `title`: article title
* `content`: HTML string of processed article content
* `textContent`: Processed article content as plain text
* `length`: length of article, in characters
* `excerpt`: article description, or short excerpt from content
* `byline`: author metadata
* `dir`: content direction
