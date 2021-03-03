# Generate network for whole server container
docker network create serverNetwork

export TLSCERT=/etc/letsencrypt/live/api.ilearncapstone.com/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.ilearncapstone.com/privkey.pem

# Generate docker container from gateway image
docker rm -f gatewayContainer
docker pull matthewputra/capstone-gateway

docker run \
  -d \
  --network serverNetwork \
  -e TLSCERT=$TLSCERT \
  -e TLSKEY=$TLSKEY \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  --restart unless-stopped \
  --name gatewayContainer \
  matthewputra/capstone-gateway
