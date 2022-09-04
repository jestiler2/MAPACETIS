<?php

$mode = 3;
if (isset($_POST['mode']) ) {
    $mode = $_POST['mode'];
} else {
    echo "Error: modalidad no definida.";
    // exit();
}

$mysqli = new mysqli('127.0.0.1', 'map-centrogeo', 'map-centrogeo', 'map-centrogeo');

if ($mysqli->connect_errno) {
    echo "Lo sentimos, este sitio web está experimentando problemas. \n\n";
    echo "Error: Fallo al conectarse a MySQL debido a: \n";
    echo "Errno: " . $mysqli->connect_errno . "\n";
    echo "Error: " . $mysqli->connect_error . "\n";
    exit();
}

// Modo de crear registros.
if ($mode == 0) {

    $id = NULL;
    $lat1 = NULL;
    $log1 = NULL;
    $lat2 = NULL;
    $log2 = NULL;
    $name = NULL;
    $type = NULL;
    $enable = NULL;
    $color = NULL;
    $colorGUI = NULL;
    $data = NULL;

    if (isset($_POST['id']) ) {
        $id = $_POST['id'];
        // exit();
    }
    if (isset($_POST['lat1']) ) {
        $lat1 = $_POST['lat1'];
        echo "Error: datos no completos en lat1.";
        // exit();
    }
    if (isset($_POST['log1']) ) {
        $log1 = $_POST['log1'];
        echo "Error: datos no completos en log1.";
        // exit();
    }
    if (isset($_POST['lat2']) ) {
        $lat2 = $_POST['lat2'];
        echo "Error: datos no completos en lat2.";
        // exit();
    }
    if (isset($_POST['log2']) ) {
        $log2 = $_POST['log2'];
        echo "Error: datos no completos en log2.";
        // exit();
    }
    if (isset($_POST['name']) ) {
        $name = $_POST['name'];
        echo "Error: datos no completos en name.";
        // exit();
    }
    if (isset($_POST['type']) ) {
        $type = $_POST['type'];
        echo "Error: datos no completos en type.";
        // exit();
    }
    if (isset($_POST['enable']) ) {
        $enable = $_POST['enable'];
        echo "Error: datos no completos en enable.";
        // exit();
    }
    if (isset($_POST['color']) ) {
        $color = $_POST['color'];
        echo "Error: datos no completos en color.";
        // exit();
    }
    if (isset($_POST['colorGUI']) ) {
        $colorGUI = $_POST['colorGUI'];
        echo "Error: datos no completos en colorGUI.";
        // exit();
    }
    if (isset($_POST['data']) ) {
        $data = $_POST['data'];
        echo "Error: datos no completos en data.";
        // exit();
    }

    $sql = "INSERT INTO `history-map` (`id`, `user_id`, `date`, `lat1`, `log1`, `lat2`, `log2`, `name`, `type`, `enable`, `color`, `colorGUI`, `data`) VALUES (NULL, 'n86k4yqh6xg', current_timestamp(), '892989', '324224', '45543546', '35554343', 'hospytal', 'amenity', '1', '#000000', '#000000', NULL)";
    // $sql = "INSERT INTO `history-map` (`id`, `user_id`, `date`, `lat1`, `log1`, `lat2`, `log2`, `name`, `type`, `enable`, `color`, `colorGUI`, `data`) VALUES (NULL, '$id', current_timestamp(), '$lat1', '$log1', '$lat2', '$log2', '$name', '$type', '$enable', '$color', '$colorGUI', '$data')";
    if ($mysqli->query($sql)) {
        echo "Exitoso: se realizó correctamente la solicitud.";
        exit();
    } else {
        echo "Error: ocurrio un error al realizar solicitud.";
        exit();
    }

}

// Modo de obtener registros.
if ($mode == 1) {

    $id = NULL;

    if (isset($_POST['id']) ) {
        $id = $_POST['id'];
        // exit();
    }

    $resultado = NULL;
    // $sql = "SELECT * FROM `history-map` WHERE `user_id` = 'n86k4yqh6xg'";
    $sql = "SELECT * FROM `history-map` WHERE `user_id` = '$id'";

    if ($resultado = $mysqli->query($sql)) {
        if ($resultado->num_rows === 0) {
            echo "Lo sentimos. No se pudo encontrar una coincidencia para el ID $id. Inténtelo de nuevo.";
            exit();
        } else {
            $DLat1 = array();
            $DLog1 = array();
            $DLat2 = array();
            $DLog2 = array();
            $DName = array();
            $DType = array();
            $DEnable = array();
            $DColor = array();
            $DColorGUI = array();
            while ($registro = $resultado-> fetch_assoc()) {
                array_push($DLat1, $registro['lat1']);
                array_push($DLog1, $registro['log1']);
                array_push($DLat2, $registro['lat2']);
                array_push($DLog2, $registro['log2']);
                array_push($DName, $registro['name']);
                array_push($DType, $registro['type']);
                array_push($DEnable, $registro['enable']);
                array_push($DColor, $registro['color']);
                array_push($DColorGUI, $registro['colorGUI']);
            }

            $json = array(
                "lat1" => $DLat1, 
                "log1" => $DLog1, 
                "lat2" => $DLat2, 
                "log2" => $DLog2,
                "name" => $DName,
                "type" => $DType,
                "enable" => $DEnable,
                "color" => $DColor,
                "colorGUI" => $DColorGUI);

            echo json_encode($json); 
        }
    } else {
        echo "Error: ocurrio un error al realizar solicitud.";
        exit();
    }

}

// Modo de eliminar registros.
if ($mode == 2) {

    $id = NULL;
    $lat1 = NULL;
    $log1 = NULL;
    $lat2 = NULL;
    $log2 = NULL;
    $name = NULL;
    $type = NULL;
    $enable = NULL;
    $color = NULL;
    $colorGUI = NULL;
    $data = NULL;

    if (isset($_POST['id']) ) {
        $id = $_POST['id'];
        // exit();
    }
    if (isset($_POST['lat1']) ) {
        $lat1 = $_POST['lat1'];
        echo "Error: datos no completos en lat1.";
        // exit();
    }
    if (isset($_POST['log1']) ) {
        $log1 = $_POST['log1'];
        echo "Error: datos no completos en log1.";
        // exit();
    }
    if (isset($_POST['lat2']) ) {
        $lat2 = $_POST['lat2'];
        echo "Error: datos no completos en lat2.";
        // exit();
    }
    if (isset($_POST['log2']) ) {
        $log2 = $_POST['log2'];
        echo "Error: datos no completos en log2.";
        // exit();
    }
    if (isset($_POST['name']) ) {
        $name = $_POST['name'];
        echo "Error: datos no completos en name.";
        // exit();
    }
    if (isset($_POST['type']) ) {
        $type = $_POST['type'];
        echo "Error: datos no completos en type.";
        // exit();
    }
    if (isset($_POST['enable']) ) {
        $enable = $_POST['enable'];
        echo "Error: datos no completos en enable.";
        // exit();
    }
    if (isset($_POST['color']) ) {
        $color = $_POST['color'];
        echo "Error: datos no completos en color.";
        // exit();
    }
    if (isset($_POST['colorGUI']) ) {
        $colorGUI = $_POST['colorGUI'];
        echo "Error: datos no completos en colorGUI.";
        // exit();
    }
    if (isset($_POST['data']) ) {
        $data = $_POST['data'];
        echo "Error: datos no completos en data.";
        // exit();
    }

    $sql = "DELETE FROM `history-map` WHERE `user_id` = 'n86k4yqh6xg' AND `lat1` = '892989' and `log1` = '324224' AND `lat2` = '45543546' AND `log2` = '35554343' AND `name` = 'hospytal' AND `type` = 'amenity' AND `color` = '#000000' AND `colorGUI` = '#000000'";
    // $sql = "DELETE FROM `history-map` WHERE `user_id` = '$id' AND lat1 = '$lat1' AND log1 = '$log1' AND lat2 = '$lat2' AND log2 = '$log2' AND name = '$name' AND type = '$type' AND color = '$color' AND colorGUI = '$colorGUI'";
    if ($mysqli->query($sql)) {
        echo "Exitoso: se realizó correctamente la solicitud.";
        exit();
    } else {
        echo "Error: ocurrio un error al realizar solicitud.";
        exit();
    }
}

// Modo de created or update.
if ($mode == 3) {

    $id = NULL;
    $lat1 = NULL;
    $log1 = NULL;
    $lat2 = NULL;
    $log2 = NULL;
    $name = NULL;
    $type = NULL;
    $enable = NULL;
    $color = NULL;
    $colorGUI = NULL;
    $data = NULL;

    if (isset($_POST['id']) ) {
        $id = $_POST['id'];
        echo $id;
        // exit();
    }
    if (isset($_POST['lat1']) ) {
        $lat1 = $_POST['lat1'];
        echo $lat1;
        // exit();
    }
    if (isset($_POST['log1']) ) {
        $log1 = $_POST['log1'];
        echo $log1;
        // exit();
    }
    if (isset($_POST['lat2']) ) {
        $lat2 = $_POST['lat2'];
        echo $lat2;
        // exit();
    }
    if (isset($_POST['log2']) ) {
        $log2 = $_POST['log2'];
        echo $log2;
        // exit();
    }
    if (isset($_POST['name']) ) {
        $name = $_POST['name'];
        echo $name;
        // exit();
    }
    if (isset($_POST['type']) ) {
        $type = $_POST['type'];
        echo $type;
        // exit();
    }
    if (isset($_POST['enable']) ) {
        $enable = $_POST['enable'];
        echo $enable;
        // exit();
    }
    if (isset($_POST['color']) ) {
        $color = $_POST['color'];
        echo $color;
        // exit();
    }
    if (isset($_POST['colorGUI']) ) {
        $colorGUI = $_POST['colorGUI'];
        echo $colorGUI;
        // exit();
    }
    if (isset($_POST['data']) ) {
        $data = $_POST['data'];
        echo $data;
        // exit();
    }

    $resultado = NULL;
    // $sql = "SELECT * FROM `history-map` WHERE `user_id` = 'n86k4yqh6xg' AND `lat1` = '892989' and `log1` = '324224' AND `lat2` = '45543546' AND `log2` = '35554343' AND `name` = 'hospytal' AND `type` = 'amenity' AND `color` = '#000000' AND `colorGUI` = '#000000'";
    $sql = "SELECT * FROM `history-map` WHERE `user_id` = '$id' AND `lat1` = '$lat1' AND `log1` = '$log1' AND `lat2` = '$lat2' AND `log2` = '$log2' AND `name` = '$name' AND `type` = '$type' AND `color` = '$color' AND `colorGUI` = '$colorGUI'";

    if ($resultado = $mysqli->query($sql)) {
        echo "Exitoso: se realizó correctamente la solicitud.";
        if ($resultado->num_rows === 0) {
            // $sql = "INSERT INTO `history-map` (`id`, `user_id`, `date`, `lat1`, `log1`, `lat2`, `log2`, `name`, `type`, `enable`, `color`, `colorGUI`, `data`) VALUES (NULL, 'n86k4yqh6xg', current_timestamp(), '892989', '324224', '45543546', '35554343', 'hospytal', 'amenity', '1', '#000000', '#000000', NULL)";
            $sql = "INSERT INTO `history-map` (`id`, `user_id`, `date`, `lat1`, `log1`, `lat2`, `log2`, `name`, `type`, `enable`, `color`, `colorGUI`, `data`) VALUES (NULL, '$id', current_timestamp(), '$lat1', '$log1', '$lat2', '$log2', '$name', '$type', '$enable', '$color', '$colorGUI', NULL)";
            if ($resultado = $mysqli->query($sql)) {
                echo "Exitoso: se realizó la creación de la solicitud.";
                exit();
            } else {
                echo "Error: ocurrio un error al realizar solicitud.";
                exit();
            }
        } else {
            $sql = NULL;
            while ($registro = $resultado-> fetch_assoc()) {
                // $sql = "UPDATE `history-map` SET `id` = '".$registro['id']."', `user_id` = 'n86k4yqh6xg', `date` = current_timestamp(), `lat1` = '892989435', `log1` = '32434224', `lat2` = '45543546', `log2` = '35554343', `name` = 'house', `type` = 'amenity', `color` = '#000000', `colorGUI` = '#000000' WHERE `id` = '".$registro['id']."'";
                $sql = "UPDATE `history-map` SET `id` = '".$registro['id']."', `user_id` = '".$registro['user_id']."', `date` = current_timestamp(), `lat1` = '$lat1', `log1` = '$log1', `lat2` = '$lat2', `log2` = '$log2', `name` = '$name', `type` = '$type', `enable` = '$enable', `color` = '$color', `colorGUI` = '$colorGUI' WHERE `id` = '".$registro['id']."'";
                if ($mysqli->query($sql)) {
                    echo "Exitoso: se realizó la actualizació de la solicitud.";
                } else {
                    echo "Error: ocurrio un error al realizar solicitud.";
                }
            }
            echo $sql;
            exit();

            // $sql = "INSERT INTO `history-map` (`id`, `user_id`, `date`, `lat1`, `log1`, `lat2`, `log2`, `name`, `type`, `enable`, `color`, `colorGUI`, `data`) VALUES (NULL, 'n86k4yqh6xg', current_timestamp(), '892989', '324224', '45543546', '35554343', 'hospytal', 'amenity', '1', '#000000', '#000000', NULL)";
            
            // $sql = "INSERT INTO `history-map` (`id`, `user_id`, `date`, `lat1`, `log1`, `lat2`, `log2`, `name`, `type`, `enable`, `color`, `colorGUI`, `data`) VALUES (NULL, '$id', current_timestamp(), '$lat1', '$log1', '$lat2', '$log2', '$name', '$type', '$enable', '$color', '$colorGUI', '$data')";
        }
    } else {
        echo "Error: ocurrio un error al realizar solicitud.";
        exit();
    }

}

// Modo de eliminar por zona.
if ($mode == 4) {

    $id = NULL;
    $lat1 = NULL;
    $log1 = NULL;
    $lat2 = NULL;
    $log2 = NULL;

    if (isset($_POST['id']) ) {
        $id = $_POST['id'];
        echo $id;
        // exit();
    }
    if (isset($_POST['lat1']) ) {
        $lat1 = $_POST['lat1'];
        echo $lat1;
        // exit();
    }
    if (isset($_POST['log1']) ) {
        $log1 = $_POST['log1'];
        echo $log1;
        // exit();
    }
    if (isset($_POST['lat2']) ) {
        $lat2 = $_POST['lat2'];
        echo $lat2;
        // exit();
    }
    if (isset($_POST['log2']) ) {
        $log2 = $_POST['log2'];
        echo $log2;
        // exit();
    }

    // $sql = "DELETE FROM `history-map` WHERE `user_id` = 'n86k4yqh6xg' AND `lat1` = '892989' and `log1` = '324224' AND `lat2` = '45543546' AND `log2` = '35554343' AND `name` = 'hospytal' AND `type` = 'amenity' AND `color` = '#000000' AND `colorGUI` = '#000000'";
    $sql = "DELETE FROM `history-map` WHERE `user_id` = '$id' AND `lat1` = '$lat1' AND `log1` = '$log1' AND `lat2` = '$lat2' AND `log2` = '$log2'";
    if ($mysqli->query($sql)) {
        echo "Exitoso: se realizó la eliminación la solicitud.";
        exit();
    } else {
        echo "Error: ocurrio un error al realizar solicitud.";
        exit();
    }
}

$resultado->free();
$mysqli->close();
?>