<?php
$targetUrl = "https://cloud01.extcare.stagrp.com/vcr-cloud/external/actions/telesitterAlert";
$bearerToken = "eyJjdHkiOiJKV1QiLCJ2ZXJzaW9uSWQiOiJkOWE0ZDdiZi1kMDE0LTRhNmQtYjU4ZC1lZTE5MWZmMGRjMjEiLCJ0eXBlIjoiZXh0ZXJuYWwiLCJhbGciOiJkaXIiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0In0..1CG-dDk0g3Tl-IyZMi8JoA.NWOWsCJvA-K_bG-AC6zYHoq5RpMbZERN4iUyfy8mKVZmjrRyC4sK776-UXF4rEPKhSY2GR0bDiVK7Rlqeoxl12IlpCYR1_KlJ8TjGln_3tcoYghL-Ck2gBsl31ZXmGEIjajiX11TDsQT9Yr7YSRyqOsJrvIi1BR9vjrwVkIcO60hgor4F1GDeoW7etJcEGY3074z7Z3ruHAmyuc9ljpvo1peKtvNbigeJzr7_uIyVe_9vMvk8ko_DDwvThFYI_BsKSId7g0tWd_63e5meKnc-wqdO0YTMqlntoN248cEED65AJHhfT7t6jTwH2r_5sEeUKw6FSi3j7YZh3-e2V9FT3iS8RRY30NydPMtExlFGwokiI-16gwO8IVg-OHLojjOzBaPitOsho5tqQ3K_bW-TVCaaKEhAJBz3A5EjIcp6B39UptYDiLUY_0Ffyf1OgkFSwIBz6ZJ3YlkUnAQfxbu7Lm4ZpndwfbvaC1Rs58-x6L51hf_myIpqhCB9ts7XE.x-YJYdDb_KiM7kzXTCJNc3D-geEWdob6";

$input = file_get_contents('php://input');
if (empty($input)) {
    http_response_code(400);
    echo json_encode(["error" => "No data received from camera"]);
    exit;
}

$ch = curl_init($targetUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Accept: application/json",
    "Authorization: Bearer " . $bearerToken,
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
?>