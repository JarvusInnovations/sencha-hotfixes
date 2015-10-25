/**
 * Headers not returned for ajax responses
 * Discussion: https://www.sencha.com/forum/showthread.php?304257
 */
Ext.define('Jarvus.hotfixes.ext.data.request.AjaxHeaders', {
    override: 'Ext.data.request.Ajax',

    createResponse: function(xhr) {
        var me = this,
            isXdr = me.isXdr,
            headers = {},
            lines = isXdr ? [] : xhr.getAllResponseHeaders().replace(/\r\n/g, '\n').split('\n'),
            count = lines.length,
            line, index, key, response, byteArray;

        while (count--) {
            line = lines[count];
            index = line.indexOf(':');

            if (index >= 0) {
                key = line.substr(0, index).toLowerCase();

                if (line.charAt(index + 1) == ' ') {
                    ++index;
                }

                headers[key] = line.substr(index + 1);
            }
        }

        response = {
            request: me,
            requestId: me.id,
            status: xhr.status,
            statusText: xhr.statusText,
            getResponseHeader: me._getHeader,
            getAllResponseHeaders: me._getHeaders
        };

        if (isXdr) {
            me.processXdrResponse(response, xhr);
        }

        if (me.binary) {
            response.responseBytes = me.getByteArray(xhr);
        }
        else {
            // an error is thrown when trying to access responseText or responseXML
            // on an xhr object with responseType of 'arraybuffer', so only attempt
            // to set these properties in the response if we're not dealing with
            // binary data
            response.responseText = xhr.responseText;
            response.responseXML = xhr.responseXML;
        }

        return response;
    }
});