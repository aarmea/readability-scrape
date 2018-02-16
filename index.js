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

Commander
  .arguments("<url>")
  .description("Retrieves and extracts the main, stripped content from the URL")
  .action(function(urlArg) {
    url = urlArg;
  })
  .parse(process.argv);

if (typeof url === "undefined") {
  Commander.outputHelp()
  process.exit(1);
}

JSDOM.fromURL(url, JSDOM_OPTIONS).then(dom => {
  // Readability relies on a global Node object to work properly
  // https://github.com/mozilla/readability/issues/346
  global.Node = dom.window.Node;

  // TODO: Extract all of the links from the DOM before calling Readability

  var document = dom.window.document;
  var article =
    new Readability(document.documentURI, dom.window.document).parse();
  console.log(article);
});
