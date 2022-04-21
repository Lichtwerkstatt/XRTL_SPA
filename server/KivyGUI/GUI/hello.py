from asyncio import constants, create_subprocess_shell
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
import os
import re

class MainApp(MDApp):
        #input = ObjectProperty(None)
        global socketGUI
        socketGUI = socketio.Client()

        def build(self):
                Window.clearcolor = (0, 0, 0, 0.6)
                Window.size = (1824, 984)
                self.theme_cls.theme_style ="Dark"             
                self.theme_cls.primary_palette = "Green"
                self.theme_cls.accent_palette = "Gray"
                return Builder.load_file('server.kv')
        
        #Changes the color of the wifi icons, when the switch has been clicked
        def switchPress(self, switchObject, switchValue):
                global r
                command = ['node', '../../server_local.js']
                print(switchValue)
                if switchValue == True:
                        self.root.ids.wifi1.color= (1,1,0,1)
                        self.root.ids.wifi2.color= (1,1,0,1)
                        r = subprocess.Popen(command, creationflags= subprocess.CREATE_NEW_CONSOLE, shell=False)
                        socketGUI.connect('http://localhost:7000')
                else:
                        socketGUI.disconnect()
                        self.root.ids.wifi1.color= (1,1,1,0.6)
                        self.root.ids.wifi2.color= (1,1,1,0.6)
                        r.terminate()

        def button_press(self, button, button_id):
                socketGUI.emit("command", {
                        'userId': "PythonGUI",
                        'componentId': "*",
                        'command': button_id
                })
        
                button.disabled = True
        
        def update_press(self, button, button_id):
                command2=['bash', 'update_Script.sh']
                r = subprocess.Popen(command2, creationflags= subprocess.CREATE_NEW_CONSOLE, shell=False)
             
        def server_command(self, input, input_id):
                command = self.root.ids.command_input.text
                self.root.ids.command_input.text=""
        #         c = re.split(r"\s+", command)
        #         command= command.split(",",)
        #        #l = len(command)
        #         print(command[1:len(command)])

                disallowed_characters = "{}'\""
                #to get command for which the socket is listening
                a = re.split(r', ', command, maxsplit=1)
                command = a[0]

                #The rest of the command
                rest = a[1]

                for character in disallowed_characters:
                        rest = rest.replace(character, "")

                rest =rest.replace(" ", "")
                print(rest)
                rest2 = re.split(r"\:|,", rest)
                print(rest2)
                leng = len(rest2)
                if leng == 4:
                        dic = {rest2[0]:rest2[1], rest2[2]:rest2[3]}
                elif leng==6:
                        dic = {rest2[0]:rest2[1], rest2[2]:rest2[3], rest2[4]:rest2[5]}





                socketGUI.emit(command, dic)

                #message, { userName: beetlebum, message: Hello World!}
                #message, { userId: beetlebum, message: Hello World!, color: #bf9000}
                #command, {userId: user1234,  componentId: ESP32Cam_1,   command: startStreaming}
                #command, {"userId" : "user1234", "componentId": "KM100_1", "command" : "stop"}
                #command, {"userId" : "user1234",  "componentId" : "KM100_1",   "command" : "reset" "}


MainApp().run()
#1824x984 Auflösung des Raspberry Pis