sap.ui.controller("sccmanagecr.ext.controller.ListReportExt", {
    onInit: function () {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        // oModel.read("/GetCSR_ID", {

        //     success: function (oResponse) {

        //         var data=oResponse.results;
        //       that.CSR=oResponse.results[0].CRS_ID;


        //         //		this.busyDialog.close();

        //     }.bind(this),
        //     error: function (oError) {

        //         console.log(oError);
        //         //					that.busyDialog.close();

        //     }
        // });
        sap.ui.getCore().getConfiguration().getFormatSettings().setLegacyDateFormat(3);
        sap.ui.getCore().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--listReportFilter").setPersistencyKey(true);
        
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--template::Share").setVisible(false);
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--addEntry-_tab1").setVisible(false);
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--addEntry-_tab2").setVisible(false);
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--addEntry-_tab3").setVisible(false);
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--addEntry-_tab4").setVisible(false);
        // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--addEntry-_tab5").setVisible(false);
        // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--addEntry-_tab6").setVisible(false);
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--deleteEntry-_tab1").setVisible(false);
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--deleteEntry-_tab2").setVisible(false);
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--deleteEntry-_tab3").setVisible(false);
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--deleteEntry-_tab4").setVisible(false);
        // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--deleteEntry-_tab5").setVisible(false);
        // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--deleteEntry-_tab6").setVisible(false);
        
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--listReport-_tab1").setSmartVariant();
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--listReport-_tab2").setSmartVariant();
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--listReport-_tab3").setSmartVariant();
        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--listReport-_tab4").setSmartVariant();
        // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--listReport-_tab5").setSmartVariant();
        // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--listReport-_tab6").setSmartVariant();
        this._checkIsStoreAssigned();
        var headerCommentsModel = new sap.ui.model.json.JSONModel();

        this.getOwnerComponent().setModel(
            headerCommentsModel,
            "headerCommentsModel"
        );

       

        oModel.read("/CreditReqHdr", {

            success: function (oResponse) {

                that.getView().setModel(new sap.ui.model.json.JSONModel({
                    items: oResponse.results
                }), "CreditReqHdrModel");

                //		this.busyDialog.close();

            }.bind(this),
            error: function (oError) {

                console.log(oError);
                //					that.busyDialog.close();

            }
        });

        // oModel.read("/CreditReqItem", {

        //     success: function (oResponse) {
        //         oResponse.results=oResponse.results.filter((value, index, self) =>
        //         index === self.findIndex((t) => (
        //           t.Description === value.Description 
        //         ))
        //       );
        //         that.getView().setModel(new sap.ui.model.json.JSONModel({
        //             items: oResponse.results
        //         }), "CreditReqItemModel");

        //         //		this.busyDialog.close();

        //     }.bind(this),
        //     error: function (oError) {

        //         console.log(oError);
        //         //					that.busyDialog.close();

        //     }
        // });
        
       
    },
    onInitSmartFilterBarExtension: function (oEvent) {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        oModel.read("/GetCSR_ID", {

            success: function (oResponse) {

                var data=oResponse.results;
              that.CSR=oResponse.results[0].CRS_ID;


                //		this.busyDialog.close();

            }.bind(this),
            error: function (oError) {

                console.log(oError);
                //					that.busyDialog.close();

            }
        });
    },
    _checkIsStoreAssigned: function () {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        oModel.read("/SCCHeader", {
            success: function (oData, response) {
                var storeHeaderText = "SCC Name :" + " " +
                    oData.results[0].Name + "\n" +
                    oData.results[0].AddressLine_1 + ", " +
                    oData.results[0].AddressLine_2 + "\n" +
                    oData.results[0].City + ", " +
                    oData.results[0].State + ", " +
                    oData.results[0].ZipCode + ", " +
                    oData.results[0].Country;
                // "SCC Name :" + " " +
                // oData.results[0].SCCName;

                var assignSCCHeaderModel = new sap.ui.model.json.JSONModel({
                    pageTitle: storeHeaderText
                });
                that.getView().setModel(assignSCCHeaderModel, "assignSCCHeaderModel");
                that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ListReport.view.ListReport::GetCreditReqHdr--template:::ListReportPage:::DynamicPageTitle").getHeading().setProperty("wrapping", true);
            },
            error: function (oError) {
                sap.m.MessageBox.alert("Techincal Error Occured - SCCHeader Header");
            }
        }
        );
    },
    onBeforeRebindTableExtension: function (oEvent) {
        this.table = oEvent.getSource().getTable();
        this.table.setMultiSelectMode().mProperties.mode="SingleSelectNone";
        // var oBindingParams = oEvent.getParameter("bindingParams");
        // oBindingParams.parameters = oBindingParams.parameters || {};
        // var createdBy = this.byId("CmbBox").getValue();
        // if (
        //     createdBy === null ||
        //     createdBy === "" ||
        //     createdBy === undefined ||
        //     createdBy === ""
        // ) {
        // } else {
        //   oBindingParams.filters.push(new  sap.ui.model.Filter("ItemDesc", "Contains", createdBy));
        // }
    },

    oncheck: function (that) {
        var that = this;
        var oModel = that.getOwnerComponent().getModel();
        var oFilterR = new sap.ui.model.Filter({
            filters: [
                new sap.ui.model.Filter("BTPCRNo_BTPCRNO", "EQ", that.LocObj.BTPCRNO),
                // new sap.ui.model.Filter("PsplInvoice", "EQ", that.LocObj.PsplInvoice),
                new sap.ui.model.Filter("StatusDescription", "NE", "Delete"),
            ],
            and: true
        });
        oModel.read("/CreditReqItem", {
            filters: [oFilterR],
            // urlParameters: {
            //     $expand: "OrgStrucEleCode",
            // },
            success: function (oResponse) {
                // var that = this;
                //         var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                //            pattern: "yyyy-MM-dd"+"T"+"HH:mm:ss"+"Z"
                //        });
                //    var DateTime= oDateFormat.format(new Date());
                //    var oModel = this.getOwnerComponent().getModel();

                var oModel = new sap.ui.model.odata.ODataModel(that.getOwnerComponent().getModel().sServiceUrl, true);
                var batchChanges = [];
                for (var i = 0; i < oResponse.results.length; i++) {
                    var obj = {
                        StatusCode_Id: that.CRStatus[0].Id
                        //    UnderReviewDateTime: DateTime
                    };
                    batchChanges.push(oModel.createBatchOperation("/CreditReqItem(BTPCRItem=" + oResponse.results[i].BTPCRItem +
                        ")", "PATCH", obj));
                }
                oModel.addBatchChangeOperations(batchChanges);
                oModel.submitBatch(function (data) {
                    oModel.sDefaultUpdateMethod = "PATCH";

                    sap.m.MessageToast.show("Record Updated Successfully.");

                }, function (err) {
                    console.log("Error");


                });
            }

        });
    },

    onReview: function (oEvent) {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        // var aContexts = this.extensionAPI.getSelectedContexts();
        // aContexts.forEach(element => {
        //     var data = element.getModel().getObject(element.getPath());
        //     console.log('Selected Rows are => ', data);
        //     CrModel = data;
        // });
        var filterList = [];
        var btpCRFilter = new sap.ui.model.Filter("BTPCRNo_BTPCRNO", sap.ui.model.FilterOperator.EQ, that.LocObj.BTPCRNO);
        var statusFilter = new sap.ui.model.Filter("StatusDescription", sap.ui.model.FilterOperator.NE, "Delete");
        filterList.push(btpCRFilter);
        filterList.push(statusFilter);
        var oModel = this.getOwnerComponent().getModel();
        oModel.read("/GetCreditReqItem", {
            filters: filterList,
            success: function (oResponse) {
                for(i=0;i<oResponse.results.length;i++){
                    if (oResponse.results[i].Qty == 0 || oResponse.results[i].Qty == null && oResponse.results[i].Description!=="Without Invoice") {
                        sap.m.MessageBox.show("Credit Quantity should not be Zero.");
                            // that.byId("statusupdate").destroy();
                              that.getView().byId(that.comboboxid).setSelectedKey(null);
                        return;
                    }
                    }

                    var date = new Date();
                    // var oModel = this.getOwnerComponent().getModel();
                    var oFilterR = new sap.ui.model.Filter({
                        filters: [
                            new sap.ui.model.Filter("StatusType", "EQ", "UndRe"),
                            new sap.ui.model.Filter("StatusDescription", "EQ", "Under Review")
                        ],
                        and: true
                    });
                    oModel.read("/CRStatus", {
                        filters: [oFilterR],
                        success: function (oResponse) {
                            console.log(oResponse.results);
                            that.CRStatus = oResponse.results;
                            that.onReviewData();
                        },
                        error: function (err) { }
                    });
                
            },
            error: function (err) {
            }
        });
    },
    onReviewData: function (oEvent) {
        var that = this;
        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

            pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

        });

     //   var DateTime = oDateFormat.format(new Date());
     
        var DateTime=new Date(new Date().toUTCString().substr(0, 25)) ;
        DateTime = oDateFormat.format(DateTime);
        var oModel = this.getOwnerComponent().getModel();
        var obj = {
            StatusCode_Id: that.CRStatus[0].Id,
            UnderReviewDateTime: DateTime,
            CSR_ID:that.CSR
            //     CSR:sap.ushell.Container.getService("UserInfo").getId()
        };
        console.log(obj);
        var oFilterR = new sap.ui.model.Filter({
            filters: [
                new sap.ui.model.Filter("BTPCRNO", "EQ", that.LocObj.BTPCRNO)
            ],
            and: true
        });
        oModel.read("/CreditReqHdr", {
            filters: [oFilterR],
            // urlParameters: {
            //     $expand: "OrgStrucEleCode",
            // },
            success: function (oResponse) {
                console.log(oResponse.results);
                var path = "/CreditReqHdr(BTPCRNO=" + oResponse.results[0].BTPCRNO + ",OrgStrucEleCode_Id=" + oResponse.results[0].OrgStrucEleCode_Id + ")";
                console.log(path);
                oModel.sDefaultUpdateMethod = "PATCH";
                oModel.update(path, obj, {
                    success: function (oSuccess) {
                        sap.m.MessageToast.show("Status Updated");
                        //  that.byId("statusupdate").destroy();
                         that.getView().byId(that.comboboxid).setSelectedKey(null);

                        oModel.refresh();
                        oModel.sDefaultUpdateMethod = "MERGE";
                    }.bind(this),
                    error: function (oError) {
                        oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                        // that.byId("statusupdate").destroy();
                    }

                });

            },
            error: function (err) {
                console.log("Error");
            }
        });


    },
    onRejected: function (oEvent) {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        // that.SelectedRowData = oEvent.getSource().getBindingContext("CreditReqHdrModel").getObject();
        // var CrModel = this.getView().getModel("CreditReqHdrModel").getData().items[0];
        // var aContexts = this.extensionAPI.getSelectedContexts();
        // aContexts.forEach(element => {
        //     var data = element.getModel().getObject(element.getPath());
        //     console.log('Selected Rows are => ', data);
        //     CrModel = data;
        // });
        var date = new Date();
        // var oModel = this.getOwnerComponent().getModel();
        var oFilterR = new sap.ui.model.Filter({
            // Begin of Changes done by bala on 13th june 2023
            filters: [
                new sap.ui.model.Filter("StatusType", "EQ", "Reject"),
                new sap.ui.model.Filter("StatusDescription", "EQ", "Denied")
                // new sap.ui.model.Filter("StatusDescription", "EQ", "Rejected")
            ],
            and: true
            //End of changes done by bala on 13th june 2023
        });
        oModel.read("/CRStatus", {
            filters: [oFilterR],
            success: function (oResponse) {
                console.log(oResponse.results);
                that.CRStatus = oResponse.results;
                that.onRejectedData(that);
            },

            error: function (err) { }
        });

    },
    onRejectedData: function (that) {
        var that = this;
        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

            pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

        });

      //  var DateTime = oDateFormat.format(new Date());
       var DateTime=new Date(new Date().toUTCString().substr(0, 25)) ;
        DateTime = oDateFormat.format(DateTime);
        var oModel = this.getOwnerComponent().getModel();
        var obj = {
            StatusCode_Id: that.CRStatus[0].Id,
            RejectionDateTime: DateTime,
            CSR_ID:that.CSR
        };
        console.log(obj);
        var oFilterR = new sap.ui.model.Filter({
            filters: [
                new sap.ui.model.Filter("BTPCRNO", "EQ", that.LocObj.BTPCRNO)
            ],
            and: true
        });
        oModel.read("/CreditReqHdr", {
            filters: [oFilterR],
            // urlParameters: {
            //     $expand: "OrgStrucEleCode",
            // },
            success: function (oResponse) {
                console.log(oResponse.results);
                var path = "/CreditReqHdr(BTPCRNO=" + oResponse.results[0].BTPCRNO + ",OrgStrucEleCode_Id=" + oResponse.results[0].OrgStrucEleCode_Id + ")";
                console.log(path);
                oModel.sDefaultUpdateMethod = "PATCH";
                oModel.update(path, obj, {
                    success: function (oSuccess) {
                        // sap.m.MessageToast.show("CreditReqHdr Updated");
                        that.onHeaderCommentPost();
                        oModel.refresh();
                        oModel.sDefaultUpdateMethod = "MERGE";
                    }.bind(this),
                    error: function (oError) {
                        oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");

                    }
                });

            },
            error: function (err) {
                console.log("Error");
            }
        });

    },
    onCancelled: function (oEvent) {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        // that.SelectedRowData = oEvent.getSource().getBindingContext("CreditReqHdrModel").getObject();
        // var CrModel = this.getView().getModel("CreditReqHdrModel").getData().items[0];
        // var aContexts = this.extensionAPI.getSelectedContexts();
        // aContexts.forEach(element => {
        //     var data = element.getModel().getObject(element.getPath());
        //     console.log('Selected Rows are => ', data);
        //     CrModel = data;
        // });
        var date = new Date();
        // var oModel = this.getOwnerComponent().getModel();
        var oFilterR = new sap.ui.model.Filter({
            filters: [
                new sap.ui.model.Filter("StatusType", "EQ", "Cancel"),
                new sap.ui.model.Filter("StatusDescription", "EQ", "Cancelled")
            ],
            and: true
        });
        oModel.read("/CRStatus", {
            filters: [oFilterR],
            success: function (oResponse) {
                console.log(oResponse.results);
                that.CRStatus = oResponse.results;
                that.onCancelledData(that);
            },
            error: function (err) { }
        });
    },
    onCancelledData: function (that) {
        var that = this;
        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

            pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

        });

       // var DateTime = oDateFormat.format(new Date());
       var DateTime=new Date(new Date().toUTCString().substr(0, 25)) ;
        DateTime = oDateFormat.format(DateTime);
         var oModel = this.getOwnerComponent().getModel();
        var obj = {
            StatusCode_Id: that.CRStatus[0].Id,
            CancelledDateTime: DateTime,
            CSR_ID:that.CSR
        };
        console.log(obj);
        var oFilterR = new sap.ui.model.Filter({
            filters: [
                new sap.ui.model.Filter("BTPCRNO", "EQ", that.LocObj.BTPCRNO)
            ],
            and: true
        });
        oModel.read("/CreditReqHdr", {
            filters: [oFilterR],
            // urlParameters: {
            //     $expand: "OrgStrucEleCode",
            // },
            success: function (oResponse) {

                console.log(oResponse.results);
                var path = "/CreditReqHdr(BTPCRNO=" + oResponse.results[0].BTPCRNO + ",OrgStrucEleCode_Id=" + oResponse.results[0].OrgStrucEleCode_Id + ")";
                console.log(path);
                oModel.sDefaultUpdateMethod = "PATCH";
                oModel.update(path, obj, {
                    success: function (oSuccess) {
                        // sap.m.MessageToast.show("CreditReqHdr Updated");
                        that.onHeaderCommentPost();
                        oModel.refresh();
                        oModel.sDefaultUpdateMethod = "MERGE";
                    }.bind(this),
                    error: function (oError) {
                        oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");

                    }

                });

            },
            error: function (err) {
                console.log("Error");
            }
        });

    },
    onCancelBtn: function (oEvent) {

        var that = this;
        that.getView().byId(that.comboboxid).setValue("");
        that.getView().byId(that.comboboxid).setSelectedKey(null);

        that.byId("statusupdate").destroy();

    },

    onSaveBtn: function (oEvent) {

        var text = sap.ui.getCore().statustext;

        if (text == "Under Review") {

            this.onReview();

        }

        if (text == "Denied") {

            this.onRejected();

        }

        if (text == "Cancelled") {

            this.onCancelled();

        }
        // Begin of code changes done by bala on 15th june 2023
        if(text == "Redelivery"){
          this.onRedlivery();      
        }
        
    },


  
    onRedlivery: function(oEvent){
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        var date = new Date();
        var oFilterR = new sap.ui.model.Filter({
            filters: [
                new sap.ui.model.Filter("StatusType", "EQ", "ReDel"),
                new sap.ui.model.Filter("StatusDescription", "EQ", "Redelivery")
            ],
            and: true
        });
        oModel.read("/CRStatus", {
            filters: [oFilterR],
            success: function (oResponse) {
                console.log(oResponse.results);
                that.CRStatus = oResponse.results;
                that.onRedliveryData(that);
            },
            error: function (err) { }
        });
    },
    onRedliveryData: function(that){
        var that = this;
        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

            pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

        });
       var DateTime=new Date(new Date().toUTCString().substr(0, 25)) ;
        DateTime = oDateFormat.format(DateTime);
         var oModel = this.getOwnerComponent().getModel();
        var obj = {
            StatusCode_Id: that.CRStatus[0].Id,
            CancelledDateTime: DateTime,
            CSR_ID:that.CSR
        };
        console.log(obj);
        var oFilterR = new sap.ui.model.Filter({
            filters: [
                new sap.ui.model.Filter("BTPCRNO", "EQ", that.LocObj.BTPCRNO)
            ],
            and: true
        });
        oModel.read("/CreditReqHdr", {
            filters: [oFilterR],
            success: function (oResponse) {
                console.log(oResponse.results);
                var path = "/CreditReqHdr(BTPCRNO=" + oResponse.results[0].BTPCRNO + ",OrgStrucEleCode_Id=" + oResponse.results[0].OrgStrucEleCode_Id + ")";
                console.log(path);
                oModel.sDefaultUpdateMethod = "PATCH";
                oModel.update(path, obj, {
                    success: function (oSuccess) {
                        // sap.m.MessageToast.show("CreditReqHdr Updated");
                        that.onHeaderCommentPost();
                        oModel.refresh();
                        oModel.sDefaultUpdateMethod = "MERGE";
                    }.bind(this),
                    error: function (oError) {
                        oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");

                    }

                });

            },
            error: function (err) {
                console.log("Error");
            }
        });
    },
   // End of code changes done by bala on 15th june 2023






    onHeaderCommentPost: function (evt) {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        var oFilterR = new sap.ui.model.Filter({
            filters: [
                new sap.ui.model.Filter("BTPCRNO", "EQ", that.LocObj.BTPCRNO)
            ],
            and: true
        });
        oModel.read("/CreditReqHdr", {
            filters: [oFilterR],
            // urlParameters: {
            //     $expand: "OrgStrucEleCode",
            // },
            success: function (oResponse) {
                console.log(oResponse.results);
                var oDataModel = that.getView().getModel(),
                    Path = "/CRCommit",
                    // CRNo = evt.getSource().getBindingContext().getObject().BTPCRNO,
                    commentText = that.getView().byId("Reason").getValue()

                obj = {
                    // CRNO: Math.floor(Math.random()*(999-100+1)+100),
                    Id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                    CRNO_BTPCRNO: that.LocObj.BTPCRNO,
                    CRNO_OrgStrucEleCode_Id: oResponse.results[0].OrgStrucEleCode_Id,
                    // CRNO: CRNo,
                    RowId: 0,
                    Comment: commentText,
                };
                oDataModel.create(Path, obj, {
                    method: "POST",
                    success: function (oData) {
                        that.getView().byId("Reason").setValue("");
                        that
                            .getOwnerComponent()
                            .getModel("headerCommentsModel")
                            .updateBindings(true);
                        that.oncheck(that);
                        that.getOwnerComponent().getModel("headerCommentsModel").refresh();
                        //sap.m.MessageToast.show("Status Updated");
                        that.byId("statusupdate").destroy();
                        // that.openHeaderComments();
                        // that._onCommentsRead(that.documentID);
                    },
                    error: function (Error) {
                        var errorMsg = JSON.parse(Error.responseText).error.message.value;
                        sap.m.MessageBox.error(errorMsg);
                    },
                });

            },
            error: function (err) {
                console.log("Error");
            }
        });

    },
    TextAreaChange: function(oEvent){

        if(oEvent.getSource().getValue().length>0){

            this.getView().byId("savbtn").setEnabled(true);

        }

        else{

            this.getView().byId("savbtn").setEnabled(false);          

      }

    },
    oSelectionchange: function (oEvent) {
        var that = this;
        that.comboboxid = oEvent.getSource().getId();
        var oSelectedkey = oEvent.getSource().getSelectedItem().getText();
        sap.ui.getCore().statustext = oSelectedkey;
        that.LocObj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
        //   text = sap.ui.getCore().byId("box0").getText();
var oModel = this.getOwnerComponent().getModel(); 
         var oFilterR = new sap.ui.model.Filter({
            filters: [
                new sap.ui.model.Filter("BTPCRNO", "EQ", oEvent.getSource().getSelectedItem().getBindingContext().getObject().BTPCRNO),
               
                new sap.ui.model.Filter("StatusDescription", "NE", "Delete"),
            ],
            and: true
        });
        oModel.read("/GetCreditReqHdr", {
   filters: [oFilterR],
            success: function (oResponse) {
if(oResponse.results[0].StatusCode_Id===6 || oResponse.results[0].StatusCode_Id===7 || oResponse.results[0].StatusCode_Id===8){
 
      sap.m.MessageBox.error("Status Update is not allowed for this CR", {
                    title: "Error",
                    actions: [sap.m.MessageBox.Action.OK],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                        oModel.refresh();
                   
                        }
                    }
                });
     return;
    
}
                 if (oSelectedkey == "Under Review") {
                    var that = this;
            // that.LocObj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            that.onSaveBtn();
        }
        else{
        var oView = this.getView();

        // if (!this.pDialog) {
        this.pDialog = sap.ui.core.Fragment.load({
            id: oView.getId(),
            name: "sccmanagecr.ext.fragments.StatusUpdateDialog",
            controller: this
        }).then(function (oDialog) {

            oView.addDependent(oDialog);
            return oDialog;
        });

        // }

        this.pDialog.then(function (oDialog) {
            oDialog.open();
            // if (oSelectedkey == "Under Review") {
            //     // this.getView().byId("Reason").setEnabled(false);
            //     oDialog.getContent()[0].getItems()[1].getItems()[0].setVisible(false);
            //     oDialog.getContent()[0].getItems()[1].getItems()[1].setVisible(false);
            //     oDialog.getContent()[1].getContent()[1].setEnabled(true);
            // }
            if (oSelectedkey == "Denied") {
                oDialog.setTitle("Rejection Reason");
                oDialog.getContent()[0].getItems()[0].getItems()[0].setText("Reason for rejection status:");


             }
        });
        // var oSelectedkey = oevt.getSource().getSelectedItem().getText();
        // if (oSelectedkey == "Under") {

        // } else if (oSelectedkey == "Reject") {


        // } else if (oSelectedkey == "Cancel") {

        // } 
        var that = this;
       // that.LocObj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
    }
               
            }.bind(this),
            error: function (oError) {

                console.log(oError);
              

            }
        });
      
     
       
       
    },
    setComboboxValue:function(oEvent){
        console.log("a");
    }
}

);
