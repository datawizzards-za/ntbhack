#Ubuntu
echo "Begin:create project db"
echo "Installing requirements"
pip install django psycopg2
echo "Creating db user"
sudo -i -u postgres psql -c "CREATE USER myzaka WITH PASSWORD 'myz@k@';"
echo "Creating db"
sudo -i -u postgres psql -c "CREATE DATABASE myzakadb OWNER myzaka;"
echo "Setting permissios"
sudo -i -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE myzakadb to myzaka;"
echo "End: success."
