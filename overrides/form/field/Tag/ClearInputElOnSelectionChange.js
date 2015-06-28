/**
 * Fixes issue where typed text is retained in input after an autocomplete suggestion is selected
 * 
 * Solution is to clear input el when value changes.
 *
 */

Ext.define('Jarvus.hotfixes.ext.form.field.Tag.ClearInputElOnSelectionChange', {
    override: 'Ext.form.field.Tag',

    //    compatibility: '5.1.1.451',

    updateValue: function() {
        var me = this,
            valueArray = me.valueCollection.getRange(),
            len = valueArray.length,
            i;

        for (i = 0; i < len; i++) {
            valueArray[i] = valueArray[i].get(me.valueField);
        }

        // Set the value of this field. If we are multi-selecting, then that is an array.
        me.setHiddenValue(valueArray);
        me.value = me.multiSelect ? valueArray : valueArray[0];
        if (!Ext.isDefined(me.value)) {
            me.value = undefined;
        }

        me.applyMultiselectItemMarkup();
        me.checkChange();
    },
});