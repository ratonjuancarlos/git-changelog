'use strict';

var debug = require('debug')('changelog:printSection');
var format = require('util').format;
var changeCase = require('change-case')

function printCommit(stream, toRemove, printCommitLinks, prefix, commit) {
  if (toRemove) {
    toRemove.removeFromCommit.forEach(function(remove){
      commit.subject = commit.subject.replace(remove, "");
    })
    commit.subject = commit.subject.replace(toRemove.prefixBranch, "");
  }


  var re = /^PA-\d+/g;
  var issue = commit.subject.match(re);
  commit.subject = commit.subject.replace(issue + '-', "");
  commit.subject = changeCase.sentenceCase(commit.subject);

  if (printCommitLinks) {

    stream.write(format('%s %s\n  %s\n',  prefix, commit.subject, this.linkToIssue(issue)));

    if (commit.closes.length) {
      stream.write(',\n   ' + commit.closes.map(this.linkToIssue, this).join(', '));
    }
    stream.write(')\n');
  } else {
    stream.write(format('%s %s\n', prefix, commit.subject));
  }
}

function printComponent(stream, section, toRemove, printCommitLinks, name) {
  var prefix = '-';
  var nested = section[name].length > 1;
  if (name !== this.emptyComponent) {
    if (nested) {
      stream.write(format('- **%s:**\n', name));
      prefix = '  -';
    } else {
      prefix = format('- **%s:**', name);
    }
  }

  section[name].forEach(printCommit.bind(this, stream, toRemove, printCommitLinks, prefix), this);
}

function printSection(stream, title, section, toRemove, printCommitLinks) {
  debug('printing section ...');
  printCommitLinks = printCommitLinks === undefined ? true : printCommitLinks;
  var components = Object.keys(section).sort();

  if (!components.length) {
    return;
  }

  stream.write(format('\n## %s\n\n', title));

  components.forEach(printComponent.bind(this, stream, section, toRemove, printCommitLinks), this);

  stream.write('\n');
}

module.exports = printSection;
