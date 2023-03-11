.PHONY: all build clean count test

all: build

zip:
	mkdir -p build
	zip -r -FS build/tabcloser.zip * --exclude build --exclude .git --exclude tabcloser.zip --exclude Makefile

clean:
	rm -r build

count:
	cloc .

test:
	@echo TODO
