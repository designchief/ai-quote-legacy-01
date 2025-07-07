(function ($) {
    "use strict";
    $(function () {

        var $addressDivs = $("#page1 .addressdiv");

        $(".GammaDiv", $addressDivs).AutoAddress({
            key: "8e7b5402-1429-4bf8-986f-5b816013ee6f",
            addressProfile: "Allianz",
            vanityMode: "true",
            searchButtonLabel: "Search",
            placeHolderLabel: "Enter Full Address/Eircode",
            addressFoundLabel: $('#addressFound').val(),
            inputRequiredLabel: $('#inputRequired').val(),
            incompleteAddressLabel: $('#incompleteAddress').val(),
            partialAddressLabel: $('#partialAddress').val(),
            noResultFoundLabel: $('#noResultFound').val(),
            noEircodeAppendedLabel: $('#noEircodeAppended').val(),
            nuaAddressFoundLabel: $('#nuaAddressFound').val(), // Non unique address : code - 300            
            onLookupError: function (data) {
                var $userAddressDiv = $(document.activeElement).closest(".addressdiv");
                $(".gammacontainer", $userAddressDiv).hide();
                $(".allianzcontainer", $userAddressDiv).show();
                if ($('#contingency').length == 0) {
                    $('div.autoaddress-control').append("<div id='contingency' class='autoaddress-options-msg info' ></div>");
                    $('div#contingency', $userAddressDiv).append($('#contigencyAddress').text());
                    $('div#contingency', $userAddressDiv).prepend('<span>');
                }
                logError("Gamma failed with error: " + JSON.stringify(data) + " - with url: " + $.ALZ.GetApplicationRoot() + " - reverting to Allianz lookup.");
                internalEircodeSearch($userAddressDiv);
            },
            onSearchCompleted: function (data) {

                var $userAddressDiv = $(".autoaddress-button").closest(".addressdiv");

                $('.addressline2,.addressline3,.addressline4,.addressline5,.addressline6,.eircode', $userAddressDiv).text('');
                $('.matchlevel,.addrestype,.resultcode,.eircodeid', $userAddressDiv).val();

            },
            onAddressFound: function (data) {

                var resultCode = data.result.code;
                var addressId = data.addressId;
                var $userAddressDiv = $(".autoaddress-button").closest(".addressdiv");
                var organisation = $('#organisation').val() || false;
                if (addressId !== undefined && Number(addressId.toString().substr(0, 2)) === 19 && organisation === false) {
                    $('div.autoaddress-options-msg', $userAddressDiv).removeClass("success");
                    $('div.autoaddress-options-msg', $userAddressDiv).addClass("info");
                    $('div.autoaddress-options-msg', $userAddressDiv).text($('#commercialAddress').val());
                    $('div.autoaddress-options-msg', $userAddressDiv).prepend('<span>');
                }
                else {

                    if (data.reformattedAddress) {

                        $.each(data.reformattedAddress, function (index, value) {
                            setaddressline('.addressline' + (index + 1), value, $userAddressDiv);
                        });
                        if (resultCode === 100 || resultCode === 110 || resultCode === 120 || resultCode === 130 || resultCode === 140 || resultCode === 300) {
                            if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('motor') <= 0) {
                                if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('horseandrider') > 0)
                                    KOViewModel.AddressFound(true);
                            }
                            if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('pet') > 0) { $("#GetQuote").show(); $('.petquotedetails').show(); }

                            setTimeout(function () {
                                setaddressline('.eircode', data.postcode ? data.postcode.substring(0, 3) + ' ' + data.postcode.substring(3, 7) : "", $userAddressDiv);
                                setaddresshiddenvalue('.matchlevel', data.matchLevel.text, $userAddressDiv);
                                setaddresshiddenvalue('.addresstype', data.addressType.text, $userAddressDiv);
                                setaddresshiddenvalue('.resultcode', data.result.text, $userAddressDiv);
                                setaddresshiddenvalue('.eircodeid', data.addressId, $userAddressDiv);
                            }, 40);

                            $('.hidequotedetails, .eircodeaddress, .useraddress').show();

                            if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('pleasurecraft') > 0) {

                                $("#GetQuote").show(); $('#Typeofvesseldetail').show();
                            }

                        }
                    }
                }
                if (resultCode === 150 || resultCode === 210) {
                    $('div.autoaddress-options-msg', $userAddressDiv).text($('#noEircodeAppended').val());
                }
            }

        });

        $('.autoaddress-text-box').keydown(function () {
            $(document.activeElement).closest(".addressdiv").find(".useraddress").hide();
            if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('motor') <= 0) {
                if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('horseandrider') > 0)
                    KOViewModel.AddressFound(false);
            }
            if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('pet') > 0) { $("#GetQuote").hide(); $('.petquotedetails').hide(); }
            else if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('pleasurecraft') > 0) {
                $("#GetQuote").hide(); $('#Typeofvesseldetail').hide();
            }

            if ($('div.autoaddress-control div.autoaddress-options-msg').length > 0) {
                $('div.autoaddress-control div.autoaddress-options-msg').not('#contingency').remove();
            }
        });


        //*******************------------------ALLIANZ---------------------------------------***************************
        function internalEircodeSearch(addressdiv, infoMessageContainerClass) {

            var $searchbox = $('.autoaddress-text-box', addressdiv).val($('.autoaddress-text-box').val());
            var $userAddressDiv = $(".autoaddress-button").closest(".addressdiv");
            var organisation = $('#organisation').val() || false;
            $searchbox.autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: 'Get',
                        url: '/b2x/addresslookup/api/v1.0/address/GetEircodeAddressListAsync?eircode=' + request.term,
                        success: function (data) {
                            $('input.suggest-user').removeClass('ui-autocomplete-loading'); // hiding loading images for autocomplete
                            if (!$.trim(data)) {
                                $('div.autoaddress-control').append("<div class='autoaddress-options-msg info' ></div>");
                                $('div.autoaddress-options-msg', $userAddressDiv).not('#contingency').text($('#noResultFound').val());
                                $('div.autoaddress-options-msg', $userAddressDiv).not('#contingency').prepend('<span>');
                                $('.autoaddress-text-box').val('');

                            }

                            else {
                                response($.map(data, function (item) {
                                    return {
                                        label: item.streetNumber + " " + item.addressLine21 + " " + item.addressLine22 + " " + item.addressLine23 + " " + item.addressLine24,
                                        Eircode: item.eircode,
                                        Id: item.eircodeIdentifier,
                                        Houseno: item.streetNumber,
                                        Line1: item.addressLine21,
                                        Line2: item.addressLine22,
                                        Line3: item.addressLine23,
                                        Line4: item.addressLine24,
                                        matchLevel: item.matchLevel,
                                        matchResult: item.matchResult
                                    };
                                }));
                            }

                        },
                        error: function (data) {
                            $('input.suggest-user').removeClass('ui-autocomplete-loading');

                        }
                    });
                },
                minLength: 7,
                open: function () { },
                close: function (event) { },
                focus: function (event, ui) { },
                select: function (event, ui) {

                    $("#GetQuote, #Typeofvesseldetail").hide();
                    $('.hidequotedetails, .eircodeaddress, .useraddress').hide();

                    var addressId = ui.item.Id;
                    if (addressId !== undefined && Number(addressId.toString().substr(0, 2)) === 19 && organisation === false) {
                        $('div.autoaddress-control').append("<div class='autoaddress-options-msg info' ></div>")
                        $('div.autoaddress-options-msg', $userAddressDiv).not('#contingency').text($('#commercialAddress').val());
                        $('div.autoaddress-options-msg', $userAddressDiv).not('#contingency').prepend('<span>');
                        event.preventDefault();
                        $('.autoaddress-text-box').val('');

                    }
                    else {
                        $('div.autoaddress-control').append("<div class='autoaddress-options-msg success' ></div>");
                        $('div.autoaddress-options-msg', $userAddressDiv).not('#contingency').text($('#addressFound').val());
                        $('div.autoaddress-options-msg', $userAddressDiv).not('#contingency').prepend('<span>');
                        setTimeout(function () {
                            setaddressline('.addressline2', ui.item.Houseno, addressdiv);
                            setaddressline('.addressline3', ui.item.Line1, addressdiv);
                            setaddressline('.addressline4', ui.item.Line2, addressdiv);
                            setaddressline('.addressline5', ui.item.Line3, addressdiv);
                            setaddressline('.addressline6', ui.item.Line4, addressdiv);
                            setaddressline('.eircode', ui.item.Eircode.substring(0, 3) + ' ' + ui.item.Eircode.substring(3, 7), addressdiv);
                            setaddresshiddenvalue('.eircodeid', ui.item.Id, addressdiv);
                            setaddresshiddenvalue('.matchlevel', ui.item.MatchLevel, addressdiv);
                            setaddresshiddenvalue('.resultcode', ui.item.MatchResult, addressdiv);
                            $('.eircodeid', addressdiv).val(ui.item.Id);
                            $('.autoaddress-text-box').val('');
                            if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('motor') <= 0) {
                                if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('horseandrider') > 0)
                                    KOViewModel.AddressFound(true);
                            }

                            $('.hidequotedetails, .eircodeaddress, .useraddress').show();
                            $("#GetQuote").show();
                            if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('pleasurecraft') > 0) {

                                $("#GetQuote").show(); $('#Typeofvesseldetail').show();
                            }
                            else if ($.ALZ.GetApplicationRoot().toLowerCase().indexOf('pet') > 0) { $("#GetQuote").show(); $('.petquotedetails').show(); }

                        }, 70);
                    }

                }

            });

        }

        function setaddressline(element, addresslinevalue, container) {
            if (addresslinevalue !== "" && addresslinevalue !== null) {
                $(element, container).text(addresslinevalue).closest('.formitem').show();
            }
            else {
                $(element, container).closest('.formitem').hide();
            }
        }

        function setaddresshiddenvalue(element, addresslinevalue, container) {
            if (addresslinevalue !== "" && addresslinevalue !== null) {
                $(element, container).val(addresslinevalue);
            }
        }

        function logError(message) {
            if (message === null) return;
            // send error message
            $.ajax({
                type: 'POST',
                global: false,
                url: '/b2x/addresslookup/api/v1.0/address/LogGammaError?message=' + message
            });
        }
        //*******************------------------ALLIANZ---------------------------------------***************************

    });
}(jQuery));