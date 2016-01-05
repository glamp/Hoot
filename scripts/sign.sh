#!/bin/bash

# codesign for OSX
if [ -d build/darwin/x64/sms-papa-darwin-x64/sms-papa.app ]; then
  codesign --deep --force --verbose --sign "Yhat, Inc." build/darwin/x64/sms-papa-darwin-x64/sms-papa.app
  codesign --verify -vvvv build/darwin/x64/sms-papa-darwin-x64/sms-papa.app
  spctl -a -vvvv build/darwin/x64/sms-papa-darwin-x64/sms-papa.app/
fi
