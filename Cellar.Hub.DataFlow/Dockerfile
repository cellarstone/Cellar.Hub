# Sample contents of Dockerfile
 # Stage 1
 FROM microsoft/dotnet:2.0.0-preview2-sdk AS builder
 WORKDIR /source

 # caches restore result by copying csproj file separately
 COPY *.csproj .
 RUN dotnet restore

 # copies the rest of your code
 COPY . .
 RUN dotnet publish --output /app/ --configuration Release

 # Stage 2
 FROM microsoft/dotnet:2.0.0-preview2-runtime
 WORKDIR /app
 EXPOSE 80
 COPY --from=builder /app .
 ENTRYPOINT ["dotnet", "Cellar.Hub.DataFlow.dll"]
