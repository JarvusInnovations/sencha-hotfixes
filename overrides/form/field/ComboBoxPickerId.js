/**
 * Ext.form.field.ComboBox crashes unexpectedly when more than one combo with paging presented on the
 * same physical page in the browser:
 * Ext.ComponentManager.register(): Registering duplicate component id "undefined-paging-toolbar"
 *
 * Solution: just comment nonexistent pickerId when component boundlist creates. Since this pickerId is
 * nowhere used this should be okay and Ext.Component will make sure about unique identifier by itself.
 *
 * Fiddle shows this issue persists in ext-6.0.1.250 but is fixed in ext-6.0.2.437
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?303101
 * Fiddle: https://fiddle.sencha.com/#fiddle/q9p
 */
Ext.define('Jarvus.hotfixes.form.field.ComboBoxPickerId', {
    override: 'Ext.form.field.ComboBox',

    createPicker: function() {
        var me = this,
            picker,
            pickerCfg = Ext.apply({
                xtype: 'boundlist',
                pickerField: me,
                selectionModel: me.pickerSelectionModel,
                floating: true,
                hidden: true,
                store: me.getPickerStore(),
                displayField: me.displayField,
                preserveScrollOnRefresh: true,
                pageSize: me.pageSize,
                tpl: me.tpl
            }, me.listConfig, me.defaultListConfig);

        picker = me.picker = Ext.widget(pickerCfg);
        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        // We limit the height of the picker to fit in the space above
        // or below this field unless the picker has its own ideas about that.
        if (!picker.initialConfig.maxHeight) {
            picker.on({
                beforeshow: me.onBeforePickerShow,
                scope: me
            });
        }
        picker.getSelectionModel().on({
            beforeselect: me.onBeforeSelect,
            beforedeselect: me.onBeforeDeselect,
            focuschange: me.onFocusChange,
            scope: me
        });

        picker.getNavigationModel().navigateOnSpace = false;

        return picker;
    }
});