/**
 * Fixes issue where tagfield fails to refilter store when value changes for filterPickList==true
 *
 * Discussion: http://www.sencha.com/forum/showthread.php?288294-tagfield-config-filterPickList-implementation-partly-broken&p=1053510
 * Test case: https://fiddle.sencha.com/#fiddle/7ga
 */
Ext.define('Jarvus.hotfixes.ext.form.field.Tag.FilterPickList', {
    override: 'Ext.form.field.Tag',
//    compatibility: '5.0.0',

    // do nothing, onValueStoreChange will handle it...
    onValueStoreRemove: Ext.emptyFn,

    onValueStoreChange: function() {
        var me = this;

        if (me.filterPickList) {
            me.store.filter(me.selectedFilter);
        }

        me.applyMultiselectItemMarkup();
    }
});