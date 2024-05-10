/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/file', 'N/record', 'N/search', 'N/email'],
    /**
 * @param{file} file
 * @param{record} record
 * @param{search} search
 * @param{email} email
 */
    (file, record, search, email) => {

       /** 

         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {
          //  email :requestBody.email;
         //  var  startDate:requestBody.startDate;
         try{
       var  folderName = requestBody.name;

       var folderSearchObj = search.create({
        type: "folder",
        columns:
        [
           search.createColumn({name: "name", label: "Name"}),
           search.createColumn({name: "lastmodifieddate", label: "Last Modified"}),
           search.createColumn({name: "numfiles", label: "# of Files"})
        ]
     });
     var searchResultCount = folderSearchObj.runPaged().count;
     log.debug("folderSearchObj result count",searchResultCount);
     folderSearchObj.run().each(function(result){

             var newFolderName = result.name;})

             if(folderName == newFolderName){
                log.debug('folder Exists',folderName);
                return('Folder Exists');
      
       }
            
     else if(folderName != newFolderName){
            log.debug('foldername', folderName)
           
          // var contents = 0

          var newFolder = record.create({
            type: record.Type.FOLDER,
            isDynamic:true

        })
        newFolder.setValue({
            fieldId:'name',
            value: folderName
        });
        newFolder.save()
        log.debug('new Folder Created',newFolder)

            var customerSearchObj = search.create({
                type: "customer",
                columns:
                [
                   search.createColumn({name: "entityid", label: "ID"}),
                   search.createColumn({name: "altname", label: "Name"}),
                   search.createColumn({name: "email", label: "Email"}),
                   search.createColumn({name: "phone", label: "Phone"}),
                   search.createColumn({name: "firstorderdate", label: "Date of First Order"}),
                ]
             });
             var searchResultCount = customerSearchObj.runPaged().count;
             log.debug("customerSearchObj result count",searchResultCount);

             customerSearchObj.run().each(function(result){
                //salesOrderDetail.forEach((result)=>{
                  //  const data = JSON.parse(result);
                    var customerName =  result.altname;
                    log.debug('CustomerName',customerName);
                    var custId = result.entityid;
     
                    var contents = 0;
                     contents += customerName +','+startDate +','+'\n';
                     log.debug('contents', contents);
                     return('search created', custId);
                })
                var pdfFile = file.create({
                    name: custId,
                    contents: contents,
                    folder: newFolder,
                    fileType: 'PDF'
                });
                var pdfFileId = pdfFile.save();
                log.debug("PDF File ID:", pdfFileId);
                var emailId = requestBody.emailId;
                
                    email.send({
                        author: -5,
                        recipients: emailId,
                        subject: 'CUSTOMER INFORMATION',
                        body: 'Please find the attached files for your reference.',
                        attachments: [pdfFile]
                    });
                    log.debug('Folder Created, email send');
                    return('Folder created, Email Send');
            }
          }catch(error)
          {
              log.error('ERROR!',error.message);
          }      
}
     return { post}
    })
;
