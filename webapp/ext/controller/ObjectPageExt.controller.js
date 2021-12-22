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
        History, MessageBox, MessageToast,mLibrary) {
        "use strict";
        var pressDialog;
        var pressDialog2;
        var CRNo;
        var gRowID;
        var gMaterial;
        var File = [];
        var DraftStatusFlg = false;
        var oAttachmentsModel, oAttachmentsModel2, oAttachmentUpl, oAttachmentUpl2;
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

                        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--edit").setVisible(false);
                        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delete").setVisible(false);
                        this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--ItemId::deleteEntry").setVisible(false);
                        //  this._read();
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
                        var CRInvNo = oEvent.context.getObject().CRInvNo;
                        this.InvoiceDate = oEvent.context.getObject().CRDocDate;
                        StatusDescription = oEvent.context.getObject().StatusDescription;
                        StatusType = oEvent.context.getObject().StatusType;
                        BTP_CRNO = oEvent.context.getObject().BTPCRNO;
                        invoiceNo = oEvent.context.getObject().PsplInvoice;
                       var invoiceNoHdr = oEvent.context.getObject().PSInvoiceHdr_PsplInvoice;
                        OrgStrucEleCode_Id = oEvent.context.getObject().OrgStrucEleCode_Id;
                        this.getView().setModel(new sap.ui.model.json.JSONModel({
                            items: [oEvent.context.getObject()]
                        }), "CreditReqHdrModel");
                        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                            pattern: "MM-dd-yyyy"
                        });

                        //  this.InvoiceDate=oDateFormat.format(this.InvoiceDate);                   

                        if(invoiceNoHdr == null){
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idAssignButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idDeleteCRDataButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(false);
                            return;
                        }
                        else {
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idAssignButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idDeleteCRDataButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(true);
                        }

                        //kanchan------ changed
                        if (StatusType == "DraftSCC" || StatusDescription == "Submitted") {

                            // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(true);

                        }
                        else {
                            // this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--addItemIdButton").setVisible(false);
                        }
                        if (StatusType == "DraftSCC") {
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

                        if (StatusDescription == "Submitted" || StatusDescription == "Under Review") {

                            //                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(true);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(true);
                            this.checkInvoiceHdr();
                        }
                        else {
                            //            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--idCancelledButtonButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(false);
                            this.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--revertBtnButton").setVisible(false);
                        }


                    }.bind(this)
                );
               
                // this.busyDialog = formatter.createBusyDialog();
                // this.getOwnerComponent().getRouter().getRoute("ChangeLog").attachPatternMatched(this.onRouteMatch, this);
            },

            checkInvoiceHdr: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var PSInvoiceHdr_PsplInvoice = this.getView().getModel("CreditReqHdrModel").getData().items[0].PSInvoiceHdr_PsplInvoice;

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
                        if (oResponse.results[0].DeliveryFeeCreated == 'N') {
                            that.getView().byId("delbtnButton").setVisible(true);
                            that.getView().byId("revertBtnButton").setVisible(false);
                        }
                        else {
                            that.getView().byId("delbtnButton").setVisible(false);
                            that.getView().byId("revertBtnButton").setVisible(true);
                        }

                    },
                    error: function (err) { }
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
            onSelectCredit: function (oEvent) {
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

                                            sap.m.MessageToast.show(" Delivery Fee Reverted");
                                            oModel.refresh();

                                            oModel.sDefaultUpdateMethod = "MERGE";
                                            that.checkInvoiceHdr();

                                        }.bind(that),
                                        error: function (oError) {
                                            oModel.sDefaultUpdateMethod = "MERGE";
                                            sap.m.MessageBox.alert("Techincal Error Occured -");



                                        }
                                    });




                                },
                                error: function (oError) {
                                    sap.m.MessageBox.alert("Techincal Error Occured -");


                                }
                            });



                        }
                    }
                });


            },
            onSave: function (oEvent) {
                var that = this;
                sap.m.MessageBox.show("Do you want to continue?", {
                    icon: sap.m.MessageBox.Icon.QUESTION,
                    title: "Confirm",
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            var oModel = that.getOwnerComponent().getModel();
                            var CrId = that.getView().getModel("DelvFeeModel").getData().items[0].BTP_DelvFee_Setup_CRType_Id;
                            var Amt = that.getView().getModel("DelvFeeModel").getData().items[0].ByAmount;
                            var CrModel = that.getView().getModel("CreditReqHdrModel").getData().items[0];

                            var ItemType = "D";
                            var obj = {
                                BTPCRNo_BTPCRNO: CrModel.BTPCRNO,
                                BTPCRNo_OrgStrucEleCode_Id: CrModel.OrgStrucEleCode_Id,
                                "Material": that.SelectedCRType[0].ItemNo,
                                "Description": "Delivery Credit Fee",
                                "Qty": 1,
                                "UnitPrice": parseInt(Amt),
                                //  "Total": 1,
                                "ItemType": ItemType,
                                "CRType_Id": that.SelectedCRType[0].CRType_Id,
                                // "CRTypeDesc": that.SelectedCRType[0].Description,
                                "StatusCode_Id": 1,
                                "StatusCode_ObjectType_Id": 1,
                                "UOM": "EA"

                            };

                            var path = "/CreditReqHdr(BTPCRNO=" + CrModel.BTPCRNO + ",OrgStrucEleCode_Id=" + CrModel.OrgStrucEleCode_Id + ")";

                            var obj2 = {
                                DeliveryFee: parseInt(Amt)
                            };
                            console.log(obj);
                            console.log(obj2);

                            oModel.create("/CreditReqItem", obj, {
                                success: function (oSuccess) {
                                    oModel.refresh();
                                    oModel.sDefaultUpdateMethod = "PATCH";
                                    oModel.update(path, obj2, {
                                        success: function (oSuccess) {

                                            sap.m.MessageToast.show(" Delivery Fee Added");
                                            oModel.refresh();
                                            this._DeliveryDialog.close();
                                            oModel.sDefaultUpdateMethod = "MERGE";
                                            that.checkInvoiceHdr();

                                        }.bind(that),
                                        error: function (oError) {
                                            oModel.sDefaultUpdateMethod = "MERGE";
                                            sap.m.MessageBox.alert("Techincal Error Occured -");



                                        }
                                    });




                                },
                                error: function (oError) {
                                    sap.m.MessageBox.alert("Techincal Error Occured -");


                                }
                            });


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
                    sap.ui.getCore().byId("DeliveryDate").setMaxDate(new Date());
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
                                if (oResponse.results[0].ItemType == "D") {
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
                                sap.ui.getCore().byId("idcbox").getBinding("items").filter([new sap.ui.model.Filter("Description", "EQ", "Shortage"), new sap.ui.model.Filter("Description", "EQ", "Damage"), new sap.ui.model.Filter("Description", "EQ", "Not Shipped")])
                                sap.ui.getCore().byId("idstep").setValue(oResponse.results[0].Qty);
                                sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty + pathdata.Qty);
                                sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty + pathdata.Qty);

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
                                    sap.ui.getCore().byId("coments").setValue(data.Attachment.results[0].Comment);
                                    sap.ui.getCore().byId("idstep").setValue(data.Qty);
                                    sap.ui.getCore().byId("idcbox").setSelectedKey(Id);
                                    sap.ui.getCore().byId("apprQty").setMax(data.Qty);
                                    sap.ui.getCore().byId("apprQty").setValue(data.ApproveQty);
                                    sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty + pathdata.Qty);

                                    if (data.StatusDescription == "Ready To Approve" || data.StatusDescription == "Approved") {
                                        sap.ui.getCore().byId("Idsave").setEnabled(false);
                                        sap.ui.getCore().byId("apprQty").setEnabled(false);

                                    }
                                    if (sap.ui.getCore().byId("apprQty").getEnabled() == false) {
                                        sap.ui.getCore().byId("Idsave").setEnabled(false);

                                    }
                                    if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {
                                        that.QualityApprovedData=data;
        
                                    }
                                    // if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "DraftSCC") {
                                    if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusType == "DraftSCC") {
                                        sap.ui.getCore().byId("idstep").setEnabled(true);
                                        sap.ui.getCore().byId("LotCode").setEnabled(true);
                                        sap.ui.getCore().byId("openQtyText").setVisible(true);
                                        sap.ui.getCore().byId("openqty").setVisible(true);
                                        sap.ui.getCore().byId("coments").setEnabled(true);
                                        sap.ui.getCore().byId("attachmentUpl").setUploadEnabled(true);
                                        sap.ui.getCore().byId("Idsave").setEnabled(true);
                                        DraftStatusFlg = true;
                                        sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty + pathdata.Qty);

                                        sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty + pathdata.Qty);

                                    }
                                    else {
                                        // sap.ui.getCore().byId("Idsave").setEnabled(true);
                                        //     sap.ui.getCore().byId("apprQty").setEnabled(true);

                                    }

                                    var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                        pattern: "yyyy-MM-dd"
                                    });
                                    var d = data.Attachment.results[0].ExpDate
                                    if (d != null) {
                                        d = oDateFormat.format(new Date(d));
                                        sap.ui.getCore().byId("Expdate").setValue(d);
                                    }
                                    else {
                                        sap.ui.getCore().byId("Expdate").setValue("");
                                    }
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
                                                visibleRemove: that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription === 'Draft' ? true : false ,
                                                url: "/AttachmentRow",
                                            })
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
                            sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty + pathdata.Qty);
                            sap.ui.getCore().byId("apprQty").setValue(data.ApproveQty);

                            if (data.StatusDescription == "Ready To Approve" || data.StatusDescription == "Approved") {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);
                                sap.ui.getCore().byId("apprQty").setEnabled(false);

                            }
                            if (sap.ui.getCore().byId("apprQty").getEnabled() == false) {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);

                            }
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {
                                that.QualityApprovedData=data;

                            }
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusType == "DraftSCC") {
                                sap.ui.getCore().byId("idstep").setEnabled(true);
                                sap.ui.getCore().byId("openQtyText").setVisible(true);
                                sap.ui.getCore().byId("openqty").setVisible(true);
                                sap.ui.getCore().byId("DeliveryDate").setEnabled(true);
                                sap.ui.getCore().byId("Idsave").setEnabled(true);
                                DraftStatusFlg = true;
                                sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty + pathdata.Qty);
                                sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty + pathdata.Qty);


                            }
                            else {
                                // sap.ui.getCore().byId("Idsave").setEnabled(true);
                                //  sap.ui.getCore().byId("apprQty").setEnabled(true);

                            }
                            var Attachmentid = data.Attachment.results[0].AttachmentId;
                            var DamageId_Id = data.Attachment.results[0].DamageId_Id;
                            pressDialog.open();


                            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                pattern: "yyyy-MM-dd"
                            });
                            var d = data.Attachment.results[0].DeliveryDate
                            if (d != null) {
                                d = oDateFormat.format(new Date(d));
                                sap.ui.getCore().byId("DeliveryDate").setValue(d);
                            }
                            else {
                                sap.ui.getCore().byId("DeliveryDate").setValue("");
                            }
                            // oModel.read("/Attachment(AttachmentId=" + Attachmentid +
                            //     ",DamageId_Id=" + DamageId_Id + ")/AttachmentRow", {

                            //     success: function (oResponse) {
                            //         console.log(oResponse.results);
                            //         pressDialog.open();


                            //         var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                            //             pattern: "yyyy-MM-dd"
                            //         });
                            //         var d = data.Attachment.results[0].DeliveryDate
                            //         d = oDateFormat.format(new Date(d));
                            //         if (d != null) {
                            //             sap.ui.getCore().byId("DeliveryDate").setValue(d);
                            //         }

                            //     },
                            //     error: function (err) { }
                            // });
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
                            sap.ui.getCore().byId("Nscomments").setValue(data.Attachment.results[0].Comment);
                            sap.ui.getCore().byId("Nscomments").setEnabled(false);
                            sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty + pathdata.Qty);

                            if (data.StatusDescription == "Ready To Approve" || data.StatusDescription == "Approved") {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);
                                sap.ui.getCore().byId("apprQty").setEnabled(false);

                            }
                            if (sap.ui.getCore().byId("apprQty").getEnabled() == false) {
                                sap.ui.getCore().byId("Idsave").setEnabled(false);

                            }
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {
                                that.QualityApprovedData=data;

                            }
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusType == "DraftSCC") {
                                sap.ui.getCore().byId("idstep").setEnabled(true);
                                sap.ui.getCore().byId("openQtyText").setVisible(true);
                                sap.ui.getCore().byId("openqty").setVisible(true);
                                sap.ui.getCore().byId("Nscomments").setEnabled(true);
                                sap.ui.getCore().byId("Idsave").setEnabled(true);
                                DraftStatusFlg = true;
                                sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty + pathdata.Qty);
                                sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty + pathdata.Qty);


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
                            if (that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {

                                sap.ui.getCore().byId("idReClasiLabel").setVisible(true);
                                sap.ui.getCore().byId("idReClasi").setVisible(true);
                                that.QualityApprovedData=data;
                                sap.ui.getCore().byId("apprQty").setValue(data.ApproveQty);
                                sap.ui.getCore().byId("idReClasi").setValue(data.Attachment.results[0].Classification);


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
                                sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty + pathdata.Qty);
                                sap.ui.getCore().byId("idstep").setMax(pathdata.OpenQty + pathdata.Qty);



                            }
                            sap.ui.getCore().byId("openqty").setText(pathdata.OpenQty + pathdata.Qty);

                            var t1 = [];
                            for (var i in data.Attachment.results[0].AttachmentPIssue.results) {
                                t1.push(data.Attachment.results[0].AttachmentPIssue.results[i].ProductIssueMaster_Id.toString());

                            }
                            sap.ui.getCore().byId("Quality").getContent()[4].setSelectedKeys(t1);
                            var Attachmentid = data.Attachment.results[0].AttachmentId;
                            var DamageId_Id = data.Attachment.results[0].DamageId_Id;
                            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                pattern: "yyyy-MM-dd"
                            });
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
                                    oAttachmentUpl2 = sap.ui.getCore().byId("attachmentUpl1");
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
                                                visibleRemove: that.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription === 'Draft' ? true : false ,
                                                url: "/AttachmentRow",
                                            })
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
                                                url: "/AttachmentRow",
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
                    // sap.ui.getCore().byId("Idsave").setEnabled(false);
                } else {
                    sap.ui.getCore().byId("idcbox").setEnabled(true);
                    // sap.ui.getCore().byId("Idsave").setEnabled(true);
                }
                if (oValue > max) {
                    sap.ui.getCore().byId("idstep").setValueState("Error");
                    sap.m.MessageBox.warning(
                        "Approve Quantity should not be greater than CR Quantity"
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
                if (DraftStatusFlg == true) {
                    if (oValue > max) {
                        sap.ui.getCore().byId("idstep").setValueState("Error");
                        sap.m.MessageBox.warning(
                            "CR Quantity should not be greater than Max Quantity"
                        );
                        sap.ui.getCore().byId("Idsave").setEnabled(false);
                    }
                    if (oValue <= max) {
                        sap.ui.getCore().byId("Idsave").setEnabled(true);
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
                        "CR Quantity should not be greater than Max Quantity"
                    );
                    sap.ui.getCore().byId("idcbox").setEnabled(false);
                    sap.ui.getCore().byId("Idsave").setEnabled(false);
                    return false;
                }
                if (oValue <= max) {
                    sap.ui.getCore().byId("Idsave").setEnabled(true);
                    sap.ui.getCore().byId("idstep").setValueState("None");


                }
                else {
                    if (oValue !== 0) {


                        sap.ui.getCore().byId("idcbox").setEnabled(true);
                        sap.ui.getCore().byId("Idsave").setEnabled(true);
                    }
                }
            },
            oSelectionchange: function (oevt) {
                var oSelectedkey = oevt.getSource().getSelectedItem().getText();
                if (oSelectedkey == "Damage") {

                    sap.ui.getCore().byId("Damage").setVisible(true);
                    sap.ui.getCore().byId("Shortage").setVisible(false);
                    sap.ui.getCore().byId("Quality").setVisible(false);
                    sap.ui.getCore().byId("idQualityPhoto").setVisible(false);
                    sap.ui.getCore().byId("idstep").setEnabled(true);
                    sap.ui.getCore().byId("idcbox").setEnabled(true);
                    sap.ui.getCore().byId("apprQty").setEnabled(false);
                    sap.ui.getCore().byId("LotCode").setEnabled(true);
                    sap.ui.getCore().byId("Expdate").setEnabled(true);
                    sap.ui.getCore().byId("coments").setEnabled(true);
                    sap.ui.getCore().byId("attachmentUpl").setUploadEnabled(true);
                    sap.ui.getCore().byId("NotShipped").setVisible(false);

                } else if (oSelectedkey == "Shortage") {
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
                } else if (oSelectedkey == "Not Shipped") {
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
                var oFilterR = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("PsplInvoice_PsplInvoice", "EQ", this.getView().getModel("CreditReqHdrModel").getData().items[0].PsplInvoice),
                        new sap.ui.model.Filter("ItemNo", "EQ", this.getView().getModel().getProperty(this.spath).Material)
                    ],
                    and: true
                });

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
                //  File = [];
                var item = oEvent.getParameter("item");
                var obj = {};
                (obj.MediaType = item.getMediaType()),
                    (obj.FileName = item.getFileName()),
                    (obj.Size = item.getFileObject().size);
                File.push(obj);
                if (oEvent.getParameter("item").getModel().getData() !== null) {
                    if (oEvent.getParameter("item").getModel().getData().results.length > 0) {
                        for (var i in oEvent.getParameter("item").getModel().getData().results) {
                            File.push(oEvent.getParameter("item").getModel().getData().results[i]);
                        }
                    }
                }
            },
            _itemDialogDestroy() {
                sap.ui.getCore().byId("DeliveryDate").destroy();
                if (sap.ui.getCore().byId("idstep") !== undefined) {
                    sap.ui.getCore().byId("idstep").destroy();
                }
                sap.ui.getCore().byId("idcbox").destroy();
                //   sap.ui.getCore().byId("openqty").destroy();
                sap.ui.getCore().byId("Expdate").destroy();
                sap.ui.getCore().byId("coments").destroy();
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

            //code for updating the approve Qty in objectpage CRitems tbl
            onSaveCRItems: function (oEvent) {
                var that = this;
                var reClassify = sap.ui.getCore().byId("idReClasi").getValue();
                if (sap.ui.getCore().byId("idcbox").getValue() == "Not Shipped") {
                    if (sap.ui.getCore().byId("Nscomments").getValue() === "") {
                        sap.m.MessageBox.error("Please Enter Comment");
                        //   sap.ui.getCore().byId("idReClasi").setValueState("Error");
                        return;
                    }
                }
                if (sap.ui.getCore().byId("idcbox").getValue() == "Quality" && this.getView().getModel("CreditReqHdrModel").getData().items[0].StatusDescription == "Under Review") {
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
                    sap.m.MessageBox.alert("Please Enter the CR Quantity", {
                        icon: sap.m.MessageBox.Icon.QUESTION,
                        title: "Alert"
                    });
                    return;
                }

                var path = "/CreditReqItem(BTPCRItem=" + this.selectedBTPCRItem + ")";
                sap.m.MessageBox.show("Do you want to continue?", {
                    icon: sap.m.MessageBox.Icon.QUESTION,
                    title: "Confirm",
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            var oModel = that.getOwnerComponent().getModel();
                            var ApproveQty = sap.ui.getCore().byId("apprQty").getValue();
                         
                                that.QualityApprovedData.ApproveQty=sap.ui.getCore().byId("apprQty").getValue();
                                that.QualityApprovedData.Attachment.results[0].Classification=reClassify;

                            // var obj = {
                            //     "ApproveQty": ApproveQty
                            // };

                         //   console.log(obj1);
//                            oModel.sDefaultUpdateMethod = "PATCH";
                            oModel.update(path, that.QualityApprovedData, {
                                success: function (oSuccess) {
                                    DraftStatusFlg = false;
                                    oModel.refresh();
                                    sap.m.MessageToast.show("Quantity Approved  ");
//                                     oModel.sDefaultUpdateMethod = "MERGE";
                                    pressDialog.close();
                                    that._itemDialogDestroy();
                                    pressDialog.destroy();

                                },
                                error: function (oError) {
                                    sap.m.MessageBox.alert("Techincal Error Occured -");
//                                     oModel.sDefaultUpdateMethod = "MERGE";
                                    pressDialog.close();
                                    that._itemDialogDestroy();
                                    pressDialog.destroy();


                                }
                            });


                        }
                    }
                });



            },
            addCRItems: function () {
                var that = this;
                var reClassify = sap.ui.getCore().byId("idReClasi").getValue();

                // if (sap.ui.getCore().byId("idcbox").getValue() == "Damage" && File.length === 0) {
                //     sap.m.MessageBox.error("Please Fill Required Feilds");
                //     return;
                // }
                // if (sap.ui.getCore().byId("idcbox").getValue() == "Quality" && File.length === 0) {
                //     sap.m.MessageBox.error("Please Fill Required Feilds");
                //     return;
                // }
                if (sap.ui.getCore().byId("NotShipped").getVisible() == true) {
                    var comment = sap.ui.getCore().byId("Nscomments").getValue()
                }
                else {
                    var comment = sap.ui.getCore().byId("coments").getValue()

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
                            AttachmentRow: File,
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
                        //   for (var i = 0; i < Item.length; i++) {
                        //     if (Item[i].CRItem == itemdata.ItemNo) {
                        //       (Item[i].CRItem = itemdata.ItemNo),
                        //         (Item[i].CRTYPe = critm),
                        //         (Item[i].CRQty = crqty);
                        //     }
                        //   }

                        sap.m.MessageBox.success(
                            "Item updated to CR No." + BTP_CRNO + "",
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
            },
            onHeaderCommentsClose: function () {
                this._headerCommentsDialog.close();
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

                        filterList.push(invoiceNoFilter);
                        oModel.read("/PSInvoiceItems", {
                            filters: filterList,
                            success: function (oResponse) {
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

            onAddItemsAddBtn: function (oEvent) {
                var that = this;
                var model = this.getView().getModel("ItemListModel").getData();
                var ItemList = model.ItemList;
                var selectedindices = this.getView().byId("tableid")._oLegacySelectionPlugin.oSelectionModel.aSelectedIndices;
                if(selectedindices.length == 0){
                    sap.m.MessageBox.alert("Please select atleast one Item.");
                }
                else{
                    var selectedData = [];
                    for (var i = 0; i < selectedindices.length; i++) {
                        selectedData.push(ItemList[selectedindices[i]]);
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
                                        "PsplRowID": selectedData[i].RowID
                                    };
                                    batchChanges.push(oModel.createBatchOperation("/CreditReqItem", "POST", selectedDataObj));
                                }
                                oModel.addBatchChangeOperations(batchChanges);
                                oModel.submitBatch(function (data) {
                                    //oModel.refresh();
                                    MessageBox.success("Record Added Successfully.");
                                    that.byId("AddItemsDialog").destroy();
                                    that.extensionAPI.refresh(that._table.sId);
                                    return;
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
                    success: function (oResponse) {
                        var data = oResponse.results.filter(obj => obj.StatusDescription == "Created");
                        // var data2 = oResponse.results.filter(obj => obj.ApproveQty == 0);
                        if (oResponse.results[0].ApproveQty == 0 || oResponse.results[0].ApproveQty == null) {

                            sap.m.MessageBox.show("Approve Quantity should not be zero or null.");

                        }

                        else if (data.length != 0) {

                            var oModel = that.getOwnerComponent().getModel();
                            sap.m.MessageBox.show("Are you sure, you want to change the status ?", {
                                icon: sap.m.MessageBox.Icon.QUESTION,
                                title: "Confirm",
                                actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                                onClose: function (oAction) {
                                    if (oAction === "OK") {
                                        var oFilterR = new sap.ui.model.Filter({
                                            filters: [
                                                new sap.ui.model.Filter("StatusType", "EQ", "RTA"),
                                                new sap.ui.model.Filter("StatusDescription", "EQ", "Ready To Approve")
                                            ],
                                            and: true
                                        });
                                        oModel.read("/CRStatus", {
                                            filters: [oFilterR],
                                            success: function (oResponse) {
                                                console.log(oResponse.results);
                                                that.CR_Status = oResponse.results;
                                                that.onFinalReadyToApprove(pathdata);
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
            onFinalReadyToApprove: function (pathdata) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                //var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
                this.oModel = this.getView().getModel();

                var obj = {
                    StatusCode_Id: that.CR_Status[0].Id
                };
                console.log(obj);
                var path = "/CreditReqItem(BTPCRItem=" + pathdata.substring(pathdata.indexOf("'") + 1).replace("')", "") + ")";
                console.log(path);
                this.oModel.sDefaultUpdateMethod = "PATCH";

                this.oModel.update(path, obj, {
                    success: function (oSuccess) {
                        sap.m.MessageToast.show("CreditReqItem Updated");
                        that.byId("statusupdateObjectPage").destroy();
                        that.getView().byId(that.comboboxid).setValue(""); this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
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
                    success: function (oResponse) {
                        var data = oResponse.results.filter(obj => obj.StatusDescription == "Created");
                        var data2 = oResponse.results.filter(obj => obj.StatusDescription == "Ready To Approve");
                        if (oResponse.results[0].ApproveQty == 0 || oResponse.results[0].ApproveQty == null) {

                            sap.m.MessageBox.show("Approve Quantity should not be zero or null.");

                        }

                        else if (data.length != 0 || data2.length != 0) {
                            var oModel = that.getOwnerComponent().getModel();
                            sap.m.MessageBox.show("Are you sure, you want to change the status ?", {
                                icon: sap.m.MessageBox.Icon.QUESTION,
                                title: "Confirm",
                                actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                                onClose: function (oAction) {
                                    if (oAction === "OK") {
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
            onFinalApprove: function (pathdata) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                //var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
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
                        sap.m.MessageToast.show("CreditReqItem Updated");
                        that.byId("statusupdateObjectPage").destroy();
                        that.getView().byId(that.comboboxid).setValue(""); this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                    }.bind(this),

                    error: function (oError) {
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
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
                    success: function (oResponse) {
                        //     var data = oResponse.results.filter(obj => obj.StatusDescription == "Ready To Approve");
                        var data2 = oResponse.results.filter(obj => obj.StatusDescription == "Created" || obj.StatusDescription == "Ready To Approve");

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
                var oModel = this.getOwnerComponent().getModel();
                //var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
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
                        sap.m.MessageToast.show("CreditReqItem Updated");
                        that.OnItemReasonPost(this);
                        that.byId("statusupdateObjectPage").destroy();
                        that.getView().byId(that.comboboxid).setValue(""); this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
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
                    success: function (oResponse) {
                        var data = oResponse.results.filter(obj => obj.StatusDescription == "Ready To Approve");
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
                                                new sap.ui.model.Filter("StatusDescription", "EQ", "Rejected")
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
                var oModel = this.getOwnerComponent().getModel();
                //var pathdata = oEvent.oSource.oParent.oParent._aSelectedPaths[0];
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
                        sap.m.MessageToast.show("CreditReqItem Updated");
                        that.OnItemReasonPost(this);
                        that.byId("statusupdateObjectPage").destroy();
                        that.getView().byId(that.comboboxid).setValue(""); this.oModel.refresh();
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                    }.bind(this),

                    error: function (oError) {
                        this.oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
                });
            },
            onSubmit: function () {
                var that = this;
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
                
                    success: function (oResponse) {
                        console.log(oResponse.results);
                        for(var i=0;i<oResponse.results.length;i++){
                                    if(oResponse.results[i].Qty==null || oResponse.results[i].CRTypeDesc==null){
                                            sap.m.MessageBox.error("Credit Quantity/Type should not be Null");    
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
                                    that.onFinalSumbit();
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
            onFinalSumbit: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var obj = {
                    StatusCode_Id: that.CR_Status[0].Id,
                };
                console.log(obj);
                var path = "/CreditReqHdr(BTPCRNO=" + BTP_CRNO + ",OrgStrucEleCode_Id=" + OrgStrucEleCode_Id + ")";
                console.log(path);
                oModel.sDefaultUpdateMethod = "PATCH";

                oModel.update(path, obj, {
                    success: function (oSuccess) {
                        sap.m.MessageToast.show("CreditReqHdr Status Updated");
                        oModel.refresh();
                        oModel.sDefaultUpdateMethod = "MERGE";
                        window.history.go(-1);
                    }.bind(this),

                    error: function (oError) {
                        oModel.sDefaultUpdateMethod = "MERGE";
                        sap.m.MessageBox.alert("Techincal Error Occured -");
                    }
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
                        CreditReqItem_BTPCRItem:this.LocObjPage.BTPCRItem
                    };
                oDataModel.create(Path, obj, {
                    method: "POST",
                    success: function (oData) {
                        that.getView().byId("ReasonObject").setValue("");
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
                uFilters.push(CRNOData, rowIDData,StatusCode);
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
                        .setProperty("/",oData);
                    }
                    that.CreditReqItem_BTPCRItem = oData.results[0].BTPCRItem;
                    that.openItemsDialog();
                  },
                  error: function (error) {},
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
            },
            onItemsCommentsClose: function () {
                this._itemCommentsDialog.close();
                this.extensionAPI.refresh(this._table.sId);

            },
            TextAreaChange: function(oEvent){

                if(oEvent.getSource().getValue().length>0){
        
                    this.getView().byId("savbtn").setEnabled(true);
        
                }
        
                else{
        
                    this.getView().byId("savbtn").setEnabled(false);          
        
              }
        
            },
            OnSelectionchange: function (oEvent) {
                var that = this;
                that.comboboxid = oEvent.getSource().getId();
                var oSelectedkey = oEvent.getSource().getSelectedItem().getText();
                sap.ui.getCore().statustext = oSelectedkey;
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
                    if (oSelectedkey == "Ready To Approve" || oSelectedkey == "Approve") {
                        // this.getView().byId("Reason").setEnabled(false);
                        oDialog.getContent()[0].getItems()[1].getItems()[0].setVisible(false);
                        oDialog.getContent()[0].getItems()[1].getItems()[1].setVisible(false);
                        oDialog.getContent()[1].getContent()[1].setEnabled(true);

                    }
                });
                // var oSelectedkey = oevt.getSource().getSelectedItem().getText();
                // if (oSelectedkey == "Under") {

                // } else if (oSelectedkey == "Reject") {


                // } else if (oSelectedkey == "Cancel") {

                // } 
                var that = this;
                that.LocObjPage = oEvent.getSource().getSelectedItem().getBindingContext().getObject();


            },

            saveChanges: function (oEvent) {

                var text = sap.ui.getCore().statustext;

                if (text == "Ready To Approve") {

                    this.onPressReadyToApprove();

                }

                if (text == "Approve") {

                    this.onPressApprove();

                }

                if (text == "Cancelled") {

                    this.onPressCancelled();

                }
                if (text == "Rejected") {

                    this.onPressRejected();

                }

            },
            CancelChanges: function (oEvent) {

                var that = this;

                that.getView().byId(that.comboboxid).setValue("");

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
                oModel.read("/PSInvoiceHdr", {
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
            showMore:function(){
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
                        var model=that.getView().getModel("HeaderListModel").getData().HeaderList;
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
                var selectedindices = this.getView().byId("tableHdrid")._oLegacySelectionPlugin.oSelectionModel.aSelectedIndices;
                if(selectedindices.length == 0){
                    sap.m.MessageBox.alert("Please select record.");
                }
                else{
                    var selectedData = [];
                    for (var i = 0; i < selectedindices.length; i++) {
                        selectedData.push(HeaderList[selectedindices[i]]);
                    }
                    sap.m.MessageBox.show("Are you sure, you want to assign?", {
                        icon: sap.m.MessageBox.Icon.QUESTION,
                        title: "Confirm",
                        actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                        onClose: function (oAction) {
                            if (oAction === "OK") {
                                var oModel = that.getOwnerComponent().getModel();

                                for (var i = 0; i < selectedData.length; i++) {
                                    var selectedDataObj =
                                    {
                                        "PSInvoiceHdr_PsplInvoice": selectedData[i].PsplInvoice,
                                        "BTPCRNO": BTP_CRNO,
                                        "OrgStrucEleCode_Id": OrgStrucEleCode_Id
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
                                        that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--delbtnButton").setVisible(true);
                                        that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::REPLACE_WITH_ACTION_IDButton2").setVisible(true);
                                        that.getView().byId("sccmanagecr::sap.suite.ui.generic.template.ObjectPage.view.Details::GetCreditReqHdr--action::idSubmitButton").setVisible(false);
                                        that.GetList();
                                        oModel.sDefaultUpdateMethod = "MERGE";
                                    }.bind(this),
                                    error: function (oError) {
                                        oModel.sDefaultUpdateMethod = "MERGE";
                                        sap.m.MessageBox.alert("Invoice not assigned! Please try again.....");
                                        that.byId("AssignItemsDialog").destroy();
                                    }
                                });
                            }
                        }
                    });
                }
            },
            GetList:function(){
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
                        that.getView().getModel("CreditReqHdrModel").getData().items=[];
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
                    new sap.ui.model.Filter("InvoiceDate", sap.ui.model.FilterOperator.Contains, sValue)
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
        };
    });
