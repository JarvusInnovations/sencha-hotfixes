/* jshint undef: true, unused: true, browser: true, quotmark: single, curly: true */
/* global Ext */

/**
 * This override enables the `url` config option to be set to an array of objects in addition
 * to an array of strings, enabling arbitrary attributes for the <source> tags like `type` to
 * be provided.
 */
Ext.define('Jarvus.hotfixes.touch.Video.SourceAttributes', {
	override: 'Ext.Video',

    updateUrl: function(newUrl) {
        var me = this,
            media = me.media,
            newLn = newUrl.length,
            existingSources = media.query('source'),
            oldLn = existingSources.length,
            i, sourceConfig;


        for (i = 0; i < oldLn; i++) {
            Ext.fly(existingSources[i]).destroy();
        }

        for (i = 0; i < newLn; i++) {
        	sourceConfig = newUrl[i];

        	if (typeof sourceConfig == 'string') {
        		sourceConfig = {
        			src: sourceConfig
        		};
        	}

            media.appendChild(Ext.Element.create(Ext.applyIf({
                tag: 'source'
            }, sourceConfig)));
        }

        if (me.isPlaying()) {
            me.play();
        }
    }
});