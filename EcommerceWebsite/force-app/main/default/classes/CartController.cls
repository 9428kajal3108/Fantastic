public with sharing class CartController {
    

    @AuraEnabled(cacheable=true)
    public static Product__c fetchProductDetails(Id productId) {
        // Fetch product details based on the productId
        try {
            return [SELECT Id, Product_Title__c, Product_Price__c, ImageUrl__c  FROM Product__c WHERE Id = :productId LIMIT 1];
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching product details: ' + e.getMessage());
        }
    }
    
    @AuraEnabled
    public static void addToCart(String productName, String imageUrl, Decimal price) {
        Cart__c newCartItem = new Cart__c();
        newCartItem.Name = productName;
        newCartItem.Product_Image__c = imageUrl;
        newCartItem.Product_Price__c = price;
        insert newCartItem;
    }

    @AuraEnabled(cacheable=true)
    public static List<Cart__c> getCartItems() {
        return [SELECT Id, Name, Product_Image__c, Product_Price__c FROM Cart__c];
    }


    @AuraEnabled
    public static void removeFromCart(Id cartItemId) {
        try {
            // Retrieve the CartItem record by Id
            List<Cart__c> cartItemsToDelete = [SELECT Id FROM Cart__c WHERE Id = :cartItemId LIMIT 1];
            if (!cartItemsToDelete.isEmpty()) {
                // Delete the CartItem record
                delete cartItemsToDelete;
            }
        } catch (Exception e) {
            // Handle any errors
            throw new AuraHandledException('Error removing item from cart: ' + e.getMessage());
        }
    }
    
    public class CartItem {
        @AuraEnabled public Id Id;
        @AuraEnabled public String ProductName;
        @AuraEnabled public String ImageUrl;
        @AuraEnabled public Decimal Price;
    }
}
