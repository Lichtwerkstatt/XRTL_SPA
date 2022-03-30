from cgitb import text
import kivy;
from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.gridlayout import GridLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.switch import Switch


class Grid(GridLayout):
    def __init__(self, **kwargs):

        super(Grid, self).__init__(**kwargs)
        self.cols = 2
        self.row_force_default=True
        self.row_default_height=120
        self.col_force_default=True
        self.col_default_height=100


        #Switch for Server start and shutdown
        self.add_widget(Label(text="Serverstatus", font_size=22))
        self.settings_sample = Switch(active=False)

        self.add_widget(self.settings_sample)
        self.settings_sample.bind(active=switch_callback)      

        self.add_widget(Button(text="Init"))
        self.add_widget(Button(text="Reset"))

 
#1824x984 Auflösung des Raspberry Pis

def switch_callback(switchObject, switchValue):

    print('Value of sample settings is:', switchValue) 

class App(App):
    def build(self):
        return Grid()

if __name__ == '__main__':
    App().run()
