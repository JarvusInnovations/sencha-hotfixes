/*jslint browser: true, undef: true, laxcomma:true *//*global Ext*/
/**
 * Fixes issue where alignTo doesn't take into account scrollable parents or viewports with padding
 *
 * Attempted Fiddle: https://fiddle.sencha.com/#fiddle/1c49
 */
Ext.define('Jarvus.hotfixes.ContainerAlignment', {
    override: 'Ext.Container',

    getAlignmentInfo: function(component, alignment) {
        var me = this,
            alignmentInfo = me.callParent(arguments),
            scrollableParent = me.up('{getScrollable()}'),
            scrollable = scrollableParent && scrollableParent.getScrollable(),
            topOffset = 0;

        if (scrollable) {
            // shift alignToBox.top by containter padding and scroll position
            topOffset -= scrollable.getElement().getY() - scrollable.getPosition().y;
        } else {
            topOffset -= me.getParent().innerElement.getY();
        }

        alignmentInfo.stats.alignToBox.top += topOffset;

        return alignmentInfo;
    }
});