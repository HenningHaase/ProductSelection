/** Client-side Controller **/
({

    handleMyComponentEvent : function(component, event){
    var ProductName = event.getParam("param");
    alert("Received component event with param = "+ ProductName);
    var PL = component.get("v.productList"); 
        
    /* Creating the new product to add to the list. */
    var product = {
        ProductName: ProductName,	 
    	};
        /* Pushed the new product to the list to update the main list  */
        PL.push(product);
        
    	component.set("v.options", ProductName);
        
    	/* Updating the product list with new product. */
    	component.set("v.productList", PL); 

    },
    
    handleMenuDelete :function(component, event, helper){
        var selectedMenuItemValue = event.getParam("value");
        alert(selectedMenuItemValue);
        var indexNo;
		
        if(String(selectedMenuItemValue).startsWith("1"))
        {     
           indexNo = parseInt(selectedMenuItemValue)-100;	
           helper.removeProductCard(component, indexNo);
        } else {
           alert('ToDo: Update!'); 
           indexNo = parseInt(selectedMenuItemValue);
           indexNo = indexNo - 200;	
        }
	}
})