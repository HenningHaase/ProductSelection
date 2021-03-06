/**
 * @Author		:		Jitendra Zaa
 * @Date		:		4-Jul-2017
 * @Desc		:		Controller for Lookup Lightning Component
 * */
public class Lookup {

    /**
     * Returns JSON of list of ResultWrapper to Lex Components
     * @objectName - Name of SObject
     * @fld_API_Text - API name of field to display to user while searching
     * @fld_API_Val - API name of field to be returned by Lookup COmponent
     * @lim   - Total number of record to be returned
     * @fld_API_Search - API name of field to be searched
     * @searchText - text to be searched
     * */
    @AuraEnabled
    public static String removeLineItems(id OppId, id PID)
    {
        String output;
        list<OpportunityLineItem> oppLI = new list<OpportunityLineItem>([SELECT 
                                                                         		id,
                                                                         		Name
                                                                         FROM
                                                                         		OpportunityLineItem 
                                                                         WHERE 
                                                                         		Opportunityid = :Oppid 
                                                                         AND
                                                                         		Product2Id = :PID
                                                                        ]);
        if(oppLI.size()>0)
        {
            output = oppLI[0].Name + ' : id ' + oppLI[0].id;
            Delete oppLI;
        }

    	return 'Test: ' + OppId + ' , ' + PID + ' , ' + output;    
    }
    
    @AuraEnabled
    public static String AddLineItems(id OppId, id PID, String WA, String ld, integer lz, decimal am)
    {
        String output = String.valueof(OppId) + ' , ' + String.valueof(PID) + ' , ' + WA + ' , ' + ld + ' , ' + String.valueof(lz) + ' , ' + am.format();
        
        list<OpportunityLineItem> oppLI = new list<OpportunityLineItem>();
        date validationdate, finaldate;
        Integer daysInMonth, day,j;
        
        
        for(integer i = 0;i<lz;i++)
        {
            OpportunityLineItem OLI = new OpportunityLineItem();
            OLI.opportunityid =  OppId;
            OLI.Product2Id = PID;
            OLI.Werbeart__c = WA;
            OLI.TotalPrice = am;
            OLI.Quantity = 1;

            validationdate = Date.newInstance(Integer.valueof(ld.left(4)),Integer.valueof(ld.substring(5, 7)),1);
            validationdate = validationdate.addMonths(i);
            daysInMonth = Date.daysInMonth(validationdate.year(), validationdate.month());
            
            day = Integer.valueof(ld.right(2));
			while( day > daysInMonth){
      			day--;
			}
            
            finaldate = Date.newinstance(validationdate.year(),validationdate.month(),day);
            OLI.Erscheinungsdatum__c = finaldate;
            
            oppLI.add(OLI);
        }
        Insert oppLI;
    	return output;    
    }
    
    @AuraEnabled 
    public static String searchDB(String objectName, String fld_API_Text, String fld_API_Val, 
                                  Integer lim,String fld_API_Search,String searchText ){
        
        searchText='\'%' + String.escapeSingleQuotes(searchText.trim()) + '%\'';

        
        String query = 'SELECT '+fld_API_Text+' ,'+fld_API_Val+
            			' FROM '+objectName+
            				' WHERE '+fld_API_Search+' LIKE '+searchText+ 
            			' LIMIT '+lim;
        
        List<sObject> sobjList = Database.query(query);
        List<ResultWrapper> lstRet = new List<ResultWrapper>();
        
        for(SObject s : sobjList){
            ResultWrapper obj = new ResultWrapper();
            obj.objName = objectName;
            obj.text = String.valueOf(s.get(fld_API_Text)) ;
            obj.val = String.valueOf(s.get(fld_API_Val))  ;
            lstRet.add(obj);
        } 
         return JSON.serialize(lstRet) ;
    }
    
    public class ResultWrapper{
        public String objName {get;set;}
        public String text{get;set;}
        public String val{get;set;}
    }
}