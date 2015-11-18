/**
 * onCollectionAddItems uses getRemovedRecords() to get a reference
 * to the removed array that it needs to modify.
 *
 * Jarvus.hotfixes.ext.data.ProxyStoreRemovedRecordsRef however changes
 * getRemovedRecords() to return a cloned array instead for public use.
 *
 * Use the private array reference directly instead of calling the public
 * getter.
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?301217
 */
Ext.define('Jarvus.hotfixes.ext.data.StoreRemovedRecordsRef', {
    override: 'Ext.data.Store',

    onCollectionAddItems: function(collection, records, info) {
        var me = this,
            len = records.length,
            lastChunk = info ? !info.next : false,
            removed = me.removed,
            ignoreAdd = me.ignoreCollectionAdd,
            session = me.getSession(),
            replaced = info && info.replaced,
            i, sync, record, replacedItems;

        for (i = 0; i < len; ++i) {
            record = records[i];

            if (session) {
                session.adopt(record);
            }

            // If ignoring, we don't want to do anything other than pull
            // the added records into the session
            if (!ignoreAdd) {
                record.join(me);
                if (removed && removed.length) {
                    Ext.Array.remove(removed, record);
                }
                sync = sync || record.phantom || record.dirty;
            }
        }

        if (ignoreAdd) {
            return;
        }

        if (replaced) {
            replacedItems = [];

            do {
                Ext.Array.push(replacedItems, replaced.items);
                replaced = replaced.next;
            } while (replaced);

            me.setMoving(replacedItems, true);
        }

        if (info) {
            me.fireEvent('add', me, records, info.at);
            // If there is a next property, that means there is another range that needs
            // to be removed after this. Wait until everything is gone before firing datachanged
            // since it should be a bulk operation
            if (lastChunk) {
                me.fireEvent('datachanged', me);
            }
        }

        if (replacedItems) {
            me.setMoving(replacedItems, false);
        }

        // Addition means a sync is needed.
        me.needsSync = me.needsSync || sync;
    }
});