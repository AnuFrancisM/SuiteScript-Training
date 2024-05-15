/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{serverWidget} serverWidget
 */
    (record, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            try{

            if(scriptContext.request.method === "GET"){
                var form =  serverWidget.createForm({
                    title : "Blood Donor Details"
                });
               
               /*
                var container = form.addFieldGroup({
                    id : 'Blood_donor_container',
                    label : 'Blood Donor Details'
                });
                */
 
                form.addField({
                    id : 'custpage_jj_fname_otp_7211',
                    type: serverWidget.FieldType.TEXT,
                    label : 'First Name',
                   // container : 'donorInfo'
                });
 
                form.addField({
                    id : 'custpage_jj_lname_otp_7211',
                    type: serverWidget.FieldType.TEXT,
                    label : 'Last Name',
                   // container : 'donorInfo'
                });
                form.addField({
                    id : 'custpage_jj_gender_otp_7211',
                    type: serverWidget.FieldType.SELECT,
                    label : 'Gender',
                    source:'422',
                   // container : 'donorInfo'
                });
 
                form.addField({
                    id : 'custpage_jj_phone_otp_7211',
                    type: serverWidget.FieldType.PHONE,
                    label : 'Phone Number',
                  //  container : 'donorInfo'
                });
 
                form.addField({
                    id : 'custpage_blood_group_otp_7211',
                    type: serverWidget.FieldType.SELECT,
                    label : 'Blood Group',
                  source : '432'
                });
                form.addField({
                    id:'custpage_last_don_date_otp_7211',
                    type:serverWidget.FieldType.DATE,
                    label:'Last Donation Date',

                })
                form.addSubmitButton({
                    label : 'Submit'
                });
                scriptContext.response.writePage(form);
            } else {
               

                let fname = scriptContext.request.parameters.custpage_jj_fname_otp_7211;
                let lname = scriptContext.request.parameters.custpage_jj_lname_otp_7211;
                let gender = scriptContext.request.parameters.custpage_jj_gender_otp_7211;
                let phone = scriptContext.request.parameters.custpage_jj_phone_otp_7211;
                let bloodGroup = scriptContext.request.parameters.custpage_blood_group_otp_7211;
                let lddate = scriptContext.request.parameters.custpage_last_don_date_otp_7211;
                log.debug('name',fname)

               var customrecord = record.create({
                type : 'customrecord_jj_blood_donor_otp_7211',
                isDynamic : true
            });
            customrecord.setValue({
                fieldId : 'custrecord_jj_first_name_otp_7211',
                value : fname
            });
            customrecord.setValue({
                fieldId : 'custrecord_jj_last_name_otp_7211',
                value : lname
            });
            customrecord.setValue({
                fieldId : 'custrecord_jj_phone_number_otp_7211',
                value : phone
            });
            customrecord.setValue({
                fieldId : 'custrecord_jj_gender_otp_7211',
                value : gender
            });
           
            customrecord.setValue({
                fieldId : 'custrecord_jj_blood_group_otp_7211',
                value : bloodGroup
            });
            customrecord.setValue({
                fieldId : 'custrecord_jj_last_don_date_otp_7211',
                value : lddate
            });


           
            var recordId =  customrecord.save({ ignoreMandatoryFields: false, enableSourcing: true });;
            scriptContext.response.write('Record Created with internal Id: '+ recordId);
            log.debug("customer recordId:", + recordId);
            return recordId;
            
            // var recordId = customerecord.save();
            // log.debug("customer recordId:", + recordId);
           
            //    let patientRecord = createCustom(patientName, age, Address, Sex);
            //    log.debug(patientRecord);
           
        }
           
 
        
        }catch(error){
            log.error(error.message)
        }
    }

        return {onRequest}

    });
