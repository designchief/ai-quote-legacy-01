/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
(function ($) {
    $(function () {
        var datePicker1 = new Pet.TextboxDatePicker($("#CoverDateStart"), $("#CoverDateStart_img"));
        datePicker1.MinDate = "+1D";
        datePicker1.MaxDate = MaxDateFormat;
        datePicker1.bind();
    });
}(jQuery));
var MaxDate = $("#CoverNumberOfDaysInAdvance").val();
var MaxDateFormat = "+" + (parseInt(MaxDate)) + "D";
var Pet;
(function (Pet) {
    "use strict";
    var TextboxDatePicker = /** @class */ (function () {
        function TextboxDatePicker(textbox, icon) {
            this.MinDate = "-90Y";
            this.MaxDate = "-1D";
            this.textbox = textbox;
            this.icon = icon;
            this.click();
            this.setValidDate();
            this.resetMessageOnFocus();
            this.resetMessageOnIconClick();
        }
        TextboxDatePicker.prototype.bind = function () {
            this.textbox.datepicker({
                minDate: this.MinDate,
                maxDate: this.MaxDate,
                yearRange: "-90:+10",
                dateFormat: "dd/mm/yy",
                changeMonth: true,
                changeYear: true,
                beforeShow: function (input, inst) {
                    $(".ui-datepicker").css("font-size", 12);
                },
                onSelect: function (dateText, inst) {
                },
                onClose: function (dateText, inst) {
                    var minDate = $.datepicker._determineDate(inst, inst.settings.minDate, new Date());
                    var maxDate = $.datepicker._determineDate(inst, inst.settings.maxDate, new Date());
                    var lastVal = $.datepicker._determineDate(inst, inst.lastVal, new Date());
                    if (inst.lastVal != "" && dateText != "" && (lastVal < minDate || lastVal > maxDate)) {
                        if (inst.settings.maxDate == MaxDateFormat) {
                            $(inst.input.context).parent().parent()
                                .append("<span class='error'>Date automatically updated. Please select a date within the next " + MaxDate + " days.</span>");
                        }
                        else {
                            $(inst.input.context).parent().parent()
                                .append("<span class='error'>Date automatically updated.</span>");
                        }
                    }
                }
            });
        };
        TextboxDatePicker.prototype.click = function () {
            var _this = this;
            this.icon.click(function (e) {
                e.stopImmediatePropagation();
                _this.textbox.datepicker("show");
            });
        };
        TextboxDatePicker.prototype.setValidDate = function () {
            var _this = this;
            this.textbox.change(function (e) {
                _this.textbox.datepicker("setDate", $(e.srcElement).val());
            });
        };
        TextboxDatePicker.prototype.resetMessageOnFocus = function () {
            var _this = this;
            this.textbox.focus(function (e) {
                _this.clearDateMessage(e);
            });
        };
        TextboxDatePicker.prototype.resetMessageOnIconClick = function () {
            var _this = this;
            this.icon.click(function (e) {
                _this.clearDateMessage(e);
            });
        };
        TextboxDatePicker.prototype.clearDateMessage = function (e) {
            // JN - this can probably be done in a better way
            var elementId = $(e.srcElement).attr('id');
            $("span", $(e.srcElement).parent().parent()).remove();
            $(e.srcElement).parent().parent()
                .append("<span class='error field-validation-valid' data-valmsg-for='"
                + elementId + "' data-valmsg-replace='true'></ span>");
        };
        return TextboxDatePicker;
    }());
    Pet.TextboxDatePicker = TextboxDatePicker;
})(Pet || (Pet = {}));
//# sourceMappingURL=TextboxDatePicker.js.map