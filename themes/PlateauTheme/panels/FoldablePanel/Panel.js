// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/_base/array dojo/on dojo/keys dojo/aspect dojo/topic jimu/BaseWidgetPanel jimu/BaseWidgetFrame jimu/utils dojo/query dojo/dom-class ./FoldableDijit ./FoldableWidgetFrame dijit/registry".split(" "),function(m,f,b,l,k,g,n,e,p,q,r,d,h,t,u,v){return m([p,t],{baseClass:"jimu-panel jimu-foldable-dijit jimu-foldable-panel",closeTolerance:30,openAnimation:"fadeIn",closeAnimation:"fadeOut",animationDuration:500,postMixInProperties:function(){this.headerNls=
window.jimuNls.panelHeader},startup:function(){this.titleHeight=35;this.inherited(arguments);this._switchParentNode();b.addClass(this.titleNode,"jimu-panel-title");this.createFoldableBtn();this.createMaxBtn();this.createCloseBtn();this.panelManager.normalizePanel(this);this.own(k(this.domNode,"keydown",f.hitch(this,function(a){b.hasClass(a.target,"close-btn")||a.keyCode!==g.ESCAPE||this.closeNode.focus()})))},getPanelPosition:function(){var a;if(window.appInfo.isRunInMobile)return 0===this.panelManager.getPositionOnMobile(this).top?
(a=this.panelManager.getPositionOnMobile(this),a.top="39px"):a=this.panelManager.getPositionOnMobile(this),a;a=f.clone(this.position);"undefined"===typeof a.width&&(a.width=360);"minimized"===this.windowState?(a.bottom="auto",a.height=this.titleHeight,a.borderRadiusStyle={borderTopLeftRadius:"0px",borderTopRightRadius:"0px",borderBottomLeftRadius:0,borderBottomRightRadius:0}):(a.bottom=this.position.bottom,a.height="auto",a.borderRadiusStyle={borderTopLeftRadius:"0px",borderTopRightRadius:"0px",borderBottomLeftRadius:"0px",
borderBottomRightRadius:"0px"});return a},onNormalize:function(){this.resize();h.contains(this.foldableNode,"folded")&&h.remove(this.foldableNode,"folded")},onMaximize:function(){this.resize();h.contains(this.foldableNode,"folded")&&h.remove(this.foldableNode,"folded")},onMinimize:function(){this.resize();h.contains(this.foldableNode,"folded")||h.add(this.foldableNode,"folded")},resize:function(){this._switchMaxBtn();var a=this.getPanelPosition();"maximized"===this.windowState&&window.appInfo.isRunInMobile&&
(a.top="39px");this._setMapCanvasArea(a.top);window.appInfo.isRunInMobile||(a.top="39px",a.right="0",a.bottom="0");this.position.zIndex&&(a.zIndex=this.position.zIndex);var c=r.getPositionStyle(a);c.width=window.appInfo.isRunInMobile?760>=window.innerWidth||600>=window.innerHeight?"maximized"===this.windowState?"100%":760>=window.innerWidth?"100%":"360px":"360px":"360px";c.left=window.isRTL?"0px":"auto";c.right="0px"===c.left?"auto":c.right;f.mixin(c,a.borderRadiusStyle);c.margin="none";c.marginLeft=
"0";c.marginRight="0";c.marginBottom="0";c.marginTop="0";b.setStyle(this.domNode,c);1<this.getChildren().length&&this._setFrameSize(a.contentHeight);this.inherited(arguments)},reloadWidget:function(a){this.inherited(arguments);this.isWidgetInPanel(a)&&(Array.isArray(this.config.widgets)||this.setTitleLabel(a.label))},_setMapCanvasArea:function(a){if(window.appInfo.isRunInMobile){var c=0;d(".jimu-widget-attributetable")[0]&&(c=d(".jimu-widget-attributetable")[0].clientHeight);"minimized"===this.windowState?
0<c&&35<c?e.publish("changeMapPosition",{bottom:c}):window.hasOwnProperty("ontouchstart")||void 0!==window.ontouchstart||760>=window.innerWidth?e.publish("changeMapPosition",{bottom:"35px"}):e.publish("changeMapPosition",{bottom:"0px"}):"maximized"===this.windowState?e.publish("changeMapPosition",{bottom:"0px"}):0<c&&c>a?e.publish("changeMapPosition",{bottom:c}):window.hasOwnProperty("ontouchstart")||void 0!==window.ontouchstart||760>=window.innerWidth?e.publish("changeMapPosition",{bottom:a}):e.publish("changeMapPosition",
{bottom:"0px"})}else window.appInfo.isRunInMobile||("minimized"===this.windowState?e.publish("changeMapPosition",{right:"0px"}):(e.publish("changeMapPosition",{right:"360px"}),this._resizeAttributeTableinRTL()))},_resizeAttributeTableinRTL:function(){d(".jimu-widget-attributetable")[0]&&(window.isRTL?b.setStyle(d(".jimu-widget-attributetable")[0],"right","0px"):b.setStyle(d(".jimu-widget-attributetable")[0],"left","0px"),d(".dijitTabContainer",d(".jimu-widget-attributetable")[0])[0]&&v.byId(d(".dijitTabContainer",
d(".jimu-widget-attributetable")[0])[0].id).resize())},updateConfig:function(a){this.inherited(arguments);this.setTitleLabel(a.label)},_switchMaxBtn:function(){window.appInfo.isRunInMobile&&(760>=window.innerWidth||600>=window.innerHeight)?b.setStyle(this.maxNode,"display",""):b.setStyle(this.maxNode,"display","none")},_switchParentNode:function(){b.place(this.domNode,jimuConfig.layoutId)},_setFrameSize:function(a){var c,d=0;l.forEach(this.getChildren(),function(a){a.folded||d++},this);"undefined"===
typeof a&&(a=b.getContentBox(this.containerNode).h);c=(a-(this.getChildren().length-d)*this.getChildren()[0].titleHeight)/d;l.forEach(this.getChildren(),function(a){a.folded?b.setStyle(a.domNode,{height:a.titleHeight+"px"}):b.setStyle(a.domNode,{height:c+"px"});a.resize()},this)},createCloseBtn:function(){this.closeNode=b.create("div",{"class":"close-btn jimu-float-trailing",role:"button",tabindex:"0","aria-label":this.headerNls.closeWindow},this.btnsContainer);this.own(k(this.closeNode,"click",f.hitch(this,
function(a){a.stopPropagation();d(".widget-open-symbol").addClass("esriCTHidden");this.panelManager.closePanel(this)})));this.own(k(this.closeNode,"keydown",f.hitch(this,function(a){a.keyCode===g.ENTER||a.keyCode===g.SPACE?this.panelManager.closePanel(this):!a.shiftKey&&a.keyCode===g.TAB&&this.isGroupPanel&&(a.preventDefault(),this.firstTitleNode.focus())})))},createMaxBtn:function(){this.maxNode=b.create("div",{"class":"max-btn jimu-float-trailing",role:"button","aria-label":this.headerNls.maxWindow,
tabindex:0},this.btnsContainer);this.own(k(this.maxNode,"click",f.hitch(this,function(a){a.stopPropagation();b.removeClass(this.titleNode,"esriCTBorderBottom");this.onMaxNodeClick()})));this.own(k(this.maxNode,"keydown",f.hitch(this,function(a){if(a.keyCode===g.ENTER||a.keyCode===g.SPACE)a.stopPropagation(),this.onMaxNodeClick();a.keyCode===g.ESCAPE&&(a.stopPropagation(),(a=d(".jimu-state-selected")[0])&&a.focus())})))},createFrame:function(a){this.config.widgets&&1===this.config.widgets.length||
!this.config.widgets?a=new q:(a=new u({label:a.label,widgetManager:this.widgetManager}),n.after(a,"onFoldStateChanged",f.hitch(this,function(){var a=0;this._setFrameSize();l.forEach(this.getChildren(),function(b){b.folded||a++},this);l.forEach(this.getChildren(),function(b){b.foldEnable=b.folded||1!==a?!0:!1},this)})));return a},onFoldableNodeClick:function(){this.inherited(arguments);"minimized"===this.windowState?(b.removeClass(this.titleNode,"esriCTBorderBottom"),this.panelManager.normalizePanel(this)):
this.panelManager.minimizePanel(this);b.setAttr(this.maxNode,"aria-label",this.headerNls.maxWindow)},onMaxNodeClick:function(){b.removeClass(this.titleNode,"esriCTBorderBottom");"maximized"===this.windowState?(b.setAttr(this.maxNode,"aria-label",this.headerNls.maxWindow),this.panelManager.normalizePanel(this)):(b.setAttr(this.maxNode,"aria-label",this.headerNls.restoreWindow),this.panelManager.maximizePanel(this),this.folded=!1,b.removeClass(this.foldableNode,"folded"),b.setAttr(this.foldableNode,
"aria-label",this.headerNls.foldWindow))},moveTitle:function(){this.isFull?this.folded?b.setStyle(this.domNode,{top:b.getMarginBox(jimuConfig.layoutId).h-this.titleHeight+"px"}):b.setStyle(this.domNode,{top:"0px"}):b.setStyle(this.domNode,{top:this.position.top+"px"})}})});