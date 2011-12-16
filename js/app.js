Ext.setup({

    tabletStartupScreen: 'tablet_startup.png',

    phoneStartupScreen: 'phone_startup.png',

    icon: 'icon.png',

    glossOnIcon: false,

    onReady: function(){

		var data = [];

		var domainName = window.location.hostname;

		Ext.Ajax.request({

		    url: 'proxy/proxy.php?url=http://'+domainName+'/eCommerce/lib/eCom.html',

		    method: 'get',

		    success: function(response, opts) {

		    	console.log("API Name: eCommerce:"+response.responseText);

		      	var ecomproduct = Ext.JSON.decode(response.responseText);

		      	if(ecomproduct.error == 1) {

					productHomePage1(ecomproduct);

	        	}else{

	        	}

		    },

		    failure : function(response,data){

		    	window.location.href="";

		    }

		});



/*
Starting Main Page Application
*/

		productHomePage1 = function(ecomproduct){

/*

*/
var productId=null;
var contentCounter=0;
var urlLocation=window.location;
var urlQuery = window.location.search.substring(1);
if(urlQuery!=""){
	var vars = urlQuery.split("&");
	for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    productId = pair[1];
		contentCounter=pair[1]-1;
		break;
    } 
}else{
	urlLocation = window.location+"?productid=1";
}



		var barItemsIPad = [{xtype: 'spacer', style:'background: transparent;'},

		        {iconCls: 'home', title: 'Home', style:'background:grey; -webkit-border-radius:0em; border-radius:0em; margin:0em;;'},

				{iconCls: 'search', title: 'Search', style:'background:grey; -webkit-border-radius:0em; border-radius:0em; margin:0em;'},

		        {iconCls: 'user', title: 'User', style:'background:grey; -webkit-border-radius:0em; border-radius:0em; margin:0em;'},

                {iconCls: 'info', title: 'Info', style:'background:grey; -webkit-border-radius:0em; border-radius:0em; margin:0em;'}];

		

		var barItemsIPhone = [{xtype: 'spacer'},

		        {iconCls: 'home', title: 'Home', style:'z-index:10000; min-width:80px !important; min-height:40px !important;'},

				{iconCls: 'search', title: 'Search', style:'z-index:10000; min-width:80px !important; min-height:40px !important;'},

		        {iconCls: 'user', title: 'User', style:'z-index:10000; min-width:80px !important; min-height:40px !important;'},

                {iconCls: 'info', title: 'Info', style:'z-index:10000; min-width:80px !important; min-height:40px !important;'},

				{xtype: 'spacer'}];

				

		var bar = new Ext.TabBar({

		    dock : 'bottom',

		    ui   : 'dark',

			cls : Ext.os.is.Phone ? 'iPhoneTabbarButton' : 'iPadTabbarButton',

			style: Ext.os.is.Phone ? 'border:0px;' : 'border:0px; background: transparent;',

		    items:  Ext.os.is.Phone ? barItemsIPhone : barItemsIPad

		});

/*

*/		

		var dockedItems = {

				xtype: 'toolbar',

				dock: 'top',

				items:[{

					xtype:'button',

					ui:'back',

					text:'Home'

				},{

					xtype: 'spacer',

					style:'width:100% !important',

					html:'<div align="center"><font color="white"><b>ShopName</b></font></div>'

				},{

					iconCls: 'action',

					iconMask: true,

					ui: 'action',

					handler : function(){

						if (Ext.getCmp('buttonPanelId').isHidden()) {

							Ext.getCmp('buttonPanelId').show();

						} else {

							Ext.getCmp('buttonPanelId').hide();

						}

					}

				}]

			};

/*

*/

		calculateDesiredWidth = function() {

		    var viewWidth = Ext.Element.getViewportWidth(),

		        desiredWidth = Math.min(viewWidth, Ext.is.Phone ? 280 : 698) - 10;

		    return desiredWidth;

		};



		var sendMailPnl = new Ext.Panel({

			floating : true,

	        centered : true,

	        modal : true,

	        width : calculateDesiredWidth(),

			dockedItems : [{

				xtype : 'toolbar',

				title : 'Share by email',

				dock : 'top'

			},{

				xtype : 'toolbar',

				dock : 'bottom',

				items : [{

					xtype:'spacer'

				},{

					xtype : 'button',

					text : 'Cancel',

					ui : 'confirm',

					style : 'width:100px',

					handler : function(){

						waitMask.hide();

						sendMailPnl.hide();

					}

				},{

					xtype : 'button',

					text : 'Send',

					ui : 'confirm',

					style : 'width:100px',

					handler : function(){

						waitMask.hide();

						sendMailPnl.hide();

					}

				}]

			}],

	        items:[{

				xtype:'textfield',

				label:'To',

				required: true,

				disabled:false

			},{

				xtype:'textareafield',

				id : 'email',

				name : 'textareafieldid',

				label: 'Massage',

				value:urlLocation,

				required: true,

				useClearIcon: true,

				disabled:false

			}],

		});		

		var buttonPanel = Ext.create('Ext.Panel',{

				id : 'buttonPanelId',

				cls : Ext.os.is.Phone ? 'iPhoneButtonPanel' : 'iPadButtonPanel',

				items: [{

					layout: {

						type: 'vbox',

						align: 'center'

					},

					defaults: {

						xtype: 'button',

						flex: 1

					},

					items: [{

						cls: Ext.os.is.Phone ? 'iPhoneFacebook' : 'iPadFacebook',

						style: Ext.os.is.Phone ? 'top : 5px; left : -114px; width : 50px; height:24px !important;' : 'top : 8px; left : -258px; width : 122px; height:38px !important;',

						handler : function(){

							window.location.href="http://www.facebook.com/sharer/sharer.php?u="+urlLocation;

						}

					}, {

						cls: Ext.os.is.Phone ? 'iPhoneTwitter' : 'iPadTwitter',

						style: Ext.os.is.Phone ? 'top : -19px; left : -39px; width : 50px; height:24px !important;' : 'top : -30px;  left : -86px; width : 122px; height:38px !important;',

						handler:function(){

							window.location.href="https://twitter.com/share?url="+urlLocation;

						}

					}, {

						cls: Ext.os.is.Phone ? 'iPhoneeMail' : 'iPadeMail',

						style: Ext.os.is.Phone ? 'top : -43px; left : 36px; width : 50px; height:24px !important;' : 'top : -68px; left : 86px; width : 122px; height:38px !important;',

						handler: function(){

							waitMask = new Ext.LoadMask(Ext.getBody(), {msg:"please wait..."});

							waitMask.show();

							sendMailPnl.show();

						}

					}, {

						cls: Ext.os.is.Phone ? 'iPhoneeChat' : 'iPadeChat',

						style: Ext.os.is.Phone ? 'top : -67px; left : 111px; width : 50px; height:24px !important;' : 'top : -105px; left : 258px; width : 122px; height:38px !important;'

					}]

				}]

			});

/*
Product Carousel Part
*/		var carouselItems = [];

		var counter=1;

		for(var i=0; i<ecomproduct.content.length; i++){

				carouselItems.push({

					html : Ext.os.is.Phone ? '<table><tr><td align="center"><img class="iPhoneImg" src="'+ecomproduct.content[i].imageurl+'"></img></td></tr></table>' : '<table><tr><td align="center"><img class="iPadImg" src="'+ecomproduct.content[i].imageurl+'"></img></td></tr></table>',

					title:ecomproduct.content[i].title,

					price:ecomproduct.content[i].price,

					product_detail:ecomproduct.content[i].product_detail

				});

			counter=counter+1;		

       	}	

		var productCarousel = Ext.create('Ext.Carousel', {

				cls: Ext.os.is.Phone ? 'iPhoneCarousel' : 'iPadCarousel',

				id : 'carouselProduct',

				activeItem:contentCounter,

				items: carouselItems

			});

/*
Product Title Part
*/

		var productTitlePaneliPhone = new Ext.Panel({

				cls : Ext.os.is.Phone ? 'iPhoneProductTitle' : undefined,

				html : Ext.os.is.Phone ? '<div id="prodTitleIPhoneId"><table width="100%" border="0px"><tr><td width="100%" class="iPhoneProductTitleClass"><b>'+ecomproduct.content[contentCounter].title+'</b></tr></td></table></div>' : undefined

			});

		var productTitlePaneliPad = new Ext.Panel({

				height : Ext.os.is.Phone ? undefined : 150,

				html : Ext.os.is.Phone ? undefined : '<div id="prodTitleId" valign="top"><table><tr><td><b><font size="12">'+ecomproduct.content[contentCounter].title+'</font></b></tr></td></table></div>'

			});

		var productPriceButtonPanel = new Ext.Panel({

				layout:{type:'hbox'},

//				cls : Ext.os.is.Phone ? 'iPhoneProductPriceButtonPanel' : 'width:210px; top: -29px; left: 97px;',

//				style:Ext.os.is.Phone ? 'top:-25px !important;' : 'left:119px; top:-112px; height:47px; width:264px;',

				style:Ext.os.is.Phone ? 'top : -20px; left:115px; width:150px;' : 'width:210px; top: -29px; left: 97px;',

				items : [{

					xtype : 'button',

					iconCls : 'favorites',

//					style : Ext.os.is.Phone ? 'z-index:10000; left:0px; width:31.5px; height:31.5px;' : 'width : 45px; height : 44px;',

					style :  Ext.os.is.Phone ? 'z-index:10000;' : undefined,

					ui : 'action',

					iconMask : true,

					handler : function(){

						return;

					}

				},{

					xtype : 'button',

					text : 'Add to Cart',

					ui : 'confirm',

//					style : Ext.os.is.Phone ? 'width:100px; left:40px; top:-30px; height:31.5px;' : 'width:150px; left:60px; top:-44px; height:44px;',

					style: Ext.os.is.Phone ? 'left:20px;' : 'left:30px;',

					handler : function(){

						return;

					}

				}]

			});

		var productPricePanel = new Ext.Panel({

				cls : Ext.os.is.Phone ? 'iPhoneProductPricePanel' : 'iPadProductPricePanel',

//				style: Ext.os.is.Phone ? 'left:-260px; top:40px;width:290px; height:60px; background:transparent; ' : 'left:60px;',

				layout:{type:'vbox',align:'left'},

				items : [productTitlePaneliPad,

					{

						xtype : 'panel',

						style: Ext.os.is.Phone ? 'height: 30px !important; top:15px !important;' : undefined,

						html : '<div id="priceID"><table><tr><td><font color="green">'+ecomproduct.content[contentCounter].price+'</font>&nbsp;USD</tr></td></table></div>'

					}, productPriceButtonPanel

				]

			});

		var productDetailPanel = new Ext.Panel({

				cls : Ext.os.is.Phone ? 'iPhoneProductDetailPanel' : 'iPadProductDetailPanel',

				html: '<div align="justify" id="productDetailID">'+ecomproduct.content[contentCounter].product_detail+'</div>'

			});

		var carouselAndTitle = Ext.create('Ext.Container',{

				layout: {type: 'hbox',align: 'stretch'},

				cls : Ext.os.is.Phone ? 'iPhoneCarouselAndTitlePanel' : 'iPadCarouselAndTitlePanel',

				items: Ext.os.is.Phone ? [productCarousel,productTitlePaneliPhone,productPricePanel,productDetailPanel] : [productCarousel,productPricePanel,productDetailPanel]

			});

/*
Main Page Panel
*/

		Ext.create('Ext.Panel', {

        	fullscreen: false,

			cls: Ext.os.is.Phone ? 'iPhoneBody' : 'iPadBody',

			scroll: 'vertical',

			layout: {type: 'vbox',align: 'top'},

			dockedItems : Ext.os.is.Phone ? undefined : dockedItems,

        	items: Ext.os.is.Phone ? [dockedItems,buttonPanel,carouselAndTitle,bar] : [buttonPanel,carouselAndTitle,bar]

        });

		Ext.getCmp('buttonPanelId').hide();

		}

	}

});