from cgitb import text
import kivy;
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.core.window import Window

class Grid(Widget):
    pass
 
#1824x984 Auflösung des Raspberry Pis

def switch_callback(switchObject, switchValue):

    print('Value of sample settings is:', switchValue) 

class ServerApp(App):
    def build(self):
        Window.clearcolor = (0, 0, 0, 0.6)
        Window.size = (1080, 720)
        return Grid()

if __name__ == '__main__':
    ServerApp().run()
