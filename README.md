## frida\_trump

个人自用的frida hook工程

收集了常用的frida 脚本，通过python方式调用frida的js脚本(支持单个/多个)。

| 目录bat              | 个人win可执行程序     |
| :----------------- | :------------- |
| adb-restart.bat    | 重启adb          |
| frida\_start夜神.bat | 启动frida server |

| 目录js                      | 常见的frida脚本                                           |
| :------------------------ | :--------------------------------------------------- |
| r0capture                 | hook网络相关.参考自git项目r0capture                           |
| jnitrace                  | hook网络相关.参考自git项目jnitrace,需要指定so和native函数            |
| javaFile                  | hook java的File类的所有函数                                 |
| javaEnc                   | hook java的算法加解密相关的所有函数                               |
| javaString                | hook java的String的所有函数                                |
| RegisterNative            | hook动态注册函数，参考自frida\_hook\_libart                    |
| ArtMethod                 | hook ArtMethod函数调用，参考自frida\_hook\_libart            |
| libArm                    | 参考自frida\_hook\_libart的hook\_art脚本                   |
| sslpining                 | hook证书锁定.参考自git项目DroidSSLUnpinning                   |
| dumpdex                   | 脱壳dex.参考自git项目frida\_dump                            |
| dumpdexclass              | 加载全部类后再脱壳dex.参考自git项目frida\_dump                     |
| cookieDump                | 通过DexFile的mCookie的属性解析进行脱壳                           |
| FRIDA-DEXDump             | 搜索内存中的dex特征dump.参考自git项目FRIDA-DEXDump                |
| fart                      | 主动调用式的脱壳参考自git项目fart                                 |
| hookEvent                 | hook所有控件的点击事件                                        |
| anti\_debug               | 简单的一键反调试.参考项目来自于FridaContainer                       |
| FCAnd\_jnitrace           | 简化的jnitrace,不需要指定module和函数了.参考项目来自于FridaContainer    |
| flutter-bypass-sslpinning | Flutter的sslpinning，来自git项目flutter-ssl-pinning-bypass |
| bypass_sim_checking | 跳过安卓对sim的检测，来自git项目R0b0t4ng3nt/frida-scripts |
| bangbang_anti_frida_root | 梆梆加固的反调试，来自git项目thinkerMid/bangbang_anti_frida_root |

| 目录multi\_js | python同时hook文件夹下的所有js脚本      |
| :---------- | :--------------------------- |
| main.py     | 执行入口(python main.py),并根据指引操作 |

| 目录single\_js | python执行文件夹下指定js             |
| :----------- | :--------------------------- |
| main.py      | 执行入口(python main.py),并根据指引操作 |
