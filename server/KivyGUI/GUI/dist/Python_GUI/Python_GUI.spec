# -*- mode: python ; coding: utf-8 -*-

import sys
import os

from kivy_deps import sdl2, glew

block_cipher = None

a = Analysis(
    ['Python_GUI.py'],
    pathex=['C:\\Users\\henkel\\AppData\\Local\\GitHubDesktop\\app-2.9.4\\XRTL_SPA\\server\\KivyGUI\GUI'],
    binaries=[],
    datas=[],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

a.datas += [('Code\Python_GUI.kv', 'C:\\Users\\henkel\\AppData\\Local\\GitHubDesktop\\app-2.9.4\\XRTL_SPA\\server\\KivyGUI\\GUI\Python_GUI.kv','DATA')]

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='Python_GUI',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe, Tree('C:\\Users\\henkel\\AppData\\Local\\GitHubDesktop\\app-2.9.4\\XRTL_SPA\\server\\KivyGUI\\GUI\\'),
    a.binaries,
    a.zipfiles,
    a.datas,
    *[Tree(p) for p in (sdl2.dep_bins + glew.dep_bins)],
    strip=False,
    upx=True,
    upx_exclude=[],
    name='Python_GUI',
)
