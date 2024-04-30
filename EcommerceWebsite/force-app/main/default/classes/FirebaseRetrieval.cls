public with sharing class FirebaseRetrieval {
    
    // Apex method to fetch product data from Firebase
    @AuraEnabled(cacheable=true)
    public static List<ProductData> getProductData() {
        List<ProductData> productList = new List<ProductData>();
        
        // Make HTTP callout to Firebase API endpoint
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://fantastic-dba58-default-rtdb.firebaseio.com/ProductDetails.json');
        request.setMethod('GET');
        // Add any required headers, such as authentication tokens
        
        // Create HTTP object and send request
        Http http = new Http();
        HttpResponse response = http.send(request);
        System.debug('Response Status Code: ' + response.getStatusCode());
        System.debug('Response Body: ' + response.getBody());

        // Check if the request was successful
        if (response.getStatusCode() == 200) {
            // Parse JSON response as a list of objects
            List<Object> jsonResponse = (List<Object>) JSON.deserializeUntyped(response.getBody());
            
            // Iterate over each element in the list
            for (Object obj : jsonResponse) {
                // Cast each element to a map
                Map<String, Object> productData = (Map<String, Object>) obj;

                // Create a new ProductData instance and populate its properties
                ProductData pd = new ProductData();
                pd.title = (String) productData.get('title');
                pd.image = (String) productData.get('image');
                pd.category = (String) productData.get('category');
                pd.price = (Decimal) productData.get('price');

                // Add the ProductData instance to the productList
                productList.add(pd);
            }
        } else {
            // Handle error
            System.debug('Error fetching data from Firebase: ' + response.getBody());
        }
        
        return productList;
    }
    
    // Define an inner class to represent your product data
    public class ProductData {
        @AuraEnabled public String title;
        @AuraEnabled public String image;
        @AuraEnabled public String category;
        @AuraEnabled public Decimal price;
    }
}