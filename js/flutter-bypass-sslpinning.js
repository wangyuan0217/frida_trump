//From https://github.com/horangi-cyops/flutter-ssl-pinning-bypass/blob/main/flutter-bypass-sslpinning.js

setTimeout(function () {
    // pattern bytes
    var pattern = "ff 03 05 d1 fd 7b 0f a9 bc de 05 94 08 0a 80 52 48";
    // library name
    var module = "libflutter.so";
    // define your arm version
    var armversion = 8;
    // expected return value
    var expectedReturnValue = true;

    // random string, you may ignore this
    console.log("Horangi - Bypass Flutter SSL Pinning");
    // enumerate all process
    Process.enumerateModules().forEach((v) => {
        // if the module matches with our library
        if (v["name"] == module) {
            // debugging purposes
            console.log("Base: ", v["base"], "| Size: ", v["size"], "\n");
            // scanning memory - synchronous version
            // compare it based on base, size and pattern
            Memory.scanSync(v["base"], v["size"], pattern).forEach((mem) => {
                // assign address to variable offset
                var offset = mem["address"];
                if (armversion === 7) {
                    // armv7 add 1
                    offset = offset.add(1);
                }
                // another debugging purposes
                console.log("Address:", offset, "::", mem["size"]);
                // hook to the address
                Interceptor.attach(offset, {
                    // when leaving the address,
                    onLeave: function (retval) {
                        // execute this debugging purpose (again)
                        console.log(
                            "ReturnValue",
                            offset,
                            "altered from",
                            +retval,
                            "to",
                            +expectedReturnValue
                        );
                        // replace the return value to expectedReturnValue
                        retval.replace(+expectedReturnValue);
                    },
                });
            });
        }
    });
}, 1000); // wait for 1 sec until the app load the library.

//From https://github.com/edcjian/frida-scripts/blob/main/hook_banana.js
function hook_ssl() {
    var base = Module.findBaseAddress("libflutter.so");
    var ssl_crypto_x509_session_verify_cert_chain = base
        .add(0x1f7e94)
        .add(0x01);
    console.log(
        "ssl_crypto_x509_session_verify_cert_chain: " +
            ssl_crypto_x509_session_verify_cert_chain
    );
    Interceptor.attach(ssl_crypto_x509_session_verify_cert_chain, {
        onEnter: function (args) {
            console.log("\n解除证书绑定校验");
        },
        onLeave: function (retval) {
            console.log("校验函数返回值: " + retval);
            retval.replace(0x1);
            console.log("解除成功\n---------------------");
        },
    });
}
setImmediate(hook_ssl);
