#Ubuntu
echo "Begin:create project db"
echo "Installing requirements"
pip install django psycopg2
echo "Deleting current db"
psql postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'myzakadb'
  AND pid <> pg_backend_pid();"
psql postgres -c "DROP DATABASE myzakadb;"
echo "Creating db user"
psql postgres -c "CREATE USER myzaka WITH PASSWORD 'myz@k@';"
echo "Creating db"
psql postgres -c "CREATE DATABASE myzakadb OWNER myzaka;"
echo "Setting permissios"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE myzakadb to myzaka;"
echo "End: success."
