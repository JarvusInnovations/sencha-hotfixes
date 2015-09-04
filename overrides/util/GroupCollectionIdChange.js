/**
 * Fixes issue where GroupCollection fails to handle idchanged correctly, leaving record
 * permenantly stuck in its group.
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?304879
 */
Ext.define('Jarvus.hotfixes.util.GroupCollectionIdChange', {
    override: 'Ext.util.GroupCollection',

    syncItemGrouping: function (source, item, itemKey, oldKey) {
        var me = this,
            itemGroupKeys = me.itemGroupKeys || (me.itemGroupKeys = {}),
            grouper = source.getGrouper(),
            groupKey = grouper.getGroupString(item),
            removeGroups = 0,
            addGroups, group, oldGroup, oldGroupKey;

        if (oldKey) {
            oldGroupKey = itemGroupKeys[oldKey];
            delete itemGroupKeys[oldKey];
        } else {
            oldGroupKey = itemGroupKeys[itemKey];
        }

        itemGroupKeys[itemKey] = groupKey;

        if (!(group = me.get(groupKey))) {
            group = me.createGroup(source, groupKey);
            addGroups = [group];
        }

        if (group.get(itemKey) !== item) {
            group.add(item);
        } else {
            group.itemChanged(item);
        }

        if (groupKey !== oldGroupKey && (oldGroupKey === 0 || oldGroupKey)) {
            oldGroup = me.get(oldGroupKey);
            if (oldGroup) {
                oldGroup.remove(item);
                if (!oldGroup.length) {
                    removeGroups = [oldGroup];
                }
            }
        }

        if (addGroups) {
            me.splice(0, removeGroups, addGroups);
        } else if (removeGroups) {
            me.splice(0, removeGroups);
        }
    }
});