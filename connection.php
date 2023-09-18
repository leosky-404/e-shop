<?php class Database {
    public static $connection;

    public static function setupConnection() {
        if (!isset(Database::$connection)) {
            $hostName = 'localhost';
            $username = 'leosky';
            $password = 'balls';
            $database = 'eshop';
            $port = '3306';

            Database::$connection = new mysqli($hostName, $username, $password, $database, $port);
        }
    }

    public static function iud($q) {
        Database::setupConnection();
        Database::$connection->query($q);
    }

    public static function search($q) {
        Database::setupConnection();
        $resultset = Database::$connection->query($q);
        return $resultset;
    }
} ?>
