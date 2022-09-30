(function (w, d) {
    var u = null;
    w.__FILE__ = (function () {
        try {
            u();
        } catch (err) {
            if (err.stack) {
                u = (/(http[s]?:\/\/.*):\d+:\d+/m).exec(err.stack);
                if (u && u.length > 1) {
                    return u[1];
                }
            }
            u = (d.scripts.length > 0) ? d.scripts[d.scripts.length - 1].src : "";
            if (u.length > 0 && u.indexOf("://") < 0 && u.substring(0, 1) != "/") {
                u = location.protocol + "//" + location.host + "/" + u;
            }
            return u;
        }
    })();
    w.__DIR__ = (function (f) {
        f = (/^(.*\/)[a-z0-9 -_]+\.[a-z]+$/i).exec(f);
        return(f && f.length > 1) ? f[1] : "";
    })(w.__FILE__);
})(window, document);
Date.prototype.addYears = function (years) {
    var date = new Date(this.valueOf());
    date.setFullYear(parseInt(date.getFullYear()) + years);
    return date;
}
Date.prototype.addMonths = function (months) {
    var date = new Date(this.valueOf());
    date.setMonth(parseInt(date.getMonth()) + months);
    return date;
}
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(parseInt(date.getDate()) + days);
    return date;
}
Date.prototype.addHours = function (hours) {
    var date = new Date(this.valueOf());
    date.setHours(parseInt(date.getHours()) + hours);
    return date;
}
Date.prototype.addMinutes = function (minutes) {
    var date = new Date(this.valueOf());
    date.setMinutes(parseInt(date.getMinutes()) + minutes);
    return date;
}
Date.prototype.addSeconds = function (seconds) {
    var date = new Date(this.valueOf());
    date.setSeconds(parseInt(date.getSeconds()) + seconds);
    return date;
}
function jsUCfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function json2csv(JSONData, ReportTitle) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }
    if (CSV == '') {
        iziToast.error({title: 'Error', message: 'Invalid data', position: 'topCenter'});
        return;
    }
    var link = document.createElement("a");
    link.id = "lnkDwnldLnk";
    document.body.appendChild(link);
    var csv = CSV;
    blob = new Blob([csv], {type: 'text/csv'});
    var csvUrl = window.webkitURL ? window.webkitURL.createObjectURL(blob) : window.URL.createObjectURL(blob);
    var filename = ReportTitle + '.csv';
    $("#lnkDwnldLnk").attr({'download': filename, 'href': csvUrl});
    $('#lnkDwnldLnk')[0].click();
    document.body.removeChild(link);
}
angular.module("validation", []).factory("$custom", function ($http, $q) {
    var $custom = {};
    $custom.getAge = function (dob) {
        var age = new Date().getFullYear() - dob.getFullYear();
        var m = new Date().getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && new Date().getDate() < dob.getDate())) {
            age = age - 1;
        }
        return age;
    };
    $custom.formatDate = function (date, UTC) {
        var dd = date.getDate();
        dd = dd < 10 ? '0' + dd : dd;
        var mm = parseInt(date.getMonth()) + 1;
        mm = mm < 10 ? '0' + mm : mm;
        return UTC ? date.getFullYear() + '-' + mm + '-' + dd : dd + '/' + mm + '/' + date.getFullYear();
    };
    $custom.dateObj = function (date) {
        date = date.split('/');
        return new Date(date[2], parseInt(date[1]) - 1, parseInt(date[0]));
    };
    $custom.date = function (date) {
        date = new Date(date);
        var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var shortDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var fullDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dd = date.getDate();
        var fulldd = dd < 10 ? '0' + dd : dd;
        var mm = date.getMonth();
        var fullmm = (parseInt(mm) + 1) < 10 ? '0' + (parseInt(mm) + 1) : (parseInt(mm) + 1);
        var hr = date.getHours();
        var fullhr = hr < 10 ? '0' + hr : hr;
        var min = date.getMinutes();
        var fullmin = min < 10 ? '0' + min : min;
        var ss = date.getSeconds();
        var fullss = ss < 10 ? '0' + ss : ss;
        var mil = date.getMilliseconds();
        var yyyy = date.getFullYear();
        var day = date.getDay();
        var yearstamp = new Date(yyyy, 0);
        var monthstamp = new Date(yyyy, mm);
        var datestamp = new Date(yyyy, mm, dd);
        var month_last_date = monthstamp.addMonths(1).addDays(-1).getDate();
        var fullbint = month_last_date < 10 ? '0' + month_last_date : month_last_date;
        return{date: dd, numMonth: mm, hour: hr, minute: min, second: ss, millisecond: mil, weekday: day, monthLastDate: month_last_date, dd: fulldd, mm: fullmm, mon: mon[mm], month: month[mm], year: yyyy, hr: fullhr, min: fullmin, ss: fullss, yearstamp: yearstamp.getTime(), monthstamp: monthstamp.getTime(), datestamp: datestamp.getTime(), timestamp: date.getTime(), shortDay: shortDay[day], day: fullDay[day], now: date, t: fullbint, format: function (format) {
                return format.replace('ddd', dd).replace('mmm', parseInt(mm) + 1).replace('hhh', hr).replace('iii', min).replace('sss', ss).replace('ttt', fullbint).replace('dd', fulldd).replace('fullday', fullDay[day].toLowerCase()).replace('Fullday', fullDay[day]).replace('FULLDAY', fullDay[day].toUpperCase()).replace('day', shortDay[day].toLowerCase()).replace('Day', shortDay[day]).replace('DAY', shortDay[day].toUpperCase()).replace('mm', fullmm).replace('month', month[mm].toLowerCase()).replace('Month', month[mm]).replace('MONTH', month[mm].toUpperCase()).replace('mon', mon[mm].toLowerCase()).replace('Mon', mon[mm]).replace('MON', mon[mm].toUpperCase()).replace('yyyy', yyyy).replace('yy', yyyy.toString().substr(2, 2)).replace('hh', fullhr).replace('ii', fullmin).replace('ss', fullss).replace('milli', mil);
            }};
    };
    $custom.download = function (data, title, header) {
        var print_data = [];
        var header_defined = false;
        angular.forEach(data, function (v, k) {
            var row = [];
            if (header && !header_defined) {
                for (x in header) {
                    if (typeof v[x] != 'undefined') {
                        row[x] = header[x];
                    } else if (typeof v[header[x]] != 'undefined') {
                        row.push(header[x]);
                    }
                }
                print_data.push(row);
                row = [];
                header_defined = true;
            }
            if (header) {
                for (x in header) {
                    if (typeof v[x] != 'undefined') {
                        row[x] = v[x];
                         if(row[x] == null){
                            row[x] = '';
                        }
                    } else if (typeof v[header[x]] != 'undefined') {
                        row.push(v[header[x]]);
                    }
                }
            } else {
                angular.forEach(v, function (val, k) {
                    row.push(val);
                });
            }
            print_data.push(row);
        });
        json2csv(print_data, title + new Date().toString() + '.csv');
    };
    
    $custom.download1 = function (data, title, header,arrr) {
        var print_data = [];
        var header_defined = false;
        angular.forEach(data, function (v, k) {
            var row = [];
            if (header && !header_defined) {
                for (x in header) {
                    if (typeof v[x] != 'undefined') {
                        row[x] = header[x];
                    } else if (typeof v[header[x]] != 'undefined') {
                        row.push(header[x]);
                    }
                }
                print_data.push(row);
                row = [];
                header_defined = true;
            }
            if (header) {
                for (x in header) {
                    if (typeof v[x] != 'undefined') {
                        if(x == 'access_level'){
                            row[x] = arrr[v[x]];    
                        }
                        else
                        {
                            row[x] = v[x];
                        }
                        if(row[x] == null){
                            row[x] = 0;
                        }
                    } else if (typeof v[header[x]] != 'undefined') {
                        row.push(v[header[x]]);
                    }
                }
            } else {
                angular.forEach(v, function (val, k) {
                    row.push(val);
                });
            }
            print_data.push(row);
        });
        json2csv(print_data, title + new Date().toString() + '.csv');
    };
    $custom.Rs = function (amount) {
        var words = new Array();
        words[0] = 'Zero';
        words[1] = 'One';
        words[2] = 'Two';
        words[3] = 'Three';
        words[4] = 'Four';
        words[5] = 'Five';
        words[6] = 'Six';
        words[7] = 'Seven';
        words[8] = 'Eight';
        words[9] = 'Nine';
        words[10] = 'Ten';
        words[11] = 'Eleven';
        words[12] = 'Twelve';
        words[13] = 'Thirteen';
        words[14] = 'Fourteen';
        words[15] = 'Fifteen';
        words[16] = 'Sixteen';
        words[17] = 'Seventeen';
        words[18] = 'Eighteen';
        words[19] = 'Nineteen';
        words[20] = 'Twenty';
        words[30] = 'Thirty';
        words[40] = 'Forty';
        words[50] = 'Fifty';
        words[60] = 'Sixty';
        words[70] = 'Seventy';
        words[80] = 'Eighty';
        words[90] = 'Ninety';
        var op;
        amount = amount.toString();
        var atemp = amount.split(".");
        var number = atemp[0].split(",").join("");
        var n_length = number.length;
        var words_string = "";
        if (n_length <= 9) {
            var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            var received_n_array = new Array();
            for (var i = 0; i < n_length; i++) {
                received_n_array[i] = number.substr(i, 1);
            }
            for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                n_array[i] = received_n_array[j];
            }
            for (var i = 0, j = 1; i < 9; i++, j++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    if (n_array[i] == 1) {
                        n_array[j] = 10 + parseInt(n_array[j]);
                        n_array[i] = 0;
                    }
                }
            }
            value = "";
            for (var i = 0; i < 9; i++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    value = n_array[i] * 10;
                } else {
                    value = n_array[i];
                }
                if (value != 0) {
                    words_string += words[value] + " ";
                }
                if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Crores ";
                }
                if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Lakhs ";
                }
                if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Thousand ";
                }
                if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                    words_string += "Hundred and ";
                } else if (i == 6 && value != 0) {
                    words_string += "Hundred ";
                }
            }
            words_string = words_string.split(" ").join(" ");
        }
        return words_string;
    };
    $custom.RsPaise = function (n) {
        nums = n.toString().split('.')
        var whole = $custom.Rs(nums[0])
        if (nums[1] == null)
            nums[1] = 0;
        if (nums[1].length == 1)
            nums[1] = nums[1] + '0';
        if (nums[1].length > 2) {
            nums[1] = nums[1].substring(2, length - 1)
        }
        if (nums.length == 2) {
            if (nums[0] <= 9) {
                nums[0] = nums[0] * 10
            } else {
                nums[0] = nums[0]
            }
            ;
            var fraction = $custom.Rs(nums[1])
            if (whole == '' && fraction == '') {
                op = 'Zero only';
            }
            if (whole == '' && fraction != '') {
                op = 'paise ' + fraction + ' only';
            }
            if (whole != '' && fraction == '') {
                op = 'Rupees ' + whole + ' only';
            }
            if (whole != '' && fraction != '') {
                op = 'Rupees ' + whole + 'and paise ' + fraction + ' only';
            }
            amt = n;
            if (amt > 999999999.99) {
                op = 'Oops!!! The amount is too big to convert';
            }
            if (isNaN(amt) == true) {
                op = 'Error : Amount in number appears to be incorrect. Please Check.';
            }
            return op;
        }
    };
    $custom.post = function (url, data) {
        var canceller = $q.defer();
        var cancel = function (reason) {
            canceller.resolve(reason);
        };
        var promise = $http({method: "POST", url: url, data: 'data=' + data, timeout: canceller.promise, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
            return res;
        });
        return{promise: promise, cancel: cancel}
    };
    return $custom;
}).directive('validation', function () {
    return{restrict: 'AC', scope: {val: '=ngModel', required: '=ngRequired', assignValue: '=', assignCond: '=', onChange: '=', changeVar: '=', onValidate: '=', validateVar: '=', dateAge: '=', isMinor: '=', maxDate: '=', minDate: '=', maxValue: '=', minValue: '=', strictMinvalue: '=', validationMessage: '=', minLength: '=', maxLength: '=', camelCase: '=', }, link: function (scope, element, attrs) {
            scope.$watch('val', function (newVal, oldVal) {
                var required = typeof scope.required == 'undefined' ? element.prop('required') : scope.required;
                if (newVal) {
                    var valid = true;
                    var message = '';
                    if (element.attr('validation')) {
                        if (/^[a-z0-9\_\-\.]+/.test(element.attr('validation'))) {
                            if (element.attr('validation') == 'number') {
                                if (!/^[0-9]*$/.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                scope.val = parseFloat(scope.val);
                            }
                            if (element.attr('validation') == '	integer') {
                                if (!/^[1-9][0-9]*$/.test(scope.val)) {
                                    scope.val = oldVal;
                                    scope.val = parseInt(scope.val);
                                }
                            }
                            if (element.attr('validation') == 'float') {
                                if (!/^[1-9][0-9]*(\.)?[0-9]*$/.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                valid = /^[1-9][0-9]*(\.[0-9]+)?$/.test(scope.val);
                                if (!valid) {
                                    message = 'Invalid Validation type Float';
                                }
                            }
                            if (element.attr('validation') == 'numeric') {
                                if (!/^[0-9]*(\.)?[0-9]*$/.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                valid = /^[0-9]*(\.[0-9]+)?$/.test(scope.val);
                                if (!valid) {
                                    message = 'Invalid Validation type Numeric';
                                }
                            }
                            if (element.attr('validation') == 'alphabet') {
                                if (!/^[a-z]*$/i.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                if (typeof scope.camelCase == 'boolean' && scope.camelCase) {
                                    var val = scope.val.split(' ');
                                    angular.forEach(val, function (v, k) {
                                        val[k] = jsUCfirst(v);
                                    });
                                    scope.val = val.join(' ');
                                }
                            }
                            if (element.attr('validation') == 'alpha-space') {
                                if (!/^[a-z][a-z \s]*$/i.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                if (typeof scope.camelCase == 'boolean' && scope.camelCase) {
                                    var val = scope.val.split(' ');
                                    angular.forEach(val, function (v, k) {
                                        val[k] = jsUCfirst(v);
                                    });
                                    scope.val = val.join(' ');
                                }
                            }
                            if (element.attr('validation') == 'alpha-numeric') {
                                if (!/^[a-z0-9]*$/i.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                if (typeof scope.camelCase == 'boolean' && scope.camelCase) {
                                    var val = scope.val.split(' ');
                                    angular.forEach(val, function (v, k) {
                                        val[k] = jsUCfirst(v);
                                    });
                                    scope.val = val.join(' ');
                                }
                            }
                            if (element.attr('validation') == 'alpha-numeric-space') {
                                if (!/^[a-z0-9][a-z0-9 \s]*$/i.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                if (typeof scope.camelCase == 'boolean' && scope.camelCase) {
                                    var val = scope.val.split(' ');
                                    angular.forEach(val, function (v, k) {
                                        val[k] = jsUCfirst(v);
                                    });
                                    scope.val = val.join(' ');
                                }
                            }
                            if (element.attr('validation') == 'pincode') {
                                if (!/^[1-9][0-9]{0,5}$/.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                if (typeof scope.val != 'undefined' && scope.val.length < 6) {
                                    valid = false;
                                    message = 'Invalid PIN Code';
                                }
                            }
                            if (element.attr('validation') == 'mobile') {
                                if (!/^[6-9][0-9]{0,9}$/.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                if (typeof scope.val != 'undefined' && scope.val.length < 10) {
                                    valid = false;
                                    message = 'Invalid Mobile No.';
                                }
                            }
                            if (element.attr('validation') == 'email') {
                                if (!/(^[a-z0-9]+$)|(^[a-z0-9]+[\_\.\-]$)|(^[a-z0-9]+([\_\.\-][a-z0-9]+)*$)|(^[a-z0-9]+([\_\.\-][a-z0-9]+)*@$)|(^[a-z0-9]+([\_\.\-][a-z0-9]+)*@[a-z0-9]+$)|(^[a-z0-9]+([\_\.\-][a-z0-9]+)*@[a-z0-9]+[\_\.\-]$)|(^[a-z0-9]+([\_\.\-][a-z0-9]+)*@[a-z0-9]+([\_\.\-][a-z0-9]+)*$)|(^[a-z0-9]+([\_\.\-][a-z0-9]+)*@[a-z0-9]+([\_\.\-][a-z0-9]+)*\.$)|(^[a-z0-9]+([\_\.\-][a-z0-9]+)*@[a-z0-9]+([\_\.\-][a-z0-9]+)*\.[a-z0-9]+$)|(^[a-z0-9]+([\_\.\-][a-z0-9]+)*@[a-z0-9]+([\_\.\-][a-z0-9]+)*\.[a-z0-9]+[\_\.\-]$)|(^[a-z0-9]+([\_\.\-][a-z0-9]+)*@[a-z0-9]+([\_\.\-][a-z0-9]+)*\.[a-z0-9]+([\_\.\-][a-z0-9]+)*$)/i.test(scope.val)) {
                                    scope.val = oldVal;
                                }
                                valid = /^[a-z0-9]+([\_\.\-][a-z0-9]+)*@[a-z0-9]+([\_\.\-][a-z0-9]+)*\.[a-z0-9]+([\_\.\-][a-z0-9]+)*$/i.test(scope.val);
                                if (!valid) {
                                    message = 'Invalid Email No.';
                                }
                            }
                            if (element.attr('validation') == 'pan') {
                                if ((newVal.length <= 3 && !/^[a-z]+$/i.test(newVal)) || (newVal.length > 3 && newVal.length <= 5 && !/^[a-z]{3}[pfbhalcjgrt][a-z]?$/i.test(newVal)) || (newVal.length > 5 && newVal.length <= 9 && !/^[a-z]{3}[pfbhalcjgrt][a-z][0-9]{0,4}$/i.test(newVal)) || (newVal.length == 10 && !/^[a-z]{3}[pfbhalcjgrt][a-z][0-9]{4}[a-z]$/i.test(newVal)) || newVal.length > 10) {
                                    scope.val = oldVal;
                                }
                                valid = typeof scope.val != 'undefined' && scope.val.length == 10;
                                if (!valid) {
                                    message = 'Invalid PAN No.';
                                }
                            }
//                            if (element.attr('validation') == 'gst') {
//                                var gst = [];
//                                if (newVal.length > 0 && newVal.length <= 2) {
//                                    if (!/(^0[1-9]?$)|(^[12][0-9]?$)|(^3[1-7]?$)/.test(newVal)) {
//                                        scope.val = oldVal;
//                                    }
//                                } else {
//                                    gst.push(parseInt(newVal.substring(0, 2)));
//                                    if (!/(^0[1-9]?$)|(^[12][0-9]?$)|(^3[1-7]?$)/.test(gst[0])) {
//                                        scope.val = oldVal;
//                                    } else {
//                                        gst.push(newVal.substring(2, 12));
//                                        if ((gst[1].length <= 3 && !/^[a-z]+$/i.test(gst[1])) || (gst[1].length > 3 && gst[1].length <= 5 && !/^[a-z]{3}[pfbhalcjgrt][a-z]?$/i.test(gst[1])) || (gst[1].length > 5 && gst[1].length <= 9 && !/^[a-z]{3}[pfbhalcjgrt][a-z][0-9]{0,4}$/i.test(gst[1])) || (gst[1].length == 10 && !/^[a-z]{3}[pfbhalcjgrt][a-z][0-9]{4}[a-z]$/i.test(gst[1])) || gst[1].length > 10) {
//                                            gst.push(parseInt(gst[1].substring(0, 2)));
//                                            var y = parseInt(new Date().getFullYear().toString().substring(2));
//                                            if (isNaN(gst[2]) || (gst[2] < 10 && (gst[2] == 0 || gst[2] > parseInt(y.toString().substring(0, 1)))) || (gst[2] >= 10 && gst[2] < 17) || gst[2] > y) {
//                                                scope.val = oldVal;
//                                            } else {
//                                                if (gst[1].length > 2) {
//                                                    var cc = ['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BIH', 'BWA', 'BVT', 'BRA', 'VGB', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'HKG', 'MAC', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'ANT', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE'];
//                                                    gst.push(gst[1].substring(2, 5));
//                                                    var proceed = true;
//                                                    if (isNaN(parseInt(gst[3]))) {
//                                                        var matched = false;
//                                                        for (x in cc) {
//                                                            eval("var patt=/^" + gst[3] + "/i;");
//                                                            if (patt.test(cc[x])) {
//                                                                matched = true;
//                                                                break;
//                                                            }
//                                                        }
//                                                        if (!matched) {
//                                                            scope.val = oldVal;
//                                                            proceed = false;
//                                                        } else if ((newVal.length > 12 && (!/^[nuo]$/i.test(newVal[12]) || (newVal.length > 13 && (((/^[n]$/i.test(newVal[12]) && !/^[f]$/i.test(newVal[13])) || (/^[uo]$/i.test(newVal[12]) && !/^[n]$/i.test(newVal[13]))) || (newVal.length > 14 && ((/^[n]$/i.test(newVal[12]) && /^[f]$/i.test(newVal[13]) && !/^[t]$/i.test(newVal[14])) || (/^[u]$/i.test(newVal[12]) && /^[n]$/i.test(newVal[13]) && isNaN(newVal[14])) || (/^[o]$/i.test(newVal[12]) && /^[n]$/i.test(newVal[13]) && !/^[p]$/i.test(newVal[14])))))))) || newVal.length > 15) {
//                                                            scope.val = oldVal;
//                                                        }
//                                                    }
//                                                    if (proceed && gst[1].length > 5) {
//                                                        gst.push(parseInt(gst[1].substring(5, 10)));
//                                                        if (isNaN(gst[4]) || (newVal.length > 12 && (!/^[t]$/i.test(newVal[12]) || (newVal.length > 13 && (!/^[rm]$/i.test(newVal[13]) || (newVal.length > 14 && !/^[p]$/i.test(newVal[13]))))))) {
//                                                            scope.val = oldVal;
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        } else if ((newVal.length > 12 && (!/^[1-9a-z]$/i.test(newVal[12]) || (newVal.length > 13 && (!/^[sz1-9a-j]$/i.test(newVal[13]) || (newVal.length > 14 && isNaN(newVal[14])))))) || newVal.length > 15) {
//                                            scope.val = oldVal;
//                                        }
//                                    }
//                                }
//                                valid = typeof scope.val != 'undefined' && scope.val.length == 15;
//                                if (!valid) {
//                                    message = 'Invalid GSTN';
//                                }
//                            }
                             if (element.attr('validation') == 'gst') {
                                var gst = [];
                                if (newVal.length > 0 && newVal.length <= 2) {
                                    if (!/(^0[1-9]?$)|(^[12][0-9]?$)|(^3[1-7]?$)/.test(newVal)) {
                                        scope.val = oldVal;
                                    }
                                } else {
                                    gst.push(parseInt(newVal.substring(0, 2)));
                                    if (!/(^0[1-9]?$)|(^[12][0-9]?$)|(^3[1-7]?$)/.test(gst[0])) {
                                        scope.val = oldVal;
                                    } else {
                                        gst.push(newVal.substring(2, 12));
                                        if ((gst[1].length <= 3 && !/^[a-z]+$/i.test(gst[1])) || (gst[1].length > 3 && gst[1].length <= 5 && !/^[a-z]{3}[pfbhalcjgrt][a-z]?$/i.test(gst[1])) || (gst[1].length > 5 && gst[1].length <= 9 && !/^[a-z]{3}[pfbhalcjgrt][a-z][0-9]{0,4}$/i.test(gst[1])) || (gst[1].length == 10 && !/^[a-z]{3}[pfbhalcjgrt][a-z][0-9]{4}[a-z]$/i.test(gst[1])) || gst[1].length > 10) {
                                            gst.push(parseInt(gst[1].substring(0, 2)));
                                            var y = parseInt(new Date().getFullYear().toString().substring(2));
                                            if (isNaN(gst[2]) || (gst[2] < 10 && (gst[2] == 0 || gst[2] > parseInt(y.toString().substring(0, 1)))) || (gst[2] >= 10 && gst[2] < 17) || gst[2] > y) {
                                                scope.val = oldVal;
                                            } else {
                                                if (gst[1].length > 2) {
                                                    var cc = ['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BIH', 'BWA', 'BVT', 'BRA', 'VGB', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'HKG', 'MAC', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'ANT', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE'];
                                                    gst.push(gst[1].substring(2, 5));
                                                    var proceed = true;
                                                    if (isNaN(parseInt(gst[3]))) {
                                                        var matched = false;
                                                        for (x in cc) {
                                                            eval("var patt=/^" + gst[3] + "/i;");
                                                            if (patt.test(cc[x])) {
                                                                matched = true;
                                                                break;
                                                            }
                                                        }
                                                        if (!matched) {
                                                            scope.val = oldVal;
                                                            proceed = false;
                                                        } else if ((newVal.length > 12 && (!/^[nuo]$/i.test(newVal[12]) || (newVal.length > 13 && (((/^[n]$/i.test(newVal[12]) && !/^[f]$/i.test(newVal[13])) || (/^[uo]$/i.test(newVal[12]) && !/^[n]$/i.test(newVal[13]))) || (newVal.length > 14 && ((/^[n]$/i.test(newVal[12]) && /^[f]$/i.test(newVal[13]) && !/^[t]$/i.test(newVal[14])) || (/^[u]$/i.test(newVal[12]) && /^[n]$/i.test(newVal[13]) && isNaN(newVal[14])) || (/^[o]$/i.test(newVal[12]) && /^[n]$/i.test(newVal[13]) && !/^[p]$/i.test(newVal[14])))))))) || newVal.length > 15) {
                                                            scope.val = oldVal;
                                                        }
                                                    }
                                                    if (proceed && gst[1].length > 5) {
                                                        gst.push(parseInt(gst[1].substring(5, 10)));
                                                        if (isNaN(gst[4]) || (newVal.length > 12 && (!/^[t]$/i.test(newVal[12]) || (newVal.length > 13 && (!/^[rm]$/i.test(newVal[13]) || (newVal.length > 14 && !/^[p]$/i.test(newVal[13]))))))) {
                                                            scope.val = oldVal;
                                                        }
                                                    }
                                                }
                                            }
                                        } else if ((newVal.length > 12 && (!/^[1-9a-z]$/i.test(newVal[12]) || (newVal.length > 13 && (!/^[sz1-9a-j]$/i.test(newVal[13]) || (newVal.length > 14 && !/^[1-9a-z]$/i.test(newVal[14])))))) || newVal.length > 15) {
                                            scope.val = oldVal;
                                        }
                                    }
                                }
                                valid = typeof scope.val != 'undefined' && scope.val.length == 15;
                                if (!valid) {
                                    message = 'Invalid GSTN';
                                }
                            }
                            if (element.attr('validation') == 'aadhaar') {
                                if (!/^[2-9][0-9]*$/.test(scope.val) || scope.val.length > 12) {
                                    scope.val = oldVal;
                                }
                                valid = /^[2-9][0-9]{11}$/.test(scope.val);
                                element.attr('validated', valid);
                                if (!valid) {
                                    message = 'Invalid Aadhaar No.';
                                }
                            }
                            if (element.attr('validation') == 'aadhaarLast4') {
                                if (!/^[0-9]*$/.test(scope.val) || scope.val.length >4) {
                                    scope.val = oldVal;
                                }
                                valid = /^[0-9]{4}$/.test(scope.val);
                                element.attr('validated', valid);
                                if (!valid) {
                                    message = 'Invalid Aadhaar No.';
                                }
                            }
                            if (element.attr('validation') == 'date') {
                                valid = false;
                                if (newVal.length == 1 && !/^[0-3]$/.test(newVal)) {
                                    scope.val = oldVal;
                                }
                                if (newVal.length == 2) {
                                    if (/^([0][1-9])|([12][0-9])|([3][01])$/.test(newVal)) {
                                        if (newVal.length > oldVal.length) {
                                            scope.val += '/';
                                        }
                                    } else {
                                        scope.val = oldVal;
                                    }
                                }
                                if (newVal.length == 3 && !/^(([0][1-9])|([12][0-9])|([3][01]))[\/]$/.test(newVal)) {
                                    scope.val = oldVal;
                                }
                                if (newVal.length == 4 && !/^(([0][1-9])|([12][0-9])|([3][01]))[\/][01]$/.test(newVal)) {
                                    scope.val = oldVal;
                                }
                                if (newVal.length == 5) {
                                    if (/^(([0][1-9])|([12][0-9])|([3][01]))[\/](([0][1-9])|([1][012]))$/.test(newVal)) {
                                        if (newVal.length > oldVal.length) {
                                            scope.val += '/';
                                        }
                                    } else {
                                        scope.val = oldVal;
                                    }
                                }
                                if (newVal.length == 6 && !/^(([0][1-9])|([12][0-9])|([3][01]))[\/](([0][1-9])|([1][012]))[\/]$/.test(newVal)) {
                                    scope.val = oldVal;
                                }
                                if (newVal.length >= 7 && !/^(([0][1-9])|([12][0-9])|([3][01]))[\/](([0][1-9])|([1][012]))[\/][012][0-9]{0,3}$/.test(newVal)) {
                                    scope.val = oldVal;
                                }
                                if (newVal.length >= 5) {
                                    var dob = scope.val.split('/');
                                    if (dob[0] == 31 && [1, 3, 5, 7, 8, 10, 12].indexOf(parseInt(dob[1])) == -1) {
                                        scope.val = oldVal;
                                    }
                                    if (dob[0] == 30 && parseInt(dob[1]) == 2) {
                                        scope.val = oldVal;
                                    }
                                }
                                if (newVal.length == 10) {
                                    var d = new Date(dob[2], parseInt(dob[1]) - 1, parseInt(dob[0]));
                                    if (d.getFullYear() != dob[2] || d.getMonth() != parseInt(dob[1]) - 1 || d.getDate() != parseInt(dob[0])) {
                                        scope.val = oldVal;
                                    } else {
                                        var max = scope.maxDate && scope.maxDate != '' ? new Date(scope.maxDate).getTime() : scope.maxDate;
                                        var min = scope.minDate && scope.minDate != '' ? new Date(scope.minDate).getTime() : scope.minDate;
                                        var current = d.getTime();
                                        if ((max && current > max) || (min && current < min)) {
                                            scope.val = oldVal;
                                        } else {
                                            var age = new Date().getFullYear() - d.getFullYear();
                                            var m = new Date().getMonth() - d.getMonth();
                                            if (m < 0 || (m === 0 && new Date().getDate() < d.getDate())) {
                                                age = age - 1;
                                            }
                                            if (typeof scope.dateAge != 'undefined') {
                                                scope.dateAge = age.toString();
                                            }
                                            if (typeof scope.isMinor != 'undefined') {
                                                scope.isMinor = age < 18;
                                            }
                                            valid = true;
                                        }
                                    }
                                }
                                if (newVal.length > 10) {
                                    scope.val = oldVal;
                                }
                                valid = scope.val.length == 10 ? true : valid;
                                if (!valid) {
                                    message = 'Invalid Date';
                                }
                            }
                        } else {
                            if (!eval(element.attr('validation') + ".test(scope.val)")) {
                                scope.val = oldVal;
                            }
                        }
                        if (scope.maxValue) {
                            if (parseFloat(scope.maxValue) < parseFloat(scope.val)) {
                                scope.val = oldVal;
                            }
                        }
                    }
                    if (element.attr('max-length') && newVal.length > parseFloat(scope.maxLength)) {
                        scope.val = oldVal;
                    }
                    valid = element.attr('min-length') && newVal.length < parseFloat(scope.minLength) ? false : valid;
                    if (scope.minValue) {
                        if (parseFloat(scope.minValue) > parseFloat(scope.val)) {
                            if (scope.strictMinvalue) {
                                scope.val = oldVal;
                            } else {
                                valid = false;
                            }
                        }
                    }
                    element.attr('validated', valid);
                } else {
                    element.attr('validated', !required);
                }
                if (element.attr('assign-cond')) {
                    if (scope.assignCond) {
                        scope.assignValue = scope.val;
                    }
                } else {
                    if (element.attr('assign-value')) {
                        scope.assignValue = scope.val;
                    }
                }
                if (element.attr('validated') == 'true' && element.attr('on-validate') && typeof scope.onValidate != 'undefined') {
                    if (element.attr('validate-var') && typeof scope.validateVar != 'undefined') {
                        scope.onValidate(scope.validateVar, function (ret) {
                            element.attr('validated', ret.success);
                            if (!ret.success) {
                                if (ret.message) {
                                    element.attr('title', ret.message);
                                }
                                if (ret.oldvar) {
                                    scope.val = oldVal;
                                }
                                if (ret.validatevar) {
                                    scope.val = ret.validatevar;
                                }
                            }
                        });
                    } else {
                        scope.onValidate(function (ret) {
                            element.attr('validated', ret.success);
                            if (!ret.success) {
                                if (ret.message) {
                                    element.attr('title', ret.message);
                                }
                                if (ret.oldvar) {
                                    scope.val = oldVal;
                                }
                                if (ret.validatevar) {
                                    scope.val = ret.validatevar;
                                }
                            }
                        });
                    }
                }
                if (element.attr('on-change') && typeof scope.onChange != 'undefined') {
                    if (element.attr('change-var') && typeof scope.changeVar != 'undefined') {
                        scope.onChange(scope.changeVar, function (ret) {
                            element.attr('validated', ret.success);
                            if (!ret.success) {
                                if (ret.message) {
                                    element.attr('title', ret.message);
                                }
                                if (ret.oldvar) {
                                    scope.val = oldVal;
                                }
                            }
                        });
                    } else {
                        scope.onChange(function (ret) {
                            element.attr('validated', ret.success);
                            if (!ret.success) {
                                if (ret.message) {
                                    element.attr('title', ret.message);
                                }
                                if (ret.oldvar) {
                                    scope.val = oldVal;
                                }
                            }
                        });
                    }
                }
            }, true);
        }}
}).directive('loadingLoader', ['$http', function ($http)
    {
        return{restrict: 'A', link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };
                scope.$watch(scope.isLoading, function (v)
                {
                    if (v) {
                        var show = false;
                        angular.forEach($http.pendingRequests, function (a) {
                            a = decodeURIComponent(a.url.split('?').splice(1, 1).join('?')).split('&');
                            angular.forEach(a, function (b) {
                                if (/^loading-loader/.test(b)) {
                                    b = b.split('=').splice(1, 1).join('=');
                                    if (b == 'true') {
                                        show = 'true';
                                    }
                                }
                            });
                        });
                        if (!show) {
                            show = 'true';
                        }
                        if (show == 'true') {
                            elm.show();
                        }
                    } else {
                        elm.hide();
                    }
                });
            }};
    }]).directive('autoSuggest', function ($compile, $timeout) {
    return{restrict: 'A', scope: {source: '=', ngModel: '=ngModel', }, link: function (scope, element, attr) {
            scope.src = scope.source;
            var elementNum = angular.element(document).find('validation-select').length;
            var container = angular.element('<span class="validation-select"></span>');
            var e = angular.element('<input type="text" ng-model="myelementcustommodelfortypeahead' + elementNum + '" ng-keydown="assignActive($event)">');
            var ul = angular.element('<ul><li ng-repeat="x in src track by $index" data-index="{{$index}}" ng-click="assign(x)">{{x.' + attr.view + '}}</li></ul>');
            angular.forEach(attr, function (v, k) {
                if (typeof v == 'string' && k != 'my-element' && k != 'ng-model') {
                    e.attr(k, v);
                    element.removeAttr(k);
                }
            });
            ul.on('mouseenter', 'li', function () {
                $(this).addClass('active');
            });
            ul.on('mouseleave', 'li', function () {
                $(this).removeClass('active');
            });
            e.on('focus', function () {
                ul.show();
            });
            angular.element(document).click(function (event) {
                if (event.target.closest('.validation-select input')) {
                    ul.show();
                } else {
                    ul.hide();
                }
            });
            scope.assign = function (data) {
                if (element.attr('ng-model') && element.attr('ng-model') != '') {
                    scope.ngModel = data;
                    scope['myelementcustommodelfortypeahead' + elementNum] = data[attr.view];
                }
                if (ul.find('li.active').length) {
                    ul.find('li.selected').removeClass('selected');
                    ul.find('li.active').addClass('selected');
                }
                ul.hide();
            };
            scope.assignActive = function (event) {
                if ((event.which || event.keyCode) == '9') {
                    if (ul.find('li.active').length) {
                        ul.find('li.active').addClass('selected');
                        scope.assign(scope.src[ul.find('li.active').data('index')]);
                    } else {
                        var firstSelected = false;
                        ul.find('li').each(function () {
                            if (!firstSelected) {
                                eval('var patt=/^' + scope['myelementcustommodelfortypeahead' + elementNum] + '/i;');
                                if (patt.test(scope.src[angular.element(this).data('index')][attr.view])) {
                                    firstSelected = angular.element(this);
                                }
                            }
                        });
                        if (firstSelected) {
                            ul.find('li.active').removeClass('active');
                            ul.find('li.selected').removeClass('selected');
                            firstSelected.addClass('active');
                            firstSelected.addClass('selected');
                            scope.assign(scope.src[firstSelected.data('index')]);
                        }
                    }
                    $timeout(function () {
                        ul.hide();
                    }, 10);
                }
                if ((event.which || event.keyCode) == '13') {
                    if (ul.css('display') == 'none') {
                        ul.show();
                    } else {
                        if (ul.find('li.active').length) {
                            ul.find('li.active').addClass('selected');
                            scope.assign(scope.src[ul.find('li.active').data('index')]);
                        } else {
                            var firstSelected = false;
                            ul.find('li').each(function () {
                                if (!firstSelected) {
                                    eval('var patt=/^' + scope['myelementcustommodelfortypeahead' + elementNum] + '/i;');
                                    if (patt.test(scope.src[angular.element(this).data('index')][attr.view])) {
                                        firstSelected = angular.element(this);
                                    }
                                }
                            });
                            if (firstSelected) {
                                ul.find('li.active').removeClass('active');
                                ul.find('li.selected').removeClass('selected');
                                firstSelected.addClass('active');
                                firstSelected.addClass('selected');
                                scope.assign(scope.src[firstSelected.data('index')]);
                            }
                        }
                        $timeout(function () {
                            ul.hide();
                        }, 10);
                    }
                }
                if ((event.which || event.keyCode) == '38') {
                    if (ul.css('display') == 'none') {
                        ul.show();
                    } else {
                        var elem = ul.find('li.active');
                        if (elem.length) {
                            if (ul.find('li').first().hasClass('active')) {
                                elem.removeClass('active');
                                ul.find('li').last().addClass('active');
                            } else {
                                elem.removeClass('active');
                                elem.prev().addClass('active');
                            }
                        } else {
                            ul.find('li').last().addClass('active');
                        }
                    }
                }
                if ((event.which || event.keyCode) == '40') {
                    if (ul.css('display') == 'none') {
                        ul.show();
                    } else {
                        var elem = ul.find('li.active');
                        if (elem.length) {
                            if (ul.find('li').last().hasClass('active')) {
                                elem.removeClass('active');
                                ul.find('li').first().addClass('active');
                            } else {
                                elem.removeClass('active');
                                elem.next().addClass('active');
                            }
                        } else {
                            ul.find('li').first().addClass('active');
                        }
                    }
                }
            };
            container.append(e);
            container.append(ul);
            $compile(container)(scope);
            container.insertAfter(element);
            element.hide();
            ul.width(e.width() + 25);
            angular.element(window).resize(function () {
                ul.width(e.width() + 25);
            });
            scope.$watch('myelementcustommodelfortypeahead' + elementNum, function (newval, oldval) {
                if (newval) {
                    var src = [];
                    var found = false;
                    angular.forEach(scope.source, function (v, k) {
                        eval('var patt=/' + newval + '/i;');
                        if (patt.test(v[attr.search])) {
                            src.push(v);
                            if (newval == v[attr.search] && !found) {
                                found = true;
                            }
                        }
                    });
                    if (!found) {
                        scope.ngModel = null;
                    }
                    scope.src = src;
                    if (scope.src.length) {
                        ul.show();
                    }
                } else {
                    scope.ngModel = null;
                    scope.src = scope.source;
                }
            });
        }}
}).directive('pagination', function ($compile, $timeout) {
    return{restrict: 'A', link: function (scope, element, attrs) {
            scope.current = 1;
            var table = element.prop('tagName') == 'TABLE' ? element : element.parents('table');
            var pagination = angular.element('<div></div>');
            var firstBtn = angular.element('<a class="btn btn-default" ng-disabled="' + (scope.current == 1 ? 'true' : 'false') + '"><<</a>');
            var lastBtn = angular.element('<a class="btn btn-default">>></a>');
            var previousBtn = angular.element('<a class="btn btn-default" ng-disabled="' + (scope.current == 1 ? 'true' : 'false') + '"><</a>');
            var nextBtn = angular.element('<a class="btn btn-default">></a>');
            pagination.html(firstBtn);
            pagination.append(previousBtn);
            pagination.append(nextBtn);
            pagination.append(lastBtn);
            $compile(pagination)(scope);
            table.after(pagination);
            $timeout(function () {
                scope.$watch('current', function () {});
            });
        }};
});
$('[ng-controller]').each(function () {
    if (!$(this).find('[loading-loader]').length) {
        $(this).append('<div class="pageover-loader" loading-loader><div style="position:fixed;top:0px;left:0px;bottom:0px;right:0px;background-color:#000;z-index:1001!important;opacity:1;"></div><img style="position:fixed;top:0;left:0px;bottom:0;right:0;margin:auto;z-index:1002!important;" height="100" src="' + __DIR__ + 'loader.gif"></div>');
    }
});