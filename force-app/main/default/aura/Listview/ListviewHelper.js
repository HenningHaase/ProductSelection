({
    removeProductCard : function(component, index, recordId, helper) {
        
        var PL = component.get("v.productList");
        
        
        /* delete Products: Server-side */
        var action = component.get('c.removeLineItems');

        action.setParams
        ({
                OppId : recordId,
           		PID: PL[index].ProductID
        });
        
        action.setCallback(this,function(a)
        {
        	this.handleResponse(a,component,helper);
        });
        
        $A.enqueueAction(action);
        
        /* remove Card*/
        PL.splice(index, 1);
        component.set("v.productList", PL);
        
    },
    UpdateProducts: function(component, index, recordId, helper) {
        
        var PL = component.get("v.productList");
        
        /*child components*/
        var child = component.find("TimeInput");
        var child2 = component.find("DataInput");
        
        /*retain values*/
        var Amount = child2.find('Amount').get('v.value');
        var Werbeart = child2.find('Werbeart').get('v.value');
        var firstdate = child.find('firstdate').get('v.value');
        var monthnumber = child.find('monthnumber').get('v.value');
                  
        // Simplistic error checking
        var validItem = true;
        var Errormsg = '';

        // Amount must not be blank or 0
        if ($A.util.isEmpty(Amount)){
            validItem = false;
            Errormsg += ' Bitte geben sie einen Betrag ein.';
        }
 
        // monthnumber must not be blank
        if ($A.util.isEmpty(monthnumber)){
            validItem = false;
            Errormsg += ' Bitte geben sie eine Laufzeit ein.';

        }

		// firstdate must not be blank		
        if ($A.util.isEmpty(firstdate)){
            validItem = false;
            Errormsg += ' Bitte geben sie ein erstes Erscheinungsdatum an.';
        }
        
        if(!validItem)
        {
           var toastEvent = $A.get("e.force:showToast");
    		toastEvent.setParams({
                title: "Prüfung:",
        		message: "Befüllen Sie alle Felder der Productcard!" + Errormsg,
                type: "warning"
    		});
    		toastEvent.fire();
            return;
        } 
            
            
	
        /* delete Products: Server-side */
        
        var action = component.get('c.removeLineItems');

        action.setParams
        ({
                OppId : recordId,
           		PID: PL[index].ProductID
        });
        
        action.setCallback(this,function(a)
        {
        	this.handleResponse(a,component,helper);
        });
        
        $A.enqueueAction(action);
        
        /* add Products: Server-side */
        var action2 = component.get('c.AddLineItems');

        action2.setParams
        ({
                OppId : recordId,
           		PID: PL[index].ProductID,
                ld: firstdate,
                WA: Werbeart,
                lz: monthnumber,
                am: Amount
        });
        
        action2.setCallback(this,function(a)
        {
        	this.handleResponse(a,component,helper);
        });
        
        $A.enqueueAction(action2);
        
    },
    
    
    
    handleResponse : function (res,component,helper){
        var msg;
        if (res.getState() === 'SUCCESS')
        {
            msg = res.getReturnValue();
            alert(msg);
            $A.get('e.force:refreshView').fire();
        }else if (res.getState() === 'ERROR')
        {
  			alert('Error');
        }
    },
})