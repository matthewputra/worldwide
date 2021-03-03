# Create docker image for gateway
cd gateway
GOOS=linux go build
docker build --no-cache -t matthewputra/capstone-gateway .
go clean
docker push matthewputra/capstone-gateway