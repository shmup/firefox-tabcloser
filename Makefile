.PHONY: all build clean count test

all: build

zip:
	rm tabcloser.zip
	mkdir -p build
	zip -r -FS build/tabcloser.zip * --exclude .git --exclude tabcloser.zip --exclude Makefile

clean:
	rm -r build

count:
	cloc .

test:
	@echo TODO
