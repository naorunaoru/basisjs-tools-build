var html_at = require('basisjs-tools-ast').html;

(module.exports = function(flow){
  var fconsole = flow.console;
  var queue = flow.files.queue;

  for (var i = 0, file; file = queue[i]; i++)
    if (file.type == 'script' && file.htmlNode)
    {
      fconsole.log(file.relpath);
      if (file.outputFilename)
      {
        html_at.replaceToken(file.htmlNode, {
          type: 'script',
          name: 'script',
          attribs: {
            src: file.htmlRef || file.outputFilename
          },
          children: []
        });
      }
      else
      {
        if (!file.outputContent)
        {
          file.htmlFile.unlink(file, file.htmlNode);
          html_at.removeToken(file.htmlNode, true);
        }
        else
          html_at.replaceToken(file.htmlNode, {
            type: 'script',
            name: 'script',
            attribs: {},
            children: [
              {
                type: 'text',
                data: file.outputContent
              }
            ]
          });
      }
    }
}).handlerName = '[js] Modify <script> entry in html file';
