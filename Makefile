
.PHONEY: all

all: clean osx

clean:
	rm -rf build

osx: 
	./scripts/build.js
	./scripts/sign.sh
	./scripts/release.sh
