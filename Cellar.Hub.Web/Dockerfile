# Sample contents of Dockerfile
 # Stage 1
FROM microsoft/dotnet:2.0.0-sdk AS builder
ENV ASPNETCORE_ENVIRONMENT="production"
WORKDIR /source

 # caches restore result by copying csproj file separately
COPY . .

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
