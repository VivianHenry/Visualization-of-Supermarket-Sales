<?php
    session_start();
    $con=mysqli_connect("localhost","root","","DV_Project");
    
    function avg_daily_income_A(){
        global $con;
        $query="SELECT CAST(AVG(Total) AS decimal(16,2)) AS avg_income FROM Test WHERE `Branch` = 'A'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_income=$row['avg_income'];
        return $avg_income;
    }

    function avg_daily_expense_A(){
        global $con;
        $query="SELECT CAST(AVG(cogs) AS decimal(16,2)) AS avg_cogs FROM Test WHERE `Branch` = 'A'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_cogs=$row['avg_cogs'];
        return $avg_cogs;
    }

    function avg_daily_profit_margin_A(){
        global $con;
        $query="SELECT CAST(AVG(gross_margin_percentage) AS decimal(16,2)) AS avg_gross_margin_percentage FROM Test WHERE `Branch` = 'A'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_gross_margin_percentage=$row['avg_gross_margin_percentage'];
        return $avg_gross_margin_percentage;
    }

    function avg_customer_rating_A(){
        global $con;
        $query="SELECT CAST(AVG(Rating) AS decimal(16,2)) AS avg_ratingRating FROM Test WHERE `Branch` = 'A'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_ratingRating=$row['avg_ratingRating'];
        return $avg_ratingRating;
    }

    function avg_daily_income_B(){
        global $con;
        $query="SELECT CAST(AVG(Total) AS decimal(16,2)) AS avg_income FROM Test WHERE `Branch` = 'B'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_income=$row['avg_income'];
        return $avg_income;
    }

    function avg_daily_expense_B(){
        global $con;
        $query="SELECT CAST(AVG(cogs) AS decimal(16,2)) AS avg_cogs FROM Test WHERE `Branch` = 'B'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_cogs=$row['avg_cogs'];
        return $avg_cogs;
    }

    function avg_daily_profit_margin_B(){
        global $con;
        $query="SELECT CAST(AVG(gross_margin_percentage) AS decimal(16,2)) AS avg_gross_margin_percentage FROM Test WHERE `Branch` = 'B'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_gross_margin_percentage=$row['avg_gross_margin_percentage'];
        return $avg_gross_margin_percentage;
    }

    function avg_customer_rating_B(){
        global $con;
        $query="SELECT CAST(AVG(Rating) AS decimal(16,2)) AS avg_ratingRating FROM Test WHERE `Branch` = 'B'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_ratingRating=$row['avg_ratingRating'];
        return $avg_ratingRating;
    }

    function avg_daily_income_C(){
        global $con;
        $query="SELECT CAST(AVG(Total) AS decimal(16,2)) AS avg_income FROM Test WHERE `Branch` = 'C'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_income=$row['avg_income'];
        return $avg_income;
    }

    function avg_daily_expense_C(){
        global $con;
        $query="SELECT CAST(AVG(cogs) AS decimal(16,2)) AS avg_cogs FROM Test WHERE `Branch` = 'C'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_cogs=$row['avg_cogs'];
        return $avg_cogs;
    }

    function avg_daily_profit_margin_C(){
        global $con;
        $query="SELECT CAST(AVG(gross_margin_percentage) AS decimal(16,2)) AS avg_gross_margin_percentage FROM Test WHERE `Branch` = 'C'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_gross_margin_percentage=$row['avg_gross_margin_percentage'];
        return $avg_gross_margin_percentage;
    }

    function avg_customer_rating_C(){
        global $con;
        $query="SELECT CAST(AVG(Rating) AS decimal(16,2)) AS avg_ratingRating FROM Test WHERE `Branch` = 'C'";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_ratingRating=$row['avg_ratingRating'];
        return $avg_ratingRating;
    }

    function avg_daily_income_Overall(){
        global $con;
        $query="SELECT CAST(AVG(Total) AS decimal(16,2)) AS avg_income FROM Test";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_income=$row['avg_income'];
        return $avg_income;
    }

    function avg_daily_expense_Overall(){
        global $con;
        $query="SELECT CAST(AVG(cogs) AS decimal(16,2)) AS avg_cogs FROM Test";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_cogs=$row['avg_cogs'];
        return $avg_cogs;
    }

    function avg_daily_profit_margin_Overall(){
        global $con;
        $query="SELECT CAST(AVG(gross_margin_percentage) AS decimal(16,2)) AS avg_gross_margin_percentage FROM Test";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_gross_margin_percentage=$row['avg_gross_margin_percentage'];
        return $avg_gross_margin_percentage;
    }

    function avg_customer_rating_Overall(){
        global $con;
        $query="SELECT CAST(AVG(Rating) AS decimal(16,2)) AS avg_ratingRating FROM Test";
        $result=mysqli_query($con,$query);
        $row=mysqli_fetch_array($result);
        $avg_ratingRating=$row['avg_ratingRating'];
        return $avg_ratingRating;
    }

?>