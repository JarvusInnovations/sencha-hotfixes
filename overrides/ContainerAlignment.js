/*jslint browser: true, undef: true, laxcomma:true *//*global Ext*/
/**
 * Fixes issue where alignTo doesn't take into account scrollable parents or viewports with padding
 * 
 * Fiddle: https://fiddle.sencha.com/#fiddle/1c49
 */
Ext.define('Jarvus.hotfixes.ContainerAlignment', {
    override: 'Ext.Container',

    getAlignmentInfo: function(component, alignment) {
        var me = this,
            alignmentInfo = me.callParent(arguments),
            scrollableParent = me.up('{getScrollable()}'),
            scrollable = scrollableParent && scrollableParent.getScrollable(),
            topOffset = 0, leftOffset = 0,
            scrollableElement, scrollablePosition;

        if (scrollable) {
        	scrollableElement = scrollable.getElement();
            scrollablePosition = scrollable.getPosition();

            // shift top/left by scrollable container offset and scroll position
            topOffset -= scrollableElement.getY() - scrollablePosition.y;
            leftOffset -= scrollableElement.getX() - scrollablePosition.x;
        } else {
        	// shift top/left by innerElement offset
            topOffset -= me.getParent().innerElement.getY();
            leftOffset -= me.getParent().innerElement.getX();
        }

        alignmentInfo.stats.alignToBox.top += topOffset;
        alignmentInfo.stats.alignToBox.left += leftOffset;

        return alignmentInfo;
    }
});
