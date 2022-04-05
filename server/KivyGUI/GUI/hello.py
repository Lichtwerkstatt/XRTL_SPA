from cgitb import text
import kivy;
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.core.window import Window
from kivy.graphics import Rectangle, Color
from kivy.lang import Builder
from kivymd.app import MDApp
from kivymd.uix.list import OneLineIconListItem
from kivymd.icon_definitions import md_icons

class MainApp(MDApp):
     def build(self):
        #Window.clearcolor = (0, 0, 0, 0.6)
        #Window.size = (1080, 720)
        self.theme_cls.theme_style ="Dark"
       
        return Builder.load_file('server.kv')
 
#1824x984 Auflösung des Raspberry Pis



# class ServerApp(MDApp):
#     def build(self):
#         Window.clearcolor = (0, 0, 0, 0.6)
#         Window.size = (1080, 720)
#         return Grid()

MainApp().run()
