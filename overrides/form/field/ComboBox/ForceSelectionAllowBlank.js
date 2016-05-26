/**
 *
 */

Ext.define('Jarvus.hotfixes.ext.form.field.ComboBox.ForceSelectionAllowBlank', {
    override: 'Ext.form.field.ComboBox',

    assertValue: function() {
        var me = this,
            value = me.getRawValue(),
            displayValue = me.getDisplayValue(),
            lastRecords = me.lastSelectedRecords,
            rec;

        if (me.forceSelection) {
            if (me.multiSelect) {
                // For multiselect, check that the current displayed value matches the current
                // selection, if it does not then revert to the most recent selection.
                if (value !== displayValue) {
                    me.setRawValue(displayValue);
                }
            } else {
                // For single-select, match the displayed value to a record and select it,
                // if it does not match a record then revert to the most recent selection.
                rec = me.findRecordByDisplay(value);
                if (rec) {
                    // Prevent an issue where we have duplicate display values with
                    // different underlying values.
                    if (me.getDisplayValue([me.getRecordDisplayData(rec)]) !== displayValue) {
                        me.select(rec, true);
                    }
                } else if (lastRecords) {
                    me.setValue(lastRecords);
                } else {
                    // We need to reset any value that could have been set in the dom before or during a store load
                    // for remote combos.  If we don't reset this, then ComboBox#getValue() will think that the value
                    // has changed and will then set `undefined` as the .value for forceSelection combos.  This then
                    // gets changed AGAIN to `null`, which will get set into the model field for editors. This is BAD.
                    me.setRawValue('');
                }
            }
        }
        me.collapse();
    }
});