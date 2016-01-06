#!/bin/bash


# osx
if [ -d build/darwin/x64/Hoot-darwin-x64/Hoot.app ]; then
  electron-builder build/darwin/x64/Hoot-darwin-x64/Hoot.app --platform=osx \
          --out=./build/darwin/x64/Hoot-darwin-x64/ --config=packager.json

  ditto -ck --rsrc --sequesterRsrc --keepParent build/darwin/x64/Hoot-darwin-x64/Hoot.app \
    build/darwin/x64/Hoot-darwin-x64/Hoot.zip
fi
