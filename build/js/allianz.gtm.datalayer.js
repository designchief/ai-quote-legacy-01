var url = window.location.href.split("?")[0].toLowerCase().split('/');
var conversionValue = (function () {
    var value;
    try {
        var premiumClass = ((url.length > 5 ? url[5] : "") == "quick" ? $('.estimate-price') : $('.title.annual'));
        value = premiumClass.first().text().replace(/\u00A3/g, '').replace(/\u20ac/g, '').replace(/\u002A/g, '');
    } catch (e) { console.log(e.message); }
    return value == "" ? "0" : value;
})();
var referenceNumber = (function () {
    var value = "";
    try {
        var refNoClass = $('.quoteref');
        value = refNoClass.first().text();
    } catch (e) { console.log(e.message); }
    return value;
})();
var dataLayer = [{ 'referenceNumber': referenceNumber, 'conversionValue': conversionValue }];
// funneling
var product = (url[4] + "/" + (url.length > 5 ? url[5] : "") + "/" + (url.length > 6 ? url[6] : ""));
switch (product) {
    //motor ni
    case "motorni//": case "motorni/details/quote": dataLayer.push({ 'name': 'motorni', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/motorni/step1/', 'virtualPageTitle': 'Allianz Quote Details' }); break;
    case "motorni/cover/coveroptions": dataLayer.push({ 'name': 'motorni', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/motorni/step2/', 'virtualPageTitle': 'Cover' }); break;
    case "motorni/summary/summary": dataLayer.push({ 'name': 'motorni', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/motorni/step3/', 'virtualPageTitle': 'Allianz Quote Confirmation Details' }); break;
    case "motorni/pay/pay": dataLayer.push({ 'name': 'motorni', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/motorni/step4/', 'virtualPageTitle': 'Payment Details' }); break;
    //household ni
    case "householdni//": case "householdni/quote/": dataLayer.push({ 'name': 'householdni', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/householdni/step1/', 'virtualPageTitle': 'Allianz Home Quote' }); break;
    case "householdni/quote/cover": dataLayer.push({ 'name': 'householdni', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/householdni/step2/', 'virtualPageTitle': 'Allianz Quote Cover Details' }); break;
    case "householdni/quote/confirm": dataLayer.push({ 'name': 'householdni', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/householdni/step3/', 'virtualPageTitle': 'Allianz Quote Confirmation Details' }); break;
    case "householdni/quote/pay": dataLayer.push({ 'name': 'householdni', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/householdni/step4/', 'virtualPageTitle': 'Payment Details' }); break;
    //motor roi
    case "motor//": case "motor/details/quote": dataLayer.push({ 'name': 'motor', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/motor/step1/', 'virtualPageTitle': 'Allianz Quote Details' }); break;
    case "motor/cover/coveroptions": dataLayer.push({ 'name': 'motor', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/motor/step2/', 'virtualPageTitle': 'Cover' }); break;
    case "motor/summary/summary": dataLayer.push({ 'name': 'motor', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/motor/step3/', 'virtualPageTitle': 'Allianz Quote Confirmation Details' }); break;
    case "motor/pay/pay": dataLayer.push({ 'name': 'motor', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/motor/step4/', 'virtualPageTitle': 'Payment Details' }); break;
    //household roi
    case "household//": case "household/quote/": dataLayer.push({ 'name': 'household', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/household/step1/', 'virtualPageTitle': 'Allianz Home Quote' }); break;
    case "household/quote/cover": dataLayer.push({ 'name': 'household', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/household/step2/', 'virtualPageTitle': 'Allianz Quote Cover Details' }); break;
    case "household/quote/confirm": dataLayer.push({ 'name': 'household', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/household/step3/', 'virtualPageTitle': 'Allianz Quote Confirmation Details' }); break;
    case "household/quote/pay": dataLayer.push({ 'name': 'household', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/household/step4/', 'virtualPageTitle': 'Payment Details' }); break;
    //pet
    case "pet//": dataLayer.push({ 'name': 'pet', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/pet/step1/', 'virtualPageTitle': 'Allianz Quote Details' }); break;
    case "pet/quote/confirm": dataLayer.push({ 'name': 'pet', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/pet/step2/', 'virtualPageTitle': 'Allianz Quote Confirmation Details' }); break;
    case "pet/quote/pay": dataLayer.push({ 'name': 'pet', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/pet/step3/', 'virtualPageTitle': 'Payment Details' }); break;
    //Pleasurecraft
    case "pleasurecraft//": dataLayer.push({ 'name': 'pleasurecraft', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/pleasurecraft/step1/', 'virtualPageTitle': 'Allianz Quote Details' }); break;
    case "pleasurecraft/quote/confirm": dataLayer.push({ 'name': 'pleasurecraft', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/pleasurecraft/step2/', 'virtualPageTitle': 'Allianz Quote Confirmation Details' }); break;
    case "pleasurecraft/quote/pay": dataLayer.push({ 'name': 'pleasurecraft', 'event': 'VirtualPageview', 'virtualPageURL': '/b2x/pleasurecraft/step3/', 'virtualPageTitle': 'Payment Details' }); break;
}

if (url[3] == "myallianz") {
    switch (product) {
        //Access
        case "access//": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/access', 'virtualPageTitle': 'MyAllianz - Login' }); break;
        case "access/account/resetpassword": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/access/account/resetpassword', 'virtualPageTitle': 'MyAllianz - Account - Reset Password' }); break;
        case "access/account/register": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/access/account/register', 'virtualPageTitle': 'MyAllianz - Registration' }); break;
        case "access/account/changepassword": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/access/account/changepassword', 'virtualPageTitle': 'MyAllianz - Account - Change Password' }); break;
        case "access/account/removeaccount": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/access/account/removeaccount', 'virtualPageTitle': 'MyAllianz - Account - Remove Account' }); break;
        case "access/account/adduserpolicy": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/access/account/adduserpolicy', 'virtualPageTitle': 'MyAllianz - Account - Add User Policy' }); break;
        case "access/account/generalenquiry": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/access/account/generalenquiry', 'virtualPageTitle': 'MyAllianz - Account - General Enquiry' }); break;
        //Dashborad
        case "product/dashboard/": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/dashboard', 'virtualPageTitle': 'MyAllianz - Dashboard' }); break;
        case "product/contactdetails/inbox": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/contactdetails/inbox', 'virtualPageTitle': 'MyAllianz - ContactDetails - Inbox' }); break;
        case "product/contactdetails/details": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/contactdetails/details', 'virtualPageTitle': 'MyAllianz - ContactDetails - Details' }); break;
        case "product/contactdetails/changeaddress": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/contactdetails/changeaddress', 'virtualPageTitle': 'MyAllianz - ContactDetails - Change Address' }); break;
        case "product/contactdetails/updatename": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/contactdetails/updatename', 'virtualPageTitle': 'MyAllianz - ContactDetails - Update Name' }); break;
        case "product/contactdetails/changephonenumber": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/contactdetails/changephonenumber', 'virtualPageTitle': 'MyAllianz - ContactDetails - Change Phone Number' }); break;
        case "product/quoteatlaterdate/quoteatlaterdate": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/quoteatlaterdate/quoteatlaterdate', 'virtualPageTitle': 'MyAllianz - Quote At Later Date' }); break;
        //Motor
        case "product/motor/policydetails": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/motor/policydetails', 'virtualPageTitle': 'MyAllianz - Motor - Policy Details' }); break;
        case "product/motor/payments": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/motor/payments', 'virtualPageTitle': 'MyAllianz - Motor - Payments' }); break;
        case "product/motor/viewdocuments": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/motor/viewdocuments', 'virtualPageTitle': 'MyAllianz - Motor - View Documents' }); break;
        case "product/motor/requestchange": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/motor/requestchange', 'virtualPageTitle': 'MyAllianz - Motor - Request Change' }); break;
        case "product/motor/claimshistory": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/motor/claimshistory', 'virtualPageTitle': 'MyAllianz - Motor - Claims History' }); break;
        case "product/motor/claimstracking": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/motor/claimstracking', 'virtualPageTitle': 'MyAllianz - Motor - Claims Tracking' }); break;
        case "product/motor/claimnotification": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/motor/claimnotification', 'virtualPageTitle': 'MyAllianz - Motor - Claim Notification' }); break;
        //Home
        case "product/home/policydetails": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/home/policydetails', 'virtualPageTitle': 'MyAllianz - Home - Policy Details' }); break;
        case "product/home/payments": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/home/payments', 'virtualPageTitle': 'MyAllianz - Home - Payments' }); break;
        case "product/home/viewdocuments": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/home/viewdocuments', 'virtualPageTitle': 'MyAllianz - Home - View Documents' }); break;
        case "product/home/requestchange": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/home/requestchange', 'virtualPageTitle': 'MyAllianz - Home - Request Change' }); break;
        case "product/home/claimshistory": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/home/claimshistory', 'virtualPageTitle': 'MyAllianz - Home - Claims History' }); break;
        case "product/home/claimstracking": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/home/claimstracking', 'virtualPageTitle': 'MyAllianz - Home - Claims Tracking' }); break;
        case "product/home/claimnotification": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/home/claimnotification', 'virtualPageTitle': 'MyAllianz - Home - Claim Notification' }); break;
        //Pet
        case "product/pet/policydetails": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pet/policydetails', 'virtualPageTitle': 'MyAllianz - Pet - Policy Details' }); break;
        case "product/pet/payments": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pet/payments', 'virtualPageTitle': 'MyAllianz - Pet - Payments' }); break;
        case "product/pet/viewdocuments": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pet/viewdocuments', 'virtualPageTitle': 'MyAllianz - Pet - View Documents' }); break;
        case "product/pet/requestchange": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pet/requestchange', 'virtualPageTitle': 'MyAllianz - Pet - Request Change' }); break;
        case "product/pet/claimshistory": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pet/claimshistory', 'virtualPageTitle': 'MyAllianz - Pet - Claims History' }); break;
        case "product/pet/claimstracking": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pet/claimstracking', 'virtualPageTitle': 'MyAllianz - Pet - Claims Tracking' }); break;
        case "product/pet/claimnotification": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pet/claimnotification', 'virtualPageTitle': 'MyAllianz - Pet - Claim Notification' }); break;
        //Boat
        case "product/pleasurecraft/policydetails": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pleasurecraft/policydetails', 'virtualPageTitle': 'MyAllianz - PleasureCraft - Policy Details' }); break;
        case "product/pleasurecraft/payments": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pleasurecraft/payments', 'virtualPageTitle': 'MyAllianz - PleasureCraft - Payments' }); break;
        case "product/pleasurecraft/viewdocuments": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pleasurecraft/viewdocuments', 'virtualPageTitle': 'MyAllianz - PleasureCraft - View Documents' }); break;
        case "product/pleasurecraft/requestchange": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pleasurecraft/requestchange', 'virtualPageTitle': 'MyAllianz - PleasureCraft - Request Change' }); break;
        case "product/pleasurecraft/claimshistory": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pleasurecraft/claimshistory', 'virtualPageTitle': 'MyAllianz - PleasureCraft - Claims History' }); break;
        case "product/pleasurecraft/claimstracking": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pleasurecraft/claimstracking', 'virtualPageTitle': 'MyAllianz - PleasureCraft - Claims Tracking' }); break;
        case "product/pleasurecraft/claimnotification": dataLayer.push({ 'event': 'VirtualPageview', 'virtualPageURL': '/myallianz/product/pleasurecraft/claimnotification', 'virtualPageTitle': 'MyAllianz - PleasureCraft - Claim Notification' }); break;
    }
}
var acceptCriteria = document.getElementById('content01-btn');
if (acceptCriteria != null) {

    function addListener(element, type, callback) {
        if (element.addEventListener) element.addEventListener(type, callback);
        else if (element.attachEvent) element.attachEvent('on' + type, callback);
    }

    addListener(acceptCriteria, 'click', function () {
        var label;
        switch (url[4]) {
            case "motor": label = 'motor criteria'; dataLayer[1].virtualPageName = 'https://net.allianz.ie/b2x/motor/CoverDetails'; break;
            case "motorni": label = 'motor ni criteria'; dataLayer[1].virtualPageName = 'https://net.allianz.ie/b2x/motorni/CoverDetails'; break;
            case "pleasurecraft": label = 'pleasurecraft criteria'; dataLayer[1].virtualPageName = 'https://net.allianz.ie/b2x/pleasurecraft/CoverDetails'; break;
            case "pet": label = 'pet criteria'; dataLayer[1].virtualPageName = 'https://net.allianz.ie/b2x/pet/CoverDetails'; break;
            case "household": label = 'home criteria'; dataLayer[1].virtualPageName = 'https://net.allianz.ie/b2x/household/CoverDetails'; break;
            case "householdni": label = 'home ni criteria'; dataLayer[1].virtualPageName = 'https://net.allianz.ie/b2x/householdni/CoverDetails'; break;
        }
        try {
            ga(ga.getAll()[0].get('name') + '.send', 'event', 'button', 'click', label);
        } catch (e) { console.log(e.message); }
    });
}

