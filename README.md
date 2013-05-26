anim
=======

Basic animation framework, supporting built in and custom easing functions.

## Usage

The animation framework is exposed a the variable `a`. In order to initialize a new animation, just call `a()` and pass in a DOM element.

Once you have an animation object, call `anim()` in order to animate the DOM element. Animations can be chained by calling anim() repeatedly (i.e. `.anim().anim()`).

The `anim` method accepts up to 4 parameters. These are (in order):

1. Duration (seconds for how long the animation should take).
2. Properties (a object containing the css properties and their values to animate to).
3. Options (extra options to use for the animation).
4. Callback (a function to be called when the animation has ended).

### Example

Below is an example of the framework in use:

    var elem = document.getElementById('elementId');
    var animation = a(elem);
    animation.anim(1, {left: 20, top: 50}, {easing: 'linear'}, function(){ alert('done'); });

### Easing options

The framework has some built in easing options, and also supports custom easing functions. The desired easing function is selected with the `easing` property on the options object. The property supports either a string naming the built in function, or a function for the easing. The function must take in a numeric value, and return a numeric value.

The built in easing functions are named:

* ease-in
* ease-out
* ease-in-out
* linear
* flash
* bounce

An example custom easing function (the built in 'ease-in') is as follows:

    function(value){
        return -Math.cos(value * Math.PI / 2) + 1;
    }