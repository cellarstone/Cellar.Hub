
FROM microsoft/aspnetcore:1
LABEL Name=cellar.hub Version=0.0.1 
ARG source=.
WORKDIR /app
EXPOSE 3000
COPY $source .
ENTRYPOINT dotnet cellar.hub.dll
