'use strict';

var debug = require('debug')('changelog:linkToCommit');
var format = require('util').format;

function linkToCommit(hash) {
  debug('generating link to commit');
  return ((hash === null || hash === undefined )? 'No hash' : format(this.links.commit, hash.substr(0, 8), hash))
}

module.exports = linkToCommit;
