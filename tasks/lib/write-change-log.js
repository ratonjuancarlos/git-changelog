'use strict';

var debug = require('debug')('changelog:writeChangelog');
var format = require('util').format;
var q = require('q');
var fse = require('fs-extra');

function sendToStream(stream, sections, deferred) {

  var module = this;
  var streamHTML;

  this.printHeader(stream, this.options, this.currentDate());

  this.options.sections.forEach(function(section){
    var sectionType = section.grep.replace('^', '');
    if(sectionType !== 'BREAKING'){
      section.remove = section.remove || false;
      module.printSection(stream, section.title, sections[sectionType], section.remove);
    }else if (sections.BREAKING[module.emptyComponent].length > 0 ) {
      module.printSection(stream, 'Breaking Changes', sections.BREAKING, section.remove, false);
    }
  });

  this.printSalute(stream);
  stream.write('</body>');
  stream.end();
  stream.on('finish', deferred.resolve);
}

function writeChangelog(stream, commits) {
  debug('writing change log');
  var deferred = q.defer();
  var sections = {
    BREAKING : {}
  };

  this.options.sections.forEach(function(sectionInfo){
    var sectionType = sectionInfo.grep.replace('^', '');
    sections[sectionType] = {}; 
  });

  sections.BREAKING[this.emptyComponent] = [];
  this.organizeCommits(commits, sections);
  stream.on('open', sendToStream.bind(this, stream, sections, deferred));

  return deferred.promise;
}

module.exports = writeChangelog;
