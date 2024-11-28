import sys
import platform

if len (sys.argv) <1 :
 print("no commmand line were typed")
else:
    os_name = platform.system()
os_version = platform.version()
print("your running operating system: ", os_name)
print("your running version: ", os_version)