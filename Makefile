PHONNY: build push cleanup

all: build push cleanup

REGISTRY=registry.digitalocean.com/brainflowingcompany

build:
	docker buildx build -t ${REGISTRY}/se/suechaokhai-frontend --platform linux/amd64 .

push:
	docker push ${REGISTRY}/se/suechaokhai-frontend

cleanup:
	docker image rm ${REGISTRY}/se/suechaokhai-frontend