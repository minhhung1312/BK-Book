<?php
session_id("sess");
session_start();
unset($_SESSION["user"]);
session_destroy();