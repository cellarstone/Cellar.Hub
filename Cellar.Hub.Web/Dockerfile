# Sample contents of Dockerfile
 # Stage 1
FROM microsoft/dotnet:2.0.0-sdk AS builder
RUN apt-get update && apt-get -y upgrade 
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs



ENV ASPNETCORE_ENVIRONMENT="production"

 WORKDIR /source

 # caches restore result by copying csproj file separately
 COPY . .
 

 # copies the rest of your code
#  COPY . .


# RUN set -e

RUN npm install -g @angular/cli

# CMD cd Cellar.Hub.Web
RUN npm install
CMD ng build --prod


RUN dotnet restore
# RUN 'cd ..'
RUN dotnet publish --output /app/ --configuration Release

 # Stage 2
 FROM microsoft/dotnet:2.0.0-runtime
 WORKDIR /app
 ENV ASPNETCORE_ENVIRONMENT="production"
 EXPOSE 8881
 COPY --from=builder /app .
 ENTRYPOINT ["dotnet", "Cellar.Hub.Web.dll"]
