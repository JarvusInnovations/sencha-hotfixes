/* jshint undef: true, unused: true, browser: true, quotmark: single, curly: true */
/* global Ext */

/**
 * This override implements isDirty for file inputs. A file input is considered dirty if at least
 * one file is selected.
 */
Ext.define('Jarvus.hotfixes.touch.field.File.Dirty', {
	override: 'Ext.field.File',

    isDirty: function() {
        return this.getFiles().length > 0;
    }
});