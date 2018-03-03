$(document).ready(function () {
    console.log("Try getting API data");
    queue()
        .defer(d3.json, "/app/api/get_data/")
        .awaitAll(handleData);

    function handleData(error, data) {
        graphKPIDashboard(data[0]);
    }

    function graphKPIDashboard(recordsJson) {
        console.log("Inside graphing func");
        //Clean data
        var records = [];
        //var dateFormat = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ");
        var dateFormat = d3.time.format.iso;


        recordsJson.forEach(function (d) {
            console.log("Entering json loop");
            audits_len = d['audits'].length
            wasteful_len = d['wasteful'].length
            maintenance_len = d['maintenance'].length
            balance_sheets = d['maintenance'].length
            maintenance_len = d['maintenance'].length
            maintenance_len = d['maintenance'].length
            maintenance_len = d['maintenance'].length
            maintenance_len = d['maintenance'].length

            var length = audits_len
            if (wasteful_len > length) {
                length = wasteful_len
            }
            if (maintenance_len > length) {
                length = maintenance_len
            }

            for (var i = 0; i < length; i++) {
                console.log("Entering length loop");
                tmp = {}
                tmp['category'] = d['category']
                tmp['name'] = d['name']
                if (i < audits_len) {
                    tmp['audits_fy'] = d['audits'][i]['financial_year_end']
                    tmp['audit_opinion'] = d['audits'][i]['opinion']
                } else {
                    tmp['audits_fy'] = 'None'
                    tmp['audit_opinion'] = 'None'
                }
                if (i < wasteful_len) {
                    tmp['wasteful_fy'] = d['wasteful'][i]['financial_year_end']
                    tmp['wasteful_amount'] = Number(d['wasteful'][i]['amount'])
                    tmp['wasteful_name'] = d['wasteful'][i]['item_label']
                } else {
                    tmp['wasteful_fy'] = 'None'
                    tmp['wasteful_amount'] = 'None'
                    tmp['wasteful_name'] = 'None'
                }
                if (i < maintenance_len) {
                    tmp['maintenance_fy'] = d['maintenance'][i]['financial_year_end']
                    tmp['maintenance_amount'] = Number(d['maintenance'][i]['amount'])
                    tmp['maintenance_name'] = d['maintenance'][i]['item_label']
                    tmp['maintenance_type'] = d['maintenance'][i]['amount_type']
                } else {
                    tmp['maintenance_fy'] = 'None'
                    tmp['maintenance_amount'] = 'None'
                    tmp['maintenance_name'] = 'None'
                    tmp['maintenance_type'] = 'None'
                }

                records.push(tmp);
            }
            console.log("Leaving len loop");

            /*
            tmp["date_submitted"] = dateFormat.parse(d["date_submitted"]);
            tmp["date_created"] = new Date(d["date_created"]);
            tmp["date_submitted"].setMinutes(0);
            tmp["date_submitted"].setSeconds(0);
            tmp["category"] = d["category"];
            tmp["defect"] = d["defect"];
            tmp["location"] = d["location"];
            var user = d['reporters'][i]['user'];
            tmp["reporter"] = user['first_name'] + " " + user['last_name'];
            records.push(tmp);
            }*/
        });
        console.log("Leaving json loop");

        //console.log(records);

        console.log("Starting with crossfilter")
        //Create a Crossfilter instance
        var ndx = crossfilter(records);

        var categoryDim = ndx.dimension(function (d) { return d["category"]; });
        var categoryGroup = categoryDim.group();

        var charts_height = 150
        dc.pieChart("#category-chart")
            .width(200)
            .height(charts_height)
            .dimension(categoryDim)
            .group(categoryGroup)
            .legend(dc.legend().x(210).y(20))
            .innerRadius(20);

        var maintenanceFYDim = ndx.dimension(function (d) { return d["maintenance_fy"]; });
        var maintenanceFYGroup = maintenanceFYDim.group();
        var filteredMaintenanceGroup = {
            all: function () {
                return maintenanceFYGroup.top(Infinity).filter(function (d) {
                    //console.log("#####", d.key);
                    return d.key !== 'None';
                });
            }
        }
        dc.barChart("#maintenance-chart")
            .width(200)
            .height(charts_height)
            //.margins({ top: 10, right: 50, bottom: 40, left: 40 })
            .dimension(maintenanceFYDim)
            .group(filteredMaintenanceGroup) //auditsFYGroup)
            .controlsUseVisibility(true)
            .transitionDuration(500)
            .x(d3.scale.ordinal().domain(["2011", "2012", "2013", "2014", "2015", "2016"]))
            .xUnits(dc.units.ordinal)
            //.xAxisLabel("Year")
            //.yAxisLabel("Number of audits")
            .barPadding(0.1)
            .yAxis().ticks(5);


        var auditsFYDim = ndx.dimension(function (d) { return d["audits_fy"]; });
        var auditsFYGroup = auditsFYDim.group();
        var filteredAuditsGroup = {
            all: function () {
                return auditsFYGroup.top(Infinity).filter(function (d) {
                    //console.log("#####", d.key);
                    return d.key !== 'None';
                });
            }
        }
        dc.barChart("#audits-chart")
            .width(200)
            .height(charts_height)
            //.margins({ top: 10, right: 50, bottom: 40, left: 40 })
            .dimension(auditsFYDim)
            .group(filteredAuditsGroup) //auditsFYGroup)
            .controlsUseVisibility(true)
            .transitionDuration(500)
            .x(d3.scale.ordinal().domain(["2011", "2012", "2013", "2014", "2015", "2016"]))
            .xUnits(dc.units.ordinal)
            //.xAxisLabel("Year")
            //.yAxisLabel("Number of audits")
            .barPadding(0.1)
            .yAxis().ticks(5);


        var wastefulFYDim = ndx.dimension(function (d) { return d["wasteful_fy"]; });
        //var wastefulamountDim = ndx.dimension(function (d) { return d["wasteful_amount"]; });
        var wastefulFYGroup = wastefulFYDim.group().reduceSum(function (d) { return d.wasteful_amount });
        var filteredWastefulGroup = {
            all: function () {
                return wastefulFYGroup.top(Infinity).filter(function (d) {
                    return d.key !== 'None';
                });
            }
        }
        dc.barChart("#wasteful-chart")
            .width(170)
            .height(charts_height)
            .dimension(wastefulFYDim)
            .group(filteredWastefulGroup)
            .controlsUseVisibility(true)
            .transitionDuration(500)
            .x(d3.scale.ordinal().domain(["2012", "2013", "2014", "2015"]))
            .xUnits(dc.units.ordinal)
            .barPadding(0.1)
            .yAxis().ticks(5).tickFormat(d3.format('.1s'));

        dc.renderAll();
        console.log("Done with crossfilter")

        console.log(filteredAuditsGroup);

        /*/Define Dimensions
        var submittedDim = ndx.dimension(function (d) { return d["date_submitted"]; });
        var createdDim = ndx.dimension(function (d) { return d["date_created"]; });
        var categoryDim = ndx.dimension(function (d) { return d["category"]; });
        var defectDim = ndx.dimension(function (d) { return d["defect"]; });
        var locationDim = ndx.dimension(function (d) { return d["location"]; });
        var reporterDim = ndx.dimension(function (d) { return d["reporter"]; });
        var allDim = ndx.dimension(function (d) { return d; });

        //Group Data
        var submittedGroup = submittedDim.group();
        var createdGroup = createdDim.group();
        var categoryGroup = categoryDim.group();
        var defectGroup = defectDim.group();
        var locationGroup = locationDim.group();
        var reporterGroup = reporterDim.group();
        var all = ndx.groupAll();

        //Charts
        var numberRecordsND = dc.numberDisplay("#number-records-nd");
        var submittedChart = dc.barChart("#submitted-chart");
        //var createdChart = dc.barChart("#created-chart");
        var categoryChart = dc.pieChart("#category-chart");
        var defectChart = dc.rowChart("#defect-chart");
        var locationChart = dc.rowChart("#location-chart");
        var reporterChart = dc.rowChart("#reporter-chart");

        var minDate = submittedDim.bottom(1)[0]["date_submitted"];
        var maxDate = submittedDim.top(1)[0]["date_submitted"];

        numberRecordsND
            .formatNumber(d3.format("d"))
            .valueAccessor(function (d) { return d; })
            .group(all);

        submittedChart
            .width(1560)
            .height(395)
            .margins({ top: 10, right: 50, bottom: 40, left: 40 })
            .dimension(submittedDim)
            .group(submittedGroup)
            .xUnits(d3.time.days)
            .controlsUseVisibility(true)
            .transitionDuration(500)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .elasticY(true)
            .xAxisLabel("Years")
            .yAxisLabel("Amount in Rands");

        categoryChart
            .width(350)
            .height(390)
            .dimension(categoryDim)
            .group(categoryGroup)
            .legend(dc.legend().x(380).y(20))
            .innerRadius(20);

        locationChart
            .data(function (group) { return group.top(10); })
            .width(300)
            .height(390)
            .dimension(locationDim)
            .group(locationGroup)
            .ordering(function (d) { return -d.value })
            //.colors(['#6baed6'])
            .elasticX(true)
            .xAxis().ticks(4);

        defectChart
            .data(function (group) { return group.top(10); })
            .width(300)
            .height(390)
            .dimension(defectDim)
            .group(defectGroup)
            .ordering(function (d) { return -d.value })
            //.colors(['#6baed6'])
            .elasticX(true)
            .xAxis().ticks(4);

        reporterChart
            .data(function (group) { return group.top(3); })
            .width(240)
            .height(180)
            .dimension(reporterDim)
            .group(reporterGroup)
            .ordering(function (d) { return -d.value })
            //.colors(['#6baed6'])
            .elasticX(true)
            .xAxis().ticks(4);

        dc.renderAll();

        // Reset plots
        d3.selectAll('a#reset-all').on('click', function () {
            dc.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#reset-submitted').on('click', function () {
            submittedChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#reset-category').on('click', function () {
            categoryChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#reset-location').on('click', function () {
            locationChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#reset-defect').on('click', function () {
            defectChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#reset-reporter').on('click', function () {
            reporterChart.filterAll();
            dc.redrawAll();
        });
    }


    function makeCasesGraphs(recordsJson) {

        recordsJson.forEach(function (d) {
            var emp = getUser(parseInt(d["responder"]));
            d['job_title'] = emp['job_title'];
            var user = emp['user'];
            d['emp_name'] = user['first_name'] + " " + user['last_name'];
        });


        function getUser(userId) {
            var url = document.location.origin + "/app/api/get_employee/" + userId + "/";
            var result = null;

            $.ajax({
                url: url,
                async: false,
                success: function (data) {
                    result = data;
                }
            });

            return result[0];
        }

        //Create a Crossfilter instance
        var ndx = crossfilter(recordsJson);

        var reasonDim = ndx.dimension(function (d) { return d["reason"]; });
        var statusDim = ndx.dimension(function (d) { return d["status"]; });
        var nameDim = ndx.dimension(function (d) { return d["emp_name"]; });
        var titleDim = ndx.dimension(function (d) { return d["job_title"]; });
        var allDim = ndx.dimension(function (d) { return d; });

        var reasonGroup = reasonDim.group();
        var statusGroup = statusDim.group();
        var nameGroup = nameDim.group();
        var titleGroup = titleDim.group();
        var all = ndx.groupAll();

        var numberRecordsND = dc.numberDisplay("#number-records-nd1");
        var reasonChart = dc.rowChart("#reason-chart");
        var statusChart = dc.pieChart("#status-chart");
        var nameChart = dc.rowChart("#name-chart");
        var titleChart = dc.rowChart("#job-title-chart");

        numberRecordsND
            .formatNumber(d3.format("d"))
            .valueAccessor(function (d) { return d; })
            .group(all);

        statusChart
            .width(350)
            .height(390)
            .dimension(statusDim)
            .group(statusGroup)
            .legend(dc.legend().x(380).y(20))
            .innerRadius(20);

        reasonChart
            .data(function (group) { return group.top(10); })
            .width(300)
            .height(390)
            .dimension(reasonDim)
            .group(reasonGroup)
            .ordering(function (d) { return -d.value })
            .elasticX(true)
            .xAxis().ticks(4);

        nameChart
            .data(function (group) { return group.top(10); })
            .width(300)
            .height(390)
            .dimension(nameDim)
            .group(nameGroup)
            .ordering(function (d) { return -d.value })
            .elasticX(true)
            .xAxis().ticks(4);

        titleChart
            .data(function (group) { return group.top(10); })
            .width(300)
            .height(180)
            .dimension(titleDim)
            .group(titleGroup)
            .ordering(function (d) { return -d.value })
            .elasticX(true)
            .xAxis().ticks(4);

        dc.renderAll();

        // Reset plots
        d3.selectAll('a#reset-all1').on('click', function () {
            dc.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#reset-status').on('click', function () {
            statusChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#reset-name').on('click', function () {
            nameChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#reset-reason').on('click', function () {
            reasonChart.filterAll();
            dc.redrawAll();
        });

        d3.selectAll('a#reset-title').on('click', function () {
            titleChart.filterAll();
            dc.redrawAll();
        });
        */
    }
});
