public with sharing class OppContactRoleController {

    @AuraEnabled(cacheable=true)
    public static List<OpportunityContactRole> getContactList(Id recId) {
        List<OpportunityContactRole> result = [SELECT Id, Opportunity.Name, Opportunity.Amount,
                Opportunity.StageName,
                Contact.Name, Contact.Phone, Role
                FROM OpportunityContactRole
                WHERE Opportunity.AccountId =: recId
                ORDER BY Opportunity.Amount DESC, Contact.LastName, Contact.FirstName
        ];
        system.debug('RES:' + result);
        return result;
    }
}