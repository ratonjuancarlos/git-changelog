'use strict';

var debug = require('debug')('changelog:linkToIssue');
var format = require('util').format;

function linkToIssue(issue) {
  	debug('generating link to issue');
	return ((issue === null || issue === undefined) ? 'No issue number'  : format(this.links.issue_tracker, issue, issue))
}

module.exports = linkToIssue;
