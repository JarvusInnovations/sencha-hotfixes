/**
 * Ext.field.Field's SASS styles are improperly placed in Ext.form.Panel's SASS,
 * so we must ensure that Ext.form.Panel is required if Ext.field.Field is used.
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?303365
 */
Ext.define('Jarvus.hotfixes.field.FieldStyles', {
    override: 'Ext.field.Field',
    requires: [
        'Ext.form.Panel'
    ]
});