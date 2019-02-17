.PHONY: run
run:
	@go build -o run && ./run

build:
	@cd ui; webpack