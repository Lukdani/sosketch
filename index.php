<!DOCTYPE html>
<html lang="da">

<head>
    <meta charset="utf-8">

    <title>Wow, so sketchy</title>

    <meta name="robots" content="All">
    <meta name="author" content="Udgiver">
    <meta name="copyright" content="Information om copyright">

    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="css/styles.css" rel="stylesheet" type="text/css">

    <!-- Font Awesome-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Single+Day&display=swap"
        rel="stylesheet">


    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div id="topbar" class="row">
                    <div class="col-12 col-lg-auto">
                        <img class="brand" src="/sosketch/images/logo.png" />
                    </div>
                    <div class="col" id="toolbarContainer"></div>
                    <span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div id="drawingContainer">
                    <div class="instructions">
                        <h2 class="mb-2">Instructions</h2>
                        <ul>
                            <li>Don't look at the screen when another person is drawing </li>
                            <li>Person 1 draws the head <span class="small">(and clicks "Next")</li>
                            <li>Person 2 draws the torso + arms <span class="small">(and clicks "Next")</span></li>
                            <li>Person 3 (or 1) draws the legs <span class="small">(and clicks "Finish drawing")</span>
                            <li>Admire the result... 😳 </li>
                            </li>
                        </ul>
                        <p class="alert alert-warning mt-2 small">Note:<br> By participating you AGREE and give YOUR
                            CONSENT
                            TO<br>
                            that
                            <strong>your drawing may be
                                freely distributed, shared and displayed
                                on this webpage</strong> with no limitations what-so-ever.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row imagesRow">
            <div class="col-12">
                <div id="imagesContainer"></div>
            </div>
        </div>
    </div>

    </div>
    </div>
    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/sosketch/init.js"></script>

</body>

</html>