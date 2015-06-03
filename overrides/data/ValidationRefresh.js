/**
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?294061
 */
Ext.define('Jarvus.hotfixes.ext.data.ValidateRefresh', {
    override: 'Ext.data.Validation',

    refresh: function (force) {
        var me = this,
            data = me.data,
            record = me.record,
            fields = record.fields,
            generation = record.generation,
            recordData = record.data,
            sep = record.validationSeparator,
            values = null,
            defaultMessage, currentValue, error, field,
            item, i, j, jLen, len, msg, val, name;

        if (force || me.syncGeneration !== generation) {
            me.syncGeneration = generation;

            for (i = 0, len = fields.length; i < len; ++i) {
                field = fields[i];
                name = field.name;
                val = recordData[name];
                defaultMessage = field.defaultInvalidMessage;
                error = 0;

                if (!(name in data)) {
                    // Now is the cheapest time to populate our data object with "true"
                    // for all validated fields. This ensures that our non-dirty state
                    // equates to isValid.
                    data[name] = currentValue = true; // true === valid
                } else {
                    currentValue = data[name];
                }

                if (field.validate !== Ext.emptyFn) {
                    msg = field.validate(val, sep);
                    if (msg !== true) {
                        error = msg || defaultMessage;
                    }
                }

                if (!error) {
                    error = true; // valid state is stored as true
                }
                if (error !== currentValue) {
                    (values || (values = {}))[name] = error;
                }
            }

            if (values) {
                // only need to do this if something changed...
                me.set(values);
            }
        }
    }

});
