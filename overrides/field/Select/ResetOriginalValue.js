Ext.define('Jarvus.hotfixes.touch.field.Select.ResetOriginalValue', {
	override: 'Ext.field.Select',

    resetOriginalValue: function() {
        var me = this,
        	record = me.record,
            component = me.getComponent(),
            store;

        if (!record) {
        	store = me.getStore();

        	if (me.getAutoSelect() && store.getCount()) {
        		record = store.getAt(0);
        	}  else {
        		recurd = null;
        	}
        }

        me.originalValue = record;

        if(component && component.hasOwnProperty('originalValue')) {
            component.originalValue = record ? record.get(me.getDisplayField()) : '';
        }

        me.reset();
    },

    reset: function() {
        var me = this;

        me.getComponent().reset();

        me.setValue(me.getValue());

        me[me.isDirty() ? 'showClearIcon' : 'hideClearIcon']();
    },
});