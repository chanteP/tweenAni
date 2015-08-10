;(function(npTweenAni){
    // y= (1-t)^3*p0y + 3*(1-t)^2*t*p1y + 3*(1-t)*t^2p2y + t^3p3y  
    // x= (1-t)^3*p0x + 3*(1-t)^2*t*p1x + 3*(1-t)*t^2p2x + t^3p3x  

    // var ax = 3 * p1x - 3 * p2x + 1,  
    //       bx = 3 * p2x - 6 * p1x,  
    //       cx = 3 * p1x;  
      
    // var ay = 3 * p1y - 3 * p2y + 1,  
    //       by = 3 * p2y - 6 * p1y,  
    //       cy = 3 * p1y;  
    // y= ((ay * t + by) * t + cy ) * t  
    // x= ((ax * t + bx) * t + cx ) * t  

    //func (time, begin, end, duration, extra...)
    var bezier = function(t, b, c, d, p1x, p1y, p2x, p2y){

    }


    
    npTweenAni.register('bezier', bezier);

})(npTweenAni);

