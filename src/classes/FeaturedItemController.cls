public with sharing class FeaturedItemController {
    private static List<String> bad() {
        
        for (Integer i=0; i<102; i++) {
            List<Account> accs = [SELECT Id FROM Account LIMIT 1];   
        }
        return null;
    }
    @AuraEnabled(Cacheable=true)
    public static List<PricebookEntry> getFeaturedItems() {
        List<PricebookEntry> result = [SELECT Id, Name, UnitPrice,
                Product2.Emails__c, Product2.Storage__c,
                Product2.Bandwidth_in_GB__c, Product2.Domains__c, Product2.Highlight__c
            FROM PricebookEntry
            WHERE Pricebook2.Name = 'HomepageFeaturedItems'
                AND Product2.Featured__c = TRUE AND IsActive = TRUE
            ORDER BY UnitPrice
        ];
        System.debug('RESULTS:' + result);
        return result;
    }
}
