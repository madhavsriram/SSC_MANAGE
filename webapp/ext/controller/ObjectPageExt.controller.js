var BTP_CRNO, OrgStrucEleCode_Id, CRStatus, StatusDescription, StatusType, invoiceNo;

sap.ui.define([
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sccmanagecr/ext/model/formatter",
    "sap/ui/core/ValueState",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/Text",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    'sap/m/MessageToast',
    'sap/m/library'
],
    function (Fragment, JSONModel,
        Filter,
        FilterOperator,
        formatter,
        ValueState,
        Dialog,
        DialogType,
        Button,
        ButtonType,
        Text,
        History, MessageBox, MessageToast, mLibrary) {
        "use strict";
        var pressDialog;
        var pressDialog2;
        var CRNo;
        var gRowID;
        var gMaterial;
        var File = [];
        var removedFileDamage = [];
        var removedFileQuality = [];
        var removedFileShortage = [];
        var uploadedFileDamage = [];
        var uploadedFileQuality = [];
        var uploadedFileShortage = [];
        var selectedDataCredit = [];
        var DraftStatusFlg = false;
        var CR_FLAG;
        var oAttachmentsModel, oAttachmentsModel2, oAttachmentsModel3, oAttachmentUpl, oAttachmentUpl2, oAttachmentUpl3;
        return {
            formatter: formatter,
            onInit: function () {
                var that = this;
                // console.log("hi");
                var oModel = this.getOwnerComponent().getModel();
                //    this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--edit").setVisible(false);
                // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--edit").setText("");


                // The below function will get called for every binding change
                this.extensionAPI.attachPageDataLoaded(
                    function (oEvent) {
                        // CRNo = this.getView().byId(
                        //     "sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--header::headerEditable::reffac3::DrfBTPCRNO::Field"
                        //   ).mProperties.value;

                        // this.getView().byId(
                        //     "sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--ItemId::Table"
                        // ).setUseExportToExcel
                        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--template::Share").setVisible(false);
                        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--edit").setVisible(false);
                        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delete").setVisible(false);
                        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--ItemId::deleteEntry").setVisible(false);
                        //  this._read();
                        this.AddItemFlg = false;
                        console.log("extension");
                        oAttachmentsModel = new sap.ui.model.json.JSONModel();
                        this.getOwnerComponent().setModel(
                            oAttachmentsModel,
                            "oAttachmentsModel"
                        );
                        oAttachmentsModel2 = new sap.ui.model.json.JSONModel();
                        this.getOwnerComponent().setModel(
                            oAttachmentsModel2,
                            "oAttachmentsModel2"
                        );
                        oAttachmentsModel3 = new sap.ui.model.json.JSONModel();
                        this.getOwnerComponent().setModel(
                            oAttachmentsModel3,
                            "oAttachmentsModel3"
                        );
                        var headerCommentsModel = new JSONModel();
                        this.getOwnerComponent().setModel(
                            headerCommentsModel,
                            "headerCommentsModel"
                        );
                        var itemCommentsModel = new JSONModel();
                        this.getOwnerComponent().setModel(
                            itemCommentsModel,
                            "itemCommentsModel"
                        );
                        var productIssueModel = new JSONModel();
                        this.getOwnerComponent().setModel(
                            productIssueModel,
                            "productIssueModel"
                        );

                        var data = {
                            ProductName: "",
                            ProductIssue: [],
                            UseByDate: null,
                            JulianDate: null,
                            LotCode: "",
                            ManufactureDate: null,
                            ExpirationDate: null,
                            BestBeforeDate: null,
                        };
                        var qualityModel = new JSONModel(data);
                        this.getOwnerComponent().setModel(qualityModel, "qualityModel");

                        CR_FLAG = oEvent.context.getObject().CR_FLAG;
                        var CRInvNo = oEvent.context.getObject().CRInvNo;
                        this.InvoiceDate = oEvent.context.getObject().CRDocDate;
                        StatusDescription = oEvent.context.getObject().StatusDescription;
                        StatusType = oEvent.context.getObject().StatusType;
                         var StatusCode_Id= oEvent.context.getObject().StatusCode_Id  ;   
                        BTP_CRNO = this.BTP_CRNO = oEvent.context.getObject().BTPCRNO;
                        invoiceNo = oEvent.context.getObject().PsplInvoice;
                        var invoiceNoHdr = oEvent.context.getObject().PSInvoiceHdr_PsplInvoice;
                        OrgStrucEleCode_Id = oEvent.context.getObject().OrgStrucEleCode_Id;
                        this.getView().setModel(new sap.ui.model.json.JSONModel({
                            items: [oEvent.context.getObject()]
                        }), "CreditReqHdrModel");
                        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                            pattern: "MM-dd-yyyy"
                        });
                        //Beging of changes done by Bala on 5th June 2023
                              this.oIsSap = oEvent.context.getObject("ISSAP");
                        //End of changes done by Bala on 5th Jne 2023

                        //  this.InvoiceDate=oDateFormat.format(this.InvoiceDate);                   

                        if (invoiceNoHdr == null) {
                            if (StatusDescription == "Under Review") {
                                //   this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(false);
                                this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idAssignButton").setVisible(true);


                            }
                            else {
                                this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idAssignButton").setVisible(false);
                            }
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(false);

                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idDeleteCRDataButton").setVisible(false);

                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(false);

                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(false);
                            
                            // Begin of Change by Bala on 5th June 2023
                        // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setVisible(false);
                           this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setVisible(true);
                            // End of Change by Bala on 5th June 2023


                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(false);

                            return;

                        }
                        else {
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idAssignButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idDeleteCRDataButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(false);  // changed  by bala on  3rd July 2023
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(true);
                        }

                        this.checkComment();

                        //kanchan------ changed
                        if (StatusType == "DraftSCC" || StatusDescription == "Submitted") {

                            // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(true);

                        }
                        else {
                            // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(false);
                        }
                        if (StatusCode_Id == "4") {
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(true);
                        }
                        else {
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(false);
                        }


                        //kanchan------ changed
                        if (StatusType == "DraftSCC" || StatusDescription == "Submitted") {

                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idDeleteCRDataButton").setVisible(true);
                        }
                        else {
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idDeleteCRDataButton").setVisible(false);
                        }

                        if (StatusDescription == "Submitted") {

                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(false);
                            //                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(true);
                            //   this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(true);

                        }
                        else {
                            //            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idCancelledButtonButton").setVisible(false);
                            // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(false);
                            // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(false);
                        }
                        if (StatusDescription == "Under Review") {
                            this.checkInvoiceHdr();


                            var BTPCRNo = oEvent.context.getObject("ISSAP");
                            this.ISSAP = BTPCRNo;

                            if (BTPCRNo === "N") {
                                //  sap.ui.getCore().byId("box1").getBinding("items").filter([new sap.ui.model.Filter("text", "NE", "Ready To Approve")])
                                //      this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(false);
                                var data1 = [
                                    {
                                        text: "Approve",
                                        id: "item12"
                                    },
                                    {
                                        text: "Cancelled",
                                        id: "item13"
                                    },
                                    {
                                        text: "Redelivery",
                                        id: "item15"
                                    },
                                    {
                                        text: "Denied",
                                        id: "item14"
                                    }];
                                var AppStatus = new JSONModel(data1);
                                this.getOwnerComponent().setModel(AppStatus, "StatModel");
                            } else {
                                //  sap.ui.getCore().byId("idcbox").getBinding("items").filter([])
                                var data1 = [{
                                    text: "Pending Approval",
                                    id: "item11"
                                },
                                // {
                                //     text: "Approve",
                                //     id: "item12"
                                // },
                                {
                                    text: "Cancelled",
                                    id: "item13"
                                },
                                //Begin of changes done by bala on 13th june 2023
                                {
                                    text: "Redelivery",
                                    id: "item15"
                                },
                                //End of changes done by bala on 13th june 2023
                                {
                                    text: "Denied",
                                    id: "item14"
                                }];
                                var AppStatus = new JSONModel(data1);
                                this.getOwnerComponent().setModel(AppStatus, "StatModel");

                                //     this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(true);
                                //      if(CR_FLAG=="N"){
                                //     sap.m.MessageBox.alert("Credit memo button is currently disabled due to a previous credit memo from same sales order in process.Please submit this memo tomorrow");
                                //     setTimeout(function () {
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);
                                //     }, 2000);                                 
                                // }
                                // else{
                                //     setTimeout(function () {
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                                //     //    that.checkISSAP();
                                //     }, 2000);
                                // }
                            }
                            // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(true);


                        } else {
                            //     this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(false);
                        }
                        if (StatusDescription == "Submitted") {
                            var BTPCRNo = oEvent.context.getObject("ISSAP");
                            if (BTPCRNo === "Y") {
                                var data1 = [{
                                    text: "Pending Approval",
                                    id: "item11"
                                },
                                // {
                                //     text: "Approve",
                                //     id: "item12"
                                // },
                                {
                                    text: "Cancelled",
                                    id: "item13"
                                },
                                 //Begin of changes done by bala on 13th june 2023
                                 {
                                    text: "Redelivery",
                                    id: "item15"
                                },
                                //End of changes done by bala on 13th june 2023
                                {
                                    text: "Denied",
                                    id: "item14"
                                }];
                                var AppStatus = new JSONModel(data1);
                                this.getOwnerComponent().setModel(AppStatus, "StatModel");
                                // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(true);
                                // if(CR_FLAG=="N"){
                                //     sap.m.MessageBox.alert("Credit memo button is currently disabled due to a previous credit memo from same sales order in process.Please submit this memo tomorrow");
                                //     setTimeout(function () {
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);
                                //     }, 2000);                                 
                                // }
                                // else{
                                //     setTimeout(function () {
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                                //      //   that.checkISSAP();
                                //     }, 2000);
                                // }

                            } else {
                                var data1 = [
                                    {
                                        text: "Approve",
                                        id: "item12"
                                    },
                                    {
                                        text: "Cancelled",
                                        id: "item13"
                                    },
                                    {
                                        text: "Redelivery",
                                        id: "item15"
                                    },
                                    {
                                        text: "Denied",
                                        id: "item14"
                                    }];
                                var AppStatus = new JSONModel(data1);
                                this.getOwnerComponent().setModel(AppStatus, "StatModel");
                                //       this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(false);
                            }

                        }
                            //Begin of changes done by bala on 13th june 2023

                        if (StatusDescription == "Draft" || StatusDescription == "Denied" || StatusDescription == "Closed" || StatusDescription == "Cancelled" || StatusDescription == "Redelivery") {
                            that.getView().byId("delbtnButton").setVisible(false);
                            that.getView().byId("revertBtnButton").setVisible(false);
                        }
                        
                        if (StatusDescription == "Under Review" || StatusDescription == "Closed" || StatusDescription == "Denied" || StatusDescription == "Cancelled" || StatusDescription == "Redelivery" ) {
                            this._table.setMultiSelectMode().mProperties.mode = "SingleSelectNone";
                        }
                        //End of changes done by bala on 13th june 2023
                        else {
                            this._table.setMultiSelectMode().mProperties.mode = "SingleSelectLeft";

                        }


                    }.bind(this)
                );

                // this.busyDialog = formatter.createBusyDialog();
                // this.getOwnerComponent().getRouter().getRoute("ChangeLog").attachPatternMatched(this.onRouteMatch, this);
            },
            checkISSAP: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var BTPCRNO = this.getView().getModel("CreditReqHdrModel").getData().items[0].BTPCRNO;
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRNo_BTPCRNO", "EQ", BTPCRNO),
                        new sap.ui.model.Filter("StatusCode_Id", "NE", 10)
                    ],
                    and: true
                });
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        var data = oResponse.results.filter(obj => obj.StatusDescription == "Created" && obj.Description !== "Without Invoice");
                        if (data.length == 0) {
                            //          that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(true);
                            return;
                        }
                        if (data.length > 0) {

                            //          that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                        }
                        else {
                            var approve = oResponse.results.filter(obj => obj.StatusDescription == "Approved");
                            if (approve.length > 0) {
                                //       that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                            }
                            else {
                                //     that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                            }
                        }


                    },
                    error: function (err) { }
                });
            },

            checkInvoiceHdr: function (flag) {
                var that = this;
                var oModel = this.oModel = this.getOwnerComponent().getModel();
                var PSInvoiceHdr_PsplInvoice = this.PSInvoiceHdr_PsplInvoice = this.getView().getModel("CreditReqHdrModel").getData().items[0].PSInvoiceHdr_PsplInvoice;

                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("PsplInvoice", "EQ", PSInvoiceHdr_PsplInvoice)
                    ],
                    and: true
                });
                oModel.read("/GetInvoiveHdr", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        var that = this;
                         this.flag=oResponse.results[0].DeliveryFeeCreated;
                         
                       
                            //that.getView().byId("delbtnButton").setVisible(true);
                           // that.getView().byId("revertBtnButton").setVisible(false);
                            if(flag===false){
                                if (oResponse.results[0].DeliveryFeeCreated == 'N') {
                                    // that.getView().byId("delbtnButton").setVisible(false); //commented by Bala on 3rd July 2023
                           that.getView().byId("revertBtnButton").setVisible(false);
                                }
                                return;   
                            }
                              //that.getView().byId("delbtnButton").setVisible(false);
                            //that.getView().byId("revertBtnButton").setVisible(true);
                            if(flag===true){
                                if (oResponse.results[0].DeliveryFeeCreated == 'Y') {
                                 //   that.getView().byId("delbtnButton").setVisible(false);  //commented by Bala on 3rd July 2023
                           that.getView().byId("revertBtnButton").setVisible(true);
                                }
                                return;
                                
                            }
                        if(flag===undefined){
                // Begin of changes done by Bala on 3rd July 2023            
                    var SalesOrderNo =  this.SalesOrderNo =  this.getView().getModel("CreditReqHdrModel").getData().items[0].SalesOrderNo  ;           
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("PsplInvoice_PsplInvoice", "EQ", PSInvoiceHdr_PsplInvoice),
                        new sap.ui.model.Filter("ItemNo", "EQ", "DC"),
                        new sap.ui.model.Filter("SalesOrderNo", "EQ", SalesOrderNo ) 
                    ],
                    and: true
                });

                // Begin of changes done by Bala on 19th July 2023..............................................................
                oModel.read("/GET_PCINVOICE_ITEM_LIST", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                      if (oResponse.results.length > 0) {
                        if(oResponse.results[0].ItemNo == 'DC' && oResponse.results[0].OpenQty > 0){
                            that.getView().byId("delbtnButton").setVisible(true);
                        }
                        
                      }
                    }.bind(this),
                    error: function (err) {},
                  });
                  
                 //End of changes done by Bala on 19th July 2023 ..............................................................  
                oModel.read("/PSInvoiceItems", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        if(oResponse.results.length>0){          
                            this.DcItem=oResponse.results[0].ItemNo;
                            // if(oResponse.results[0].ItemNo == 'DC'){
                            //     that.getView().byId("delbtnButton").setVisible(true);
                            // }
                // End of changes done by Bala on 3rd July 2023            
                        }
                        else{
                            this.DcItem="";
                        }
                        this.CRFlag();
                    }.bind(this),
                    error: function (err) { }
                });
                            
                        }
                        

                       
                    }.bind(this),
                    error: function (err) { }
                });
            },
            //Begin of code changes done by Bala on 19th July 2023
            onDcButtonCheck: function(){
                                var that = this;
                       var oFilterR1 = new sap.ui.model.Filter({
                                    filters: [
                                        new sap.ui.model.Filter("BTPCRNo_BTPCRNO", "EQ", BTP_CRNO),
                                        new sap.ui.model.Filter("Material", "EQ", "DC")
                                    ],
                                    and: true
                                });
                                   this.oModel.read("/GetCreditReqItem", {
                                    filters: [oFilterR1],
                                    success: function (oResponse) {
                                      if (oResponse.results.length > 0) {
                                        if(oResponse.results[0].Material == 'DC' && oResponse.results[0].OpenQty > 0){
                                            that.getView().byId("delbtnButton").setVisible(true);
                                        }else{
                                            that.getView().byId("delbtnButton").setVisible(false);
                                        }
                                        
                                      }
                                    }.bind(this),
                                    error: function (err) {},
                                  }); 
            },
             //End of code changes done by Bala on 19th July 2023
            CRFlag:function()
            {
                var oModel = this.getOwnerComponent().getModel();                
                
                              var oFilterR = new sap.ui.model.Filter({
                                     filters: [
                                     new sap.ui.model.Filter("BTPCRNo_BTPCRNO", "EQ", BTP_CRNO),
                                       new sap.ui.model.Filter("Material", "EQ", "DC"),
                                       new sap.ui.model.Filter("StatusCode_Id", "NE", 10)
                        
                                     ],
                                     and: true,
                                   });
                                   var that = this;                          
                                   oModel.read("/CreditReqItem", {
                                     filters: [oFilterR],
                                     success: function (oResponse) {
                                        if( that.flag== "Y" && oResponse.results.length == 0)
                                        {
                                        //    that.getView().byId("delbtnButton").setVisible(false);  // commented by Bala on 3rd July 2023
                                            that.getView().byId("revertBtnButton").setVisible(false);
                                        } else  if( that.flag== "Y" && oResponse.results.length > 0)
                                        {
                                        //    that.getView().byId("delbtnButton").setVisible(false);   //  commented by Bala on 3rd July 2023
                                            that.getView().byId("revertBtnButton").setVisible(true);
                                        }
                                       else if( that.flag== "N" && oResponse.results.length == 0)
                                        {
                                            if(that.DcItem=="DC"){
                                             //   that.getView().byId("delbtnButton").setVisible(true);   //commented by Bala on 3rd July 2023
                                                that.getView().byId("revertBtnButton").setVisible(false);
                                            }
                                            else{
                                       //         that.getView().byId("delbtnButton").setVisible(false); //commented by Bala on 3rd July 2023
                                                that.getView().byId("revertBtnButton").setVisible(false);
                                            }
                                           
                                        }
                                        else{
                                            
                                        }
                                    // Begin of changes done by Bala on 3rd July 2023  
                                    
                                    //Begin of code commented by Bala on 19th July 2023
                                    // if(oResponse.results.length != 0){
                                    //     if(oResponse.results[0].Material == 'DC'){
                                    //         that.getView().byId("delbtnButton").setVisible(true);
                                    //     } 
                                    // }
                                     
                                    //End of code commented by Bala on 19th July 2023

                                    // End of changes done by Bala on 3rd July 2023    
                                      
                                           
                                     }.bind(that),
                                     error: function (err) {},
                                   });

            },

            checkComment: function () {
                var oFilterR = [];

                var rowIDData = new Filter("RowId", FilterOperator.EQ, 0);

                var cRNoData = new Filter("CRNO_BTPCRNO", FilterOperator.EQ, BTP_CRNO);

                oFilterR.push(rowIDData, cRNoData);

                var path = "/CRCommit?$count";

                var that = this;

                var oModel = this.getOwnerComponent().getModel();
                oModel.read(path, {
                    filters: oFilterR,
                    success: function (oData) {
                        if (oData.results.length > 0) {
                            sap.ui.getCore().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setType("Emphasized");
                        }
                        else {
                            sap.ui.getCore().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setType("Default");
                        }

                    },

                    error: function (error) { },

                });
            },

            onpress: function (oEvent) {
                alert('onpress');
            },
            onpress1: function (oEvent) {
                // alert('onpress1');
                var that = this;
                if (!this._DeliveryDialog) {

                    this._DeliveryDialog = sap.ui.xmlfragment(

                        "sccmanagecr.ext.fragments.Scc",

                        // "com.ci.fiori.ext.fragments.QualityDialog",

                        this

                    );



                    this.getView().addDependent(this._DeliveryDialog);

                }
                var oModel = this.getOwnerComponent().getModel();
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("Description", "NE", "Quality")

                    ],
                    and: true
                });
                oModel.read("/BTP_DelvFee_Setup", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        that.getView().setModel(new sap.ui.model.json.JSONModel({
                            items: oResponse.results
                        }), "CreditTypeModel");
                        that._DeliveryDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getItems()[0].setSelectedKey(null);
                        that._DeliveryDialog.open();
                    },
                    error: function (err) { }
                });




            },
            onCloseFragment: function () {
                var that = this;
                this._DeliveryDialog.getButtons()[0].setEnabled(false);
                this._DeliveryDialog.close();
            },
            onSelectCredit_old: function (oEvent) {
                var that = this;
                var Id = oEvent.getSource().getSelectedKey();
                this.SelectedCRType = oEvent.getSource().mBindingInfos.items.binding.oList.filter(obj => obj.CRType_Id == Id);

                this._DeliveryDialog.getButtons()[0].setEnabled(true);

                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTP_DelvFee_Setup_CRType_Id", "EQ", Id),
                        new sap.ui.model.Filter("FromDate", "LE", this.InvoiceDate),
                        new sap.ui.model.Filter("ToDate", "GE", this.InvoiceDate)
                    ],
                    and: true
                });
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/BTP_DelvFee_Setup_Dtl", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        if (oResponse.results.length > 0) {
                            that.getView().setModel(new sap.ui.model.json.JSONModel({
                                items: oResponse.results
                            }), "DelvFeeModel");
                            //  that.updateCRItems(oResponse.results);
                        }


                    }.bind(that),
                    error: function (err) { }
                });

                //       this._DeliveryDialog.close();
            },
            onSelectCredit: function (oEvent) {
                var that = this;
                var Id = oEvent.getSource().getSelectedKey();
                this.SelectedCRType = oEvent.getSource().mBindingInfos.items.binding.oList.filter(obj => obj.CRType_Id == Id);

                this._DeliveryDialog.getButtons()[0].setEnabled(true);


                var oModel = this.getOwnerComponent().getModel();
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("PsplInvoice_PsplInvoice", "EQ", this.getView().getModel("CreditReqHdrModel").getData().items[0].PsplInvoice),
                        new sap.ui.model.Filter("ItemNo", "EQ", "DC")
                    ],
                    and: true
                });

                oModel.read("/PSInvoiceItems", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse);
                        if (oResponse.results.length > 0) {
                            that.getView().setModel(new sap.ui.model.json.JSONModel({
                                items: oResponse.results
                            }), "DelvFeeModel");
                            //  that.updateCRItems(oResponse.results);
                        }

                    },
                    error: function (err) { },
                });
            },
            onRevertPress: function (oEvent) {
                //      alert('onRevertPress');
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("StatusType", "EQ", "Del"),
                        new sap.ui.model.Filter("StatusDescription", "EQ", "Delete")
                    ],
                    and: true
                });
                oModel.read("/CRStatus", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        that.CRStatus = oResponse.results;
                        that.getCRItems();

                    },
                    error: function (err) { }
                });



            },
            onBeforeRebindTableExtension: function (oEvent) {
                this._table = oEvent.getSource().getTable();

            },
            getCRItems: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var BTPCRNO = this.getView().getModel("CreditReqHdrModel").getData().items[0].BTPCRNO
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("ItemType", "EQ", "D"),
                        new sap.ui.model.Filter("BTPCRNo_BTPCRNO", "EQ", BTPCRNO),
                        new sap.ui.model.Filter("StatusCode_Id", "NE", that.CRStatus[0].Id)
                    ],
                    and: true
                });
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        var data = oResponse.results[0];
                        that.updateCRItems(data);


                    },
                    error: function (err) { }
                });

            },
            updateCRItems: function (data) {
                //       alert('onRevertPress');
                var that = this;
                var path = "/CreditReqItem(BTPCRItem=" + data.BTPCRItem + ")";
                sap.m.MessageBox.show("Do you want to Revert fee back?", {
                    icon: sap.m.MessageBox.Icon.QUESTION,
                    title: "Confirm",
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            var oModel = that.getOwnerComponent().getModel();
                            var CrModel = that.getView().getModel("CreditReqHdrModel").getData().items[0];
                            var obj = {
                                //           "ItemType": "N",
                                "StatusCode_Id": that.CRStatus[0].Id,
                            };


                            var path2 = "/CreditReqHdr(BTPCRNO=" + CrModel.BTPCRNO + ",OrgStrucEleCode_Id=" + CrModel.OrgStrucEleCode_Id + ")";

                            var obj2 = {
                                DeliveryFee: 0
                            };
                            console.log(path);
                            console.log(obj);
                            console.log(obj2);
                            oModel.sDefaultUpdateMethod = "PATCH";
                            oModel.update(path, obj, {
                                success: function (oSuccess) {
                                    oModel.refresh();
                                    oModel.sDefaultUpdateMethod = "PATCH";
                                    oModel.update(path2, obj2, {
                                        success: function (oSuccess) {
var flag=false;
                                            sap.m.MessageToast.show(" Delivery Fee Reverted");
                                            oModel.refresh();
                                            that.getView().byId("delbtnButton").setVisible(true);
                                            oModel.sDefaultUpdateMethod = "MERGE";
                                            that.checkInvoiceHdr(flag);
                                            //     setTimeout(function () {
                                            //         if(CR_FLAG=="Y"){
                                            //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                                            //         }
                                            //         else{
                                            //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                                            //         }
                                            //   //             that.checkISSAP();
                                            //     }, 4000);

                                        }.bind(that),
                                        error: function (oError) {
                                            oModel.sDefaultUpdateMethod = "MERGE";
                                            sap.m.MessageBox.alert("Techincal Error Occured -");



                                        }
                                    });




                                },
                                error: function (oError) {
                                    sap.m.MessageBox.alert("Techincal Error Occured -");


                                }
                            });



                        }
                    }
                });
                // this.onDcButtonCheck();

            },
            onSave: function (oEvent) {
                var that = this;
                sap.m.MessageBox.show("Do you want to continue?", {
                    icon: sap.m.MessageBox.Icon.QUESTION,
                    title: "Confirm",
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            that._DeliveryDialog.close();
                            var oModel = that.getOwnerComponent().getModel();
                            //     var CrId = that.getView().getModel("DelvFeeModel").getData().items[0].BTP_DelvFee_Setup_CRType_Id;
                            var Amt = that.getView().getModel("DelvFeeModel").getData().items[0].UnitPrice;
                            var CrModel = that.getView().getModel("CreditReqHdrModel").getData().items[0];
                            var Description = that.getView().getModel("DelvFeeModel").getData().items[0].Description;

                            var ItemType = "D";
                            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

                                pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

                            });

                            var DateTime = oDateFormat.format(new Date());
                            var obj = {
                                BTPCRNo_BTPCRNO: CrModel.BTPCRNO,
                                BTPCRNo_OrgStrucEleCode_Id: CrModel.OrgStrucEleCode_Id,
                                "Material": "DC",
                                "Description": Description,
                                "Qty": 1,
                                "UnitPrice": Amt,
                                //  "Total": 1,
                                "ItemType": ItemType,
                                "CRType_Id": that.SelectedCRType[0].CRType_Id,
                                // "CRTypeDesc": that.SelectedCRType[0].Description,
                                "StatusCode_Id": that.ISSAP == 'N' ? 9 : 12,
                                //"StatusCode_Id": 12,
                                "StatusCode_ObjectType_Id": 1,
                                "UOM": "EA",
                                "ApproveQty": 1,
                                "ApprovedDateTime": DateTime
                            };

                            var path = "/CreditReqHdr(BTPCRNO=" + CrModel.BTPCRNO + ",OrgStrucEleCode_Id=" + CrModel.OrgStrucEleCode_Id + ")";

                            var obj2 = {
                                DeliveryFee: Amt
                            };
                            console.log(obj);
                            console.log(obj2);

                            oModel.create("/CreditReqItem", obj, {
                                success: function (oSuccess) {
                                    oModel.refresh();
                                    oModel.sDefaultUpdateMethod = "PATCH";
                                    oModel.update(path, obj2, {
                                        success: function (oSuccess) {
var flag=true;
                                            sap.m.MessageToast.show(" Delivery Fee Added");
                                            oModel.refresh();
                                            // this._DeliveryDialog.close();
                                            oModel.sDefaultUpdateMethod = "MERGE";
                                            that.checkInvoiceHdr(flag);
                                            //     setTimeout(function () {
                                            //         if(CR_FLAG=="Y"){
                                            //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                                            //         }
                                            //         else{
                                            //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                                            //         }
                                            //   //             that.checkISSAP();
                                            //     }, 4000);

                                        }.bind(that),
                                        error: function (oError) {
                                            oModel.sDefaultUpdateMethod = "MERGE";
                                            sap.m.MessageBox.alert("Techincal Error Occured -");



                                        }
                                    });




                                },
                                error: function (oError) {
                                    sap.m.MessageBox.alert("Techincal Error Occured -");


                                }
                            });

                            that.onDcButtonCheck();
                        }
                    }
                });

              

            },

            // Code for Icon Btn in ObjectPage table
            OnItemDetails: function (oEvent) {
                var that = this;
                DraftStatusFlg = false;
                this.oModel = this.getView().getModel();
                //  this.oModel.setUseBatch(false);
                this.spath = oEvent.getSource().getParent().getBindingContextPath();
                var pathdata = this.getView().getModel().getProperty(this.spath);
                this.selectedBTPCRItem = pathdata.BTPCRItem;
                if (pathdata.Description == 'Without Invoice') {
                    this.onCreateWithoutInvoice(pathdata);
                    return;
                }

                (pressDialog = sap.ui.getCore().byId("ListDialog"));

                if (!pressDialog) {
                    pressDialog = sap.ui.xmlfragment(
                        "sccmanagecr.ext.fragments.IconDialog",
                        this
                    );

                    this.getView().addDependent(pressDialog);
                    sap.ui.getCore().byId("ListDialog").setTitle("Credit Request Details for Item " + pathdata.Material);
                    sap.ui.getCore().byId("DeliveryDate").setMaxDate(new Date());
                    var oModel = this.getOwnerComponent().getModel();

                    var oFilterR = new sap.ui.model.Filter({
                        filters: [
                            new sap.ui.model.Filter("BTPCRItem", "EQ", pathdata.BTPCRItem),
                            new sap.ui.model.Filter("StatusCode_Id", "NE", 10),
                        ],
                        and: true
                    });
                    oModel.read("/CreditReqItem", {
                        filters: [oFilterR],
                        urlParameters: {
                            $expand: ["Attachment/AttachmentPIssue", "StatusCode"],
                        },
                        success: function (oResponse) {
                            console.log(oResponse.results);
                            if (oResponse.results[0].Attachment.results.length == 0) {
                                if (oResponse.results[0].ItemType == "D" || oResponse.results[0].Material == "DC") {
                                    that.onClose();
                                    //   sap.m.MessageBox.show("For Delivery Fee the icon process in available.");
                                    return;
                                }
                                pressDialog.open();
                                sap.ui.getCore().byId("Damage").setVisible(false);
                                sap.ui.getCore().byId("Shortage").setVisible(false);
                                sap.ui.getCore().byId("Quality").setVisible(false);
                                sap.ui.getCore().byId("NotShipped").setVisible(false);
                                sap.ui.getCore().byId("idQualityPhoto").setVisible(false);
                                sap.ui.getCore().byId("idstep").setEnabled(true);
                                sap.ui.getCore().byId("idcbox").setEnabled(false);
                                sap.ui.getCore().byId("appQtyText").setVisible(false);
                                sap.ui.getCore().byId("apprQty").setVisible(false);
                                sap.ui.getCore().byId("openQtyText").setVisible(true);
                                sap.ui.getCore().byId("openqty").setVisible(true);

                                //        sap.ui.getCore().byId("idcbox").getBinding("items").filter([new sap.ui.model.Filter("Description", "EQ", "Shortage"), new sap.ui.model.Filter("Description", "EQ", "Damage"), new sap.ui.model.Filter("Description", "EQ", "Not Shipped")])
                                sap.ui.getCore().byId("idstep").setValue(oResponse.results[0].Qty);
                                sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty);
                                sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty );

                                // var oFilterR = new sap.ui.model.Filter({
                                //     filters: [
                                //         new sap.ui.model.Filter("PsplInvoice", "EQ", that.getView().getModel("CreditReqHdrModel").getData().items[0].PsplInvoice),
                                //         new sap.ui.model.Filter("Material", "EQ", pathdata.Material),
                                //         new sap.ui.model.Filter("Description", "EQ", pathdata.Description),
                                //         new sap.ui.model.Filter("StatusDescription", "EQ", pathdata.StatusDescription)
                                //     ],
                                //     and: true
                                // });
                                // oModel.read("/GetCRQuantity", {
                                //     filters: [oFilterR],
                                //     success: function (oResponse) {
                                //         console.log(oResponse.results);
                                //         sap.ui.getCore().byId("idstep").setMax(oResponse.results[0].OpenQty);
                                //         sap.ui.getCore().byId("openqty").setText(oResponse.results[0].OpenQty);



                                //     },
                                //     error: function (err) { }
                                // });
                            }
                            else {
                                that.checkCRStatus(oResponse.results[0], pathdata);
                            }

                        },
                        error: function (err) { }
                    });

                }
            },
            checkCRStatus: function (data, pathdata) {
                var that = this;
                var CRId = data.Attachment.results[0].CRType_Id;
                var oModel = this.getOwnerComponent().getModel();
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("Id", "EQ", CRId)
                    ],
                    and: true
                });
                oModel.read("/CRType", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        var crType = oResponse.results[0].Description;
                        var Id = oResponse.results[0].Id;

                        if (oResponse.results[0].Description == "Damage") {
                            sap.ui.getCore().byId("Damage").setVisible(true);
                            sap.ui.getCore().byId("Quality").setVisible(false);
                            sap.ui.getCore().byId("Shortage").setVisible(false);
                            sap.ui.getCore().byId("NotShipped").setVisible(false);
                            sap.ui.getCore().byId("idQualityPhoto").setVisible(false);
                            var Attachmentid = data.Attachment.results[0].AttachmentId;
                            var DamageId_Id = data.Attachment.results[0].DamageId_Id;
                            oModel.read("/Attachment(AttachmentId=" + Attachmentid +
                                ")/AttachmentRow", {

                                success: function (oResponse) {
                                    console.log(oResponse.results);
                                    pressDialog.open();
                                    sap.ui.getCore().byId("LotCode").setValue(data.Attachment.results[0].LotCode);
                                    //            sap.ui.getCore().byId("coments").setValue(data.Attachment.results[0].Comment);
                                    sap.ui.getCore().byId("idstep").setValue(data.Qty);
                                    sap.ui.getCore().byId("idcbox").setSelectedKey(Id);
                                    sap.ui.getCore().byId("apprQty").setMax(data.Qty);
                                    sap.ui.getCore().byId("apprQty").setValue(data.ApproveQty);
                                    sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty);
                                    sap.ui.getCore().byId("idReClasiLabel").setVisible(false);

                                    if (data.StatusCode.StatusType == "RTA" || data.StatusDescription == "Approved") {
                                        sap.ui.getCore().byId("Idsave").setEnabled(false);
                                        sap.ui.getCore().byId("apprQty").setEnabled(false);

                                    }
                                    //Begin of changes done by bala on 13th june 2023

                                    if (data.StatusDescription == "Cancelled" || data.StatusDescription == "Denied" || data.StatusDescription == "Approved" || StatusDescription == "Redelivery") {
                                        sap.ui.getCore().byId("Idsave").setEnabled(false);
                                        sap.ui.getCore().byId("attachmentUpl").setUploadEnabled(false);
                                        sap.ui.getCore().byId("apprQty").setEnabled(false);

                                    }
                                    //End of changes done by bala on 13th june 2023
                                    if (sap.ui.getCore().byId("apprQty").getEnabled() == false) {
                                        sap.ui.getCore().byId("Idsave").setEnabled(false);

                                    }
                                    if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {
                                        that.QualityApprovedData = data;
                                        sap.ui.getCore().byId("attachmentUpl").setUploadEnabled(true);


                                    }
                                    // if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "DraftSCC") {
                                    if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusType == "DraftSCC") {
                                        sap.ui.getCore().byId("idstep").setEnabled(true);
                                        sap.ui.getCore().byId("LotCode").setEnabled(true);
                                        sap.ui.getCore().byId("openQtyText").setVisible(true);
                                        sap.ui.getCore().byId("openqty").setVisible(true);
                                        //                 sap.ui.getCore().byId("coments").setEnabled(true);
                                        sap.ui.getCore().byId("attachmentUpl").setUploadEnabled(true);
                                        sap.ui.getCore().byId("Idsave").setEnabled(true);
                                        sap.ui.getCore().byId("Expdate").setEnabled(true);
                                        DraftStatusFlg = true;
                                        sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty);

                                        sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty);

                                    }
                                    else {
                                        // sap.ui.getCore().byId("Idsave").setEnabled(true);
                                        //     sap.ui.getCore().byId("apprQty").setEnabled(true);

                                    }

                                    var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                        pattern: "yyyy-MM-dd",
                                        UTC: 'true'

                                    });
                                    var d = data.Attachment.results[0].ExpDate

                                    if (d != null) {
                                        d = oDateFormat.format(new Date(d));
                                        sap.ui.getCore().byId("Expdate").setValue(d);
                                    }
                                    else {
                                        sap.ui.getCore().byId("Expdate").setValue("");
                                    }
                                    var att = new sap.m.ObjectAttribute({ title: "Uploaded by", text: "{createdBy}" });
                                    var att1 = new sap.m.ObjectAttribute({ title: "Date", text: "{modifiedAt}" });
                                    oAttachmentUpl = sap.ui.getCore().byId("attachmentUpl");
                                    oAttachmentsModel.setProperty("/", []);
                                    oAttachmentsModel.setProperty("/", oResponse);
                                    oAttachmentUpl
                                        .setModel(oAttachmentsModel)
                                        .bindAggregation(
                                            "items",
                                            "/results",
                                            new sap.m.upload.UploadSetItem({
                                                fileName: "{FileName}",
                                                mediaType: "{MediaType}",
                                                visibleEdit: false,
                                                visibleRemove: that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription === 'Draft' ? true : false,
                                                url: "{Url}",
                                                openPressed: that.onOpenPressed,
                                            })
                                            //.addAttribute(att).addAttribute(att1)
                                        );
                                },
                                error: function (err) { }
                            });

                        }
                        if (oResponse.results[0].Description == "Shortage") {
                            sap.ui.getCore().byId("Damage").setVisible(false);
                            sap.ui.getCore().byId("Quality").setVisible(false);
                            sap.ui.getCore().byId("Shortage").setVisible(true);
                            sap.ui.getCore().byId("NotShipped").setVisible(false);
                            sap.ui.getCore().byId("idQualityPhoto").setVisible(false);
                            //  pressDialog.open();
                            sap.ui.getCore().byId("idstep").setValue(data.Qty);
                            sap.ui.getCore().byId("idcbox").setSelectedKey(Id);
                            sap.ui.getCore().byId("apprQty").setMax(data.Qty);
                            sap.ui.getCore().byId("apprQty").setValue(data.ApproveQty);
                            sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty);
                            sap.ui.getCore().byId("apprQty").setValue(data.ApproveQty);
                            sap.ui.getCore().byId("idReClasiLabel").setVisible(false);

                            if (data.StatusCode.StatusType == "RTA" || data.StatusDescription == "Approved") {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);
                                sap.ui.getCore().byId("apprQty").setEnabled(false);

                            }
                            if (data.StatusDescription == "Cancelled" || data.StatusDescription == "Denied") {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);
                                sap.ui.getCore().byId("apprQty").setEnabled(false);

                            }
                            if (sap.ui.getCore().byId("apprQty").getEnabled() == false) {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);

                            }
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {
                                that.QualityApprovedData = data;

                            }
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusType == "DraftSCC") {
                                sap.ui.getCore().byId("idstep").setEnabled(true);
                                sap.ui.getCore().byId("openQtyText").setVisible(true);
                                sap.ui.getCore().byId("openqty").setVisible(true);
                                sap.ui.getCore().byId("DeliveryDate").setEnabled(true);
                                sap.ui.getCore().byId("Idsave").setEnabled(true);
                                DraftStatusFlg = true;
                                sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty );
                                sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty );


                            }
                            else {
                                // sap.ui.getCore().byId("Idsave").setEnabled(true);
                                //  sap.ui.getCore().byId("apprQty").setEnabled(true);

                            }
                            var Attachmentid = data.Attachment.results[0].AttachmentId;
                            var DamageId_Id = data.Attachment.results[0].DamageId_Id;
                            //  pressDialog.open();


                            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                pattern: "yyyy-MM-dd",
                                UTC: 'true'
                            });
                            var d = data.Attachment.results[0].DeliveryDate
                            if (d != null) {
                                d = oDateFormat.format(new Date(d));
                                sap.ui.getCore().byId("DeliveryDate").setValue(d);
                            }
                            else {
                                sap.ui.getCore().byId("DeliveryDate").setValue("");
                            }
                            oModel.read("/Attachment(AttachmentId=" + Attachmentid +
                                ")/AttachmentRow", {

                                success: function (oResponse) {
                                    console.log(oResponse.results);
                                    pressDialog.open();

                                    if (data.StatusDescription == "Cancelled" || data.StatusDescription == "Denied" || data.StatusDescription == "Approved" || StatusDescription == "Redelivery") {
                                        sap.ui.getCore().byId("Idsave").setEnabled(false);
                                        sap.ui.getCore().byId("attachmentUplSht").setUploadEnabled(false);
                                        sap.ui.getCore().byId("apprQty").setEnabled(false);

                                    }

                                    if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {

                                        sap.ui.getCore().byId("attachmentUplSht").setUploadEnabled(true);


                                    }

                                    if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusType == "DraftSCC") {

                                        sap.ui.getCore().byId("attachmentUplSht").setUploadEnabled(true);
                                        sap.ui.getCore().byId("Idsave").setEnabled(true);


                                    }
                                    else {
                                        // sap.ui.getCore().byId("Idsave").setEnabled(true);
                                        //     sap.ui.getCore().byId("apprQty").setEnabled(true);

                                    }

                                    var att = new sap.m.ObjectAttribute({ title: "Uploaded by", text: "{createdBy}" });
                                    var att1 = new sap.m.ObjectAttribute({ title: "Date", text: "{modifiedAt}" });
                                    oAttachmentUpl3 = sap.ui.getCore().byId("attachmentUplSht");
                                    oAttachmentsModel3.setProperty("/", []);
                                    oAttachmentsModel3.setProperty("/", oResponse);
                                    oAttachmentUpl3
                                        .setModel(oAttachmentsModel3)
                                        .bindAggregation(
                                            "items",
                                            "/results",
                                            new sap.m.upload.UploadSetItem({
                                                fileName: "{FileName}",
                                                mediaType: "{MediaType}",
                                                visibleEdit: false,
                                                visibleRemove: that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription === 'Draft' ? true : false,
                                                url: "{Url}",
                                                openPressed: that.onOpenPressed,
                                            })
                                            //.addAttribute(att).addAttribute(att1)
                                        );
                                },
                                error: function (err) { }
                            });
                        }
                        if (oResponse.results[0].Description == "Not Shipped") {
                            sap.ui.getCore().byId("Damage").setVisible(false);
                            sap.ui.getCore().byId("Quality").setVisible(false);
                            sap.ui.getCore().byId("Shortage").setVisible(false);
                            sap.ui.getCore().byId("NotShipped").setVisible(true);
                            sap.ui.getCore().byId("idQualityPhoto").setVisible(false);
                            //  pressDialog.open();
                            sap.ui.getCore().byId("idstep").setValue(data.Qty);
                            sap.ui.getCore().byId("idcbox").setSelectedKey(Id);
                            sap.ui.getCore().byId("apprQty").setMax(data.Qty);
                            sap.ui.getCore().byId("apprQty").setValue(data.ApproveQty);
                            //                    sap.ui.getCore().byId("Nscomments").setValue(data.Attachment.results[0].Comment);
                            //                    sap.ui.getCore().byId("Nscomments").setEnabled(false);
                            sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty);
                            sap.ui.getCore().byId("idReClasiLabel").setVisible(false);


                            if (data.StatusCode.StatusType == "RTA" || data.StatusDescription == "Approved") {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);
                                sap.ui.getCore().byId("apprQty").setEnabled(false);

                            }
                            //Begin of changes done by bala on 13th june 2023

                            if (data.StatusDescription == "Cancelled" || data.StatusDescription == "Denied" || StatusDescription == "Redelivery") {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);
                                sap.ui.getCore().byId("apprQty").setEnabled(false);
                             //End of changes done by bala on 13th june 2023
                            }
                            if (sap.ui.getCore().byId("apprQty").getEnabled() == false) {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);

                            }
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {
                                that.QualityApprovedData = data;

                            }
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusType == "DraftSCC") {
                                sap.ui.getCore().byId("idstep").setEnabled(true);
                                sap.ui.getCore().byId("openQtyText").setVisible(true);
                                sap.ui.getCore().byId("openqty").setVisible(true);
                                //                        sap.ui.getCore().byId("Nscomments").setEnabled(true);
                                sap.ui.getCore().byId("Idsave").setEnabled(true);
                                DraftStatusFlg = true;
                                sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty );
                                sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty );


                            }
                            else {
                                // sap.ui.getCore().byId("Idsave").setEnabled(true);
                                //  sap.ui.getCore().byId("apprQty").setEnabled(true);

                            }
                            var Attachmentid = data.Attachment.results[0].AttachmentId;
                            var DamageId_Id = data.Attachment.results[0].DamageId_Id;


                            pressDialog.open();


                            // var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                            //     pattern: "yyyy-MM-dd"
                            // });
                            // var d = data.Attachment.results[0].DeliveryDate
                            // d = oDateFormat.format(new Date(d));
                            // if (d != null) {
                            //     sap.ui.getCore().byId("DeliveryDate").setValue(d);
                            // }

                        }
                        if (oResponse.results[0].Description == "Quality") {
                            that.setProductIssue();
                            sap.ui.getCore().byId("Damage").setVisible(false);
                            sap.ui.getCore().byId("Quality").setVisible(true);
                            sap.ui.getCore().byId("Shortage").setVisible(false);
                            sap.ui.getCore().byId("NotShipped").setVisible(false);

                            sap.ui.getCore().byId("idQualityPhoto").setVisible(true);
                            sap.ui.getCore().byId("idstep").setValue(data.Qty);
                            sap.ui.getCore().byId("idcbox").setSelectedKey(Id);
                            sap.ui.getCore().byId("apprQty").setMax(data.Qty);
                            sap.ui.getCore().byId("idReClasiLabel").setVisible(true);
                            sap.ui.getCore().byId("idReClasi").setVisible(true);
                            sap.ui.getCore().byId("idReClasi").setSelectedKey(data.Attachment.results[0].Classification);
                            //   sap.ui.getCore().byId("idReClasi").setValue(data.Attachment.results[0].Classification);

                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {

                                sap.ui.getCore().byId("idReClasiLabel").setVisible(true);
                                sap.ui.getCore().byId("idReClasi").setVisible(true);
                                sap.ui.getCore().byId("Idsave").setEnabled(true);
                                that.QualityApprovedData = data;
                                sap.ui.getCore().byId("apprQty").setValue(data.ApproveQty);
                                sap.ui.getCore().byId("idReClasi").setSelectedKey(data.Attachment.results[0].Classification);
                                //    sap.ui.getCore().byId("idReClasi").setValue(data.Attachment.results[0].Classification);
                                sap.ui.getCore().byId("attachmentUpl1").setUploadEnabled(true);



                            }
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Submitted") {
                                sap.ui.getCore().byId("idReClasi").setEnabled(false);

                            }
                            if (data.StatusCode.StatusType == "RTA" || data.StatusDescription == "Approved") {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);
                                sap.ui.getCore().byId("apprQty").setEnabled(false);

                            }
                            //Begin of changes done by bala on 13th june 2023

                            if (data.StatusDescription == "Cancelled" || data.StatusDescription == "Denied" || data.StatusDescription == "Approved" || StatusDescription == "Redelivery") {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);
                                sap.ui.getCore().byId("attachmentUpl1").setUploadEnabled(false);
                                sap.ui.getCore().byId("apprQty").setEnabled(false);
                                sap.ui.getCore().byId("idReClasi").setEnabled(false);
                            //End of changes done by bala on 13th june 2023    

                            }
                            //       pressDialog.open();

                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusType == "DraftSCC") {
                                DraftStatusFlg = true;
                                sap.ui.getCore().byId("idstep").setEnabled(true);
                                sap.ui.getCore().byId("openQtyText").setVisible(true);
                                sap.ui.getCore().byId("openqty").setVisible(true);
                                sap.ui.getCore().byId("Quality").getContent()[2].setEnabled(false);
                                sap.ui.getCore().byId("Quality").getContent()[4].setEnabled(true);
                                sap.ui.getCore().byId("Quality").getContent()[6].setEnabled(true);
                                sap.ui.getCore().byId("Quality").getContent()[8].setEnabled(true);
                                sap.ui.getCore().byId("Quality").getContent()[11].setEnabled(true);
                                sap.ui.getCore().byId("Quality").getContent()[13].setEnabled(true);
                                sap.ui.getCore().byId("Quality").getContent()[15].setEnabled(true);
                                sap.ui.getCore().byId("Quality").getContent()[17].setEnabled(true);
                                sap.ui.getCore().byId("attachmentUpl1").setUploadEnabled(true);
                                sap.ui.getCore().byId("Idsave").setEnabled(true);
                                sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty );
                                sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty );



                            }
                            sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty );

                            var t1 = [];
                            for (var i in data.Attachment.results[0].AttachmentPIssue.results) {
                                t1.push(data.Attachment.results[0].AttachmentPIssue.results[i].ProductIssueMaster_Id.toString());

                            }
                            sap.ui.getCore().byId("Quality").getContent()[4].setSelectedKeys(t1);
                            var Attachmentid = data.Attachment.results[0].AttachmentId;
                            var DamageId_Id = data.Attachment.results[0].DamageId_Id;
                            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                pattern: "yyyy-MM-dd",
                                UTC: 'true'
                            });
                            that.PISelectedkeys = sap.ui.getCore().byId("idProductIssueMCB").getSelectedKeys();
                            sap.ui.getCore().byId("Quality").getContent()[2].setValue(data.ProductType);
                            sap.ui.getCore().byId("Quality").getContent()[6].setValue(data.Attachment.results[0].UseByDate == null ? "" : oDateFormat.format(new Date(data.Attachment.results[0].UseByDate)));
                            sap.ui.getCore().byId("Quality").getContent()[8].setValue(data.Attachment.results[0].JulianDate == null ? "" : oDateFormat.format(new Date(data.Attachment.results[0].JulianDate)));
                            sap.ui.getCore().byId("Quality").getContent()[11].setValue(data.Attachment.results[0].LotCode);
                            sap.ui.getCore().byId("Quality").getContent()[13].setValue(data.Attachment.results[0].MfgDate == null ? "" : oDateFormat.format(new Date(data.Attachment.results[0].MfgDate)));
                            sap.ui.getCore().byId("Quality").getContent()[15].setValue(data.Attachment.results[0].ExpirationDate == null ? "" : oDateFormat.format(new Date(data.Attachment.results[0].ExpirationDate)));
                            sap.ui.getCore().byId("Quality").getContent()[17].setValue(data.Attachment.results[0].BestBeforeDate == null ? "" : oDateFormat.format(new Date(data.Attachment.results[0].BestBeforeDate)));
                            oModel.read("/Attachment(AttachmentId=" + Attachmentid +
                                ")/AttachmentRow", {

                                success: function (oResponse) {
                                    console.log(oResponse.results);
                                    //                 if(oResponse.results.length>0){
                                    //                 that.getView().setModel(new sap.ui.model.json.JSONModel({
                                    //         items: oResponse.results[0]
                                    //     }), "QualityPhoto");

                                    // }
                                    var att = new sap.m.ObjectAttribute({ title: "Uploaded by", text: "{createdBy}" });
                                    var att1 = new sap.m.ObjectAttribute({ title: "Date", text: "{modifiedAt}" });
                                    oAttachmentUpl2 = sap.ui.getCore().byId("attachmentUpl1");
                                    oAttachmentsModel2.setProperty("/", []);
                                    oAttachmentsModel2.setProperty("/", oResponse);
                                    var att = new sap.m.ObjectAttribute({ title: "Uploaded by", text: "{createdBy}" });
                                    oAttachmentUpl2
                                        .setModel(oAttachmentsModel2)
                                        .bindAggregation(
                                            "items",
                                            "/results",
                                            new sap.m.upload.UploadSetItem({
                                                fileName: "{FileName}",
                                                mediaType: "{MediaType}",
                                                visibleEdit: false,
                                                visibleRemove: that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription === 'Draft' ? true : false,
                                                url: "{Url}",

                                                openPressed: that.onOpenPressed,
                                            })
                                            //.addAttribute(att).addAttribute(att1)
                                            //.addAttribute(att)
                                        );
                                    pressDialog.open();


                                    // var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                    //     pattern: "MM-dd-yyyy"
                                    // });
                                    // var d = data.Attachment.results[0].DeliveryDate
                                    // if (d != null) {
                                    //     d = oDateFormat.format(new Date(d));
                                    //     sap.ui.getCore().byId("DeliveryDate").setValue(d);
                                    // }
                                    // else {
                                    //     sap.ui.getCore().byId("DeliveryDate").setValue("MM-dd-yyyy");
                                    // }

                                },
                                error: function (err) { }
                            });
                        }
                        if (oResponse.results[0].Description == "Without Invoice") {
                            var remark = that.getView().getModel("CreditReqHdrModel").getData().items[0].Remark;
                            sap.ui.getCore().byId("Remark").setValue(remark);

                            var Attachmentid = data.Attachment.results[0].AttachmentId;
                            var DamageId_Id = data.Attachment.results[0].DamageId_Id;
                            oModel.read("/Attachment(AttachmentId=" + Attachmentid +
                                ")/AttachmentRow", {

                                success: function (oResponse) {
                                    console.log(oResponse.results);

                                    oAttachmentUpl2 = sap.ui.getCore().byId("CustomUpload");
                                    oAttachmentsModel2.setProperty("/", []);
                                    oAttachmentsModel2.setProperty("/", oResponse);
                                    oAttachmentUpl2
                                        .setModel(oAttachmentsModel2)
                                        .bindAggregation(
                                            "items",
                                            "/results",
                                            new sap.m.upload.UploadSetItem({
                                                fileName: "{FileName}",
                                                mediaType: "{MediaType}",
                                                visibleEdit: false,
                                                visibleRemove: false,
                                                url: "{Url}",
                                                openPressed: that.onOpenPressed,
                                            })
                                        );
                                    pressDialog2.open();


                                },
                                error: function (err) { }
                            });
                        }



                    },
                    error: function (err) { }
                });
            },
            onCreateWithoutInvoice: function (pathdata) {
                var that = this;
                (pressDialog2 = sap.ui.getCore().byId("DialogPopUp"));

                if (!pressDialog2) {
                    pressDialog2 = sap.ui.xmlfragment(
                        "sccmanagecr.ext.fragments.CreateWithoutInvoice",
                        this
                    );
                    this.getView().addDependent(pressDialog2);
                }

                var oModel = this.getOwnerComponent().getModel();

                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRItem", "EQ", pathdata.BTPCRItem)
                    ],
                    and: true
                });
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    urlParameters: {
                        $expand: "Attachment/AttachmentPIssue",
                    },
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        if (oResponse.results[0].Attachment.results.length == 0) {

                        }
                        else {
                            that.checkCRStatus(oResponse.results[0], pathdata);
                        }

                    },
                    error: function (err) { }
                });
            },
            onClosePressed: function () {
                pressDialog2.close();
                this._itemDialogDestroyWI();
                pressDialog2.destroy();

            },

            _itemDialogDestroyWI() {
                // sap.ui.getCore().byId("Remark").mProperties.value = "";
                // sap.ui.getCore().byId("CustomUpload").destroyItems();
                sap.ui.getCore().byId("Remark").destroy();
                sap.ui.getCore().byId("CustomUpload").destroy();
                if (sap.ui.getCore().byId("CustomUpload-uploader") !== undefined) {
                    sap.ui.getCore().byId("CustomUpload-uploader").destroy();
                }
                if (sap.ui.getCore().byId("CustomUpload-toolbar") !== undefined) {
                    sap.ui.getCore().byId("CustomUpload-toolbar").destroy();
                }
                if (
                    sap.ui.getCore().byId("'CustomUpload-deleteDialog'") !== undefined
                ) {
                    sap.ui.getCore().byId("'CustomUpload-deleteDialog'").destroy();
                }

                if (sap.ui.getCore().byId("CustomUpload-list") !== undefined) {
                    sap.ui.getCore().byId("CustomUpload-list").destroy();
                }

            },
            onApproveChange: function () {
                var oValue = sap.ui.getCore().byId("apprQty").getValue();
                var max = sap.ui.getCore().byId("apprQty").getMax();
                // if (DraftStatusFlg == true) {
                //     return;
                // }
                if (oValue == 0) {
                    sap.ui.getCore().byId("idcbox").setEnabled(false);
                    sap.ui.getCore().byId("Idsave").setEnabled(false);
                } else {
                    sap.ui.getCore().byId("idcbox").setEnabled(true);
                    sap.ui.getCore().byId("Idsave").setEnabled(true);
                }
                if (oValue > max) {
                    sap.ui.getCore().byId("idstep").setValueState("Error");
                    sap.m.MessageBox.warning(
                        "Approve Quantity should not be greater than Credit Request Quantity"
                    );
                    sap.ui.getCore().byId("idcbox").setEnabled(false);
                    sap.ui.getCore().byId("Idsave").setEnabled(false);

                }
                else {
                    if (oValue !== 0) {


                        sap.ui.getCore().byId("idcbox").setEnabled(true);
                        sap.ui.getCore().byId("Idsave").setEnabled(true);
                        sap.ui.getCore().byId("idcbox").setEnabled(false);
                    }
                }
            },
            onChange: function () {
                var oValue = sap.ui.getCore().byId("idstep").getValue();
                var max = sap.ui.getCore().byId("idstep").getMax();

                // Begin of changes done by Bala on 5th June 2023
                var oValues2 = sap.ui.getCore().byId("idcbox");
                var oBoxItems = [], oProp = {};
                var oItems = oValues2.getItems(); 
                if(this.oIsSap == 'Y'){
            
                    if(this.getView().getModel('boxModel') == undefined){
                      for (let index = 0; index < oItems.length; index++) {
                        if(oValues2.getItems()[index].getProperty('key') != 4){
                          oProp.key = oItems[index].getProperty("key");
                          oProp.text = oItems[index].getProperty("text");
                          oBoxItems.push(oProp);
                          oProp = {};
                        } 
                      }
                      var oJson = new JSONModel();
                      oJson.setData(oBoxItems);
                      this.getView().setModel(oJson,"boxModel");
                    }
              
                      oValues2.bindAggregation("items",{
                        path:"boxModel>/",
                        template: new sap.ui.core.Item({
                          key:"{boxModel>key}",
                          text:"{boxModel>text}"
                        })
                      });
            }

                //End of Changes done by Bala on 5the June 2023

                
                
                if (DraftStatusFlg == true) {
                    if (oValue > max) {
                        sap.ui.getCore().byId("idstep").setValueState("Error");
                        sap.m.MessageBox.warning(
                            "Credit Request Quantity should not be greater than Max Quantity"
                        );
                        sap.ui.getCore().byId("Idsave").setEnabled(false);
                    }
                    if (oValue <= max) {
                        // sap.ui.getCore().byId("Idsave").setEnabled(true);
                        sap.ui.getCore().byId("idstep").setValueState("None");


                    }

                    return;
                }
                if (oValue == 0) {
                    sap.ui.getCore().byId("idcbox").setEnabled(false);
                    // sap.ui.getCore().byId("Idsave").setEnabled(false);
                } else {
                    sap.ui.getCore().byId("idcbox").setEnabled(true);
                    // sap.ui.getCore().byId("Idsave").setEnabled(true);
                }
                if (oValue > max) {
                    sap.ui.getCore().byId("idstep").setValueState("Error");
                    sap.m.MessageBox.warning(
                        "Credit Request Quantity should not be greater than Max Quantity"
                    );
                    sap.ui.getCore().byId("idcbox").setEnabled(false);
                    sap.ui.getCore().byId("Idsave").setEnabled(false);
                    return false;
                }
                if (oValue <= max) {
                    // sap.ui.getCore().byId("Idsave").setEnabled(true);
                    sap.ui.getCore().byId("idstep").setValueState("None");


                }
                else {
                    if (oValue !== 0) {


                        sap.ui.getCore().byId("idcbox").setEnabled(true);
                        // sap.ui.getCore().byId("Idsave").setEnabled(true);
                    }
                }
                if (oValue == 0 || sap.ui.getCore().byId("idcbox").getValue() == "") {
                    sap.ui.getCore().byId("Idsave").setEnabled(false);
                    return
                }
                else{
                    sap.ui.getCore().byId("Idsave").setEnabled(true);
                }
            },
            oSelectionchange: function (oevt) {
                var that = this;
                if (sap.ui.getCore().byId("idstep").getValue() == 0) {
                    sap.ui.getCore().byId("Idsave").setEnabled(false);
                    return
                } 
                if(oevt.getSource().getSelectedItem()===null){
                    sap.ui.getCore().byId("Idsave").setEnabled(false);
          }
                var oSelectedkey = oevt.getSource().getSelectedItem().getText();
                if (oSelectedkey !== "") {
                    sap.ui.getCore().byId("Idsave").setEnabled(true);
                }
                else {
                    sap.ui.getCore().byId("Idsave").setEnabled(false);
                }
                if (oSelectedkey == "Damage") {
                    sap.ui.getCore().byId("idReClasiLabel").setVisible(false);
                    sap.ui.getCore().byId("idReClasi").setVisible(false);
                    sap.ui.getCore().byId("Damage").setVisible(true);
                    sap.ui.getCore().byId("Shortage").setVisible(false);
                    sap.ui.getCore().byId("Quality").setVisible(false);
                    sap.ui.getCore().byId("idQualityPhoto").setVisible(false);
                    sap.ui.getCore().byId("idstep").setEnabled(true);
                    sap.ui.getCore().byId("idcbox").setEnabled(true);
                    sap.ui.getCore().byId("apprQty").setEnabled(false);
                    sap.ui.getCore().byId("LotCode").setEnabled(true);
                    sap.ui.getCore().byId("Expdate").setEnabled(true);
                    //               sap.ui.getCore().byId("coments").setEnabled(true);
                    sap.ui.getCore().byId("attachmentUpl").setUploadEnabled(true);
                    sap.ui.getCore().byId("NotShipped").setVisible(false);

                } else if (oSelectedkey == "Shortage") {
                    sap.ui.getCore().byId("idReClasiLabel").setVisible(false);
                    sap.ui.getCore().byId("idReClasi").setVisible(false);
                    sap.ui.getCore().byId("Damage").setVisible(false);
                    sap.ui.getCore().byId("Shortage").setVisible(true);
                    sap.ui.getCore().byId("Quality").setVisible(false);
                    sap.ui.getCore().byId("idQualityPhoto").setVisible(false);
                    sap.ui.getCore().byId("DeliveryDate").setEnabled(true);
                    sap.ui.getCore().byId("DeliveryDate").setMaxDate(new Date());
                    sap.ui.getCore().byId("NotShipped").setVisible(false);

                } else if (oSelectedkey == "Quality") {
                    sap.ui.getCore().byId("idReClasiLabel").setVisible(true);
                    sap.ui.getCore().byId("idReClasi").setVisible(true);
                    sap.ui.getCore().byId("Damage").setVisible(false);
                    sap.ui.getCore().byId("Shortage").setVisible(false);
                    sap.ui.getCore().byId("Quality").setVisible(true);
                    sap.ui.getCore().byId("idQualityPhoto").setVisible(true);
                    sap.ui.getCore().byId("NotShipped").setVisible(false);
                    // pressDialog.getContent()[3].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[0].mAggregations.fields[0].setEnabled(true);
                    // pressDialog.getContent()[3].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[1].mAggregations.fields[0].setEnabled(true);
                    // pressDialog.getContent()[3].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[2].mAggregations.fields[0].setEnabled(true);
                    // pressDialog.getContent()[3].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[3].mAggregations.fields[0].setEnabled(true);
                    // pressDialog.getContent()[3].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[4].mAggregations.fields[0].setEnabled(true);
                    // pressDialog.getContent()[3].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[5].mAggregations.fields[0].setEnabled(true);
                    // pressDialog.getContent()[3].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[6].mAggregations.fields[0].setEnabled(true);
                    // pressDialog.getContent()[3].mAggregations.form.mAggregations.formContainers[0].mAggregations.formElements[7].mAggregations.fields[0].setEnabled(true);
                    sap.ui.getCore().byId("Quality").getContent()[2].setEnabled(true);
                    sap.ui.getCore().byId("Quality").getContent()[4].setEnabled(true);
                    sap.ui.getCore().byId("Quality").getContent()[6].setEnabled(true);
                    sap.ui.getCore().byId("Quality").getContent()[8].setEnabled(true);
                    sap.ui.getCore().byId("Quality").getContent()[11].setEnabled(true);
                    sap.ui.getCore().byId("Quality").getContent()[13].setEnabled(true);
                    sap.ui.getCore().byId("Quality").getContent()[15].setEnabled(true);
                    sap.ui.getCore().byId("Quality").getContent()[17].setEnabled(true);
                    sap.ui.getCore().byId("attachmentUpl1").setUploadEnabled(true);
                    sap.ui.getCore().byId("Quality").getContent()[4].setSelectedKeys([]);
                    sap.ui.getCore().byId("Quality").getContent()[6].setValue("");
                    sap.ui.getCore().byId("Quality").getContent()[8].setValue("");
                    sap.ui.getCore().byId("Quality").getContent()[11].setValue("");
                    sap.ui.getCore().byId("Quality").getContent()[13].setValue("");
                    sap.ui.getCore().byId("Quality").getContent()[15].setValue("");
                    sap.ui.getCore().byId("Quality").getContent()[17].setValue("");
                    that.setProductIssue();
                } else if (oSelectedkey == "Not Shipped") {
                    sap.ui.getCore().byId("idReClasiLabel").setVisible(false);
                    sap.ui.getCore().byId("idReClasi").setVisible(false);
                    sap.ui.getCore().byId("Damage").setVisible(false);
                    sap.ui.getCore().byId("Shortage").setVisible(false);
                    sap.ui.getCore().byId("Quality").setVisible(false);
                    sap.ui.getCore().byId("idQualityPhoto").setVisible(false);
                    sap.ui.getCore().byId("NotShipped").setVisible(true);
                }
            },
            setProductIssue: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                if (this.AddItemFlg == false) {
                    var oFilterR = new sap.ui.model.Filter({
                        filters: [
                            new sap.ui.model.Filter("PsplInvoice_PsplInvoice", "EQ", this.getView().getModel("CreditReqHdrModel").getData().items[0].PsplInvoice),
                            new sap.ui.model.Filter("ItemNo", "EQ", this.getView().getModel().getProperty(this.spath).Material)
                        ],
                        and: true
                    });
                } else {
                    var oFilterR = new sap.ui.model.Filter({
                        filters: [
                            new sap.ui.model.Filter("PsplInvoice_PsplInvoice", "EQ", this.getView().getModel("CreditReqHdrModel").getData().items[0].PsplInvoice),
                            new sap.ui.model.Filter("ItemNo", "EQ", (this.spath2).ItemNo)
                        ],
                        and: true
                    });
                }

                oModel.read("/PSInvoiceItems", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        var result = oResponse.results[0];
                        that.PType = oResponse.results[0].ProductType;

                        var id;
                        sap.ui.getCore().byId("Quality").getContent()[2].setValue(result.ProductType);
                        oModel.read("/ProductName", {
                            success: function (oData) {
                                if (oData.results.length != 0) {
                                    for (var i = 0; i < oData.results.length; i++) {
                                        if (oData.results[i].Desc === result.ProductType) {
                                            (id = oData.results[i].Id),
                                                oModel.read(
                                                    "/ProductName" + "(" + id + ")/" + "ProductIssue",
                                                    {
                                                        success: function (oData) {
                                                            that
                                                                .getOwnerComponent()
                                                                .getModel("productIssueModel")
                                                                .setProperty("/", oData.results);
                                                        },
                                                        error: function (e) { },
                                                    }
                                                );
                                        }
                                    }
                                }
                            },
                            error: function (e) { },
                        });


                    },
                    error: function (err) { }
                });
            },
            onClose: function () {
                var that = this;
                DraftStatusFlg = false;
                pressDialog.close();
                that._itemDialogDestroy();
                pressDialog.destroy();
                File = [];
            },
            onAfterItemAdded: function (oEvent) {
                var oCalledEvent = oEvent.getParameter("id");
                var item = oEvent.getParameter("item");
                this._createEntity(item, oCalledEvent);
            },
            onUploadCompleted: function (oEvent) {
                oAttachmentUpl.removeAllIncompleteItems();
            },
            _uploadContent: function (item, result, oCalledEvent) {
                var Url = result.__metadata.media_src.replaceAll("'", "");
                Url = Url.replace("$value", "Content");
                Url = Url.replace("guid", "");
                item.setUploadUrl(Url);
                item.setUrl(Url);
                oAttachmentUpl.setHttpRequestMethod("PUT");
                oAttachmentUpl.uploadItem(item);
                if (oCalledEvent === "attachmentUpl") {
                    var data = {
                        id: result.Id,
                        MediaType: item.getMediaType(),
                        FileName: item.getFileName(),
                        Size: item.getFileObject().size,
                    };
                    uploadedFileDamage.push(data);
                } else if (oCalledEvent === "attachmentUpl1") {
                    data = {
                        id: result.Id,
                        MediaType: item.getMediaType(),
                        FileName: item.getFileName(),
                        Size: item.getFileObject().size,
                    };
                    uploadedFileQuality.push(data);
                }
                else if (oCalledEvent === "attachmentUplSht") {
                    data = {
                        id: result.Id,
                        MediaType: item.getMediaType(),
                        FileName: item.getFileName(),
                        Size: item.getFileObject().size,
                    };
                    uploadedFileShortage.push(data);
                }
            },
            _createEntity: function (item, oCalledEvent) {
                var data = {
                    MediaType: item.getMediaType(),
                    FileName: item.getFileName(),
                    Size: item.getFileObject().size,
                };
                var that = this;
                var oModel = that.getOwnerComponent().getModel();
                oModel.create("/AttachmentRow", data, {
                    method: "POST",
                    success: function (data) {
                        that._uploadContent(item, data, oCalledEvent);
                    },
                    error: function (data) {
                        sap.m.MessageBox.error("Error");
                    },
                });
            },
            onBeforeItemAdded: function (oEvent) {
                oAttachmentUpl = sap.ui.getCore().byId(oEvent.getParameter("id"));
                var oItem = oEvent.getParameter("item");
                oItem.setVisibleEdit(false);
                var Data = oAttachmentUpl.getModel().getData();
                if (Data !== null) {
                    var fileIndex = Data.results.findIndex(
                        (x) => x.FileName === oItem.getFileName()
                    );
                    if (fileIndex >= 0) {
                        oEvent.preventDefault();
                        sap.m.MessageToast.show("File with same name already exists");
                        return;
                    }
                }
                // if (uploadedFileDamage.length > 0) {
                //     fileIndex = uploadedFileDamage.findIndex(
                //         (x) => x.FileName === oItem.getFileName()
                //     );
                //     if (fileIndex >= 0) {
                //         oEvent.preventDefault();
                //         sap.m.MessageToast.show("File with same name already exists");
                //         return;
                //     }
                // }
                // if (uploadedFileQuality.length > 0) {
                //     fileIndex = uploadedFileQuality.findIndex(
                //         (x) => x.FileName === oItem.getFileName()
                //     );
                //     if (fileIndex >= 0) {
                //         oEvent.preventDefault();
                //         sap.m.MessageToast.show("File with same name already exists");
                //         return;
                //     }
                // }
                // if (uploadedFileShortage.length > 0) {
                //     fileIndex = uploadedFileShortage.findIndex(
                //         (x) => x.FileName === oItem.getFileName()
                //     );
                //     if (fileIndex >= 0) {
                //         oEvent.preventDefault();
                //         sap.m.MessageToast.show("File with same name already exists");
                //         return;
                //     }
                // }
            },
            onRemoveItem: function (evt) {
                var oItem = evt.getParameter("item");
                var oCalledEvent = sap.ui.getCore().byId(evt.getParameter("id")).sId;
                var Data = sap.ui
                    .getCore()
                    .byId(evt.getParameter("id"))
                    .getModel()
                    .getData();
                if (Data !== null) {
                    sap.ui.getCore().byId(evt.getParameter("id")).removeItem(oItem);
                    if (Data.results.length > 0) {
                        var ID = Data.results.filter(
                            (x) => x.FileName === oItem.getFileName()
                        )[0].Id;
                        if (oCalledEvent === "attachmentUpl") {
                            removedFileDamage.push(ID);
                        } else if (oCalledEvent === "attachmentUpl1") {
                            removedFileQuality.push(ID);
                        }
                        else if (oCalledEvent === "attachmentUplSht") {
                            removedFileShortage.push(ID);
                        }
                    }
                } else {
                    sap.ui.getCore().byId(evt.getParameter("id")).removeItem(oItem);
                    if (oCalledEvent === "attachmentUpl") {
                        var fileIndex = uploadedFileDamage.findIndex(
                            (x) => x.FileName === oItem.getFileName()
                        );
                        uploadedFileDamage.splice(fileIndex, 1);
                    } else if (oCalledEvent === "attachmentUpl1") {
                        var fileIndex = uploadedFileQuality.findIndex(
                            (x) => x.FileName === oItem.getFileName()
                        );
                        uploadedFileQuality.splice(fileIndex, 1);
                    }
                    else if (oCalledEvent === "attachmentUplSht") {
                        var fileIndex = uploadedFileShortage.findIndex(
                            (x) => x.FileName === oItem.getFileName()
                        );
                        uploadedFileShortage.splice(fileIndex, 1);
                    }
                }
            },
            updateAttachmentID: function (attachmentID, CRType) {
                var that = this;
                var oModel = that.getOwnerComponent().getModel();
                oModel.setUseBatch(true);
                if (CRType === 1) {
                    var uploadedFile = uploadedFileDamage;
                } else if (CRType === 3) {
                    uploadedFile = uploadedFileQuality;
                }
                else if (CRType === 2) {
                    uploadedFile = uploadedFileShortage;
                }
                else {
                    uploadedFile = [];
                }
                for (var i = 0; i < uploadedFile.length; i++) {
                    var sPath = "/AttachmentRow(" + uploadedFile[i].id + ")";
                    var obj = {
                        AttachmentID_AttachmentId: attachmentID,
                    };
                    oModel.update(sPath, obj, {
                        success: function (oData) { },
                        error: function (Error) {
                            var errorMsg = JSON.parse(Error.responseText).error.message.value;
                            sap.m.MessageBox.error(errorMsg);
                        },
                    });
                }
            },
            onOpenPressed: function (oEvent) {
                var oItem = oEvent.getParameter("item");
                var oCalledEvent = oEvent.getParameters().item.getParent().getId();
                if (oCalledEvent === "attachmentUpl") {
                    var oData = this.getModel("oAttachmentsModel").getData().results;
                } else if (oCalledEvent === "attachmentUpl1") {
                    oData = this.getModel("oAttachmentsModel2").getData().results;
                }
                else if (oCalledEvent === "attachmentUplSht") {
                    oData = this.getModel("oAttachmentsModel3").getData().results;
                }
                else if (oCalledEvent === "CustomUpload") {
                    oData = this.getModel("oAttachmentsModel2").getData().results;

                }
                var Url = oData.find((x) => x.FileName === oItem.getFileName())
                    .__metadata.media_src;
                oItem.setUrl(Url);
            },
            _itemDialogDestroy() {
                removedFileDamage = [];
                removedFileQuality = [];
                removedFileShortage = [];
                uploadedFileDamage = [];
                uploadedFileQuality = [];
                uploadedFileShortage = [];
                sap.ui.getCore().byId("DeliveryDate").destroy();
                if (sap.ui.getCore().byId("idstep") !== undefined) {
                    sap.ui.getCore().byId("idstep").destroy();
                }
                sap.ui.getCore().byId("idcbox").destroy();
                //   sap.ui.getCore().byId("openqty").destroy();
                sap.ui.getCore().byId("Expdate").destroy();
                //            sap.ui.getCore().byId("coments").destroy();
                sap.ui.getCore().byId("LotCode").destroy();
                sap.ui.getCore().byId("attachmentUpl").destroy();
                if (sap.ui.getCore().byId("attachmentUpl-uploader") !== undefined) {
                    sap.ui.getCore().byId("attachmentUpl-uploader").destroy();
                }
                if (sap.ui.getCore().byId("attachmentUpl-toolbar") !== undefined) {
                    sap.ui.getCore().byId("attachmentUpl-toolbar").destroy();
                }
                if (
                    sap.ui.getCore().byId("'attachmentUpl-deleteDialog'") !== undefined
                ) {
                    sap.ui.getCore().byId("'attachmentUpl-deleteDialog'").destroy();
                }

                if (sap.ui.getCore().byId("attachmentUpl-list") !== undefined) {
                    sap.ui.getCore().byId("attachmentUpl-list").destroy();
                }
                sap.ui.getCore().byId("attachmentUpl1").destroy();
                if (sap.ui.getCore().byId("attachmentUpl1-uploader") !== undefined) {
                    sap.ui.getCore().byId("attachmentUpl1-uploader").destroy();
                }
                if (sap.ui.getCore().byId("attachmentUpl1-toolbar") !== undefined) {
                    sap.ui.getCore().byId("attachmentUpl1-toolbar").destroy();
                }
                if (
                    sap.ui.getCore().byId("'attachmentUpl1-deleteDialog'") !== undefined
                ) {
                    sap.ui.getCore().byId("'attachmentUpl1-deleteDialog'").destroy();
                }

                if (sap.ui.getCore().byId("attachmentUpl1-list") !== undefined) {
                    sap.ui.getCore().byId("attachmentUpl1-list").destroy();
                }
                sap.ui.getCore().byId("attachmentUplSht").destroy();
                if (sap.ui.getCore().byId("attachmentUplSht-uploader") !== undefined) {
                    sap.ui.getCore().byId("attachmentUplSht-uploader").destroy();
                }
                if (sap.ui.getCore().byId("attachmentUplSht-toolbar") !== undefined) {
                    sap.ui.getCore().byId("attachmentUplSht-toolbar").destroy();
                }
                if (
                    sap.ui.getCore().byId("attachmentUplSht-deleteDialog") !== undefined
                ) {
                    sap.ui.getCore().byId("attachmentUplSht-deleteDialog").destroy();
                }

                if (sap.ui.getCore().byId("attachmentUplSht-list") !== undefined) {
                    sap.ui.getCore().byId("attachmentUplSht-list").destroy();
                }

                sap.ui.getCore().byId("Damage").destroy();
                //sap.ui.getCore().byId("LotCode").destroy();
                //   sap.ui.getCore().byId("Expdate").destroy();
                //  sap.ui.getCore().byId("coments").destroy();
                sap.ui.getCore().byId("Shortage").destroy();
                //  sap.ui.getCore().byId("Quality").destroy();
                //   sap.ui.getCore().byId("QLotCode").destroy();
                //sap.ui.getCore().byId("idQualityPhoto").destroy();
                sap.ui.getCore().byId("Idsave").destroy();
            },
            onCancelBtn: function (oEvent) {
                var text = sap.ui.getCore().statustext;
                var that = this;
                that.getView().byId(that.comboboxid).setValue("");
                that.getView().byId(that.comboboxid).setSelectedKey(null);
                if (text == "Pending Approval") {
                    that.byId("statusupdateObjectPage").destroy();
                    that.byId("statusupdateobject").destroy();
                }
                if (text == "Approve") {

                    that.byId("statusupdateobject").destroy();
                }

            },
            onSaveBtn: function (evt) {
                var that = this;
                var text = sap.ui.getCore().statustext;
                var oModel = that.getOwnerComponent().getModel();
                var Path = "/CRCommit",
                    commentText = that.getView().byId("Reason").getValue();
                var obj = {
                    Id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                    CRNO_BTPCRNO: BTP_CRNO,
                    CRNO_OrgStrucEleCode_Id: 1,
                    Material: that.LocObjPage.Material,
                    Comment: commentText,
                    CreditReqItem_BTPCRItem: that.LocObjPage.BTPCRItem
                };
                oModel.create(Path, obj, {
                    method: "POST",
                    success: function (oData) {
                        // that.getView().byId("ReasonObject").setValue("");
                        that
                            .getOwnerComponent()
                            .getModel("itemCommentsModel")
                            .updateBindings(true);
                        that.getOwnerComponent().getModel("itemCommentsModel").refresh();


                        // that.extensionAPI.refresh(that._table.sId);
                        if (text == "Pending Approval") {


                            that.byId("statusupdateObjectPage").close();
                            that.onPressReadyToApprove();
                            that.byId("statusupdateobject").destroy();

                        }
                        if (text == "Approve") {

                            that.onPressApprove();
                            that.byId("statusupdateobject").destroy();
                        }
                    },
                    error: function (Error) {
                        var errorMsg = JSON.parse(Error.responseText).error.message.value;
                        sap.m.MessageBox.error(errorMsg);
                    },
                });





            },
            //code for updating the approve Qty in objectpage CRitems tbl
            onSaveCRItems: function (oEvent) {

                var that = this;
                var reClassify = sap.ui.getCore().byId("idReClasi").getSelectedKey();
                if (this.AddItemFlg == true) {
                    if (sap.ui.getCore().byId("idcbox").getValue() == "Quality") {
                        if (reClassify === "") {
                            sap.m.MessageBox.error("Select atleast one Re-Classify value");
                            //   sap.ui.getCore().byId("idReClasi").setValueState("Error");
                            return;
                        }
                        if (sap.ui.getCore().byId("idProductIssueMCB").getSelectedItems().length == 0) {

                            sap.m.MessageBox.error("Please populate required fields before saving");
                            return;
                        }
                        if (sap.ui.getCore().byId("QLotCode").getValue() == "" || this.getView().getModel("qualityModel").getData().UseByDate == null || this.getView().getModel("qualityModel").getData().BestBeforeDate == null || this.getView().getModel("qualityModel").getData().ManufactureDate == null || this.getView().getModel("qualityModel").getData().JulianDate == null || this.getView().getModel("qualityModel").getData().ExpirationDate == null) {

                            sap.m.MessageBox.show("If Lot Codes and Dates are known, fill them in now. Data cannot be added once Credit Request is Under Review.", {
                                title: "Confirmation",
                                icon: sap.m.MessageBox.Icon.QUESTION,
                                actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                                onClose: function (oAction) {
                                    if (oAction === "OK") {
                                        that.onAddItemsAddBtn();
                                    }
                                }
                            });
                            return;
                        }
                    }
                    else {
                        if(sap.ui.getCore().byId("idstep").getValue()==0){
                            sap.m.MessageBox.error("Credit Request Quantity Should be greater than zero");
                                         return;
                         }  
                        that.onAddItemsAddBtn();
                        return;
                    }
                }

                // sap.ui.getCore().byId("idReClasi").getValue();
                if (sap.ui.getCore().byId("idcbox").getValue() == "Not Shipped") {
                    // if (sap.ui.getCore().byId("Nscomments").getValue() === "") {
                    //     sap.m.MessageBox.error("Please Enter Comment");
                    //     //   sap.ui.getCore().byId("idReClasi").setValueState("Error");
                    //     return;
                    // }
                }
                if (sap.ui.getCore().byId("idcbox").getValue() == "Quality" && this.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review" && sap.ui.getCore().byId("apprQty").getVisible()) {
                    if (reClassify === "") {
                        sap.m.MessageBox.error("Select atleast one Re-Classify value");
                        //   sap.ui.getCore().byId("idReClasi").setValueState("Error");
                        return;
                    }
                    if (sap.ui.getCore().byId("apprQty").getValue() == 0) {
                        sap.m.MessageBox.alert("Approve Quantity should be greater than zero", {
                            icon: sap.m.MessageBox.Icon.QUESTION,
                            title: "Alert"
                        });
                        return;
                    }
                }
                // if (sap.ui.getCore().byId("idcbox").getValue() == "Quality" && this.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Submitted" || sap.ui.getCore().byId("idcbox").getValue() == "Quality" && this.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Draft") {
                //     if (reClassify === "") {
                //         sap.m.MessageBox.error("Select atleast one Re-Classify value");
                //         //   sap.ui.getCore().byId("idReClasi").setValueState("Error");
                //         return;
                //     }

                // }
                if (sap.ui.getCore().byId("idcbox").getValue() == "Quality" && !sap.ui.getCore().byId("apprQty").getVisible()) {
                    if (reClassify === "") {
                        sap.m.MessageBox.error("Select atleast one Re-Classify value");
                        //   sap.ui.getCore().byId("idReClasi").setValueState("Error");
                        return;
                    }
                    if (sap.ui.getCore().byId("idProductIssueMCB").getSelectedItems().length == 0) {

                        sap.m.MessageBox.error("Please populate required fields before saving");
                        return;
                    }
                    if (sap.ui.getCore().byId("QLotCode").getValue() == "" || this.getView().getModel("qualityModel").getData().UseByDate == null || this.getView().getModel("qualityModel").getData().BestBeforeDate == null || this.getView().getModel("qualityModel").getData().ManufactureDate == null || this.getView().getModel("qualityModel").getData().JulianDate == null || this.getView().getModel("qualityModel").getData().ExpirationDate == null) {

                        sap.m.MessageBox.show("If Lot Codes and Dates are known, fill them in now. Data cannot be added once Credit Request is Under Review.", {
                            title: "Confirmation",
                            icon: sap.m.MessageBox.Icon.QUESTION,
                            actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                            onClose: function (oAction) {
                                if (oAction === "OK") {
                                    that.addCRItems();
                                }
                            }
                        });
                        return;
                    }
                }
                if (sap.ui.getCore().byId("idcbox").getEnabled() == true && sap.ui.getCore().byId("idcbox").getValue() == "") {
                    sap.m.MessageBox.alert("Please Select the CRType", {
                        icon: sap.m.MessageBox.Icon.QUESTION,
                        title: "Alert"
                    });
                    return;
                }
                if (sap.ui.getCore().byId("idcbox").getEnabled() == true && sap.ui.getCore().byId("idcbox").getValue() !== "") {
                    that.addCRItems();
                    return;
                }
                if (sap.ui.getCore().byId("idcbox").getEnabled() == false && sap.ui.getCore().byId("idcbox").getValue() !== "" && sap.ui.getCore().byId("idstep").getValue() !== 0 && sap.ui.getCore().byId("apprQty").getVisible() == false) {
                    that.addCRItems();
                    return;
                }
                if (sap.ui.getCore().byId("idcbox").getEnabled() == false && sap.ui.getCore().byId("idstep").getValue() == 0) {
                    sap.m.MessageBox.alert("Please Enter the Credit Request Quantity", {
                        icon: sap.m.MessageBox.Icon.QUESTION,
                        title: "Alert"
                    });
                    return;
                }
                sap.ui.getCore().byId("Idsave").setEnabled(false);
                var path = "/CreditReqItem(BTPCRItem=" + this.selectedBTPCRItem + ")";

                var oModel = that.getOwnerComponent().getModel();
                var ApproveQty = sap.ui.getCore().byId("apprQty").getValue();
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRItem", "EQ", this.selectedBTPCRItem),
                        new sap.ui.model.Filter("StatusCode_Id", "NE", 10),
                    ],
                    and: true
                });
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    urlParameters: {
                        $expand: "Attachment/AttachmentPIssue",
                    },
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        // var BTPCRItem = oData.results[0].BTPCRItem;
                        // Attachmentid =
                        //     oData.results[0].Attachment.results[0].AttachmentId;
                        var oModel = that.getOwnerComponent().getModel();
                        oModel.setUseBatch(true);
                        for (var i = 0; i < removedFileDamage.length; i++) {
                            var sPath = "/AttachmentRow(" + removedFileDamage[i] + ")";
                            oModel.remove(sPath, {
                                method: "POST",
                                success: function (data) { },
                                error: function (e) { },
                            });
                        }
                        for (var i = 0; i < removedFileQuality.length; i++) {
                            var sPath = "/AttachmentRow(" + removedFileQuality[i] + ")";
                            oModel.remove(sPath, {
                                method: "POST",
                                success: function (data) { },
                                error: function (e) { },
                            });
                        }
                        for (var i = 0; i < removedFileShortage.length; i++) {
                            var sPath = "/AttachmentRow(" + removedFileShortage[i] + ")";
                            oModel.remove(sPath, {
                                method: "POST",
                                success: function (data) { },
                                error: function (e) { },
                            });
                        }

                        if (sap.ui.getCore().byId("NotShipped").getVisible() == true) {
                            var comment = "";
                            //sap.ui.getCore().byId("Nscomments").getValue()
                        }
                        else {
                            var comment = "";
                            //sap.ui.getCore().byId("coments").getValue()

                        }
                        var MfgDate = null,
                            UseByDate = null,
                            JulianDate = null,
                            BestBeforeDate = null,
                            LotCode = null,
                            ExpirationDate = null;
                        if (sap.ui.getCore().byId("Quality").getVisible() == true) {

                            var qualityModel = that.getOwnerComponent().getModel("qualityModel");
                            ExpirationDate = qualityModel.getProperty("/ExpirationDate") ? qualityModel.getProperty("/ExpirationDate") : null;
                            MfgDate = qualityModel.getProperty("/ManufactureDate") ? qualityModel.getProperty("/ManufactureDate") : null;
                            UseByDate = qualityModel.getProperty("/UseByDate") ? qualityModel.getProperty("/UseByDate") : null;
                            JulianDate = qualityModel.getProperty("/JulianDate") ? qualityModel.getProperty("/JulianDate") : null;
                            BestBeforeDate = qualityModel.getProperty("/BestBeforeDate") ? qualityModel.getProperty("/BestBeforeDate") : null;
                            LotCode = qualityModel.getProperty("/LotCode");
                        }
                        if (sap.ui.getCore().byId("Damage").getVisible() == true) {
                            LotCode = sap.ui.getCore().byId("LotCode").getValue();

                        }
                        var AttachmentPIssue = [];
                        for (var i in that.PISelectedkeys) {
                            var obj = {
                                ProductIssueMaster_Id: that.PISelectedkeys[i]
                            }
                            AttachmentPIssue.push(obj);
                        }
                        var obj1 = {
                            Qty: sap.ui.getCore().byId("idstep").getValue(),
                            "StatusCode_Id": 1,
                            CRType_Id: sap.ui.getCore().byId("idcbox").getSelectedKey(),
                            ProductType: that.PType,
                            ApproveQty: sap.ui.getCore().byId("apprQty").getValue(),
                            Attachment: [
                                {
                                    CRType_Id: sap.ui.getCore().byId("idcbox").getSelectedKey(),
                                    DamageId_Id: 1,
                                    LotCode: LotCode,
                                    Comment: comment,
                                    ExpDate: sap.ui.getCore().byId("Expdate").getValue()
                                        ? sap.ui.getCore().byId("Expdate").getValue()
                                        : null,

                                    DeliveryDate: sap.ui.getCore().byId("DeliveryDate").getValue()
                                        ? sap.ui.getCore().byId("DeliveryDate").getValue()
                                        : null,
                                    ExpirationDate: ExpirationDate,
                                    Reason: null,
                                    ProductName_Id: null,
                                    MfgDate: MfgDate,
                                    UseByDate: UseByDate,
                                    JulianDate: JulianDate,
                                    BestBeforeDate: BestBeforeDate,
                                    //BestBeforeDate: "2021-06-27",
                                    CreditReqItem_BTPCRItem: that.selectedBTPCRItem,
                                    // AttachmentRow: File,
                                    Classification: reClassify,
                                    AttachmentPIssue: AttachmentPIssue
                                },
                            ],
                        };
                        if (oResponse.results[0].Attachment.results.length > 0) {
                            var BTPCRItem = oResponse.results[0].BTPCRItem;
                            var Attachmentid =
                                oResponse.results[0].Attachment.results[0].AttachmentId;
                            obj1.Attachment[0]["AttachmentId"] = Attachmentid;

                        }
                        var Path = "/CreditReqItem" + "(" + that.selectedBTPCRItem + ")";
                        var oModel = that.getOwnerComponent().getModel();
                        oModel.update(Path, obj1, {
                            success: function (oData) {
                                File = [];
                                var oTable1 = that
                                    .getView()
                                    .byId(
                                        "sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--ItemId::responsiveTable"
                                    );

                                if (oData.Attachment.results.length > 0) {
                                    that.updateAttachmentID(
                                        oData.Attachment.results[0].AttachmentId,
                                        oData.CRType_Id
                                    );
                                }
                                sap.m.MessageBox.success(
                                    "Item updated to Credit Request No." + BTP_CRNO + "",
                                    {
                                        actions: [sap.m.MessageBox.Action.OK],

                                        onClose: function (sAction) {
                                            if (sAction == "OK") {
                                                that.extensionAPI.refresh(oTable1.sId);
                                            }
                                        },
                                    }
                                );

                                oTable1.getModel().refresh();

                                that.extensionAPI.refresh(oTable1.sId);
                                // oTable1.rerender()
                                pressDialog.close();
                                that._itemDialogDestroy();
                                pressDialog.destroy();
                            },
                            error: function (Error) {
                                var errorMsg = JSON.parse(Error.responseText).error
                                    .message.value;
                                sap.m.MessageBox.error(errorMsg);
                            },
                        });

                    },
                    error: function (err) { }
                });




            },


            addCRItems: function () {
                sap.ui.getCore().byId("Idsave").setEnabled(false);
                var that = this;
                var reClassify = sap.ui.getCore().byId("idReClasi").getSelectedKey();
                //sap.ui.getCore().byId("idReClasi").getValue();

                var oModel = this.getOwnerComponent().getModel();

                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRItem", "EQ", this.selectedBTPCRItem),
                        new sap.ui.model.Filter("StatusCode_Id", "NE", 10),
                    ],
                    and: true
                });
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    urlParameters: {
                        $expand: "Attachment/AttachmentPIssue",
                    },
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        // var BTPCRItem = oData.results[0].BTPCRItem;
                        // Attachmentid =
                        //     oData.results[0].Attachment.results[0].AttachmentId;
                        var oModel = that.getOwnerComponent().getModel();
                        oModel.setUseBatch(true);
                        for (var i = 0; i < removedFileDamage.length; i++) {
                            var sPath = "/AttachmentRow(" + removedFileDamage[i] + ")";
                            oModel.remove(sPath, {
                                method: "POST",
                                success: function (data) { },
                                error: function (e) { },
                            });
                        }
                        for (var i = 0; i < removedFileQuality.length; i++) {
                            var sPath = "/AttachmentRow(" + removedFileQuality[i] + ")";
                            oModel.remove(sPath, {
                                method: "POST",
                                success: function (data) { },
                                error: function (e) { },
                            });
                        }
                        for (var i = 0; i < removedFileShortage.length; i++) {
                            var sPath = "/AttachmentRow(" + removedFileShortage[i] + ")";
                            oModel.remove(sPath, {
                                method: "POST",
                                success: function (data) { },
                                error: function (e) { },
                            });
                        }

                        if (sap.ui.getCore().byId("NotShipped").getVisible() == true) {
                            var comment = "";
                            //sap.ui.getCore().byId("Nscomments").getValue()
                        }
                        else {
                            var comment = "";
                            //sap.ui.getCore().byId("coments").getValue()

                        }
                        var MfgDate = null,
                            UseByDate = null,
                            JulianDate = null,
                            BestBeforeDate = null,
                            LotCode = null,
                            ExpirationDate = null;
                        if (sap.ui.getCore().byId("Quality").getVisible() == true) {

                            var qualityModel = that.getOwnerComponent().getModel("qualityModel");
                            ExpirationDate = qualityModel.getProperty("/ExpirationDate") ? qualityModel.getProperty("/ExpirationDate") : null;
                            MfgDate = qualityModel.getProperty("/ManufactureDate") ? qualityModel.getProperty("/ManufactureDate") : null;
                            UseByDate = qualityModel.getProperty("/UseByDate") ? qualityModel.getProperty("/UseByDate") : null;
                            JulianDate = qualityModel.getProperty("/JulianDate") ? qualityModel.getProperty("/JulianDate") : null;
                            BestBeforeDate = qualityModel.getProperty("/BestBeforeDate") ? qualityModel.getProperty("/BestBeforeDate") : null;
                            LotCode = qualityModel.getProperty("/LotCode");
                        }
                        if (sap.ui.getCore().byId("Damage").getVisible() == true) {
                            LotCode = sap.ui.getCore().byId("LotCode").getValue();

                        }
                        var AttachmentPIssue = [];
                        for (var i in that.PISelectedkeys) {
                            var obj = {
                                ProductIssueMaster_Id: that.PISelectedkeys[i]
                            }
                            AttachmentPIssue.push(obj);
                        }
                        var obj1 = {
                            Qty: sap.ui.getCore().byId("idstep").getValue(),
                            "StatusCode_Id": 1,
                            CRType_Id: sap.ui.getCore().byId("idcbox").getSelectedKey(),
                            ProductType: that.PType,
                            Attachment: [
                                {
                                    CRType_Id: sap.ui.getCore().byId("idcbox").getSelectedKey(),
                                    DamageId_Id: 1,
                                    LotCode: LotCode,
                                    Comment: comment,
                                    ExpDate: sap.ui.getCore().byId("Expdate").getValue()
                                        ? sap.ui.getCore().byId("Expdate").getValue()
                                        : null,

                                    DeliveryDate: sap.ui.getCore().byId("DeliveryDate").getValue()
                                        ? sap.ui.getCore().byId("DeliveryDate").getValue()
                                        : null,
                                    ExpirationDate: ExpirationDate,
                                    Reason: null,
                                    ProductName_Id: null,
                                    MfgDate: MfgDate,
                                    UseByDate: UseByDate,
                                    JulianDate: JulianDate,
                                    BestBeforeDate: BestBeforeDate,
                                    //BestBeforeDate: "2021-06-27",
                                    CreditReqItem_BTPCRItem: that.selectedBTPCRItem,
                                    // AttachmentRow: File,
                                    Classification: reClassify,
                                    AttachmentPIssue: AttachmentPIssue
                                },
                            ],
                        };
                        if (oResponse.results[0].Attachment.results.length > 0) {
                            var BTPCRItem = oResponse.results[0].BTPCRItem;
                            var Attachmentid =
                                oResponse.results[0].Attachment.results[0].AttachmentId;
                            obj1.Attachment[0]["AttachmentId"] = Attachmentid;

                        }
                        var Path = "/CreditReqItem" + "(" + that.selectedBTPCRItem + ")";
                        var oModel = that.getOwnerComponent().getModel();
                        oModel.update(Path, obj1, {
                            success: function (oData) {
                                File = [];
                                var oTable1 = that
                                    .getView()
                                    .byId(
                                        "sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--ItemId::responsiveTable"
                                    );

                                if (oData.Attachment.results.length > 0) {
                                    that.updateAttachmentID(
                                        oData.Attachment.results[0].AttachmentId,
                                        oData.CRType_Id
                                    );
                                }
                                sap.m.MessageBox.success(
                                    "Item updated to Credit Request No." + BTP_CRNO + "",
                                    {
                                        actions: [sap.m.MessageBox.Action.OK],

                                        onClose: function (sAction) {
                                            //  MessageToast.show("Action selected: " + sAction);
                                            if (sAction == "OK") {
                                                that.extensionAPI.refresh(oTable1.sId);
                                                //     setTimeout(function () {
                                                //         if(CR_FLAG=="Y"){
                                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                                                //         }
                                                //         else{
                                                //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                                                //         }
                                                //   //             that.checkISSAP();
                                                //     }, 4000);
                                                // oTable1.rerender()
                                            }
                                        },
                                    }
                                );

                                oTable1.getModel().refresh();

                                that.extensionAPI.refresh(oTable1.sId);
                                // oTable1.rerender()
                                pressDialog.close();
                                that._itemDialogDestroy();
                                pressDialog.destroy();
                            },
                            error: function (Error) {
                                var errorMsg = JSON.parse(Error.responseText).error
                                    .message.value;
                                sap.m.MessageBox.error(errorMsg);
                            },
                        });

                    },
                    error: function (err) { }
                });

            },
            addCRItems_old: function () {
                var that = this;
                var reClassify = sap.ui.getCore().byId("idReClasi").getValue();

                if (sap.ui.getCore().byId("NotShipped").getVisible() == true) {
                    var comment = "";
                    //sap.ui.getCore().byId("Nscomments").getValue()
                }
                else {
                    var comment = "";
                    //sap.ui.getCore().byId("coments").getValue()

                }
                var MfgDate = null,
                    UseByDate = null,
                    JulianDate = null,
                    BestBeforeDate = null,
                    LotCode = null,
                    ExpirationDate = null;
                if (sap.ui.getCore().byId("Quality").getVisible() == true) {

                    var qualityModel = this.getOwnerComponent().getModel("qualityModel");
                    ExpirationDate = qualityModel.getProperty("/ExpirationDate");
                    MfgDate = qualityModel.getProperty("/ManufactureDate");
                    UseByDate = qualityModel.getProperty("/UseByDate");
                    JulianDate = qualityModel.getProperty("/JulianDate");
                    BestBeforeDate = qualityModel.getProperty("/BestBeforeDate");
                    LotCode = qualityModel.getProperty("/LotCode");
                }
                if (sap.ui.getCore().byId("Damage").getVisible() == true) {
                    LotCode = sap.ui.getCore().byId("LotCode").getValue();

                }
                var AttachmentPIssue = [];
                for (var i in that.PISelectedkeys) {
                    var obj = {
                        ProductIssueMaster_Id: that.PISelectedkeys[i]
                    }
                    AttachmentPIssue.push(obj);
                }
                var obj1 = {
                    Qty: sap.ui.getCore().byId("idstep").getValue(),
                    "StatusCode_Id": 1,
                    CRType_Id: sap.ui.getCore().byId("idcbox").getSelectedKey(),
                    ProductType: that.PType,
                    Attachment: [
                        {
                            CRType_Id: sap.ui.getCore().byId("idcbox").getSelectedKey(),
                            DamageId_Id: 1,
                            LotCode: LotCode,
                            Comment: comment,
                            ExpDate: sap.ui.getCore().byId("Expdate").getValue()
                                ? sap.ui.getCore().byId("Expdate").getValue()
                                : null,

                            DeliveryDate: sap.ui.getCore().byId("DeliveryDate").getValue()
                                ? sap.ui.getCore().byId("DeliveryDate").getValue()
                                : null,
                            ExpirationDate: ExpirationDate,
                            Reason: null,
                            ProductName_Id: null,
                            MfgDate: MfgDate,
                            UseByDate: UseByDate,
                            JulianDate: JulianDate,
                            BestBeforeDate: BestBeforeDate,
                            //BestBeforeDate: "2021-06-27",
                            CreditReqItem_BTPCRItem: this.selectedBTPCRItem,
                            // AttachmentRow: File,
                            Classification: reClassify,
                            AttachmentPIssue: AttachmentPIssue
                        },
                    ],
                };
                var Path = "/CreditReqItem" + "(" + this.selectedBTPCRItem + ")";
                var oModel = that.getOwnerComponent().getModel();
                oModel.update(Path, obj1, {
                    success: function (oData) {
                        File = [];
                        var oTable1 = that
                            .getView()
                            .byId(
                                "sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--ItemId::responsiveTable"
                            );


                        sap.m.MessageBox.success(
                            "Item updated to Credit Request No." + BTP_CRNO + "",
                            {
                                actions: [sap.m.MessageBox.Action.OK],

                                onClose: function (sAction) {
                                    //  MessageToast.show("Action selected: " + sAction);
                                    if (sAction == "OK") {
                                        that.extensionAPI.refresh(oTable1.sId);
                                        // oTable1.rerender()
                                    }
                                },
                            }
                        );

                        oTable1.getModel().refresh();

                        that.extensionAPI.refresh(oTable1.sId);
                        // oTable1.rerender()
                        pressDialog.close();
                        that._itemDialogDestroy();
                        pressDialog.destroy();
                    },
                    error: function (Error) {
                        var errorMsg = JSON.parse(Error.responseText).error
                            .message.value;
                        sap.m.MessageBox.error(errorMsg);
                    },
                });

            },
            onProductissue: function (evt) {
                this.PISelectedkeys = sap.ui.getCore().byId("idProductIssueMCB").getSelectedKeys();
            },

            // swaraj bhopale code
            onChangeHeaderComment: function (oEvent) {
                if (oEvent.getSource().getValue().length > 0) {
                    sap.ui.getCore().byId("SendBtn").setEnabled(true);
                }
                else {
                    sap.ui.getCore().byId("SendBtn").setEnabled(false);
                }
            },
            onChangeItemComment: function (oEvent) {
                if (oEvent.getSource().getValue().length > 0) {
                    sap.ui.getCore().byId("ItemSendBtn").setEnabled(true);
                }
                else {
                    sap.ui.getCore().byId("ItemSendBtn").setEnabled(false);
                }
            },
            onHeaderCommentPost: function (evt) {
                var oDataModel = this.getView().getModel(),
                    Path = "/CRCommit",
                    CRNo = evt.getSource().getBindingContext().getObject().BTPCRNO,
                    // commentText = evt.getSource().getValue(),
                    commentText = sap.ui.getCore().byId("idHeaderCTA").getValue(),
                    that = this,
                    obj = {
                        // Id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                        CRNO_BTPCRNO: BTP_CRNO,
                        CRNO_OrgStrucEleCode_Id: 1,
                        RowId: 0,
                        Comment: commentText,
                    };
                oDataModel.create(Path, obj, {
                    method: "POST",
                    success: function (oData) {
                        sap.ui.getCore().byId("idHeaderCTA").setValue("");
                        that
                            .getOwnerComponent()
                            .getModel("headerCommentsModel")
                            .updateBindings(true);
                        that.getOwnerComponent().getModel("headerCommentsModel").refresh();
                        sap.ui.getCore().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setType("Emphasized");
                        that.openHeaderComments();
                    },
                    error: function (Error) {
                        var errorMsg = JSON.parse(Error.responseText).error.message.value;
                        sap.m.MessageBox.error(errorMsg);
                    },
                });
            },
            openHeaderComments: function (evt) {
                // if (CRNo === undefined || CRNo === null) {
                //   sap.m.MessageToast.show("Credit Request Number has not been created");
                // } else {
                CRNo = this.getView().getModel("CreditReqHdrModel").getData()["items"][0].BTPCRNO;
                var oDataModel = this.getView().getModel(),
                    uFilters = [];
                var rowIDData = new Filter("RowId", sap.ui.model.FilterOperator.EQ, 0);
                var cRNoData = new Filter("CRNO_BTPCRNO", sap.ui.model.FilterOperator.EQ, BTP_CRNO);

                uFilters.push(rowIDData, cRNoData);

                var path = "/CRCommit";
                var that = this;
                oDataModel.read(path, {
                    filters: uFilters,
                    success: function (oData) {
                        that
                            .getOwnerComponent()
                            .getModel("headerCommentsModel")
                            .setProperty("/", oData);
                        that.openHeaderDialog();
                    },
                    error: function (error) { },
                });
                // }
            },
            openHeaderDialog: function () {
                if (!this._headerCommentsDialog) {
                    this._headerCommentsDialog = sap.ui.xmlfragment(
                        "sccmanagecr.ext.fragments.HeaderComments",
                        this
                    );

                    this.getView().addDependent(this._headerCommentsDialog);
                }
                this._headerCommentsDialog.open();
                sap.ui.getCore().byId("SendBtn").setEnabled(false);
            },
            onHeaderCommentsClose: function () {
                this._headerCommentsDialog.close();
                sap.ui.getCore().byId("idHeaderCTA").setValue("");
            },
            onOpenCRDialog: function (oEvent) {
                this.AddItemFlg = true;
                var spath = oEvent.getSource().getParent().getBindingContext("ItemListModel").getObject();
                this.spath2 = spath;
                (pressDialog = sap.ui.getCore().byId("ListDialog"));

                if (!pressDialog) {
                    pressDialog = sap.ui.xmlfragment(
                        "sccmanagecr.ext.fragments.IconDialog",
                        this
                    );

                    this.getView().addDependent(pressDialog);
                    sap.ui.getCore().byId("Damage").setVisible(false);
                    sap.ui.getCore().byId("Shortage").setVisible(false);
                    sap.ui.getCore().byId("Quality").setVisible(false);
                    sap.ui.getCore().byId("NotShipped").setVisible(false);
                    sap.ui.getCore().byId("idQualityPhoto").setVisible(false);
                    sap.ui.getCore().byId("idstep").setEnabled(true);
                    sap.ui.getCore().byId("idcbox").setEnabled(false);
                    sap.ui.getCore().byId("appQtyText").setVisible(false);
                    sap.ui.getCore().byId("apprQty").setVisible(false);
                    sap.ui.getCore().byId("openQtyText").setVisible(true);
                    sap.ui.getCore().byId("openqty").setVisible(true);
                    //    sap.ui.getCore().byId("idstep").setValue(spath.Qty);
                    sap.ui.getCore().byId("openqty").setText(spath.OpenQty);
                    sap.ui.getCore().byId("idstep").setMax(spath.OpenQty);
                    sap.ui.getCore().byId("Idsave").setEnabled(false);

                    pressDialog.open();

                }
            },
            // kanchan code
            onPressAddItem: function (oEvent) {
                var that = this;
                var oView = that.getView();

                if (!that.byId("AddItemsDialog")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sccmanagecr.ext.fragments.onAddItem",
                        controller: that

                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        that.onPressAddFilterItem();
                        oDialog.open();
                    });
                } else {
                    that.byId("AddItemsDialog").open();
                }
            },

            onPressAddFilterItem: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var filterList = [];
                var btpCRFilter = new Filter("BTPCRNo_BTPCRNO", sap.ui.model.FilterOperator.EQ, BTP_CRNO);
                var statusFilter = new Filter("StatusDescription", sap.ui.model.FilterOperator.NE, "Delete");
                filterList.push(btpCRFilter);
                filterList.push(statusFilter);
                var psInvoiceItemFilters = [];
                oModel.read("/CreditReqItem", {
                    filters: filterList,
                    success: function (oResponse) {
                        var allMaterialList = [];
                        for (var i = 0; i < oResponse.results.length; i++) {
                            allMaterialList.push(oResponse.results[i].Material);
                        }
                        var filterList = [];

                        var invoiceNoFilter = new Filter("PsplInvoice_PsplInvoice", sap.ui.model.FilterOperator.EQ, invoiceNo);
                        var itemFilter = new Filter("ItemNo", sap.ui.model.FilterOperator.NE, "DC");
                   //     var itemFilter1 = new Filter("ItemNo", sap.ui.model.FilterOperator.NE, "CDF");

                        filterList.push(invoiceNoFilter);
                        filterList.push(itemFilter);
                   //     filterList.push(itemFilter1);
                        oModel.read("/GET_PCINVOICE_ITEM_LIST", {
                            filters: filterList,
                            success: function (oResponse) {
                                oResponse.results= oResponse.results.filter(obj=>obj.ItemNo!="CDF");
        
                                var correctList = [];
                                for (var i = 0; i < oResponse.results.length; i++) {
                                    if (!allMaterialList.includes(oResponse.results[i].ItemNo)) {
                                        correctList.push(oResponse.results[i]);
                                    }
                                }
                                var ItemList = new JSONModel({
                                    ItemList: correctList
                                });
                                that.getView().setModel(ItemList, "ItemListModel");
                            },
                            error: function (err) { }
                        });
                    },
                    error: function (error) { },
                });
            },
            onAddItemsAddBtn: function () {
                var that = this;

                var oModel = this.getOwnerComponent().getModel();
                var selectedDataObj =
                {
                    "BTPCRNo_BTPCRNO": BTP_CRNO,
                    "BTPCRNo_OrgStrucEleCode_Id": OrgStrucEleCode_Id,
                    "Material": this.spath2.ItemNo,
                    "Description": this.spath2.Description,
                    "Qty": "",
                    "UnitPrice": this.spath2.UnitPrice,
                    "Tax": null,
                    "Total": null,
                    "ObjectType_Id": 1,
                    "StatusCode_Id": 1,
                    "StatusCode_ObjectType_Id": 1,
                    "ApproveQty": "",
                    "OpenQty": this.spath2.OpenQty,
                    "StoreComment": null,
                    "SCCComment": null,
                    "Comment": null,
                    "PSInvoiceQty": this.spath2.Qty,
                    "UnitCost": this.spath2.UnitCost,
                    "UnitFreight": this.spath2.UnitFreight,
                    "UOM": this.spath2.UOM,
                    "PsplInvoice": this.spath2.PsplInvoice_PsplInvoice,
                    "PsplRowID": this.spath2.RowID,
                    "CRRowID": this.spath2.InvoiceSequenceNumber
                };
                oModel.create("/CreditReqItem", selectedDataObj, {
                    method: "POST",
                    success: function (oData) {
                        that.byId("AddItemsDialog").destroy();
                        that.extensionAPI.refresh(that._table.sId);
                        that.selectedBTPCRItem = oData.BTPCRItem;
                        that.AddItemFlg = false;
                        that.addCRItems();


                    },
                    error: function (Error) {

                        var errorMsg = result.error.message;
                        sap.m.MessageBox.error(errorMsg);
                    },
                });

            },
            onAddItemsAddBtn_old: function (oEvent) {

                var that = this;
                var model = this.getView().getModel("ItemListModel").getData();
                var ItemList = model.ItemList;
                //  var selectedindices = this.getView().byId("tableid")._oLegacySelectionPlugin.oSelectionModel.aSelectedIndices;
                var selectedindices = this.getView().byId("tableid").getSelectedIndices();
                if (selectedindices.length == 0) {
                    sap.m.MessageBox.alert("Please select atleast one Item.");
                }
                else {
                    var selectedData = [];
                    for (var i = 0; i < selectedindices.length; i++) {
                        //       selectedData.push(ItemList[selectedindices[i]]);
                        selectedData.push(this.getView().byId("tableid").getContextByIndex(selectedindices[i]).getObject());
                    }
                    sap.m.MessageBox.show("Are you sure, you want to add?", {
                        icon: sap.m.MessageBox.Icon.QUESTION,
                        title: "Confirm",
                        actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                        onClose: function (oAction) {
                            if (oAction === "OK") {
                                var oModel = new sap.ui.model.odata.ODataModel(that.getOwnerComponent().getModel().sServiceUrl, true);


                                var batchChanges = [];
                                for (var i = 0; i < selectedData.length; i++) {
                                    var selectedDataObj =
                                    {
                                        "BTPCRNo_BTPCRNO": BTP_CRNO,
                                        "BTPCRNo_OrgStrucEleCode_Id": OrgStrucEleCode_Id,
                                        "Material": selectedData[i].ItemNo,
                                        "Description": selectedData[i].Description,
                                        "Qty": "",
                                        "UnitPrice": selectedData[i].UnitPrice,
                                        "Tax": null,
                                        "Total": null,
                                        "ObjectType_Id": 1,
                                        "StatusCode_Id": 1,
                                        "StatusCode_ObjectType_Id": 1,
                                        "ApproveQty": "",
                                        "OpenQty": selectedData[i].OpenQty,
                                        "StoreComment": null,
                                        "SCCComment": null,
                                        "Comment": null,
                                        "PSInvoiceQty": selectedData[i].Qty,
                                        "UnitCost": selectedData[i].UnitCost,
                                        "UnitFreight": selectedData[i].UnitFreight,
                                        "UOM": selectedData[i].UOM,
                                        "PsplInvoice": selectedData[i].PsplInvoice_PsplInvoice,
                                        "PsplRowID": selectedData[i].RowID,
                                        "CRRowID": selectedData[i].InvoiceSequenceNumber
                                    };
                                    batchChanges.push(oModel.createBatchOperation("/CreditReqItem", "POST", selectedDataObj));
                                }
                                oModel.addBatchChangeOperations(batchChanges);
                                oModel.submitBatch(function (data) {
                                    //oModel.refresh();
                                    MessageBox.success("Record Added Successfully.");
                                    that.byId("AddItemsDialog").destroy();
                                    that.extensionAPI.refresh(that._table.sId);


                                    //     setTimeout(function () {
                                    //         if(CR_FLAG=="Y"){
                                    //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                                    //         }
                                    //         else{
                                    //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                                    //         }
                                    //   //             that.checkISSAP();
                                    //     }, 4000);


                                }, function (err) {
                                    sap.m.MessageToast.show("Items not added! Please try again.....");
                                    console.log("Error");
                                });
                            }
                        }
                    });
                }
            },

            onAddItemsCancelBtn: function (oEvent) {
                var that = this;
                that.byId("AddItemsDialog").destroy();

            },

            onTableSearch: function (oEvent) {
                var oTable = this.getView().byId("tableid");
                var oBinding = oTable.getBinding();
                var sValue = oEvent.oSource.getValue();
                if (sValue === "" || sValue === null || sValue === undefined) {
                    oBinding.filter([]);
                    return;
                }
                var oDesc = [
                    new sap.ui.model.Filter("ItemNo", sap.ui.model.FilterOperator.Contains, sValue),
                    new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sValue)
                ];
                var oFilter = new sap.ui.model.Filter(oDesc, false);
                oBinding.filter(oFilter);
            },
            handleOpenDialog: function () {
                var oView = this.getView();
                if (!this.pDialog) {
                    this.pDialog = Fragment.load({
                        id: oView.getId(),
                        name: "sccmanagecr.ext.fragments.onFilterItem",
                        controller: this
                    }).then(function (oDialog) {

                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog
                        .setFilterSearchCallback(null)
                        .setFilterSearchOperator(mLibrary.StringFilterOperator.Contains)
                        .open();

                });
            },
            onItemFilter: function (oEvent) {
                var filterString = oEvent.getParameters().filterString;
                var filters = [];
                if (filterString !== "") {
                    for (var i = 0; i < oEvent.getParameters().filterItems.length; i++) {
                        var columnValue = oEvent.getParameters().filterItems[i].mProperties.text;
                        var columnName = oEvent.getParameters().filterItems[i].oParent.mProperties.key;
                        filters.push(new sap.ui.model.Filter(columnName, sap.ui.model.FilterOperator.EQ, columnValue));
                        // var oFilter = new sap.ui.model.Filter(oDesc, false);
                        // filters.push(oFilter);
                    }
                }
                var oFilter = ([new sap.ui.model.Filter(filters, false)]);
                this.getView().byId("tableid").getBinding().filter(oFilter);
            },

            onPressReadyToApprove: function (oEvent) {
                var that = this;
                //      var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                var pathdata = that.LocObjPage.BTPCRItem;
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRItem", "EQ", pathdata.substring(pathdata.indexOf("'") + 1).replace("')", ""))
                    ],
                    and: true
                });
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    urlParameters: {
                        $expand: "Attachment/AttachmentPIssue",
                    },
                    success: function (oResponse) {
                        var Attachment = oResponse.results[0].Attachment.results;

                        var data = oResponse.results.filter(obj => obj.StatusDescription == "Created");
                        // var data2 = oResponse.results.filter(obj => obj.ApproveQty == 0);
                        if (oResponse.results[0].Description == "Without Invoice") {
                            oResponse.results[0].ApproveQty = 1;

                        }
                        if (oResponse.results[0].ApproveQty == 0 || oResponse.results[0].ApproveQty == null) {
                            that.CancelChanges();
                            sap.m.MessageBox.show("Approve Quantity should not be zero or null.");

                        }

                        else if (data.length != 0) {

                            var oModel = that.getOwnerComponent().getModel();
                            // sap.m.MessageBox.show("Are you sure, you want to change the status ?", {
                            //     icon: sap.m.MessageBox.Icon.QUESTION,
                            //     title: "Confirm",
                            //     actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                            //     onClose: function (oAction) {
                            //         if (oAction === "OK") {
                            var oFilterR = new sap.ui.model.Filter({
                                filters: [
                                    new sap.ui.model.Filter("StatusType", "EQ", "RTA"),
                                    //new sap.ui.model.Filter("StatusDescription", "EQ", "Ready To Approve")
                                ],
                                and: true
                            });
                            oModel.read("/CRStatus", {
                                filters: [oFilterR],
                                success: function (oResponse) {
                                    console.log(oResponse.results);
                                    that.CR_Status = oResponse.results;
                                    that.onFinalReadyToApprove(pathdata, that.LocObjPage, Attachment);
                                },
                                error: function (err) { }
                            });
                            //         }
                            //     }
                            // });
                        }
                        else {
                            sap.m.MessageBox.alert("Status cannot be changed.");
                        }
                    },
                    error: function (err) { }
                });
            },
            onFinalReadyToApprove: function (pathdata, obj, Attachment) {
                var that = this;
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

                    pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

                });

             // var DateTime = oDateFormat.format(new Date());
             var DateTime=new Date(new Date().toUTCString().substr(0, 25)) ;
             DateTime = oDateFormat.format(DateTime);
     
                var oModel = this.getOwnerComponent().getModel();
                //var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                this.oModel = this.getView().getModel();

                var obj = {
                    StatusCode_Id: that.CR_Status[0].Id,
                    ReadyApprovedDateTime: DateTime
                };
                console.log(obj);
                var path = "/CreditReqItem(BTPCRItem=" + pathdata.substring(pathdata.indexOf("'") + 1).replace("')", "") + ")";
                console.log(path);
                this.oModel.sDefaultUpdateMethod = "PATCH";

                this.oModel.update(path, obj, {
                    success: function (oSuccess) {
                        that.getView().byId(that.comboboxid).setValue("");
                        sap.m.MessageToast.show("CreditReqItem Updated");
                        that.byId("statusupdateObjectPage").destroy();
                        this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        //     setTimeout(function () {
                        //         if(CR_FLAG=="Y"){
                        //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                        //         }
                        //         else{
                        //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                        //         }
                        //   //             that.checkISSAP();
                        //     }, 4000);
                        //     that.checkUserApprover(obj, Attachment);
                    }.bind(this),

                    error: function (oError) {
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
                });

            },
            onPressApprove: function (oEvent) {
                var that = this;
                this.oModel = this.getView().getModel();
                //        var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                var pathdata = that.LocObjPage.BTPCRItem;
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRItem", "EQ", pathdata.substring(pathdata.indexOf("'") + 1).replace("')", ""))
                    ],
                    and: true
                });
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    urlParameters: {
                        $expand: "StatusCode",
                    },
                    success: function (oResponse) {
                        that.ItemSequence = oResponse.results[0].CRRowID;
                        var data = oResponse.results.filter(obj => obj.StatusDescription == "Created");
                        var data2 = oResponse.results.filter(obj => obj.StatusCode.StatusType == "RTA");
                        if (oResponse.results[0].ApproveQty == 0 || oResponse.results[0].ApproveQty == null) {
                            //    that.CancelChanges();
                            that.getView().byId(that.comboboxid).setValue("");
                            that.getView().byId(that.comboboxid).setSelectedKey(null);
                            sap.m.MessageBox.show("Approve Quantity should not be zero or null.");

                        }

                        else if (data.length != 0 || data2.length != 0) {
                            var oModel = that.getOwnerComponent().getModel();
                            // sap.m.MessageBox.show("Are you sure, you want to change the status ?", {
                            //     icon: sap.m.MessageBox.Icon.QUESTION,
                            //     title: "Confirm",
                            //     actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                            //     onClose: function (oAction) {
                            //         if (oAction === "OK") {
                            var oFilterR = new sap.ui.model.Filter({
                                filters: [
                                    new sap.ui.model.Filter("StatusType", "EQ", "Appr"),
                                    new sap.ui.model.Filter("StatusDescription", "EQ", "Approved")
                                ],
                                and: true
                            });
                            oModel.read("/CRStatus", {
                                filters: [oFilterR],
                                success: function (oResponse) {
                                    console.log(oResponse.results);
                                    that.CR_Status = oResponse.results;
                                    that.onFinalApprove(pathdata);
                                },
                                error: function (err) { }
                            });
                            //         }
                            //     }
                            // });
                        }
                        else {
                            sap.m.MessageBox.alert("Status cannot be changed.");
                        }
                    },
                    error: function (err) { }
                });

            },
            onFinalApprove: function (pathdata) {
                var that = this;
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

                    pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

                });

               // var DateTime = oDateFormat.format(new Date());
               var DateTime=new Date(new Date().toUTCString().substr(0, 25)) ;
               DateTime = oDateFormat.format(DateTime);
       
                var oModel = this.getOwnerComponent().getModel();
                //var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                this.oModel = this.getView().getModel();

                var obj = {
                    StatusCode_Id: that.CR_Status[0].Id,
                    ApprovedDateTime: DateTime
                };
                console.log(obj);
                var path = "/CreditReqItem(BTPCRItem=" + pathdata.substring(pathdata.indexOf("'") + 1).replace("')", "") + ")";
                console.log(path);
                this.oModel.sDefaultUpdateMethod = "PATCH";

                this.oModel.update(path, obj, {
                    success: function (oSuccess) {
                        // this.GetCRtypecall(); // passing the credit type short value                     
                        sap.m.MessageToast.show("CreditReqItem Updated");

                        that.getView().byId(that.comboboxid).setValue(""); this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        //     setTimeout(function () {
                        //         if(CR_FLAG=="Y"){
                        //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                        //         }
                        //         else{
                        //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                        //         }
                        //   //             that.checkISSAP();
                        //     }, 4000);
                    }.bind(this),

                    error: function (oError) {
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
                });

            },

            onpressCreditMemo: function (oEvent) {

                var stable = this._table;
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var BTPCRNO = this.getView().getModel("CreditReqHdrModel").getData().items[0].BTPCRNO
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRNO", "EQ", BTPCRNO)
                    ],
                    and: true
                });
                sap.ui.core.BusyIndicator.show();
                oModel.read("/GetSAPDetails", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        sap.ui.core.BusyIndicator.hide(); git
                        if (oResponse.results.length <= 0) {
                            sap.m.MessageBox.information("All Approved items are Assigned to Credit Memo");
                            return false;
                        } else {
                            var selectedindices = oResponse.results;
                            // for (var i = 0; i < selectedindices.length; i++) {
                            //     if (selectedindices[i].Material === "DC") {
                            //         selectedindices[i].Material = "8999";
                            //         //     if(!selectedindices[i].SAPCode){
                            //         //         if(selectedindices[i].CRTypeDesc = "Shortage"){
                            //         //             selectedindices[i].SAPCode = "SHT";
                            //         //         }
                            //         //         else if(selectedindices[i].CRTypeDesc = "Damage"){
                            //         //             selectedindices[i].SAPCode = "SCD";
                            //         //         }
                            //         //         else if(selectedindices[i].CRTypeDesc = "Late Delivery"){
                            //         //             selectedindices[i].SAPCode = "DCR";
                            //         //         }

                            //         //     // if we have Meterial value as DC need to send 8999 hardcoded value

                            //         // }                              
                            //     }

                            // }
                            selectedDataCredit = [];
                            selectedDataCredit = selectedindices;
                            that.onpressCreditMemo1(selectedDataCredit);
                        }
                    },
                    error: function (err) {
                        sap.ui.core.BusyIndicator.hide();

                    }
                });

            },

            onpressCreditMemo1: function (selectedDataCredit) {

                var oModelCreditmemo = this.getOwnerComponent().getModel("creditmemoservice");
                var headerVal = this.getView().getModel("CreditReqHdrModel").getData().items[0];
                var ItemVal = this.LocObjPage;
                var that = this;
                //   var sValues = oEvent.results[0];
                var sd = headerVal.CRDocDate;
                var ms = sd.valueOf();
                var Refdate = "\/Date(" + ms + ")\/";

                var Itemvalue = "000001";

                sap.ui.core.BusyIndicator.show();
                var batchChanges = [];
                for (var i = 0; i < selectedDataCredit.length; i++) {

                    var sValue = i;
                    if (batchChanges.length == 0) {
                        var selectedDataObj = {
                            DocumentType: "ZCT", //sapcode
                            ReferenceDate: Refdate,
                            //   YourReference: selectedDataCredit[i].Material,
                            OrderReason: selectedDataCredit[i].SAPCode, //ItemVal.CRTypeDesc,                    
                            ReferenceDocument: selectedDataCredit[i].SalesOrderNo,
                            VersionNo: selectedDataCredit[i].BTPCRNO.toString(),
                            Et_CreditItemSet: [{
                                ItemNumber: Itemvalue,
                                Material: selectedDataCredit[i].Material,
                                TargetQty: selectedDataCredit[i].ApproveQty.toString(),
                                YourReference: selectedDataCredit[i].Material,
                                ReferenceDocument: selectedDataCredit[i].SalesOrderNo,
                                ReferenceDocItem: selectedDataCredit[i].CRRowID.toString().padStart(6, '0')
                            }]
                        };
                        batchChanges.push(selectedDataObj);
                    }
                    else if (batchChanges.length > 0) {
                        var Data = batchChanges.filter(obj => obj.OrderReason == selectedDataCredit[i].SAPCode)
                        if (Data.length > 0) {
                            var sSetvalue = {
                                ItemNumber: Itemvalue,
                                Material: selectedDataCredit[i].Material,
                                TargetQty: selectedDataCredit[i].ApproveQty.toString(),
                                YourReference: selectedDataCredit[i].Material,
                                ReferenceDocument: selectedDataCredit[i].SalesOrderNo,
                                ReferenceDocItem: selectedDataCredit[i].CRRowID.toString().padStart(6, '0')
                            };
                            for (var j = 0; j < batchChanges.length; j++) {
                                if (selectedDataCredit[i].SAPCode === batchChanges[j].OrderReason) {
                                    var sTotalval = batchChanges[j].Et_CreditItemSet.length;
                                    var itNumber = +Itemvalue + +sTotalval;
                                    var sitemNum = "00000" + itNumber.toString();
                                    sSetvalue.ItemNumber = sitemNum;
                                    batchChanges[j].Et_CreditItemSet.push(sSetvalue);
                                }
                            }
                        }
                        else {
                            var selectedDataObj = {
                                DocumentType: "ZCT", //sapcode
                                ReferenceDate: Refdate,
                                //  YourReference: selectedDataCredit[i].Material,
                                OrderReason: selectedDataCredit[i].SAPCode, //ItemVal.CRTypeDesc,                    
                                ReferenceDocument: selectedDataCredit[i].SalesOrderNo,
                                VersionNo: selectedDataCredit[i].BTPCRNO.toString(),
                                Et_CreditItemSet: [{
                                    ItemNumber: Itemvalue,
                                    Material: selectedDataCredit[i].Material,
                                    TargetQty: selectedDataCredit[i].ApproveQty.toString(),
                                    YourReference: selectedDataCredit[i].Material,
                                    ReferenceDocument: selectedDataCredit[i].SalesOrderNo,
                                    ReferenceDocItem: selectedDataCredit[i].CRRowID.toString().padStart(6, '0')
                                }]
                            };
                            batchChanges.push(selectedDataObj);
                        }
                    }
                }
                for (var k = 0; k < batchChanges.length; k++) {
                    var delay = 4000;
                    sap.ui.core.BusyIndicator.show();
                    $.ajax({
                        type: "POST",
                        //Dev Url for sap service

                        //    url: "https://credittracker-sap-api.cfapps.us21.hana.ondemand.com/Et_CreditHeaderSet",
                        // QA Url for the sap service
                        //      url: "https://credittracker-sapqa-api.cfapps.us21.hana.ondemand.com/Et_CreditHeaderSet",                                


                        dataType: "json",
                        crossDomain: true,
                        async: false,
                        headers: {
                            "Authorization": "Basic RE9NSU5PU19QSV9VU0VSOk9wZXgjODE4OA==",
                            "Access-Control-Allow-Origin": "*",
                            "content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        data: JSON.stringify(batchChanges[k]),
                        success: function (result) {
                            setTimeout(function () {
                                sap.ui.core.BusyIndicator.hide();

                                if (result.d) {
                                    // sap.m.MessageBox.success("Document Number"+ result.d.Documentno + "is Created Successfully");
                                    that.CreditMemoAcknowledgement(result);
                                } else {
                                    sap.m.MessageBox.alert(result.error.message);
                                }
                            }, delay);
                        }, error: function (response) {
                            sap.ui.core.BusyIndicator.hide();
                        }
                    });
                }


            },

            CreditMemoAcknowledgement: function (results) {
                sap.ui.core.BusyIndicator.show();
                var sObj = {
                    "Vbeln": results.d.Documentno,
                    "CreditReqAckRow": []
                };

                var sItemSet = results.d.Et_CreditItemSet.results;
                for (var i = 0; i < sItemSet.length; i++) {

                    var sData = {
                        "Vbeln": results.d.Documentno,
                        "ItmNumber": sItemSet[i].ItemNumber,
                        "Erdat": results.d.ReferenceDate,
                        "Doctype": results.d.DocumentType,
                        "Ordreason": results.d.OrderReason,
                        "Salesorg": results.d.SalesOrgination,
                        "Distrchan": results.d.DistrChannel,
                        "Division": results.d.Division,
                        "Ref1": "BTP-PARAM",
                        "Ref1S": "",
                        "Version": results.d.VersionNo,
                        "Salesdist": results.d.SalesDistrict,
                        "Purchnoc": "CREDIT TRACKER",
                        "Purchdate": "2022-01-13T11:41:24.268Z",
                        "Material": sItemSet[i].YourReference,
                        "TargetQty": sItemSet[i].TargetQty,
                        "RefDoc": sItemSet[i].ReferenceDocument,
                        "RefDocIt": sItemSet[i].ReferenceDocItem,
                        "RefDocCa": results.d.ReferenceCategory, //doubt
                        "PartnRole": "SP",
                        "PartnNumb": "6232"
                    };

                    sObj.CreditReqAckRow.push(sData);
                }


                var Path = "/CreditReqAck";
                var oDataModel = this.getOwnerComponent().getModel();
                oDataModel.create(Path, sObj, {
                    method: "POST",
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        sap.m.MessageBox.success("Acknowledgment is Created");

                    },
                    error: function (Error) {
                        sap.ui.core.BusyIndicator.hide();
                        var errorMsg = result.error.message;
                        sap.m.MessageBox.error(errorMsg);
                    },
                });

            },




            onPressCancelled: function (oEvent) {
                var that = this;
                this.oModel = this.getView().getModel();
                //        var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                var pathdata = that.LocObjPage.BTPCRItem;
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRItem", "EQ", pathdata.substring(pathdata.indexOf("'") + 1).replace("')", ""))
                    ],
                    and: true
                });
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    urlParameters: {
                        $expand: "StatusCode",
                    },
                    success: function (oResponse) {
                        //     var data = oResponse.results.filter(obj => obj.StatusDescription == "Ready To Approve");
                        var data2 = oResponse.results.filter(obj => obj.StatusDescription == "Created" || obj.StatusCode.StatusType == "RTA");

                        if (data2.length != 0) {
                            var oModel = that.getOwnerComponent().getModel();
                            sap.m.MessageBox.show("Are you sure, you want to change the status ?", {
                                icon: sap.m.MessageBox.Icon.QUESTION,
                                title: "Confirm",
                                actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                                onClose: function (oAction) {
                                    if (oAction === "OK") {
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
                                                that.CR_Status = oResponse.results;
                                                that.onFinalCancelled(pathdata);
                                            },
                                            error: function (err) { }
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            sap.m.MessageBox.alert("Status cannot be changed.");
                        }
                    },
                    error: function (err) { }
                });

            },
            onFinalCancelled: function (pathdata) {
                var that = this;
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

                    pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

                });

              //  var DateTime = oDateFormat.format(new Date());
              var DateTime=new Date(new Date().toUTCString().substr(0, 25)) ;
              DateTime = oDateFormat.format(DateTime);
                var oModel = this.getOwnerComponent().getModel();
                //var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                this.oModel = this.getView().getModel();

                var obj = {
                    StatusCode_Id: that.CR_Status[0].Id,
                    CancelledDateTime: DateTime
                };
                console.log(obj);
                var path = "/CreditReqItem(BTPCRItem=" + pathdata.substring(pathdata.indexOf("'") + 1).replace("')", "") + ")";
                console.log(path);
                this.oModel.sDefaultUpdateMethod = "PATCH";

                this.oModel.update(path, obj, {
                    success: function (oSuccess) {
                        sap.m.MessageToast.show("CreditReqItem Updated");
                        that.OnItemReasonPost(this);
                        if (that.LocObjPage.Material == 'DC') {
                            //   that.onResetDeliveryFee();
                        }

                        that.byId("statusupdateObjectPage").destroy();
                        that.getView().byId(that.comboboxid).setValue(""); this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        //     setTimeout(function () {
                        //         if(CR_FLAG=="Y"){
                        //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                        //         }
                        //         else{
                        //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                        //         }
                        //   //             that.checkISSAP();
                        //     }, 4000);
                    }.bind(this),

                    error: function (oError) {
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
                });

            },
            onPressRejected: function (oEvent) {
                var that = this;
                this.oModel = this.getView().getModel();
                //    var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                var pathdata = that.LocObjPage.BTPCRItem;
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRItem", "EQ", pathdata.substring(pathdata.indexOf("'") + 1).replace("')", ""))
                    ],
                    and: true
                });
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    urlParameters: {
                        $expand: "StatusCode",
                    },
                    success: function (oResponse) {
                        var data = oResponse.results.filter(obj => obj.StatusCode.StatusType == "RTA");
                        var data2 = oResponse.results.filter(obj => obj.StatusDescription == "Created");

                        if (data.length != 0 || data2.length != 0) {
                            var oModel = that.getOwnerComponent().getModel();
                            sap.m.MessageBox.show("Are you sure, you want to change the status ?", {
                                icon: sap.m.MessageBox.Icon.QUESTION,
                                title: "Confirm",
                                actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                                onClose: function (oAction) {
                                    if (oAction === "OK") {
                                        var oFilterR = new sap.ui.model.Filter({
                                            filters: [
                                                new sap.ui.model.Filter("StatusType", "EQ", "Reject"),
                                                new sap.ui.model.Filter("StatusDescription", "EQ", "Denied")
                                            ],
                                            and: true
                                        });
                                        oModel.read("/CRStatus", {
                                            filters: [oFilterR],
                                            success: function (oResponse) {
                                                console.log(oResponse.results);
                                                that.CR_Status = oResponse.results;
                                                that.onFinalReject(pathdata);
                                            },
                                            error: function (err) { }
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            sap.m.MessageBox.alert("Status cannot be changed.");
                        }
                    },
                    error: function (err) { }
                });
            },
            onFinalReject: function (pathdata) {
                var that = this;
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

                    pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

                });

            //    var DateTime = oDateFormat.format(new Date());
            var DateTime=new Date(new Date().toUTCString().substr(0, 25)) ;
            DateTime = oDateFormat.format(DateTime);
                var oModel = this.getOwnerComponent().getModel();
                //var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                this.oModel = this.getView().getModel();
                var obj = {
                    StatusCode_Id: that.CR_Status[0].Id,
                    RejectionDateTime: DateTime
                };
                console.log(obj);
                var path = "/CreditReqItem(BTPCRItem=" + pathdata.substring(pathdata.indexOf("'") + 1).replace("')", "") + ")";
                console.log(path);
                this.oModel.sDefaultUpdateMethod = "PATCH";

                this.oModel.update(path, obj, {
                    success: function (oSuccess) {
                        sap.m.MessageToast.show("CreditReqItem Updated");
                        that.OnItemReasonPost(this);
                        if (that.LocObjPage.Material == 'DC') {
                            //    that.onResetDeliveryFee();
                        }
                        that.byId("statusupdateObjectPage").destroy();
                        that.getView().byId(that.comboboxid).setValue(""); this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        //     setTimeout(function () {
                        //         if(CR_FLAG=="Y"){
                        //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                        //         }
                        //         else{
                        //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                        //         }
                        //   //             that.checkISSAP();
                        //     }, 4000);
                    }.bind(this),

                    error: function (oError) {
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
                });
            },
            //Begin of changes done by bala on 13th june 2023
            onPressRedelivery: function (oEvent) {
                var that = this;
                this.oModel = this.getView().getModel();
                //    var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                var pathdata = that.LocObjPage.BTPCRItem;
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRItem", "EQ", pathdata.substring(pathdata.indexOf("'") + 1).replace("')", ""))
                    ],
                    and: true
                });
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    urlParameters: {
                        $expand: "StatusCode",
                    },
                    success: function (oResponse) {
                        var data = oResponse.results.filter(obj => obj.StatusCode.StatusType == "RTA");
                        var data2 = oResponse.results.filter(obj => obj.StatusDescription == "Created");

                        if (data.length != 0 || data2.length != 0) {
                            var oModel = that.getOwnerComponent().getModel();
                            sap.m.MessageBox.show("Are you sure, you want to change the status ?", {
                                icon: sap.m.MessageBox.Icon.QUESTION,
                                title: "Confirm",
                                actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                                onClose: function (oAction) {
                                    if (oAction === "OK") {
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
                                                that.CR_Status = oResponse.results;
                                                that.onFinalRedelivery(pathdata);
                                            },
                                            error: function (err) { }
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            sap.m.MessageBox.alert("Status cannot be changed.");
                        }
                    },
                    error: function (err) { }
                });
            },
            onFinalRedelivery: function (pathdata) {
                var that = this;
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

                    pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

                });

                //    var DateTime = oDateFormat.format(new Date());
                var DateTime = new Date(new Date().toUTCString().substr(0, 25));
                DateTime = oDateFormat.format(DateTime);
                var oModel = this.getOwnerComponent().getModel();
                //var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                this.oModel = this.getView().getModel();
                var obj = {
                    StatusCode_Id: that.CR_Status[0].Id
                   // RedeliveryDateTime: DateTime




                };
                console.log(obj);
                var path = "/CreditReqItem(BTPCRItem=" + pathdata.substring(pathdata.indexOf("'") + 1).replace("')", "") + ")";
                console.log(path);
                this.oModel.sDefaultUpdateMethod = "PATCH";

                this.oModel.update(path, obj, {
                    success: function (oSuccess) {
                        sap.m.MessageToast.show("CreditReqItem Updated");
                        that.OnItemReasonPost(this);
                        if (that.LocObjPage.Material == 'DC') {
                            //    that.onResetDeliveryFee();
                        }
                        that.byId("statusupdateObjectPage").destroy();
                        that.getView().byId(that.comboboxid).setValue(""); this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        //     setTimeout(function () {
                        //         if(CR_FLAG=="Y"){
                        //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                        //         }
                        //         else{
                        //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                        //         }
                        //   //             that.checkISSAP();
                        //     }, 4000);
                    }.bind(this),

                    error: function (oError) {
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
                });
            },
            //End of changes done by bala on 13th june 2023
            onSubmit: function () {
                var that = this;
                var CRItems;
                // this.oModel = this.getView().getModel();
                var oModel = this.getOwnerComponent().getModel();
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRNo_BTPCRNO", "EQ", BTP_CRNO),
                        new sap.ui.model.Filter("StatusDescription", "NE", "Delete")
                    ],
                    and: true
                });
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    urlParameters: {
                        $expand: "StatusCode",
                    },
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        CRItems = oResponse.results;
                        for (var i = 0; i < oResponse.results.length; i++) {
                            if (oResponse.results[i].Qty == null || oResponse.results[i].CRTypeDesc == null) {
                                sap.m.MessageBox.error("All Line items must have a Credit Request Type and Credit Request Qty");
                                return;
                            }

                        }

                        sap.m.MessageBox.show("Are you sure, you want to submit?", {
                            icon: sap.m.MessageBox.Icon.QUESTION,
                            title: "Confirm",
                            actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                            onClose: function (oAction) {
                                if (oAction === "OK") {
                                    var oFilterR = new sap.ui.model.Filter({
                                        filters: [
                                            new sap.ui.model.Filter("StatusType", "EQ", "submit"),
                                            new sap.ui.model.Filter("StatusDescription", "EQ", "Submitted")
                                        ],
                                        and: true
                                    });
                                    oModel.read("/CRStatus", {
                                        filters: [oFilterR],
                                        success: function (oResponse) {
                                            console.log(oResponse.results);
                                            that.CR_Status = oResponse.results;
                                            that.onFinalSumbit(CRItems);
                                        },
                                        error: function (err) { }
                                    });

                                }
                            }
                        });
                    },
                    error: function (err) { }
                });

            },
            onFinalSumbit: function (CRItems) {
                var that = this;
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({

                    pattern: "yyyy-MM-dd" + "T" + "HH:mm:ss" + "Z"

                });

             //   var DateTime = oDateFormat.format(new Date());
             var DateTime=new Date(new Date().toUTCString().substr(0, 25)) ;
             DateTime = oDateFormat.format(DateTime);
                var oModel = this.getOwnerComponent().getModel();
                var obj = {
                    StatusCode_Id: that.CR_Status[0].Id,
                    SubmissionDateTime: DateTime
                };
                console.log(obj);
                var path = "/CreditReqHdr(BTPCRNO=" + BTP_CRNO + ",OrgStrucEleCode_Id=" + OrgStrucEleCode_Id + ")";
                console.log(path);
                oModel.sDefaultUpdateMethod = "PATCH";

                oModel.update(path, obj, {
                    success: function (oSuccess) {
                        oModel.refresh();
                        oModel.sDefaultUpdateMethod = "MERGE";
                        that.lineItemStatusChange(CRItems);

                    }.bind(this),

                    error: function (oError) {
                        oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
                });
            },
            lineItemStatusChange: function (CRItems) {
                var that = this;
                var oModel = new sap.ui.model.odata.ODataModel(that.getOwnerComponent().getModel().sServiceUrl, true);


                var batchChanges = [];
                for (var i = 0; i < CRItems.length; i++) {
                    CRItems[i].StatusCode_Id = 12;
                    CRItems[i].StatusCode.StatusType = "RTA";
                    if (CRItems[i].ApproveQty == null) {
                        CRItems[i].ApproveQty = CRItems[i].Qty;
                    }
                    batchChanges.push(oModel.createBatchOperation("/CreditReqItem(BTPCRItem=" + CRItems[i].BTPCRItem + ")", "PUT", CRItems[i]));
                }
                oModel.addBatchChangeOperations(batchChanges);
                oModel.submitBatch(function (data) {
                    //oModel.refresh();
                    sap.m.MessageToast.show("CreditReqHdr Status Updated");
                    that.extensionAPI.refresh(that._table.sId);
                    window.history.go(-1);

                    return;
                }, function (err) {
                    sap.m.MessageToast.show("Status Updation failed! Please try again.....");
                    console.log("Error");
                });

            },
            onPressDelete: function (oEvent) {
                var that = this;
                this.oModel = this.getView().getModel();
                var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                var oModel = this.getOwnerComponent().getModel();
                sap.m.MessageBox.show("Are you sure, you want to delete ?", {
                    icon: sap.m.MessageBox.Icon.QUESTION,
                    title: "Confirm",
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            var oFilterR = new sap.ui.model.Filter({
                                filters: [
                                    new sap.ui.model.Filter("StatusType", "EQ", "Del"),
                                    new sap.ui.model.Filter("StatusDescription", "EQ", "Delete")
                                ],
                                and: true
                            });
                            oModel.read("/CRStatus", {
                                filters: [oFilterR],
                                success: function (oResponse) {
                                    console.log(oResponse.results);
                                    that.CR_Status = oResponse.results;
                                    that.onFinalPressDelete(pathdata);
                                },
                                error: function (err) { }
                            });

                        }
                    }
                });
            },
            //kanchan------ changed
            onFinalPressDelete: function (pathdata) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                this.oModel = this.getView().getModel();
                var obj = {
                    StatusCode_Id: that.CR_Status[0].Id,
                };
                console.log(obj);
                var path = "/CreditReqItem(BTPCRItem=" + pathdata.substring(pathdata.indexOf("'") + 1).replace("')", "") + ")";
                console.log(path);
                this.oModel.sDefaultUpdateMethod = "PATCH";

                this.oModel.update(path, obj, {
                    success: function (oSuccess) {
                        sap.m.MessageToast.show("Item Deleted");
                        this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        //     setTimeout(function () {
                        //         if(CR_FLAG=="Y"){
                        //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                        //         }
                        //         else{
                        //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                        //         }
                        //   //             that.checkISSAP();
                        //     }, 4000);
                    }.bind(this),

                    error: function (oError) {
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
                });
            },
            OnItemReasonPost: function (evt) {
                var material = this.LocObjPage.Material;
                var oDataModel = this.getView().getModel();
                var Path = "/CRCommit",
                    commentText = evt.getView().byId("ReasonObject").getValue(),
                    that = this,
                    obj = {
                        Id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                        CRNO_BTPCRNO: BTP_CRNO,
                        CRNO_OrgStrucEleCode_Id: 1,
                        Material: material,
                        Comment: commentText,
                        CreditReqItem_BTPCRItem: this.LocObjPage.BTPCRItem
                    };
                oDataModel.create(Path, obj, {
                    method: "POST",
                    success: function (oData) {
                        // that.getView().byId("ReasonObject").setValue("");
                        that
                            .getOwnerComponent()
                            .getModel("itemCommentsModel")
                            .updateBindings(true);
                        that.getOwnerComponent().getModel("itemCommentsModel").refresh();
                    },
                    error: function (Error) {
                        var errorMsg = JSON.parse(Error.responseText).error.message.value;
                        sap.m.MessageBox.error(errorMsg);
                    },
                });
            },
            // Kanchan------Change  Line Item Comment
            onItemsCommentPost: function (evt) {
                var material = gMaterial;
                var oDataModel = this.getView().getModel();
                var Path = "/CRCommit",
                    CRNo = evt.getSource().getBindingContext().getObject().BTPCRNO,
                    //commentText = evt.getSource().getValue(),
                    commentText = sap.ui.getCore().byId("idItemCTA").getValue(),
                    that = this,
                    obj = {
                        Id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                        CRNO_BTPCRNO: BTP_CRNO,
                        CRNO_OrgStrucEleCode_Id: 1,
                        Material: material,
                        Comment: commentText,
                        CreditReqItem_BTPCRItem: that.CreditReqItem_BTPCRItem
                    };
                oDataModel.create(Path, obj, {
                    method: "POST",
                    success: function (oData) {
                        sap.ui.getCore().byId("idItemCTA").setValue("");
                        that
                            .getOwnerComponent()
                            .getModel("itemCommentsModel")
                            .updateBindings(true);
                        that.getOwnerComponent().getModel("itemCommentsModel").refresh();
                        that.openItemComments();
                    },
                    error: function (Error) {
                        var errorMsg = JSON.parse(Error.responseText).error.message.value;
                        sap.m.MessageBox.error(errorMsg);
                    },
                });
            },
            openItemComments: function (evt) {
                if (evt !== undefined) {
                    var material = evt.getSource().getBindingContext().getObject().Material;
                } else {
                    var material = gMaterial;
                }
                gMaterial = material;
                CRNo = this.getView().getModel("CreditReqHdrModel").getData()["items"][0].BTPCRNO;
                var oDataModel = this.getView().getModel(),
                    uFilters = [];
                var CRNOData = new Filter("BTPCRNo_BTPCRNO", FilterOperator.EQ, BTP_CRNO);
                var rowIDData = new Filter("Material", FilterOperator.EQ, material);
                var StatusCode = new Filter("StatusCode_Id", FilterOperator.NE, 10);
                uFilters.push(CRNOData, rowIDData, StatusCode);
                var path = "/CreditReqItem";
                var that = this;
                oDataModel.read(path, {
                    filters: uFilters,
                    urlParameters: {
                        $expand: "CRCommit",
                    },
                    success: function (oData) {
                        if (oData.results.length > 0) {
                            that
                                .getOwnerComponent()
                                .getModel("itemCommentsModel")
                                .setProperty("/", oData.results[0].CRCommit);
                        } else {
                            that
                                .getOwnerComponent()
                                .getModel("itemCommentsModel")
                                .setProperty("/", oData);
                        }
                        that.CreditReqItem_BTPCRItem = oData.results[0].BTPCRItem;
                        that.openItemsDialog();
                    },
                    error: function (error) { },
                });
            },
            openItemsDialog: function () {
                if (!this._itemCommentsDialog) {
                    this._itemCommentsDialog = sap.ui.xmlfragment(
                        "sccmanagecr.ext.fragments.ItemComments",
                        this
                    );
                    this.getView().addDependent(this._itemCommentsDialog);
                }
                this._itemCommentsDialog.open();
                sap.ui.getCore().byId("ItemSendBtn").setEnabled(false);
            },
            onItemsCommentsClose: function () {
                this._itemCommentsDialog.close();
                this.extensionAPI.refresh(this._table.sId);
                sap.ui.getCore().byId("idItemCTA").setValue("");

            },
            TextAreaChange: function (oEvent) {

                if (oEvent.getSource().getValue().length > 0) {

                    this.getView().byId("savbtn").setEnabled(true);

                }

                else {

                    this.getView().byId("savbtn").setEnabled(false);

                }

            },
            TextAreaChangeObject: function (oEvent) {
                if (oEvent.getSource().getValue().length > 0) {

                    this.getView().byId("savebtn").setEnabled(true);

                }

                else {

                    this.getView().byId("savebtn").setEnabled(false);

                }
            },
            OnSelectionchange: function (oEvent) {
                var that = this;
                that.comboboxid = oEvent.getSource().getId();
                var oSelectedkey = oEvent.getSource().getSelectedItem().getText();
                sap.ui.getCore().statustext = oSelectedkey;
                if (oSelectedkey == "Approve") {
                    that.LocObjPage = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                    that.saveChanges();
                }
                else {
                    //   text = sap.ui.getCore().byId("box0").getText();
                    var oView = this.getView();

                    // if (!this.pDialog) {
                    this.pDialog = sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: "sccmanagecr.ext.fragments.StatusUpdateObjectPage",
                        controller: this
                    }).then(function (oDialog) {

                        oView.addDependent(oDialog);
                        return oDialog;
                    });

                    // }

                    this.pDialog.then(function (oDialog) {
                        oDialog.open();
                        if (oSelectedkey == "Pending Approval") {
                            // this.getView().byId("Reason").setEnabled(false);
                            oDialog.getContent()[0].getItems()[1].getItems()[0].setVisible(false);
                            oDialog.getContent()[0].getItems()[1].getItems()[1].setVisible(false);
                            oDialog.getContent()[1].getContent()[1].setEnabled(true);

                        }
                        if (oSelectedkey == "Denied") {
                            oDialog.setTitle("Rejection Reason");
                            oDialog.getContent()[0].getItems()[0].getItems()[0].setText("Reason for rejection status:");


                        }
                        //Begin of changes done by bala on 13th june 2023

                        if (oSelectedkey == "Redelivery") {
                            oDialog.setTitle("Redelivery Reason");
                            oDialog.getContent()[0].getItems()[0].getItems()[0].setText("Reason for Redelivery status:");


                        }
                        //End of changes done by bala on 13th june 2023
                    });
                    // var oSelectedkey = oevt.getSource().getSelectedItem().getText();
                    // if (oSelectedkey == "Under") {

                    // } else if (oSelectedkey == "Reject") {


                    // } else if (oSelectedkey == "Cancel") {

                    // } 
                    var that = this;
                    that.LocObjPage = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                }

            },

            saveChanges: function (oEvent) {
                var that = this;
                var text = sap.ui.getCore().statustext;

                if (text == "Pending Approval") {
                    if (that.LocObjPage.Description == "Without Invoice") {
                        that.onPressReadyToApprove();
                        return;
                    }
                    if (that.LocObjPage.ApproveQty == 0 || that.LocObjPage.ApproveQty == null) {

                        sap.m.MessageBox.show("Approve Quantity should not be zero or null.");
                        that.byId("statusupdateObjectPage").destroy();
                        that.getView().byId(that.comboboxid).setValue("");
                        that.getView().byId(that.comboboxid).setSelectedKey(null);
                        return;
                    }
                    if (that.LocObjPage.ApproveQty !==
                        that.LocObjPage.Qty) {
                        var oView = this.getView();

                        // if (!this.pDialog) {
                        this.pDialog = sap.ui.core.Fragment.load({
                            id: oView.getId(),
                            name: "sccmanagecr.ext.fragments.StatusUpdateDialogObjectPage",
                            controller: this
                        }).then(function (oDialog) {

                            oView.addDependent(oDialog);
                            return oDialog;
                        });

                        // }

                        this.pDialog.then(function (oDialog) {
                            oDialog.open();

                        });
                        return;
                    }
                    else {
                        that.onPressReadyToApprove();
                    }


                }

                if (text == "Approve") {
                    sap.m.MessageBox.show("No changes can be made to the Approved quantity once status is set to Approved.\n Do you want to continue?", {
                        icon: sap.m.MessageBox.Icon.QUESTION,
                        title: "Confirm",
                        actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                        onClose: function (oAction) {
                            if (oAction === "OK") {
                                if (that.LocObjPage.ApproveQty == 0 || that.LocObjPage.ApproveQty == null) {

                                    sap.m.MessageBox.show("Approve Quantity should not be zero or null.");
                                    //  that.byId("statusupdateObjectPage").destroy();                                 
                                    that.getView().byId(that.comboboxid).setValue("");
                                    that.getView().byId(that.comboboxid).setSelectedKey(null);
                                    return;
                                }
                                if (that.LocObjPage.ApproveQty !==
                                    that.LocObjPage.Qty) {
                                    var oView = that.getView();

                                    // if (!this.pDialog) {
                                    this.pDialog = sap.ui.core.Fragment.load({
                                        id: oView.getId(),
                                        name: "sccmanagecr.ext.fragments.StatusUpdateDialogObjectPage",
                                        controller: that
                                    }).then(function (oDialog) {

                                        oView.addDependent(oDialog);
                                        return oDialog;
                                    });

                                    // }

                                    this.pDialog.then(function (oDialog) {
                                        oDialog.open();

                                    });
                                    return;
                                }
                                else {
                                    that.onPressApprove();
                                }

                            }
                            else {
                                that.getView().byId(that.comboboxid).setValue("");
                                that.getView().byId(that.comboboxid).setSelectedKey(null);
                            }
                        }
                    }
                    );



                }

                if (text == "Cancelled") {

                    this.onPressCancelled();

                }
                if (text == "Denied") {

                    this.onPressRejected();

                }
                //Begin of changes done by bala on 13th june 2023

                if (text == "Redelivery") {

                    this.onPressRedelivery();

                }
                //End of changes done by bala on 13th june 2023
            },
            CancelChanges: function (oEvent) {

                var that = this;

                that.getView().byId(that.comboboxid).setValue("");
                that.getView().byId(that.comboboxid).setSelectedKey(null);

                that.byId("statusupdateObjectPage").destroy();

            },
            onCancel: function () {

                //console.log("cancelled");

                var that = this;

                that.onPressAddFilterItem();

            },
            onPressAssign: function (oEvent) {
                var that = this;
                var oView = that.getView();

                if (!that.byId("AssignItemsDialog")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sccmanagecr.ext.fragments.onAssignItemHeader",
                        controller: that

                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        that.bindPSInvoiceHdr();
                        oDialog.open();
                    });
                } else {
                    that.byId("AssignItemsDialog").open();
                }
            },
            bindPSInvoiceHdr: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("StoreId", "EQ", that.getView().getModel("CreditReqHdrModel").getData().items[0].PSInvoiceStoreId)
                    ],
                    and: true
                });
                oModel.read("/PSInvoiceHdr", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                            pattern: "MM-dd-yyyy"
                        });
                        for (var i in oResponse.results) {
                            oResponse.results[i].InvoiceDate = oDateFormat.format((oResponse.results[i].InvoiceDate));
                        }
                        var HeaderList = new JSONModel({
                            HeaderList: oResponse.results
                        });
                        that.getView().setModel(HeaderList, "HeaderListModel");
                    },
                    error: function (err) { }
                });
            },
            showMore: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/PSInvoiceHdr", {
                    success: function (oResponse) {
                        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                            pattern: "MM-dd-yyyy"
                        });
                        for (var i in oResponse.results) {
                            oResponse.results[i].InvoiceDate = oDateFormat.format((oResponse.results[i].InvoiceDate));
                        }
                        var model = that.getView().getModel("HeaderListModel").getData().HeaderList;
                        model.push(oResponse.results);
                        model.refresh();
                    },
                    error: function (err) { }
                });
            },
            onAssignItemsAddBtn: function (oEvent) {
                var that = this;
                var model = this.getView().getModel("HeaderListModel").getData();
                var HeaderList = model.HeaderList;
                //   var selectedindices = this.getView().byId("tableHdrid")._oLegacySelectionPlugin.oSelectionModel.aSelectedIndices;
                var selectedindices = this.getView().byId("tableHdrid").getSelectedIndices();
                if (selectedindices.length == 0) {
                    sap.m.MessageBox.alert("Please select record.");
                }
                else {
                    var selectedData = [];
                    for (var i = 0; i < selectedindices.length; i++) {
                        // selectedData.push(HeaderList[selectedindices[i]]);
                        selectedData.push(this.getView().byId("tableHdrid").getContextByIndex(selectedindices[i]).getObject());
                    }
                    var sccId = selectedData[0].SCCId;
                    sap.m.MessageBox.show("Are you sure, you want to assign?", {
                        icon: sap.m.MessageBox.Icon.QUESTION,
                        title: "Confirm",
                        actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                        onClose: function (oAction) {
                            if (oAction === "OK") {
                                var oModel = that.getOwnerComponent().getModel();
                                var oFilterR = new sap.ui.model.Filter({
                                    filters: [new sap.ui.model.Filter("PsId", "EQ", sccId)],
                                });
                                oModel.read("/SCCRegion", {
                                    filters: [oFilterR],
                                    success: function (oResponse) {
                                        if (oResponse.results.length > 0) {
                                            that.SCCID = oResponse.results[0].Id;
                                            that.RegionIdID = oResponse.results[0].RegionId;
                                            that.onPostAssignInvoice(selectedData);
                                             // Begin of change by Bala on 5th June 2023
                                                that.oIsSap = oResponse.results[0].ISSAP ;
                                                // End of change by Bala on 5th June 2023
                                        }
                                    },
                                    error: function (err) { },
                                });
                                // for (var i = 0; i < selectedData.length; i++) {
                                //     var selectedDataObj =
                                //     {
                                //         "PSInvoiceHdr_PsplInvoice": selectedData[i].PsplInvoice,
                                //         "BTPCRNO": BTP_CRNO,
                                //         "OrgStrucEleCode_Id": OrgStrucEleCode_Id,
                                //         "SalesOrderNo": selectedData[i].SalesOrderNo
                                //     };
                                //     var path = "/CreditReqHdr(BTPCRNO=" + BTP_CRNO + ",OrgStrucEleCode_Id=" + OrgStrucEleCode_Id + ")";
                                // }
                                // console.log(path);
                                // oModel.sDefaultUpdateMethod = "PATCH";
                                // oModel.update(path, selectedDataObj, {
                                //     success: function (oSuccess) {
                                //         sap.m.MessageToast.show("Record Assigned Successfully.");
                                //         that.byId("AssignItemsDialog").destroy();
                                //         oModel.refresh();
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idAssignButton").setVisible(false);
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(true);
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idDeleteCRDataButton").setVisible(true);
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(true);
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(true);
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setVisible(true);
                                //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(false);
                                //         that.GetList();
                                //         oModel.sDefaultUpdateMethod = "MERGE";
                                //     }.bind(this),
                                //     error: function (oError) {
                                //         oModel.sDefaultUpdateMethod = "MERGE";
                                //         sap.m.MessageBox.alert("Invoice not assigned! Please try again.....");
                                //         that.byId("AssignItemsDialog").destroy();
                                //     }
                                // });
                            }
                        }
                    });
                }
            },
            onPostAssignInvoice: function (selectedData) {
                var that = this;
                var oModel = that.getOwnerComponent().getModel();

                for (var i = 0; i < selectedData.length; i++) {
                    var selectedDataObj =
                    {
                        "PSInvoiceHdr_PsplInvoice": selectedData[i].PsplInvoice,
                        "BTPCRNO": BTP_CRNO,
                        "OrgStrucEleCode_Id": OrgStrucEleCode_Id,
                        "SalesOrderNo": selectedData[i].SalesOrderNo,
                        "SCC_Id": that.SCCID,
                        "SCC_RegionId": that.RegionIdID,
                        "PSInvoiceFrnId": selectedData[i].FranchiseId

                    };
                    var path = "/CreditReqHdr(BTPCRNO=" + BTP_CRNO + ",OrgStrucEleCode_Id=" + OrgStrucEleCode_Id + ")";
                }
                console.log(path);
                oModel.sDefaultUpdateMethod = "PATCH";
                oModel.update(path, selectedDataObj, {
                    success: function (oSuccess) {
                        sap.m.MessageToast.show("Record Assigned Successfully.");
                        that.byId("AssignItemsDialog").destroy();
                        oModel.refresh();
                        that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idAssignButton").setVisible(false);
                        that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(true);
                        that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idDeleteCRDataButton").setVisible(true);
                        that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(true);
   //                     that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(false); //Changed by Bala on 3rd July 2023
                        that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setVisible(true);
                        that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(false);
                        //       that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(true);
                        // that.deleteWOInv();
                        that.GetList();
                        that.readHDr();

                        oModel.sDefaultUpdateMethod = "MERGE";
                    }.bind(this),
                    error: function (oError) {
                        oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Invoice not assigned! Please try again.....");
                        that.byId("AssignItemsDialog").destroy();
                    }
                });
            },
            deleteWOInv: function () {
                var that = this;
                var oModel = that.getOwnerComponent().getModel();
                var BTPCRNO = this.getView().getModel("CreditReqHdrModel").getData().items[0].BTPCRNO;
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRNo_BTPCRNO", "EQ", BTPCRNO),
                        new sap.ui.model.Filter("StatusCode_Id", "NE", 10),
                        new sap.ui.model.Filter("Description", "EQ", "Without Invoice")
                    ],
                    and: true
                });
                oModel.read("/CreditReqItem", {
                    filters: [oFilterR],
                    success: function (ores) {
                        console.log(ores);
                        var obj = {
                            StatusCode_Id: 10,
                        };
                        console.log(obj);
                        var path = "/CreditReqItem(BTPCRItem=" + ores.results[0].BTPCRItem + ")";
                        console.log(path);
                        oModel.sDefaultUpdateMethod = "PATCH";

                        oModel.update(path, obj, {
                            success: function (oSuccess) {

                                oModel.refresh();
                                oModel.sDefaultUpdateMethod = "MERGE";
                            }.bind(this),

                            error: function (oError) {
                                oModel.sDefaultUpdateMethod = "MERGE";
                                sap.m.MessageBox.alert("Techincal Error Occured -");
                            }
                        });

                    },
                    error: function () { }
                });
            },
            readHDr: function () {
                var that = this;
                var oModel = that.getOwnerComponent().getModel();
                var CrModel = that.getView().getModel("CreditReqHdrModel").getData().items[0];
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRNO", "EQ", CrModel.BTPCRNO),
                        new sap.ui.model.Filter("OrgStrucEleCode_Id", "EQ", CrModel.OrgStrucEleCode_Id),
                    ],
                    and: true
                });
                oModel.read("/GetCreditReqHdr", {
                    filters: [oFilterR],
                    success: function (ores) {
                        console.log(ores);
                        if (ores.results.length > 0) {
                            that.setDropDown(ores.results[0].ISSAP);
                        }
                    },
                    error: function () { }
                });
            },
            setDropDown: function (BTPCRNo) {
                //  var BTPCRNo = this.getView().getModel("CreditReqHdrModel").getData().items[0].ISSAP;

                if (BTPCRNo === "N") {
                    //  sap.ui.getCore().byId("box1").getBinding("items").filter([new sap.ui.model.Filter("text", "NE", "Ready To Approve")])
                    //          this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(false);
                    var data1 = [
                        {
                            text: "Approve",
                            id: "item12"
                        },
                        {
                            text: "Cancelled",
                            id: "item13"
                        },
                        {
                            text: "Redelivery",
                            id: "item15"
                        },
                        {
                            text: "Denied",
                            id: "item14"
                        }];
                    var AppStatus = new JSONModel(data1);
                    this.getOwnerComponent().setModel(AppStatus, "StatModel");
                } else {
                    //  sap.ui.getCore().byId("idcbox").getBinding("items").filter([])
                    var data1 = [{
                        text: "Pending Approval",
                        id: "item11"
                    },
                    // {
                    //     text: "Approve",
                    //     id: "item12"
                    // },
                    {
                        text: "Cancelled",
                        id: "item13"
                    },
                    //Begin of changes done by bala on 13th june 2023
                    {
                        text: "Redelivery",
                        id: "item15"
                    },
                    //End of changes done by bala on 13th june 2023
                    

                    {
                        text: "Denied",
                        id: "item14"
                    }];
                    var AppStatus = new JSONModel(data1);
                    this.getOwnerComponent().setModel(AppStatus, "StatModel");
                    //    this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setVisible(true);
                    //     setTimeout(function () {
                    //         if(CR_FLAG=="Y"){
                    //         that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(true);
                    //         }
                    //         else{
                    //             that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--CreditMemobtnButton").setEnabled(false);

                    //         }
                    //   //             that.checkISSAP();
                    //     }, 4000);
                }
            },
            GetList: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var btpcrno = this.getView().getModel("CreditReqHdrModel").getData().items[0].BTPCRNO;

                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("BTPCRNO", "EQ", btpcrno)
                    ],
                    and: true
                });
                oModel.read("/GetCreditReqHdr", {
                    filters: [oFilterR],
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        that.getView().getModel("CreditReqHdrModel").getData().items = [];
                        that.getView().getModel("CreditReqHdrModel").getData().items.push(oResponse.results[0]);
                        invoiceNo = oResponse.results[0].PsplInvoice;
                        that.checkInvoiceHdr();

                    },
                    error: function (err) { }
                });
            },
            onAssignItemsCancelBtn: function (oEvent) {
                var that = this;
                that.byId("AssignItemsDialog").destroy();

            },
            onTableSearchAssign: function (oEvent) {
                var oTable = this.getView().byId("tableHdrid");
                var oBinding = oTable.getBinding();
                var sValue = oEvent.oSource.getValue();
                if (sValue === "" || sValue === null || sValue === undefined) {
                    oBinding.filter([]);
                    return;
                }
                var oDesc = [
                    new sap.ui.model.Filter("PsplInvoice", sap.ui.model.FilterOperator.Contains, sValue),
                    new sap.ui.model.Filter("InvoiceDate", sap.ui.model.FilterOperator.Contains, sValue),
                    new sap.ui.model.Filter("SalesOrderNo", sap.ui.model.FilterOperator.Contains, sValue)
                ];
                var oFilter = new sap.ui.model.Filter(oDesc, false);
                oBinding.filter(oFilter);
            },
            handleOpenAssignDialog: function () {
                var oView = this.getView();
                if (!this.pDialog1) {
                    this.pDialog1 = Fragment.load({
                        id: oView.getId(),
                        name: "sccmanagecr.ext.fragments.onFilterAssignItem",
                        controller: this
                    }).then(function (oDialog1) {

                        oView.addDependent(oDialog1);
                        return oDialog1;
                    });
                }
                this.pDialog1.then(function (oDialog1) {
                    oDialog1
                        .setFilterSearchCallback(null)
                        .setFilterSearchOperator(mLibrary.StringFilterOperator.Contains)
                        .open();
                });
            },
            onAssignItemFilter: function (oEvent) {
                var filterString = oEvent.getParameters().filterString;
                var filters = [];
                if (filterString !== "") {
                    for (var i = 0; i < oEvent.getParameters().filterItems.length; i++) {
                        var columnValue = oEvent.getParameters().filterItems[i].mProperties.text;
                        var columnName = oEvent.getParameters().filterItems[i].oParent.mProperties.key;
                        filters.push(new sap.ui.model.Filter(columnName, sap.ui.model.FilterOperator.EQ, columnValue));
                    }
                }
                var oFilter = ([new sap.ui.model.Filter(filters, false)]);
                this.getView().byId("tableHdrid").getBinding().filter(oFilter);
            },
            // onAssignItemFilter: function (oEvent) {
            //     var filterString = oEvent.getParameters().filterString;
            //     var filters = [];
            //     if (filterString !== "") {
            //         for (var i = 0; i < oEvent.getParameters().filterItems.length; i++) {
            //             var columnValue = oEvent.getParameters().filterItems[i].mProperties.text;
            //             var columnName = oEvent.getParameters().filterItems[i].oParent.mProperties.key;
            //             var oDesc = [new sap.ui.model.Filter(columnName, sap.ui.model.FilterOperator.EQ, columnValue)];
            //             var oFilter = new sap.ui.model.Filter(oDesc, true);
            //             filters.push(oFilter);
            //         }
            //     }
            //     this.getView().byId("tableHdrid").getBinding().filter(filters);
            // },
            onAssignCancel: function () {
                var that = this;
                that.bindPSInvoiceHdr();
            },
            //WorkFlow code
            startWorkflowInstance: function (path, Attachment, approverList) {
                var approver = approverList[0].UserId;
                var data = this.getView().getModel("CreditReqHdrModel").getData().items[0];
                var model = this.getView().getModel();
                var definitionId = "com.dominos.btp.crmanagementapprovalprocessworkflow";

                var samplePayload = {
                    "crheader": {
                        "crno": data.BTPCRNO,
                        "crcreateddate": data.CreatedDateTime,
                        "invoice": data.PsplInvoice,
                        "invoicedate": data.InvoiceDate,
                        "salesorder": data.SalesOrderNo,
                        "createdby": data.createdBy,
                        "csr": data.CSR_ID,
                        "approvers": approver,
                        "items": [{
                            "item": "",     //send empty 
                            "material": path.Material,
                            "description": path.Description,
                            "status": path.StatusDescription,       //item status             
                            "approveqty": path.ApproveQty,
                            "uom": path.UOM,
                            "credittype": path.CRTypeDesc,
                            "reqcreditqty": path.Qty, //Qty                   
                            "comments": "",            //send empty from ui side        
                            "viewdetails": Attachment, //Attachment array from view details
                            "statusupdate": "" //pass empty for now
                        }]
                    }
                };
                var initialContext = samplePayload;
                var data = {
                    definitionId: definitionId,
                    //    context: JSON.parse(initialContext),
                    context: (initialContext),
                };

                $.ajax({
                    url: this._getWorkflowRuntimeBaseURL() + "/workflow-instances",
                    method: "POST",
                    async: false,
                    crossDomain: true,
                    contentType: "application/json",
                    headers: {
                        "X-CSRF-Token": this._fetchToken(),
                        "Access-Control-Allow-Origin": "*"
                    },
                    data: (data),
                    success: function (result, xhr, data) {
                        model.setProperty(
                            "/apiResponse",
                            (result, null, 4)
                        );
                    },
                    error: function (request, status, error) {
                        var response = (request.responseText);
                        model.setProperty(
                            "/apiResponse",
                            (response, null, 4)
                        );
                    },
                });
            },
            _fetchToken: function () {
                var fetchedToken;
                jQuery.ajax({
                    //    url: this._getWorkflowRuntimeBaseURL() + "/oauth/token?grant_type=client_credentials",
                    url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch",
                    },
                    success(result, xhr, data) {
                        fetchedToken = data.getResponseHeader("X-CSRF-Token");
                    },
                });
                return fetchedToken;
            },
            _getWorkflowRuntimeBaseURL: function () {
                // var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appId = "sccmanagecr";
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                return appModulePath + "/bpmworkflowruntime/v1";
            },
            checkUserApprover: function (obj, Attachment) {
                var that = this;
                var SCC = that.getView().getModel("CreditReqHdrModel").getData().items[0].PsId

                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("ISAPVR", "EQ", "Y")
                    ],
                    and: true
                });
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/User", {
                    filters: [oFilterR],

                    success: function (oResponse) {
                        var odata = oResponse.results;
                        var approverList = oResponse.results.filter(obj => obj.APVRSCC1 == SCC);
                        that.startWorkflowInstance(obj, Attachment, approverList);

                    },
                    error: function (err) { }
                });

            },
            onResetDeliveryFee: function () {
                var that = this;
                var oModel = that.getOwnerComponent().getModel();
                var CrModel = that.getView().getModel("CreditReqHdrModel").getData().items[0];

                var path2 = "/CreditReqHdr(BTPCRNO=" + CrModel.BTPCRNO + ",OrgStrucEleCode_Id=" + CrModel.OrgStrucEleCode_Id + ")";

                var obj2 = {
                    DeliveryFee: 0
                };
                oModel.sDefaultUpdateMethod = "PATCH";
                oModel.update(path2, obj2, {
                    success: function (oSuccess) {

                        oModel.refresh();

                        oModel.sDefaultUpdateMethod = "MERGE";


                    }.bind(that),
                    error: function (oError) {
                        oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");



                    }
                });
            }

        };
    });