/**
 * Adds a default implementation of store.isLoadBlocked.
 *
 * Several methods that operate on stores assume all stores have .isLoadBlocked, but
 * only the ProxyStore family implement it, leaving stores like ChainedStore to cause
 * JS exceptions when you attempt to group them.
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?297494
 */
Ext.define('Jarvus.hotfixes.StoreLoadBlocked', {
	override: 'Ext.data.AbstractStore',

	isLoadBlocked: Ext.emptyFn
});