//执行Hook方法
function test() {
    Java.perform(function () {
        let HomeFragment = Java.use("com.trump.home.HomeFragment");
        HomeFragment["getTextBtn1"].implementation = function (str) {
            console.log("getTextBtn1 is called" + ", " + "str: " + str);
            let ret = this.getTextBtn1(str);
            console.log("getTextBtn1 ret value is " + ret);
            ret = "btn1 hooked";
            console.log("getTextBtn1 hooked ret value is " + ret);
            return ret;
        };
    });
}

setImmediate(test);
