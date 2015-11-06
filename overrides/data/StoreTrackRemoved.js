/**
 * Handle getRemovedRecords() returning null when trackRemoved is disabled
 * Discussion: https://www.sencha.com/forum/showthread.php?306558
 */
Ext.define('Jarvus.hotfixes.data.StoreTrackRemoved', {
    override: 'Ext.data.ProxyStore',

    sync: function(options) {
        var me = this,
            operations = {},
            toCreate = me.getNewRecords(),
            toUpdate = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        //<debug>
        if (me.isSyncing) {
            Ext.log.warn('Sync called while a sync operation is in progress. Consider configuring autoSync as false.');
        }
        //</debug>

        me.needsSync = false;

        if (toCreate.length > 0) {
            operations.create = toCreate;
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            operations.update = toUpdate;
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            operations.destroy = toDestroy;
            needsSync = true;
        }

        if (needsSync && me.fireEvent('beforesync', operations) !== false) {
            me.isSyncing = true;

            options = options || {};

            me.proxy.batch(Ext.apply(options, {
                operations: operations,
                listeners: me.getBatchListeners()
            }));
        }

        return me;
    }
});