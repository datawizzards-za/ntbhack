#Ubuntu
psql postgres -c "CREATE USER myzaka WITH PASSWORD 'myz@k@';"
psql postgres -c "CREATE DATABASE myzakadb OWNER myzaka;"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE myzakadb to myzaka;"