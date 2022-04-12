from asyncio import constants
from cgitb import text
from ctypes.wintypes import RGB
from re import T, sub
import kivy;
from kivy.app import App
from kivy.core.window import Window
from kivy.lang import Builder
from kivymd.app import MDApp

import socketio
import subprocess



class MainApp(MDApp):
        global socketGUI
        socketGUI = socketio.Client()
        def build(self):
                Window.clearcolor = (0, 0, 0, 0.6)
                Window.size = (1824, 984)
                self.theme_cls.theme_style ="Dark"             #dark is better but the Button is then invisible
                self.theme_cls.primary_palette = "Green"
                self.theme_cls.accent_palette = "Gray"
                return Builder.load_file('server.kv')
        
        #Changes the color of the wifi icons, when the switch has been clicked
        def switchPress(self, switchObject, switchValue):
                command = ['bash', 'start_server.sh']#node ../../server_local.js']

               # r = subprocess.Popen('echo')
                if switchValue == True:
                        self.root.ids.wifi1.color= (1,1,0,1)
                        self.root.ids.wifi2.color= (1,1,0,1)
                        global r 
                        r =subprocess.Popen(command, shell=True)
                else:
                        self.root.ids.wifi1.color= (1,1,1,0.6)
                        self.root.ids.wifi2.color= (1,1,1,0.6)
                        r.terminate()

                # out, err = r.communicate();
               
                # print(out.decode())
                # print(err.decode())
                #out, err = r.communicate()
               # output = r.stdout.read()

                #r.stdout.close()

                #socketGUI.connect('http://localhost:7000')

                #print(r)
        def button_press(self, button, button_id):
                button.md_bg_color= (1,0,0)

                # socketGUI.emit("command", {
                #         'userId': "PythonGUI",
                #         'componentId': "*",
                #         'command': "init"
                # })
        
                button.disabled = True


                

MainApp().run()
#1824x984 Auflösung des Raspberry Pis