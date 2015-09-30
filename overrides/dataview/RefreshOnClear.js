/**
 * In ExtJS 6.0.0 modern, DataView's onStoreClear method isn't connected
 * to the backing store's clear event.
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?305561
 */
Ext.define('Jarvus.hotfixes.dataview.RefreshOnClear', {
    override: 'Ext.dataview.DataView',

    storeEventHooks: {
        beforeload: 'onBeforeLoad',
        groupchange: 'onStoreGroupChange',
        load: 'onLoad',
        refresh: 'refresh',
        add: 'onStoreAdd',
        remove: 'onStoreRemove',
        clear: 'onStoreClear',
        update: 'onStoreUpdate'
    }
});