//执行Hook方法
function test2() {
    Java.perform(function () {
        let HomeFragment = Java.use("com.trump.home.HomeFragment");
        HomeFragment["getTextBtn2"].implementation = function (str) {
            console.log("getTextBtn2 is called" + ", " + "str: " + str);
            let ret = this.getTextBtn2(str);
            console.log("getTextBtn2 ret value is " + ret);
            ret = "btn2 hooked";
            console.log("getTextBtn2 hooked ret value is " + ret);
            return ret;
        };
    });
}

setImmediate(test2);
