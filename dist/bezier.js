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
    var cache = {};

    var calcTPos = function(p1, p2, t){
        return {
            x : p1.x + (p2.x - p1.x) * t,
            y : p1.y + (p2.y - p1.y) * t
        };
    }
    var buildMap = function(p1, p2){
        var M, N, P, Q, R, S, T, U;
        var O, O1;
        var t = 0;

        var counter = 100, step = 1 / 100;
        var map = [];

        O = {x:0, y:0};
        O1 = {x:1, y:1};
        M = {x:p1.x, y:p1.y};
        N = {x:p2.x, y:p2.y};

        while(counter > 0){
            P = calcTPos(O, M, t);
            Q = calcTPos(M, O1, t);
            R = calcTPos(O1, N, t);

            S = calcTPos(P, Q, t);
            T = calcTPos(Q, R, t);

            U = calcTPos(S, T, t);
            map.push(U);
            counter--;
            t+=step;
        }
        return map;
    }
    var matchX = function(x, map){
        map.curIndex = map.curIndex === undefined ? 0 : map.curIndex;
        var y;
        for(var i = map.curIndex; i < map.length; i++){
            if(map[i].x > x){
                return y;
            }
            y = map[i].y;
            map.curIndex = i;
        }
        return null;
    };


    var drawDemo = function(map){
        var ctx = demo.getContext('2d');
        w = demo.width;
        h = demo.height;
        map.forEach(function(p){
            ctx.fillStyle = '#f00';
            ctx.fillRect(p.x*w, h - p.y*h, 3, 3);
        });
    }


    //func (time, begin, end, duration, extra...)
    var bezier = function(t, b, c, d, p1x, p1y, p2x, p2y){

        p1x = 0.43;
        p1y = 0.05;
        p2x = 0.58;
        p2y = 1;


        var key = [p1x,p1y,p2x,p2y].join('-');
        var map;
        if(key in cache){
            map = cache[key];
            // map = map.curIndex === undefined ? map : map.concat([]);
        }
        else{
            map = cache[key] = buildMap({x:p1x, y:p1y}, {x:p2x, y:p2y});
        }
        drawDemo(map);
        return 0;

        t = t / d;
        var y = matchX(t, map);

        if(!y){
            return c;
        }

        return b + (c - b) * y;
    }


    
    npTweenAni.register('bezier', bezier);

})(npTweenAni);

