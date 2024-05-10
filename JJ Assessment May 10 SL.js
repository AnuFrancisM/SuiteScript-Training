/**
 * @NScriptType Suitelet
 * @NApiVersion 2.x
 */


define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(context) {
        try{
      // Create the Suitelet form
      var form = serverWidget.createForm({
        title: 'Bitcoin Price List'
      });
    
  
      // Add a field for the updated time 
      form.addField({
        id: 'custpage_updated_time',
        type: serverWidget.FieldType.DATE,
        label: 'Updated Time',
        defaultValue: new Date(), 
      });
  
      // Create the sublist for Bitcoin prices
      var sublist = form.addSublist({
        id: 'custpage_bitcoin_prices',
        type: serverWidget.SublistType.LIST,
        label: 'Bitcoin Prices',
      });
  
      // Add columns to the sublist
      sublist.addField({
        id: 'currency',
        type: serverWidget.FieldType.TEXT,
        source: 'currency',
        label: 'Currency',
      });
      sublist.addField({
        id: 'rate',
        type: serverWidget.FieldType.FLOAT,
        label: 'Rate',
      });
      sublist.addField({
        id: 'description',
        type: serverWidget.FieldType.TEXT,
        label: 'Description',
      });
      sublist.addField({
        id: 'rate_float',
        type: serverWidget.FieldType.FLOAT,
        label: 'Rate in Float',
      });
  
  
      // Add a refresh button 
      form.addButton({
        id: 'custpage_refresh_button',
        label: 'Refresh',
        functionName: 'refreshPage', 
      });
      context.response.writePage(form);

      var array1 =['INR',3,'INR',3.12]

      var array2 = [{'currency':'INR','rate':'3','description':'INR','float':'12'},
                    {'currency':'INS','rate':'10','description':'INS','float':'11'}
      ]
     for( var i=0; i<=len(array2) ; i++ ){
        


      sublist.setSublistValue({
        id: 'currency',
        line: i,
    value: array2[i][0]
    })
    sublist.setSublistValue({
        id:'rate',
        line: i,
        value: array2[i][1]
    })
    sublist.setsublistValue({
        id:'description',
        line: i,
        value: array2[i][2]
    })
    sublist.setSublistValue({
        id:'rate_float',
        line: i,
        value: array2[i][3]
    })
    form.save()
}
  
      // Display the form
    context.response.writePage(form);
    } catch(error)
{
    log.error('Error', error.message)
}
    }
  
    return {
      onRequest: onRequest,
    };
  });