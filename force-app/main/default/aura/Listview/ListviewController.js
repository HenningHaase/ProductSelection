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

    }
})