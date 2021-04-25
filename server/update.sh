# Generate network for whole server container
docker network create serverNetwork

export TLSCERT=/etc/letsencrypt/live/api.ilearncapstone.com/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.ilearncapstone.com/privkey.pem
export MYSQL_DATABASE="capstoneMySqlDB"
export MYSQL_ROOT_PASSWORD="serversidedb"
export DSN="root:$MYSQL_ROOT_PASSWORD@tcp(mysqlContainer:3306)/$MYSQL_DATABASE"
export QUESTIONSADDR="questionContainer:5200"

# Generate docker container from gateway image
docker rm -f gatewayContainer
docker pull matthewputra/capstone-gateway

docker run \
  -d \
  --network serverNetwork \
  -e TLSCERT=$TLSCERT \
  -e TLSKEY=$TLSKEY \
  -e DSN=$DSN \
  -e QUESTIONSADDR=$QUESTIONSADDR \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  --restart unless-stopped \
  --name gatewayContainer \
  matthewputra/capstone-gateway

# Generate docker container from mysql image
docker rm -f mysqlContainer
docker pull matthewputra/capstone-mysql

docker run \
  -d \
  --network serverNetwork \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  --name mysqlContainer \
  -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
  -e MYSQL_DATABASE=$MYSQL_DATABASE \
  --restart unless-stopped \
  matthewputra/capstone-mysql

# Generate docker container from question image
docker rm -f questionContainer
docker pull matthewputra/capstone-question

docker run \
  --network serverNetwork \
  --restart unless-stopped \
  -e QUESTIONSADDR=$QUESTIONSADDR \
  --name questionContainer \
  matthewputra/capstone-question

# Generate docker container for mongo
docker rm -f mongoContainer
docker run \
  -d \
  --network serverNetwork \
  --name mongoContainer \
  mongo

exit
