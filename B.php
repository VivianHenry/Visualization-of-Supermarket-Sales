<?php include("func.php");?>

<html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
      <div style="background-color: black">
          <h1>Data Visualization Project</h1>
      </div>
      <div class="container-fluid">
        <div class="row align-items-start">
          <a href="" class="list-group-item active" style="background-color:#1a1a1a; border-color:#08827F; text-align: center; font-size: 30px">Dashboard</a>
          <hr>
          <div class="col-3">
            <div class="card" style="background-color:#1a1a1a; border-color:#08827F; text-align: center; width: 18rem; margin-left: 35px">
              <img src="Images/Yangon.jpeg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Yangon</h5>
                <p class="card-text">Yangon (formerly known as Rangoon) is the largest city in Myanmar (formerly Burma).</p>
                <a href="A.php" class="btn btn-primary">Go to Branch (A)</a>
              </div>
            </div>
          </div>
          <div class="col-3" style="text-align: center">
            <div class="card" style="background-color:#1a1a1a; border-color:#08827F; text-align: center; width: 18rem; margin-left: 35px">
              <img src="Images/Mandalay.jpeg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Mandalay</h5>
                <p class="card-text">Mandalay is a city and former royal capital in northern Myanmar on the Irrawaddy River.</p>
                <a href="B.php" class="btn btn-primary">Go to Branch (B)</a>
              </div>
            </div>
          </div>
          <div class="col-3" style="text-align: center">
            <div class="card" style="background-color:#1a1a1a; border-color:#08827F; text-align: center; width: 18rem; margin-left: 35px">
              <img src="Images/Naypyitaw.jpeg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Naypyitaw</h5>
                <p class="card-text">Naypyitaw is the modern capital of Myanmar (Burma), north of former capital, Yangon.</p>
                <a href="C.php" class="btn btn-primary">Go to Branch (C)</a>
              </div>
            </div>
          </div>
          <div class="col-3" style="text-align: center">
            <div class="card" style="background-color:#1a1a1a; border-color:#08827F; text-align: center; width: 18rem; margin-left: 35px">
              <img src="Images/Overall.jpeg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Overall</h5>
                <p class="card-text">Comparative study of performance across all supermarket branches in the nation of Burma.</p>
                <a href="Overall.php" class="btn btn-primary">Go to Overall Dashboard</a>
              </div>
            </div>
          </div>
          </div>
        </div>
        <hr>
        <div class="dashboard_body">
          <div class="card">
            <div class="card_head" style="background-color:#1a1a1a; border-color:#08827F">
              <h2 style="color:white; text-align:center">Welcome to Branch B!</h2>
            </div>
            <div class="card_body">
              <div class="row align-items-start">
                <div class="col-3" style="background-color:#0066cc; border-color:#0066cc; text-align: center">
                  <?php
                    $avg_income = avg_daily_income_B();
                    echo "<h5 style>Average Daily Income ($): $avg_income</h5>";
                  ?>
                </div>
                <div class="col-3" style="background-color:#cc3300; border-color:#0066cc; text-align: center">
                  <?php
                    $avg_cogs = avg_daily_expense_B();
                    echo "<h5 style>Average Daily Expense ($): $avg_cogs</h5>";
                  ?>
                </div>
                <div class="col-3" style="background-color:#0066cc; border-color:#0066cc; text-align: center">
                  <?php
                    $avg_gross_margin_percentage = avg_daily_profit_margin_B();
                    echo "<h5 style>Average Daily Profit Margin (%): $avg_gross_margin_percentage</h5>";
                  ?>
                </div>
                <div class="col-3" style="background-color:#00b33c; border-color:#0066cc; text-align: center">
                  <?php
                    $avg_rating = avg_customer_rating_B();
                    echo "<h5 style>Average Customer Rating: $avg_rating / 10</h5>";
                  ?>
                </div>
              </div>
              <hr>
              <div class="row align-items-start">
                <div class="col-6">
                  <div id="area_chart_revenue_B" style="background-color:#1a1a1a; border-color:#08827F; text-align: left">
                      <script src="area_chart_revenue_B.js"></script>
                  </div>
                </div>
                <div class="col-6">
                  <div id="area_chart_cost_B" style="background-color:#1a1a1a; border-color:#08827F; text-align: left">
                      <script src="area_chart_cost_B.js"></script>
                  </div>
                </div>
                <hr>
                <div class="col-6">
                  <div id="bar_graph_B" style="background-color:#1a1a1a; border-color:#08827F; text-align: left">
                      <script src="bar_graph_B.js"></script>
                  </div>
                </div>
                <div class="col-6">
                  <div id="bar_graph_gender_B" style="background-color:#1a1a1a; border-color:#08827F; text-align: left">
                      <script src="bar_graph_gender_B.js"></script>
                  </div>
                </div>
                <hr>
                <div class="col">
                  <div id="scatterplot_matrix_B" style="background-color:#1a1a1a; border-color:#08827F; text-align: center">
                      <script src="scatterplot_matrix_B.js"></script>
                  </div>
                </div>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </body>
  </html>