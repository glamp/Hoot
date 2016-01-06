#!/bin/bash

# codesign for OSX
if [ -d build/darwin/x64/Hoot-darwin-x64/Hoot.app ]; then
  codesign --deep --force --verbose --sign "Yhat, Inc." build/darwin/x64/Hoot-darwin-x64/Hoot.app
  codesign --verify -vvvv build/darwin/x64/Hoot-darwin-x64/Hoot.app
  spctl -a -vvvv build/darwin/x64/Hoot-darwin-x64/Hoot.app/
fi
