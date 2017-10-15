({
    removeProductCard : function(component, index, recordId, helper) {
        /* remove Card*/
        var PL = component.get("v.productList");
        PL.splice(index, 1);
        component.set("v.productList", PL);
        
        /* delete Product: Server-side */
   
        var action = component.get('c.removeLineItems');
        
        action.setCallback(this,function(a)
        {
        	this.handleResponse(a,component,helper);
        });
        
        $A.enqueueAction(action);
        
    },
        handleResponse : function (res,component,helper){
        var msg;
        if (res.getState() === 'SUCCESS') {
            msg = res.getReturnValue();
            alert(msg);
        }else if (res.getState() === 'ERROR'){
  			alert('Error');
        }
    },
})