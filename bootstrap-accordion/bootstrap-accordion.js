"use strict";

var Collapse = function($container, data, options){
    this.container = $container;
    this.data = data;
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.panel = null;
    this.isOpen = true;
    this.init();
};

Collapse.TEMPLATE = '<div class="panel">' + 
                        '<div class="panel-heading" role="tab">' + 
                            '<h4 class="panel-title"><a aria-expanded="true" aria-controls="" href="javascript:void(0)"></a></h4>' + 
                        '</div>' + 
                        '<div class="panel-collapse collapse in" role="tabpanel" aria-labelledby="">' + 
                            '<div class="panel-body"></div>' + 
                        '</div>' + 
                    '</div>';

Collapse.STYLE_DEFAULT = 'panel-default';
Collapse.STYLE_INFO = 'panel-info';
Collapse.STYLE_PRIMARY = 'panel-primary';
Collapse.STYLE_SUCCESS = 'panel-success';
Collapse.STYLE_WARNING = 'panel-warning';
Collapse.STYLE_DANGER = 'panel-danger';

Collapse.COUNTER = 1;
Collapse.PREFIX = 'discl';

Collapse.DEFAULTS = {
    collapse: true,
    style: '',
    beforeShow: null,
    postShow: null,
    beforeHide: null,
    postHide: null
};

Collapse.prototype.init = function(){
    this.panel = $(Collapse.TEMPLATE);
    this.panelId = Collapse.PREFIX + Collapse.COUNTER++;
    this.panel.attr('id', this.panelId);
    if(this.options.style){
        this.panel.addClass(this.options.style);
    }

    var heading = this.panel.find('.panel-heading');
    var headingId = this.panelId + '-heading';
    heading.attr('id', headingId);

    this.title = this.panel.find('.panel-title a');
    var titleId = this.panelId + '-title';
    this.title.attr('id', titleId).html(this.data.title);

    this.body = this.panel.find('.panel-collapse');
    var bodyId = this.panelId + '-body';
    this.body.attr('id', bodyId);
    this.body.find('.panel-body').html(this.data.body);

    this.title.attr('aria-controls', bodyId);
    this.body.attr('aria-labelledby', headingId);

    
    var $this = this;
    if(this.options.parent){
        this.parent = this.options.parent;
        var oldShow = this.options.beforeShow;
        var beforeShow = function(){
            $this._togglePanels();
            if(oldShow) oldShow();
        };
        this.options.beforeShow = beforeShow;
        
        var oldHide = this.options.beforeHide;
        var $this = this;
        var beforeHide = function(){
            var index = $.inArray(this, this.parent.openPanels);
            if(index !== -1){
                this.parent.openPanels.splice(index, 1);
            }
            if(oldHide) oldHide();
        };
        this.options.beforeHide = beforeHide;
    }
    if(!this.options.collapse){
        $this.toggle();
    }
    this.title.click(function(){
        $this.toggle();
    });

    this.container.append(this.panel);
};

Collapse.prototype.toggle = function(open){
    if(open === undefined){
        this.isOpen = !this.isOpen;
    }else{
        this.isOpen =  !!open;
    }
    
    if(this.isOpen && this.options.beforeShow && typeof this.options.beforeShow === 'function'){
        this.options.beforeShow.call(this);        
    }
    if(!this.isOpen && this.options.beforeHide && typeof this.options.beforeHide === 'function'){
        this.options.beforeHide.call(this);
    }
    
    this.body.toggleClass('in', this.isOpen);
    
    if(this.isOpen && this.options.postShow && typeof this.options.postShow === 'function'){
        this.options.postShow.call(this);
    }
    if(!this.isOpen && this.options.postHide && typeof this.options.postHide === 'function'){
        this.options.postHide.call(this);
    }
};

Collapse.prototype.show = function(){
    this.toggle(true);
};

Collapse.prototype.hide = function(){
    this.toggle(false);
};

Collapse.prototype._togglePanels = function(){
    var accordion = this.parent;
    if(!accordion) return;
    
    var panel = null;
    for(var i = accordion.openPanels.length; i >= accordion.options.maxOpen; i--){
        panel = accordion.openPanels.shift();
        panel.hide();
    }
    accordion.openPanels.push(this);
};

$.fn.collapse = function(data, options){
    return this.each(function(){
        var collapse = $(this).data('dis.collapse');
        if(!collapse && typeof data == 'object'){
            options = $.extend({}, options);
            collapse = new Collapse($(this), data, options);
            $(this).data('dis.collapse', collapse);
        }
        if(typeof data == 'string'){
            collapse[data](options);
        }
    });  
};

var Accordion = function($container, collapses, options){
    this.container = $container;
    this.collapses = collapses;   
    this.options = $.extend(true, {}, Accordion.DEFAULTS, options);
    this.panels = [];
    this.openPanels = [];
    this.init();
};

Accordion.DEFAULTS = {
    maxOpen: 1,
    collapseDefaults: {
        style: Collapse.STYLE_DEFAULT,
        collapse: false
    }
};

Accordion.prototype.init = function(){
    for(var i in this.collapses){
        var panel = $('<div id="' + Collapse.PREFIX + Collapse.COUNTER++ + '"></div>');
        var options = $.extend({parent: this}, this.options.collapseDefaults, this.collapses[i].options); 
        if(options.collapse){
            options.collapse = !(this.openPanels.length >= this.options.maxOpen);
        }       
        var collapse = new Collapse(panel, this.collapses[i].data, options);      
        this.panels.push(collapse);
        if(options.collapse){
            this.openPanels.push(collapse);
        }
        this.container.append(panel);
    }
    
};

$.fn.accordion = function(collapses, options){
    return this.each(function(){
        var accordion = $(this).data('dis.accordion');
        if(!accordion && typeof collapses == 'object'){
            options = $.extend({}, options);
            accordion = new Accordion($(this), collapses, options);
            $(this).data('dis.accordion', accordion);
        }
        if(typeof data == 'string'){
            accordion[data](options);
        }
    });  
};




