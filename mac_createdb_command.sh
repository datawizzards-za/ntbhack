#Ubuntu
echo "Begin:create project db"
echo "Installing requirements"
pip install django psycopg2
echo "Creating db user"
psql postgres -c "CREATE USER myzaka WITH PASSWORD 'myz@k@';"
echo "Creating db"
psql postgres -c "CREATE DATABASE myzakadb OWNER myzaka;"
echo "Setting permissios"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE myzakadb to myzaka;"
echo "End: success."
