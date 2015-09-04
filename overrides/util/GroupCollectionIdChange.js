/**
 * Fixes issue where GroupCollection fails to handle idchanged correctly, leaving record
 * permenantly stuck in its group.
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?304879
 */
Ext.define('Jarvus.hotfixes.util.GroupCollectionIdChange', {
    override: 'Ext.util.GroupCollection',

    syncItemGrouping: function (source, item, itemKey, oldKey, itemIndex) {
        var me = this,
            itemGroupKeys = me.itemGroupKeys || (me.itemGroupKeys = {}),
            grouper = source.getGrouper(),
            groupKey = grouper.getGroupString(item),
            removeGroups = 0,
            index = -1,
            addGroups, group, oldGroup, oldGroupKey,
            firstIndex;

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

        // This checks whether or not the item is in the collection.
        // Short optimization instead of calling contains since we already have the key here.
        if (group.get(oldKey || itemKey) !== item) {
            if (group.getCount() > 0 && source.getSorters().getCount() === 0) {
                // We have items in the group & it's not sorted, so find the
                // correct position in the group to insert.
                firstIndex = source.indexOf(group.items[0]);
                if (itemIndex < firstIndex) {
                    index = 0;
                } else {
                    index = itemIndex - firstIndex;
                }
            }
            if (index === -1) {
                group.add(item);
            } else {
                group.insert(index, item);
            }
        } else {
            group.itemChanged(item, null, oldKey);
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