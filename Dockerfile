FROM lsiobase/mono:LTS

# set version label
ARG BUILD_DATE
ARG VERSION
ARG GAMEARR_RELEASE
LABEL build_version="Linuxserver.io version:- ${VERSION} Build-date:- ${BUILD_DATE}"
LABEL maintainer="Aquilla"
# environment settings
ARG DEBIAN_FRONTEND="noninteractive"
ARG GAMEARR_BRANCH="Development"
ENV XDG_CONFIG_HOME="/config/xdg"
RUN \
 echo "**** install packages ****" && \
 apt-get update && \
 apt-get install --no-install-recommends -y \
	libchromaprint-tools \
	jq && \
 echo "**** install gamearr ****" && \
 mkdir -p /app/gamearr/bin && \
 curl https://github.com/Gamearr/Gamearr/releases/download/0.0.1/Gamearr.develop.0.0.1.linux.tar.gz \
 tar -xvzf Gamearr.*.linux.tar.gz \
	/app/Gamearr/bin --strip-components=1 && \
 /tmp/Gamearr.tar.gz -L \
 echo "**** cleanup ****" && \
 rm -rf \
	/tmp/* \
	/var/lib/apt/lists/* \
	/var/tmp/*
# copy local files
COPY root/ /
# ports and volumes
EXPOSE 8383
VOLUME /config