(function(window){
  var parseCSSValue = function(value)
  {
    var n = parseFloat(value);
    return {number: n, units: value.replace(n,'')};
  }

  var easing = {
    'ease-in': function(value){
      return -Math.cos(value * Math.PI / 2) + 1;
    },
    'ease-out': function(value){
      return -Math.cos((value / 2 + 1 / 2) * Math.PI);
    },
    'ease-in-out': function(value){
      return (-Math.cos(value * Math.PI) / 2) + 0.5;
    },
    'linear': function(value){
      return value;
    },
    'flash': function(value){
      if(value<0.5)
      {
        return value * 2;
      }
      else
      {
        return (1-value) * 2;
      }
    },
    'bounce': function(value){
      if (value < (1 / 2.75))
      {
        return 7.6 * value * value;
      }
      else if (value < (2 /2.75))
      {
        return 7.6 * (value -= (1.5 / 2.75)) * value + 0.74;
      }
      else if (value < (2.5 / 2.75))
      {
        return 7.6 * (value -= (2.25 / 2.75)) * value + 0.91;
      }
      else
      {
        return 7.6 * (value -= (2.625 / 2.75)) * value + 0.98;
      }
    }
  };

  var anim = function(elem,duration,properties,options,callback)
  {
    if(elem.getAttribute('animating') === 'yes')
    {
      if(!options)
      {
        options = {'wait':false};
      }
      else if(!options.wait)
      {
        options.wait = false;
      }
      if(options.wait)
      {
        setTimeout(function(){anim(elem,duration,properties,options,callback);},1);
      }
      return;
    }
    var parsedProperties = {},
      defaultOptions = {
        'easing' : 'linear'
      };
    
    if(!options)
    {
      var options = defaultOptions;
    }
    else
    {
      for(var prop in defaultOptions)
      {
        if(defaultOptions.hasOwnProperty(prop))
        {
          if(!options[prop])
          {
            options[prop] = defaultOptions[prop];
          }
        }
      }
    }
    
    for(var prop in properties)
    {
      if(properties.hasOwnProperty(prop))
      {
        parsedProperties[prop] = parseCSSValue(properties[prop]);
        parsedProperties[prop]['initial'] = parseFloat(getStyle(elem,prop));
      }
    }
    
    duration = duration * 1000;
    
    var start = (new Date).valueOf(),
      finish = start + duration,
      easer = (typeof options.easing === 'string') ? easing[options.easing] : options.easing,
      running = false, num = 0;
      
    elem.setAttribute('animating', 'yes');
    
    var interval = setInterval(function(){
      if(!running)
      {
        running = true;
        var	time = (new Date).valueOf(),
          frame = time > finish ? 1 : (time - start) / duration,
          from, to;
        
        for(var prop in parsedProperties)
        {
          if(parsedProperties.hasOwnProperty(prop))
          {
            from = parsedProperties[prop]['initial'];
            to = parsedProperties[prop]['number'];
            elem.style[prop] = Math.round(100*(from + (to -from) * easer(frame)))/100 + parsedProperties[prop]['units'];
          }
        }
        
        if(time > finish)
        {
          clearInterval(interval);
          elem.setAttribute('animating', null);
              if(typeof callback === 'function') {
                 callback();
              }
        }
        running = false;
      }
    },20);
  }

  var chainedAnim = function(elem)
  {
    return new chainedAnim.prototype.init(elem);
  }

  chainedAnim.fn = chainedAnim.prototype = {
    init: function(elem){
      this.elem = elem;
      this.position = 0;
    },

    anim: function(){
      var args = Array.prototype.slice.call(arguments),
        delay = this.position;
      args.unshift(this.elem);
      if(!args[3])
      {
        args[3] = {};
      }
      args[3].wait = true;
      this.position += 1000*args[1] || 0;
      setTimeout(function(){anim.apply(null,args);}, delay);
      return this;
    }
  };
  
  chainedAnim.fn.init.prototype = chainedAnim.fn;
  
  window.a = chainedAnim;
})(this);