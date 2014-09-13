/**
 * Supresses JS exception thrown from Ext.form.field.Tag
 * 
 * The setLastFocused method was removed in 5.0.1 but tagfield still makes
 * lots of calls to it. It is safe to replace it with an empty function since
 * it doesn't really need to be called anymore.
 * 
 * Discussion: http://www.sencha.com/forum/showthread.php?290400-tagfield-bind-value
 */
Ext.define('Jarvus.hotfixes.ext.selection.Model.DeprecateSetLastFocused', {
    override: 'Ext.selection.Model',
    compatibility: '5.0.1255',

    setLastFocused: Ext.emptyFn
});