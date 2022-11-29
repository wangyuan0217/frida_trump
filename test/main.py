import time
import os
import frida
import sys


def pid_info_2_arr(info):
    arr = []
    infos = info.split(" ")
    for item in infos:
        if item:
            arr.append(item)
    return arr


def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


pkgs = os.popen('adb shell pm list packages -3').read().split("\n")
for i in pkgs:
    if not i:
        pkgs.remove(i)

path_dir = os.path.dirname(os.path.realpath(__file__))
dir_files = os.listdir(path_dir)
dir_files_new = []
for dir_file in dir_files:
    if dir_file.endswith('.js'):
        dir_files_new.append(dir_file)


print('---------------------------------------')
pkg_index = 0
for i in pkgs:
    print(pkg_index, i[8:])
    pkg_index += 1
print('---------------------------------------')
dir_index = 0
for i in dir_files_new:
    print(dir_index, i)
    dir_index += 1
print('---------------------------------------')

input_pkg = input("输入要注入包名下标:")
action_pkg = pkgs[int(input_pkg)][8:]
action_appname = ''
# print('选择的包名:'+action_pkg)


while (True):
    running_pid_info = os.popen('frida-ps -Uai').read().split("\n")
    for pid_info in running_pid_info:
        pid_info_arr = pid_info_2_arr(pid_info)
        # print(pid_info_arr)
        if len(pid_info_arr) > 2:
            this_pkg = pid_info_arr[2]
            if this_pkg and this_pkg == action_pkg:
                action_appname = pid_info_arr[1]
                break

    if action_appname and action_pkg:
        break
    else:
        print("没有检测要注入到设备的进程!!!")
        yy = input("1:继续检测 2:直接注入 3:退出:")
        if yy == '1':
            print("重新检测进程!")
        if yy == '2':
            break
        if yy == '3':
            print("退出!")
            exit()
        else:
            print("重新检测进程!")


# 选择注入js
input_frida_index = input("输入要注入脚本下标")
frida_js = dir_files_new[int(input_frida_index)]


# 注入方式
frida_type = 'attach'
input_frida_type = input("输入注入方式(1:attach  2:spawn):")
if input_frida_type == '2':
    frida_type = 'spawn'
else:
    frida_type = 'attach'


# 需要先启动frida server
# adb shell su - c 'pkill -9 frida-server'
# adb forward tcp: 27042 tcp: 27042
# adb forward tcp: 27043 tcp: 27043
# adb shell su - c '/data/local/tmp/frida-server-16.0.4-android-x86_64'

# 查找USB设备并附加到目标进程
rdev = frida.get_remote_device()
print('---------------------------------------')
print("当前设备:", rdev)
print(frida_type + "注入" + frida_js + ":" + action_appname + '(' + action_pkg + ')')
print('---------------------------------------')
if frida_type == 'spawn':
    pid = rdev.spawn(action_pkg)
    rdev.resume(pid)
    time.sleep(1)
    process = rdev.attach(pid)
else:
    process = rdev.attach(action_appname)
# 在目标进程里创建脚本
with open(frida_js, 'r', encoding="utf8") as f:
    script = process.create_script(f.read())
# 注册消息回调
script.on('message', on_message)
# 加载创建好的javascript脚本
script.load()
# 读取系统输入
sys.stdin.read()
