# Sample contents of Dockerfile
 # Stage 1
 FROM microsoft/dotnet:2.0.0-sdk AS builder
 WORKDIR /source

ENV ASPNETCORE_ENVIRONMENT="production"

 # caches restore result by copying csproj file separately
 COPY . .
 RUN dotnet restore

 # copies the rest of your code
#  COPY . .
 RUN dotnet publish --output /app/ --configuration Release

 # Stage 2
 FROM microsoft/dotnet:2.0.0-runtime
 WORKDIR /app
 RUN mkdir -p /app/data

 ENV ASPNETCORE_ENVIRONMENT="production"
 EXPOSE 8884
 COPY --from=builder /app .
 ENTRYPOINT ["dotnet", "Cellar.Hub.Cdn.dll"]
