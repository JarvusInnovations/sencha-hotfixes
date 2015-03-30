/**
 * Fixes regular expresion used to validate DOM ids to match HTML spec
 * 
 * Discussion: http://www.sencha.com/forum/showthread.php?296173-validIdRe-throwing-Invalid-Element-quot-id-quot-for-valid-ids-containing-colons
 */
Ext.define('Jarvus.hotfixes.ext.dom.Element.ValidID', {
    override: 'Ext.dom.Element',

    validIdRe: /^[a-z][a-z0-9\-_:.]*$/i
});
