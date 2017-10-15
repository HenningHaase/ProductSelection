/** Client-side Controller **/
({

    handleMyComponentEvent : function(component, event){
        
        /*Parameter*/
        var ProductName = event.getParam("param");
        var ProductID = event.getParam("Id");
        
        /*Components*/
        var PL = component.get("v.productList"); 

        var isEmpty = $A.util.isEmpty(event.getParam("Id"));
        if(isEmpty)
        { 
            return; //leave
        }
        
        /* Creating the new product */
        var product = 
        {
            ProductName: ProductName,
            ProductID: ProductID,
        };

        /*Loop: check if not already in list*/
        var dupe = false;          
        for (var i=0; i < PL.length; i++) 
        {
        	var idIterator = PL[i].ProductID;                
           	if (idIterator === ProductID)
            {
            	dupe = true;
             	//alert(idIterator + ' === ' + ProductID);
            }      
        }
            

        
        /* Pushed the new product to the list to update the main list  */        
        if(!dupe)
        {       
        	PL.push(product);
            component.set("v.options", ProductName);
        
            /* Updating the product list with new product. */
            component.set("v.productList", PL);
        }
    },
    
    handleMenuDelete :function(component, event, helper){
        var selectedMenuItemValue = event.getParam("value");
        var recordId = component.get("v.recordId");
		var indexNo;
        
        if(String(selectedMenuItemValue).startsWith("1"))
        {     
           indexNo = parseInt(selectedMenuItemValue)-100;
           helper.removeProductCard(component, indexNo, recordId);
        } else {
           alert('ToDo: Update!'); 
           indexNo = parseInt(selectedMenuItemValue)-200;

        }
	}
})