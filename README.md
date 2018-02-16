readability-scrape
==================

readability-scrape is a command line tool to download simplified versions of
webpages. Unlike similar tools, it imports
[Readability.js](https://github.com/mozilla/readability), the library used in
Firefox's reader view, directly from Mozilla's repository so that it will be
more up-to-date.

Installation
------------

readability-scrape is available via npm:

    npm install -g readability-scrape

Usage
-----

Pass in the URL of a webpage to retrieve it as plain text:

    readability-scrape https://example.com/path

Use the `--html` option to get simplified HTML output:

    readability-scrape --html https://example.com/path

Use `--json` to get Readability's full output as JSON:

    readability-scrape --json https://example.com/path

The JSON output will contain at least these properties:

* `uri`: original `uri` object that was passed to constructor
* `title`: article title
* `content`: HTML string of processed article content
* `textContent`: Processed article content as plain text
* `length`: length of article, in characters
* `excerpt`: article description, or short excerpt from content
* `byline`: author metadata
* `dir`: content direction
