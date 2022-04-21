from asyncio import constants, create_subprocess_shell
from cgitb import text
from ctypes.wintypes import RGB
from re import T, sub
from turtle import pensize
from xmlrpc.client import boolean
import kivy;
from kivy.app import App
from kivy.core.window import Window
from kivy.lang import Builder
from kivymd.app import MDApp
import socketio
import subprocess
import os
import re
from kivy.config import Config
Config.set('kivy', 'exit_on_escape', '0')


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

                        self.root.ids.user_log.text= ""
                        self.root.ids.socket_log.text= ""
                        self.root.ids.component_log.text= ""

                        self.root.ids.user_log.color= (1,1,1,1)
                        self.root.ids.socket_log.color= (1,1,1,1)
                        self.root.ids.component_log.color= (1,1,1,1)

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
                disallowed_characters = "{}'\""
                
                #to get command for which the socket is listening
                a = re.split(r', ', command, maxsplit=1)
                command = a[0]

                if len(a) == 1:
                        pass
                else:
                        #Formating the payload into a dictionary
                        dic = {}
                        command_string = a[1]
                        for character in disallowed_characters:
                                command_string = command_string.replace(character, "")

                        command_string = command_string.replace(" ", "")
                        command_list = re.split(r"\:|,", command_string)
                        leng = len(command_list)

                        #Creating the dictionary based on their length
                        if leng == 6:
                                dic = {command_list[0]:command_list[1], command_list[2]:command_list[3], command_list[4]:command_list[5]}
                        elif leng == 7:
                                dic = {command_list[0]:command_list[1], command_list[2]:command_list[3], command_list[4]: {command_list[5]: int(command_list[6])}}
                        elif leng == 9:
                                digit = command_list[8].isdigit()
                                boolean_value = command_list[8]
                                if digit == True:
                                        command_list[8] = int(command_list[8])
                                elif boolean_value == 'true':
                                        command_list[8] = True
                                elif boolean_value== 'false':
                                        command_list[8] = False

                                dic = {command_list[0]:command_list[1], command_list[2]:command_list[3], command_list[4]: {command_list[5]:command_list[6], command_list[7]:command_list[8]}}

                        socketGUI.emit(command, dic)

                #message, { userName: beetlebum, message: Hello World!}
                #message, { userId: beetlebum, message: Hello World!, color: #bf9000}
                #command, {userId: user1234,  componentId: ESP32Cam_1,   command: startStreaming}
                #command, {"userId" : "user1234", "componentId": "KM100_1", "command" : "stop"}
                #command, {"userId" : "user1234",  "componentId" : "KM100_1",   "command" : "reset" "}
                #command, {  "userId" : "user1234",   "componentId" : "iris",   "command" : { "position" : 50 }}
                #command, { "userId" : "user1234","componentId": "km100_1","command" : { "controlId": "top", "val" : 100} }
                #command, {  "userID" : "user1234", "componentId" : "laser_1", "command" : {"controlId" : "greenLaser","val" : true} }
                #command, { "userId" : "user1234", "componentId" : "ESP32Cam_1","command" : {"controlId" : "frame size", "val" : "XGA"}}
                #command, { "userId" : "user1234","componentId": "km100_1","command" : { "controlId": "top", "val" : 100} }

MainApp().run()
#1824x984 Auflösung des Raspberry Pis