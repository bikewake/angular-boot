#!/bin/sh

docker image build -t chat-bikewake:development .
docker tag stream-chat:development bikewake/stream-chat:0.0.1
docker push bikewake/stream-chat:0.0.1

