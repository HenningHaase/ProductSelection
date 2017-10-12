/** Client-side Controller **/
({
  getNumbers: function(component, event, helper) {
    var numbers = [];
    for (var i = 0; i < 20; i++) {
      numbers.push({
        value: i
      });
    }
    component.set("v.numbers", numbers); 
    },
    
    handleMyComponentEvent : function(component, event, helper) {
        var value = event.getParam("param");
        alert("Received component event with param = "+ value);
    }
})