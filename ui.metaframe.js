/* -------------------------------
 * jQuery UI metaframe
 *
 * Version: 1.0
 *
 * Copyright 2011, Arjan Scherpenisse <arjan@scherpenisse.net>
 *
 * Released under the MIT license
 */

(function($)
{
    $.widget("ui.metaframe",
    {
	    _init: function()
        {
            var self = this;

            self.popup = self.element.find(".metaframe-popup:first");
            self.trigger = self.element.find(".metaframe-trigger");

            self.popup.css({top: 0, left: 0, opacity: 0, display: 'block'});

            var el = self.trigger.clone(true).css({margin: 0});
            self.popup.find(".metaframe-placeholder")
                .empty().append(el);

            var lo = self.popup.find(".metaframe-placeholder").offset();
            var po = self.popup.offset();
            var o2 = { left: lo.left - po.left, top: lo.top-po.top };

            var prop = function(p) { return self.trigger.css(p) ? parseInt(self.trigger.css(p)) : 0; };

            var addTop = prop('borderTopWidth') + prop('padding-top');
            var addLeft = prop('borderLeftWidth') + prop('padding-left');

            self.offset = {top:  -o2.top + addTop, left:  -o2.left + addLeft };

            self.showing = false;
            self.showTimer = null;
            self.hideTimer = null;

            self.timeout = 2;

            self.trigger
                .mouseover(function() {
                               if (self.showTimer || self.showing) return;
                               self.showTimer = setTimeout(function() { self.doShow(); }, self.timeout);
                           })
                .mouseout(function() {
                              if (self.hideTimer || !self.showing) return;
                              self.hideTimer = setTimeout(function() { self.doHide(); }, self.timeout);
                          });

            self.popup
                .mouseover(function() {
                               if (self.hideTimer) { clearTimeout(self.hideTimer); self.hideTimer = null; }
                           })
                .mouseout(function() {
                              self.hideTimer = setTimeout(function() { self.doHide(); }, self.timeout);
                          });
            $("body").append(self.popup);
            if ($.widgetManager) $.widgetManager(self.popup.get(0));
        },

        doShow: function()
        {
            var self = this;
            var o = self.trigger.find("*").offset() || self.trigger.offset();

            self.popup.css({top: o.top+self.offset.top, left: o.left+self.offset.left, opacity: 0});
            self.popup.show();
            self.popup.animate({opacity: 1});
            self.showTimer = null;
            self.showing = true;
            self._trigger("show");
        },

        doHide: function()
        {
            var self = this;
            self.popup.fadeOut(100); //hide();
            self.showing = false;
            self.hideTimer = null;
            self._trigger("hide");
        }

    });
})(jQuery);
