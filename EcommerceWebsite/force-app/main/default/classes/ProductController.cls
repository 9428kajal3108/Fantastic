public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getProducts() {
        return [SELECT Id, Name, Product_Title__c, Categories__c, Product_Price__c, ImageUrl__c FROM Product__c];
    }

    
}
