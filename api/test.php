<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $test = [
        "message" => "You posted something!",
        "data" => $_POST,
        "monkeys" => [
            "shrimp" => "tacos"
        ]
    ];
} else {
    $test = [ ["title" => "This is a test"], ["title" => "Test Two!!"]];
}
echo json_encode($test);