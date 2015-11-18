/**
 * The public method getRemovedRecords returns a reference to the
 * private array removed, enabling a method that manipulates the
 * returned array to accidentally modify the private internal
 * array's state.
 *
 * Return a cloned array instead
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?301217
 */
Ext.define('Jarvus.hotfixes.ext.data.ProxyStoreRemovedRecordsRef', {
    override: 'Ext.data.ProxyStore',

    getRemovedRecords: function() {
        var removed = this.removed;
        return removed ? Ext.Array.clone(removed) : removed;
    }
});