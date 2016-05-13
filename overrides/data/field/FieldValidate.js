/**
 * Pass record through from input to validator
 * Discussion: https://www.sencha.com/forum/showthread.php?294061
 */
Ext.define('Jarvus.hotfixes.ext.data.field.FieldValidate', {
    override: 'Ext.data.field.Field',

    validate: function(value, separator, errors, record) {
        var me = this,
            ret = '',
            result, validator, validators, length, i;

        if (!me._validators) {
            me.compileValidators();
        }

        validators = me._validators;

        for (i = 0, length = validators.length; i < length; ++i) {
            validator = validators[i];
            result = validator.validate(value, record);

            if (result !== true) {
                result = result || me.defaultInvalidMessage;
                if (errors) {
                    errors.add(me.name, result);
                    ret = ret || result;
                } else if (separator) {
                    if (ret) {
                        ret += separator;
                    }
                    ret += result;
                } else {
                    ret = result;
                    break;
                }
            }
        }

        return ret || true;
    }
});