# Sample contents of Dockerfile
 # Stage 1
 FROM microsoft/aspnetcore-build:2.0.0-preview2 AS builder
 WORKDIR /source

 # caches restore result by copying csproj file separately
 COPY *.csproj .
 RUN dotnet restore

 # copies the rest of your code
 COPY . .
 RUN dotnet publish --output /app/ --configuration Release

 # Stage 2
 FROM microsoft/aspnetcore:2.0.0-preview2
 WORKDIR /app
 EXPOSE 80
 COPY --from=builder /app .
 ENTRYPOINT ["dotnet", "Cellar.Hub.Web.dll"]
