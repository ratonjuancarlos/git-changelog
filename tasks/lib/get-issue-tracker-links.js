'use strict';

var debug = require('debug')('changelog:getIssueTrackerLinks');

function getIssueTrackerLinks() {
  debug('getting issue tracker links');
  // This is just in case they differ their urls at some point in the future.
  // Also brings the posibility of adding more providers

  var issueTrackerLinks = {
    jira: {
      issue_tracker: '[#%s](' + this.options.issue_tracker_url + '/browse/%s)',
    }
  };
  this.links.issue_tracker = issueTrackerLinks.jira.issue_tracker;
}

module.exports = getIssueTrackerLinks;
