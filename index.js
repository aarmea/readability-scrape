#!/usr/bin/env node

"use strict";

const Commander = require("commander");
const { JSDOM } = require("jsdom");
const Readability = require("readability");

const JSDOM_OPTIONS = {
  features: {
    FetchExternalResources: false,
    ProcessExternalResources: false
  }
};

var url;
var options;

Commander
  .arguments("<url>")
  .option("--html", "Print the stripped HTML content")
  .option("--json", "Print the full Readability output as JSON")
  .description("Retrieve and print the primary article text from the URL")
  .action(function(cmdUrl, cmdOptions) {
    url = cmdUrl;
    options = cmdOptions;
  })
  .parse(process.argv);

if (typeof url === "undefined") {
  Commander.outputHelp()
  process.exit(1);
}

JSDOM.fromURL(url, JSDOM_OPTIONS)
  .then(dom => {
    // Readability relies on a global Node object to work properly
    // https://github.com/mozilla/readability/issues/346
    global.Node = dom.window.Node;

    // TODO: Extract all of the links before calling Readability

    var document = dom.window.document;
    var article =
      new Readability(document.documentURI, dom.window.document).parse();
    if (options.json) {
      console.log(JSON.stringify(article));
    } else if (options.html) {
      console.log(article.content);
    } else {
      console.log(article.textContent);
    }
  }).catch(error => {
    console.log(JSON.stringify(error));
    process.exit(1);
  });
