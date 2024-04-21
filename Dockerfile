FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy the solution file
COPY ["cos720.sln", "."]

# Copy project files and restore as distinct layers
COPY ["cos720/cos720.csproj", "cos720/"]
COPY ["Context/Context.csproj", "Context/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Repository/Repository.csproj", "Repository/"]
COPY ["Service/Service.csproj", "Service/"]

# Restore dependencies
RUN dotnet restore "cos720.sln"

# Copy the entire solution directory
COPY . .

# Build the project
WORKDIR "/src/cos720"
RUN dotnet build "cos720.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "cos720.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "cos720.dll"]
