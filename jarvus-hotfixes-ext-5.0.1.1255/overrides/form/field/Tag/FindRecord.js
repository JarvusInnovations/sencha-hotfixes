/**
 * Fixes return values of Ext.form.field.Tag.findRecord
 * 
 * In 5.0.1 findRecord returns an empty array or an array containing `undefined` when it
 * is expected to return an Ext.data.Model instance or a falsey value.
 * 
 * Discussion: http://www.sencha.com/forum/showthread.php?290400-tagfield-bind-value
 */
Ext.define('Jarvus.hotfixes.ext.form.field.Tag.FindRecord', {
    override: 'Ext.form.field.Tag',
    compatibility: '5.0.1255',

    findRecord: function(field, value) {
        return this.getStore().findRecord(field, value);
    }
});