<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    *{
      font-family: Helvetica, Arial, sans-serif;
    }
    
    body a {
      color: #fff;
      text-decoration: none;
    }

    .registration-button-wraper {
      margin-top: 3rem;
    }

    .registration-button {
      background-color:rgb(110, 161, 237);
      color: #fff;
      padding: .75rem 1rem;
      font-weight: bold;
      border-radius: 0.2rem;
    }

    .mb-0 {
      margin-bottom: 0;
    }

    .mt-0 {
      margin-top: 0;
    }
</style>

</head>
<body>
  <h3>Thanks so much!</h3>
  <p><b>{name}</b> for registering in <b>{appname}</b>.</p>
  <p class="mb-0">To complete the process please click in the button below</p>
  <p class="mt-0"> <small>This link expires in {expiration-hours} hours</small></p>
  <div class="registration-button-wraper">
    <a href="{registration-link}" class="registration-button">
      Finish registration
    </a>
  </div>
  
</body>
</html>