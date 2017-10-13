({
    removeProductCard : function(component, index) {
        var PL = component.get("v.productList");
        PL.splice(index, 1);
        component.set("v.productList", PL);
    }
})