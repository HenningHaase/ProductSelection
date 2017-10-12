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
        myEvent.setParams({"param": "It works!"});
        myEvent.fire();
	} 
})