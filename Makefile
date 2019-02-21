.PHONY: run
run:
	@go build -o run && ./run

build:
	@cd ui; webpack

install:
	@cd ui; npm install
	
clean:
	@rm -rf .gotron-builder
	@rm -rf .gotron
	@rm -rf dist