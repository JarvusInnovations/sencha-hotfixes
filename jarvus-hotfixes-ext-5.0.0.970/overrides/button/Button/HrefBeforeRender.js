/**
 * Fixes issue where JS error is generated if setHref/setParams is called before button is rendered
 *
 * Discussion: http://www.sencha.com/forum/showthread.php?288306-button-setHref-setParams-doesn-t-check-if-rendered-before-touching-DOM&p=1053557
 */
Ext.define('Jarvus.hotfixes.ext.button.button.HrefBeforeRender', {
    override: 'Ext.button.Button',
//    compatibility: '5.0.0',

    setHref: function(href) {
        var me = this;

        me.href = href;

        if (me.rendered) {
            // https://sencha.jira.com/browse/EXTJS-11964
            // Disabled links are clickable on iPad, and right clickable on desktop browsers.
            // The only way to completely disable navigation is clearing the href
            me.el.dom.href = me.disabled ? null : me.getHref();
        }
    },

    setParams: function(params) {
        var me = this;

        me.params = params;

        if (me.rendered) {
            // https://sencha.jira.com/browse/EXTJS-11964
            // Disabled links are clickable on iPad, and right clickable on desktop browsers.
            // The only way to completely disable navigation is clearing the href
            me.el.dom.href = me.disabled ? null : me.getHref();
        }
    }
}, function() {
    //<debug>
    if (!Ext.getVersion().match('5')) {
        console.warn('This patch has not been tested with this version of ExtJS');
    }
    //</debug>
});