#!/bin/bash


# osx
if [ -d build/darwin/x64/sms-papa-darwin-x64/sms-papa.app ]; then
  electron-builder build/darwin/x64/sms-papa-darwin-x64/sms-papa.app --platform=osx \
          --out=./build/darwin/x64/sms-papa-darwin-x64/ --config=packager.json

  ditto -ck --rsrc --sequesterRsrc --keepParent build/darwin/x64/sms-papa-darwin-x64/sms-papa.app \
    build/darwin/x64/sms-papa-darwin-x64/sms-papa.zip
fi
