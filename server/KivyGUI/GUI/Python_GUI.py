from pickle import FALSE
import time
import json
import kivy
from kivy.core.window import Window
from kivy.lang import Builder
from kivymd.app import MDApp
from kivy.utils import get_color_from_hex
import socketio
import subprocess
import re


class Liste:
    def __init__(self, userWithSocket=[], userIdList=[], componentList=[]):
        self.userWithSocket = userWithSocket
        self.userIdList = userIdList
        self.componentList = componentList


class MainApp(MDApp):
    global socketGUI
    socketGUI = socketio.Client()

    def build(self):
        Window.clearcolor = (0, 0, 0, 0.6)
        Window.size = (1824, 984)
        Window.set_title("XRTL")
        self.theme_cls.theme_style = "Dark"
        self.theme_cls.primary_palette = "Green"
        self.theme_cls.accent_palette = "Gray"
        return Builder.load_file('Python_GUI.kv')

    # Changes the color of the wifi icons, when the switch has been clicked

    def switchPress(self, switchObject, switchValue, v):
        global r
        global log, liste
        liste = Liste()
        log = []

        command = ['node', '../../server_local.js']
        print(self.root.ids.switch_Server_Client.active)
        if switchValue == True:
            self.root.ids.wifi1.color = (1, 1, 0, 1)
            self.root.ids.wifi2.color = (1, 1, 0, 1)

            self.root.ids.user_log.text = ""
            self.root.ids.socket_log.text = ""
            self.root.ids.component_log.text = ""

            self.root.ids.user_log.color = (1, 1, 1, 1)
            self.root.ids.socket_log.color = (1, 1, 1, 1)
            self.root.ids.component_log.color = (1, 1, 1, 1)

            if v == "server":
                self.root.ids.switch.opacity = 1
                self.root.ids.switch_label.opacity = 1
                r = subprocess.Popen(
                    command, creationflags=subprocess.CREATE_NEW_CONSOLE, shell=False)
            elif v == "client":
                self.root.ids.switch.opacity = 0
                self.root.ids.switch_label.opacity = 0
                v = ""

            def displayUser():
                userStr = ''
                for i in range(len(liste.userIdList)):

                    userStr += liste.userIdList[i] + "         "
                    if i % 2:
                        userStr += "\n"

                self.root.ids.user_log.text = str(userStr)

            def displayComponents():
                componentStr = ''
                for i in range(len(liste.componentList)):
                    if i % 2 != 0:
                        componentStr += str(
                            liste.componentList[i]) + "         "
                    elif i % 3 != 0:
                        componentStr += str(
                            liste.componentList[i]) + "         "
                    elif i % 4 != 0:
                        componentStr += str(liste.componentList[i]) + "\n"

                self.root.ids.component_log.text = str(componentStr)

            try:
                socketGUI.connect('http://localhost:7000')
                socketGUI.emit("GUI", ())
            except:
                self.root.ids.user_log.text = 'Server is offline'
                self.root.ids.socket_log.text = 'Server is offline'
                self.root.ids.component_log.text = 'Server is offline'

            try: 
                @socketGUI.on('updateUser')
                def updateUser(newUserList):
                    if not newUserList and not liste.userWithSocket:
                        liste.userWithSocket = []
                        liste.userIdList = []
                    elif newUserList and not liste.userWithSocket:
                        newUser = []
                        counter = 3
                        liste.userWithSocket = newUserList.copy()
                        for i in range(len(liste.userWithSocket)):
                            if counter == 1 or counter == 2:
                                newUser.append(liste.userWithSocket[i])
                                counter += 1
                            elif counter == 3:
                                counter = 1
                        liste.userIdList = newUser
                        displayUser()
                    elif liste.userWithSocket and not newUserList:
                        socketGUI.emit("GUI", ())
                        liste.userIdList = []
                        liste.userWithSocket = []
                        self.root.ids.component_log.text = str(
                            "Server had a disconnect!")
                        self.root.ids.user_log.text = str(
                            "Server had a disconnect!")
                        self.root.ids.user_log.color = get_color_from_hex(
                            'cc0000')
                        self.root.ids.component_log.color = get_color_from_hex(
                            'cc0000')
                        socketGUI.emit("updateUserList", liste.userWithSocket)
                    elif len(newUserList) == len(liste.userWithSocket):
                        newList = []
                        newUser = []
                        counter = 3
                        for i in range(len(newUserList)):
                            if re.search(str(newUserList[i]), str(liste.userWithSocket)) != None:
                                newList.append(newUserList[i])
                                if counter == 1 or counter == 2:
                                    newUser.append(liste.userWithSocket[i])
                                    counter += 1
                                elif counter == 3:
                                    counter = 1

                        liste.userWithSocket = newList
                        liste.userIdList = newUser
                        displayUser()

                    elif len(newUserList) > len(liste.userWithSocket):
                        newList = []
                        newUser = []
                        counter = 3
                        for i in range(len(newUserList)):
                            if re.search(str(newUserList[i]), str(liste.userWithSocket)) != None or re.search(str(newUserList[i]), str(liste.userWithSocket)) == None:
                                newList.append(newUserList[i])
                                if counter == 1 or counter == 2:
                                    newUser.append(liste.userWithSocket[i])
                                    counter += 1
                                elif counter == 3:
                                    counter = 1
                        liste.userWithSocket = newList
                        liste.userIdList = newUser
                        displayUser()

                    elif len(newUserList) < len(liste.userWithSocket):
                        newList = []
                        newUser = []
                        for i in range(len(liste.userWithSocket)):
                            if re.search(str(liste.userWithSocket[i]), str(newUserList)) != None or re.search(str(liste.userWithSocket[i]), str(newUserList)) == None:
                                newList.append(newUserList[i])
                                if i % 2 != 0:
                                    newUser.append(newUserList[i])
                        liste.userWithSocket = newList
                        liste.userIdList = newUser
                        displayUser()
                        socketGUI.emit("updateUserList", liste.userWithSocket)

                    else:
                        socketGUI.emit('error', {
                                       'number': 3, 'message': "Something went wrong during the update of the User log"})

                @socketGUI.event
                def newUser(userIds):
                    try:
                        liste.userWithSocket.append(userIds[0])
                        liste.userWithSocket.append(userIds[1])
                        liste.userWithSocket.append(userIds[2])
                        liste.userIdList.append(userIds[1])
                        liste.userIdList.append(userIds[2])
                        displayUser()
                    except ValueError:
                        socketGUI.emit('error', {
                                       'number': 3, 'message': "ValueError occured during adding a new user to the list"})

                @socketGUI.event
                def userLeft(socketId):
                    try:
                        indexOfSocket = liste.userWithSocket.index(socketId)
                        timeToDelete = liste.userWithSocket[indexOfSocket+1]
                        userToDelete = liste.userWithSocket[indexOfSocket+2]
                        liste.userWithSocket.remove(
                            liste.userWithSocket[indexOfSocket])
                        liste.userWithSocket.remove(timeToDelete)
                        liste.userWithSocket.remove(userToDelete)
                        liste.userIdList.remove(timeToDelete)
                        liste.userIdList.remove(userToDelete)
                        displayUser()

                    except ValueError:
                        socketGUI.emit('error', {
                                       'number': 3, 'message': "ValueError occured during the disconnect of a user"})

                @socketGUI.on('newLog')
                def newLog(logMess):
                    logMessage = logMess.replace("\"", " ")
                    log.append(time.strftime(
                        '%H:%M:%S', time.localtime())+": "+logMessage)
                    messStr = ''
                    for i in range(len(log)):
                        messStr += str(log[i]) + "\n"
                        i += 2
                    self.root.ids.socket_log.text = str(messStr)

                @socketGUI.on('newComponent')
                def newComponent(newComponentList):
                    liste.componentList = newComponentList
                    displayComponents()

                @socketGUI.on('updateComponents')
                def updateComponents(newComponentList):
                    liste.componentList = newComponentList
                    displayComponents()

            except:
                self.root.ids.user_log.text = 'Server is not offline'
                self.root.ids.socket_log.text = 'Server is not offline'
                self.root.ids.component_log.text = 'Server is not offline'

        else:
            try:
                socketGUI.disconnect()
            except:
                print("No connection established!")
            self.root.ids.wifi1.color = (1, 1, 1, 0.6)
            self.root.ids.wifi2.color = (1, 1, 1, 0.6)

            self.root.ids.user_log.text = 'Connection to the server necessary'
            self.root.ids.socket_log.text = 'Connection to the server necessary'
            self.root.ids.component_log.text = 'Connection to the server necessary'

            self.root.ids.user_log.color = get_color_from_hex('cc0000')
            self.root.ids.socket_log.color = get_color_from_hex('cc0000')
            self.root.ids.component_log.color = get_color_from_hex('cc0000')

            if v == "server":
                r.terminate()
            elif v == "client":
                self.root.ids.switch.opacity = 1
                self.root.ids.switch_label.opacity = 1

    def button_press(self, button, button_id):
        try:
            socketGUI.emit("command", {
                'userId': "PythonGUI",
                'componentId': "*",
                'command': button_id
            })
            socketGUI.emit(
                "newLogGUI", "Command received: { userId: PythonGUI, componentId: *, command: "+button_id+"}")
            button.disabled = True
        except:
            print("No connection established!")

    def update_press(self, button, button_id):
        try:
            command2 = ['bash', 'update_Script.sh']
            r = subprocess.Popen(
                command2, creationflags=subprocess.CREATE_NEW_CONSOLE, shell=False)
        except:
            print("Update was not carried out!")

    def update_User(self):
        try:
            socketGUI.emit('updateUser', ())
        except:
            print("No connection established!")

    def update_Components(self):
        try:
            socketGUI.emit('updateComponents', ())
        except:
            print("No connection established!")

    def server_command(self, input, input_id):
        command = self.root.ids.command_input.text
        self.root.ids.command_input.text = ""
        disallowed_characters = "{}'\""

        # to get command for which the socket is listening
        a = re.split(r', ', command, maxsplit=1)
        command = a[0]

        if len(a) == 1:
            pass
        else:
            # Formating the payload into a dictionary
            dic = {}
            command_string = a[1]
            for character in disallowed_characters:
                command_string = command_string.replace(character, "")

            command_string = command_string.replace(" ", "")
            command_list = re.split(r"\:|,", command_string)
            leng = len(command_list)

            # Creating the dictionary based on their length
            if leng == 6:
                dic = {command_list[0]: command_list[1], command_list[2]                       : command_list[3], command_list[4]: command_list[5]}
            elif leng == 7:
                dic = {command_list[0]: command_list[1], command_list[2]: command_list[3], command_list[4]: {
                    command_list[5]: int(command_list[6])}}
            elif leng == 9:
                digit = command_list[8].isdigit()
                boolean_value = command_list[8]
                if digit == True:
                    command_list[8] = int(command_list[8])
                elif boolean_value == 'true':
                    command_list[8] = True
                elif boolean_value == 'false':
                    command_list[8] = False

                dic = {command_list[0]: command_list[1], command_list[2]: command_list[3], command_list[4]: {
                    command_list[5]: command_list[6], command_list[7]: command_list[8]}}

            try:
                socketGUI.emit(command, dic)
                socketGUI.emit(
                    "newLogGUI", "Command received: " + json.dumps(dic))
            except:
                print("No connection established!")

        # message, { userName: beetlebum, message: Hello World!}
        # message, { userId: beetlebum, message: Hello World!, color: #bf9000}
        #command, {userId: user1234,  componentId: ESP32Cam_1,   command: startStreaming}
        #command, {"userId" : "user1234", "componentId": "KM100_1", "command" : "stop"}
        # command, {"userId" : "user1234",  "componentId" : "KM100_1",   "command" : "reset" "}
        #command, {  "userId" : "user1234",   "componentId" : "iris",   "command" : { "position" : 50 }}
        #command, { "userId" : "user1234","componentId": "km100_1","command" : { "controlId": "top", "val" : 100} }
        #command, {  "userID" : "user1234", "componentId" : "laser_1", "command" : {"controlId" : "greenLaser","val" : true} }
        #command, { "userId" : "user1234", "componentId" : "ESP32Cam_1","command" : {"controlId" : "frame size", "val" : "XGA"}}
        #command, { "userId" : "user1234","componentId": "km100_1","command" : { "controlId": "top", "val" : 100} }
MainApp().run()

# 1824x984 Auflösung des Raspberry Pis
