# Create docker image for gateway
cd gateway
GOOS=linux go build
docker build --no-cache -t matthewputra/capstone-gateway .
go clean
docker push matthewputra/capstone-gateway

# Create docker image for mysql
cd ../db
docker build -t matthewputra/capstone-mysql .
docker push matthewputra/capstone-mysql