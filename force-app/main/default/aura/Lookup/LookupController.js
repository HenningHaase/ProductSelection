({
	itemSelected : function(component, event, helper) {
		helper.itemSelected(component, event, helper);
	}, 
    serverCall :  function(component, event, helper) {
		helper.serverCall(component, event, helper);
	},
    clearSelection : function(component, event, helper){
        helper.clearSelection(component, event, helper);
    },
	fireMyComponentEvent : function(component, event, helper) {
        var myEvent = component.getEvent("myComponentEvent");
        var productname = component.get("v.selItem.text");
        var productId = component.get("v.selItem.val");
        myEvent.setParams({"Id": productId});
        myEvent.setParams({"param": productname});
        myEvent.fire();
	} 
})