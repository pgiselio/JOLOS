FROM ubuntu:latest
LABEL authors="pgise"

ENTRYPOINT ["top", "-b"]