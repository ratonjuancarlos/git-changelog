'use strict';

var debug = require('debug')('changelog:printHeader');
var format = require('util').format;

//Templates
var logoTemplate = '<img width="300px" src="%s" />\n\n';
var titleTemplate = '<b>%s</b>\n\n';
var subtitleTemplate = '<i>%s</i>\n\n';
var versionTemplate = '<h1>%s %s (%s)</h1>\n\n';
var styles = '<style type="text/css">a,h1:hover a.anchor,h2:hover a.anchor,h3:hover a.anchor,h4:hover a.anchor,h5:hover a.anchor,h6:hover a.anchor{text-decoration:none}a.anchor,ol,ul{padding-left:30px}body,table tr{background-color:#fff}dl dt,table tr th{font-weight:700}code,table tr:nth-child(2n),tt{background-color:#f8f8f8}body{font-family:Helvetica,arial,sans-serif;font-size:14px;line-height:1.6;padding:30px;color:#333}body>:first-child{margin-top:0!important}body>:last-child{margin-bottom:0!important}blockquote>:last-child,dl dd>:last-child,dl dt>:last-child,ol :last-child,table tr td :last-child,table tr th :last-child,ul :last-child{margin-bottom:0}a{color:#4183C4}a.absent{color:#c00}h1,h2{color:#000}blockquote,h6{color:#777}a.anchor{display:block;margin-left:-30px;cursor:pointer;position:absolute;top:0;left:0;bottom:0}dl,dl dt,dl dt:first-child,hr,table,table tr{padding:0}h1,h2,h3,h4,h5,h6{margin:20px 0 10px;padding:0;font-weight:700;-webkit-font-smoothing:antialiased;cursor:text;position:relative}h1:first-child,h1:first-child+h2,h2:first-child,h3:first-child,h4:first-child,h5:first-child,h6:first-child{margin-top:0;padding-top:0}h1 code,h1 tt,h2 code,h2 tt,h3 code,h3 tt,h4 code,h4 tt,h5 code,h5 tt,h6 code,h6 tt{font-size:inherit}h1{font-size:28px}h2{font-size:24px;border-bottom:1px solid #ccc}h3{font-size:18px}h4{font-size:16px}dl dt,h5,h6{font-size:14px}blockquote,dl,li,ol,p,pre,table,ul{margin:15px 0}hr{background:url(http://tinyurl.com/bq5kskr) repeat-x;border:0;color:#ccc;height:4px}a:first-child h1,a:first-child h2,a:first-child h3,a:first-child h4,a:first-child h5,a:first-child h6,body>h1:first-child,body>h1:first-child+h2,body>h2:first-child,body>h3:first-child,body>h4:first-child,body>h5:first-child,body>h6:first-child{margin-top:0;padding-top:0}table tr td,table tr th{border:1px solid #ccc;text-align:left;margin:0;padding:6px 13px}h1 p,h2 p,h3 p,h4 p,h5 p,h6 p{margin-top:0}li p.first{display:inline-block}ol :first-child,ul :first-child{margin-top:0}dl dt{font-style:italic;margin:15px 0 5px}blockquote>:first-child,dl dd>:first-child,dl dt>:first-child,table tr td :first-child,table tr th :first-child{margin-top:0}dl dd{margin:0 0 15px;padding:0 15px}blockquote{border-left:4px solid #ddd;padding:0 15px}table tr{border-top:1px solid #ccc;margin:0}img{max-width:100%}span.frame{display:block;overflow:hidden}span.frame>span{border:1px solid #ddd;display:block;float:left;overflow:hidden;margin:13px 0 0;padding:7px;width:auto}span.frame span img{display:block;float:left}span.frame span span{clear:both;color:#333;display:block;padding:5px 0 0}span.align-center{display:block;overflow:hidden;clear:both}span.align-center>span{display:block;overflow:hidden;margin:13px auto 0;text-align:center}span.align-center span img{margin:0 auto;text-align:center}span.align-right{display:block;overflow:hidden;clear:both}span.align-right>span{display:block;overflow:hidden;margin:13px 0 0;text-align:right}span.align-right span img{margin:0;text-align:right}span.float-left{display:block;margin-right:13px;overflow:hidden;float:left}span.float-left span{margin:13px 0 0}span.float-right{display:block;margin-left:13px;overflow:hidden;float:right}span.float-right>span{display:block;overflow:hidden;margin:13px auto 0;text-align:right}code,tt{margin:0 2px;padding:0 5px;white-space:nowrap;border:1px solid #eaeaea;border-radius:3px}pre code{margin:0;padding:0;white-space:pre;background:0 0}.highlight pre,pre{background-color:#f8f8f8;border:1px solid #ccc;font-size:13px;line-height:19px;overflow:auto;padding:6px 10px;border-radius:3px}pre code,pre tt{background-color:transparent;border:none}</style><p>&lt;b&gt;Intelligize&lt;/b&gt;</p>';

function printHeader(stream, options, date) {
  
  stream.write('<body>');
  stream.write(styles);
  
  debug('printing header');
  if(options.logo){
    stream.write(format(logoTemplate, options.logo));
  }

  stream.write(format(titleTemplate, options.app_name));

  if(options.intro){
    stream.write(format(subtitleTemplate, options.intro));
  }

  stream.write(format(versionTemplate, options.version || '', options.versionName || '', date));
  stream.write('\n\n---\n');
}

module.exports = printHeader;
