/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the Mass Update trigger point.
         * @param {Object} params
         * @param {string} params.type - Record type of the record being processed
         * @param {number} params.id - ID of the record being processed
         * @since 2016.1
         */
        const each = (params) => {
            var recordNew = record.load({
                type: params.type,
                id:params.id
            })
            var classValue = recordNew.getValue('custrecord_jj_student_class')

            if(classValue == 1){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:2
            })
        }
        else if(classValue == 2){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:3
            })
        }
        else if(classValue == 3){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:4
            })
        }
        else if(classValue == 4){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:5
            })
        }
        else if(classValue == 5){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:6
            })
        }
        else if(classValue == 6){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:7
            })
        }
        else if(classValue == 7){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:8
            })
        }
        else if(classValue == 8){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:9
            })
        }
        else if(classValue == 9){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:10
            })
        }
        else if(classValue == 10){
            recordNew.setValue({
                fieldId:'custrecord_jj_student_class',
                value:'completed'
            })
        }
        recordNew.save()

        }

        return {each}

    });
