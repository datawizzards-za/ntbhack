#Ubuntu
echo "Begin:create project db"
echo "Installing requirements"
pip install django psycopg2
echo "Deleting current db"
sudo -i -u postgres psql -c "SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'myzakadb'
  AND pid <> pg_backend_pid();"
sudo -i -u postgres psql -c "DROP DATABASE myzakadb;"
echo "Creating db user"
sudo -i -u postgres psql -c "CREATE USER myzaka WITH PASSWORD 'myz@k@';"
echo "Creating db"
sudo -i -u postgres psql -c "CREATE DATABASE myzakadb OWNER myzaka;"
echo "Setting permissios"
sudo -i -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE myzakadb to myzaka;"
echo "End: success."
