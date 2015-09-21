<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$urlPersona = 'http://test.greenggers.net/service/persona';
    $urlComida = 'http://test.greenggers.net/service/comida';
    
    $personaJSON = file_get_contents($urlPersona);
    $comidaJSON = file_get_contents($urlComida);
    
    $personas = json_decode($personaJSON);
    $comidas = json_decode($comidaJSON);
    echo "<ul>";
    foreach($personas as $persona){
            echo "<li>".$persona."</li>";
        }
    echo "</ul>";