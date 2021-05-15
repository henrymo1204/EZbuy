# CPSC462 Project: EZBuy

## About

This is the team project for CPSC 462 group 6.

**Professor: Lidia Morrison**

**Team members:** \
-- Ying Luo, yingluo_holiday@csu.fullerton.edu

-- Gabriel Magallanes, gabe695@csu.fullerton.edu

-- Juheng Mo, henrymo@csu.fullerton.edu

-- Mohammad Mirwais, mirwais.88@csu.fullerton.edu

## How to run the program locally

Prerequisites: Python3, Flask, Sqlite3, Yarn

1. In the main directory of the project, run the following command: \
   `$ cd /Script`
2. Once in the `/Script` directory, run the following command to start both the Frontend React application and the Backend Flask application: \
   `$ sh ./local_start_ezbuy_with_db_init.sh`
3. Alternatively, if need to start the application without recreate the database, run the following command: \
   `$ sh ./local_start_ezbuy_without_db_init.sh`
4. After running the script above, open any browser(Chrome preferred) and visit [http://localhost:3000/](http://localhost:3000/), the EZBuy web application will showup.
5. To stop the program, presse Ctrl + C, then run the following command: \
   `sh ./local_stop_ezbuy.sh`

## How to visit the live website on AWS

Open any browser(Chrome preferred) and enter the following address: \
[https://ezbuy.site](https://ezbuy.site)

## Github repository

The following is the link for the project on Github: \
[https://github.com/YingLuo111/CPSC462_Project_EZbuy_Group6](https://github.com/YingLuo111/CPSC462_Project_EZbuy_Group6)

## Reference

1. User profile UI and cart layout referred from \
   [https://github.com/lirenmi/react-store](https://github.com/lirenmi/react-store)
2. Product images are from \
   [Unsplash Website](https://unsplash.com/)
3. Frontend Sliding referred from \
   [Traversy Media](https://codepen.io/FlorinPop17/pen/vPKWjd)
4. Email confirmation for registration and password reset referred from \
   [https://www.youtube.com/watch?v=vutyTx7IaAI](https://www.youtube.com/watch?v=vutyTx7IaAI)
