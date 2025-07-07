(function ($) {
    'use strict';
    var MAXLENGTH_DATE = 2,
        MAXLENGTH_YEAR = 4,
        DATE_VALIDATION_ERROR = "Please enter your date of birth in the correct format (DD/MM/YYYY)",
        DATE_INVALID_ERROR = "Please enter a valid date of birth",
        DATE_RANGE_INVALID_ERROR = "Date of birth is outside of supported limits.",
        MIN_AGE = 18,
        MAX_AGE = 99,
        dOB = ".datefield",
        petDOB = ".petdatefield",
        invalidDOBRange = false,
        invalidDOB = false;
    $(function () {

        $("[id$=__DateOfBirth]").each(function (index, element) {
            $.ALZ.ClearMinDate(element);
        });

        $.ALZ.ClearMinDate("#CoverDateStart");
        $.ALZ.ClearMinDate("#PetDetailsDateOfBirth");
        $.ALZ.ClearMinDate("#PetDetailsPurchaseDate");
        $.ALZ.ClearMinDate("#CardExpireDate");

        $.ALZ.NumericOnly("#MainInsuredPhone");
        $.ALZ.NumericOnly("#MainInsuredMobile");

        $.ALZ.RestrictMaxCharacters("#MainInsuredFirstName", 20);
        $.ALZ.RestrictMaxCharacters("#MainInsuredLastName", 20);

        $.ALZ.RestrictMaxCharacters("#MainInsuredAddressHouseNumber", 5);
        $.ALZ.RestrictMaxCharacters("#MainInsuredAddressLine1", 30);
        $.ALZ.RestrictMaxCharacters("#MainInsuredAddressLine2", 30);
        $.ALZ.RestrictMaxCharacters("#MainInsuredEmail", 50);
        $.ALZ.RestrictMaxCharacters("#MainInsuredPhone", 14);
        $.ALZ.RestrictMaxCharacters("#MainInsuredMobile", 14);
        $.ALZ.RestrictMaxCharacters("#VetPracticeName", 40);
        $.ALZ.RestrictMaxCharacters("#VetPracticeAddress", 60);
        $.ALZ.RestrictMaxCharacters("#JointFirstName", 20);
        $.ALZ.RestrictMaxCharacters("#JointLastName", 20);
        $.ALZ.RestrictMaxCharacters("#PetName", 35);
        $.ALZ.RestrictMaxCharacters("#MicroChipNumberId", 20);

        $.ALZ.RestrictMaxCharacters("#PetDetailsRegisteredName", 35);
        $.ALZ.RestrictMaxCharacters("#PetDetailsPetName", 35);
        $.ALZ.RestrictMaxCharacters("#PlaceBorn", 100);

        $.ALZ.NumericOnly(".checkdateitem");

        var displayRecalculate = function () {
            $('#BuyQuote').hide();
            $('#ReCalculateQuote').show();
        };
        function DisplayMainContent(hide) {
            if (hide) {
                $('#content02').hide();
            } else {
                $('#content02').show();
                $.ALZ.FocusFirstError();
            }
        }

        if ($('#page2, #page3, #page4').length > 0) {
            $('.your-premium').show();
        }

        if ($("#page4").length === 1) { // This is only for the 4th page.
            $.ALZ.RestrictMaxCharacters("#ConfirmEmailAddressEmpty", 50);
            $.ALZ.RestrictMaxCharacters("#MainInsuredMobile", 14);
            $.ALZ.RestrictMaxCharacters("#AdditionalComments", 230);
            $.ALZ.RestrictMaxCharacters("#CardHolderName", 60);
            $.ALZ.RestrictMaxCharacters("#CardHolderPhoneNumber", 14);
            $.ALZ.RestrictMaxCharacters("#DirectDebitAccountHolderName", 60);
            $.ALZ.RestrictMaxCharacters("#DirectDebitIBAN", 22);
            $.ALZ.RestrictMaxCharacters("#DirectDebitBIC", 11);
            $.ALZ.RestrictMaxCharacters("#DirectDebitAccountHolderHouseNumber", 9);
            $.ALZ.RestrictMaxCharacters("#DirectDebitAccountHolderAddressLine1", 30);
            $.ALZ.RestrictMaxCharacters("#DirectDebitAccountHolderAddressLine2", 30);
            $.ALZ.RestrictMaxCharacters("#DirectDebitAccountHolderAddressLine3", 30);
            $.ALZ.RestrictMaxCharacters("#DirectDebitAccountHolderAddressLine4", 30);
        }

        if ($("#IsRecalculateEnabled").length > 0) {
            if ($.trim($('#IsRecalculateEnabled').val()).toLowerCase() === 'true') {
                displayRecalculate();
            }
        }

        $('#DeathFromIllnessExcess, #TheftAndStrayExcess, #CoverOptionsDisposal, #CoverOptionsThirdPartyLiabilityId, #SaddleryAndTackExcess, #SaddleryAndTackSumInsured, #CoverOptionsVeterinaryFeesId, #CoverOptionsVeterinaryFeesExcessId, #EmergencyVeterinaryFeesExcess, #CoverOptionsPermLossOfUseId,  #CoverOptionsPermLossOfUseExcessId, #CoverOptionsRiderPersonalAccidentId, #CoverOptionsTrailerSumInsuredId, #CoverOptionsTrailerMakeModel').change(function () {
            displayRecalculate();
        });

        $(".close.btn.standard.small").click(function () {
            var $errors = $(".input-validation-error");
            if ($errors.length > 0) {
                $errors.addClass('invalid');
                $errors.first().focus();
            }
        });

        if ($("#IsDomainError").length > 0 && $.trim($('#IsDomainError').val()).toLowerCase() === 'true') {
            $('#btnDomainError').click();
        } else if ($("#ReconfirmAddressRequired").length > 0 && $.trim($('#ReconfirmAddressRequired').val()).toLowerCase() === 'true') {
            $('#btnReconfirmAddressRequired').click();
        }

        if ($.ALZ.GetQueryStringValueByName('source').toLowerCase() === 'cancel') {
            $('#thanksmessage').hide();
            $('#thanksrefnum').show();
        } else {
            $('#thanksrefnum').hide();
            $('#thanksmessage').show();
        }


        function AddDateValidationError(datefieldclass) {
            $("span.error", $(datefieldclass)).remove();
            $(datefieldclass).children(".checkdateitem").css('background-color', '#f5f7c8');
            if (datefieldclass == dOB) {
                $(datefieldclass).siblings('span.alertIcon').remove();
                $(datefieldclass).after("<span class='alertIcon'></span>");
            }
            else {
                $(datefieldclass).parent().siblings('span.alertIcon').remove();
                $(datefieldclass).parent().after("<span class='alertIcon'></span>");
            }
            if (invalidDOBRange) {
                $(datefieldclass).append("<span class='error'>" + DATE_RANGE_INVALID_ERROR + "</span>");
                invalidDOBRange = false;
            }
            else if (invalidDOB)
                $(datefieldclass).append("<span class='error'>" + DATE_INVALID_ERROR + "</span>");
            else
                $(datefieldclass).append("<span class='error'>" + DATE_VALIDATION_ERROR + "</span>");
        }
        function DateValidation(datefieldClass, datefield, triggerElement) {
            var dateItems = $(datefieldClass).find(".checkdateitem");
            var _date = $(dateItems[0]).val();
            var _month = $(dateItems[1]).val();
            var _year = $(dateItems[2]).val();
            $(datefield).val(_date + "/" + _month + "/" + _year);
            var fulldate = new Date(_year, parseInt(_month) - 1, _date);
            var date = fulldate.getDate();
            var month = fulldate.getMonth() + 1;
            var year = fulldate.getFullYear();
            var currentDate = new Date();
            invalidDOB = false;
            if (dateItems[2] == triggerElement || _year.length == MAXLENGTH_YEAR) {
                if (_date.length == MAXLENGTH_DATE && _month.length == MAXLENGTH_DATE && _year.length == MAXLENGTH_YEAR && date == _date && month == _month && year == _year) {
                    if (fulldate <= currentDate) {
                        if (datefieldClass == ".datefield") {
                            var minAgeDate = new Date();
                            var maxAgeDate = new Date();
                            minAgeDate.setFullYear(minAgeDate.getFullYear() - MIN_AGE);
                            maxAgeDate.setFullYear(maxAgeDate.getFullYear() - MAX_AGE);
                            if (fulldate > minAgeDate || fulldate < maxAgeDate) {
                                invalidDOBRange = true;
                                AddDateValidationError(datefieldClass);
                                return false;
                            }
                        }
                        $("span.error", $(datefieldClass)).remove();
                        $(datefieldClass).children().css('background-color', '#fff');
                        if (datefieldClass == dOB) {
                            $(datefieldClass).siblings('span.alertIcon').remove();
                        }
                        else {
                            $(datefieldClass).parent().siblings('span.alertIcon').remove();
                        }
                        dateItems.removeClass("input-validation-error");
                        return true;
                    }
                    else {
                        invalidDOB = true;
                        AddDateValidationError(datefieldClass);
                        return false;
                    }
                }
                else {
                    AddDateValidationError(datefieldClass);
                    return false;
                }
            }
        }

        $.validator.addMethod("maininsureddob", function (value, element) {
            var $mainInsuredDOB = $("#MainInsuredDateOfBirth");
            return DateValidation(dOB, $mainInsuredDOB, element);
        });
        $.validator.unobtrusive.adapters.addBool("maininsureddob");

        $.validator.addMethod("petdob", function (value, element) {
            var petdate = "." + $(element).parent('div').attr('class');
            var $pet_DOB = $(element).parent().parent().find('input[type=hidden]');
            return DateValidation(petdate, $pet_DOB, element);
        });
        $.validator.unobtrusive.adapters.addBool("petdob");

        $("#Create").removeData("validator").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse($("#Create"));

        if (($('#JointTitleId').val() > 0) || ($('#JointFirstName').val() != "") || ($('#JointLastName').val() != "")) {
            $('#IsPetJointlyOwned').eq(0).prop("checked", true);
            $('#PetJointlyOwned').show();
        }
        else {
            $('#IsPetJointlyOwned').eq(1).prop("checked", true);
            $('#PetJointlyOwned').hide();
        }

        $("#divIsPetJointlyOwned").on("click", "#IsPetJointlyOwned", function () {
            if ($(this)[0].value.toLowerCase() === "false") {
                $('#JointTitleId').val("-1");
                $('#JointFirstName').val("");
                $('#JointLastName').val("");
            }
        });

        $("input[id*='MicroChipNumberId']").each(function () {
            $(this).on("focusout", function () {
                var $microchipnumber = $(this);
                var $elementDiv = $microchipnumber.parent().parent();
                if ($microchipnumber.val().length < 1 || $microchipnumber.val().length > 20)
                {
                    $microchipnumber.addClass('input-validation-error');
                    var $messageSpan = $elementDiv.find("span").first();
                    $messageSpan.removeClass('field-validation-valid').addClass('field-validation-error');
                    if ($microchipnumber.val().length > 20)
                        $messageSpan.text('Maximum length of Micro- Chip Number is 20 characters.');
                    else
                        $messageSpan.text('Micro- Chip Number cannot be empty.');

                    $elementDiv.removeClass('formfocus');

                    return false;
                }
            });
        });
        $("#ipidPrint").on("click", function () {
            var $divToPrint = $("#overlay-ipid");
            var ownerDocument = document.implementation.createHTMLDocument('virtual');
            var IPIDPage = $(ownerDocument.childNodes[1], ownerDocument).find($divToPrint).prevObject;
            var htmlToPrint = $(IPIDPage).clone();
            $(htmlToPrint).find(".ipidPrint").remove();
            $(htmlToPrint).find(".ipid-close").remove();
            var printWindow = window.open('', 'Print-Window');
            printWindow.document.open();
            printWindow.document.write('<html><link rel="stylesheet" href="' + $.ALZ.GetApplicationRoot() + '/Content/css/ipid.css" type="text/css" />');
            printWindow.document.write('<body onload="window.print()">' + htmlToPrint.html() + '</body></html > ');
            printWindow.document.close();
        });

        $.ALZ.ShowIfRadioYes("IsPetJointlyOwned", "#PetJointlyOwned");

    });
}(jQuery));