

*****************************
*   Use of EZbuy code   *
*****************************
timeline_service.py is the SAME code as project 2.
user_service.py is the SAME code as project 2.

schema.sql has slight change from project2 code
---updated initial user passwords to hashed passwords

****************************************
* Guidelines on how to run the program *
****************************************
1. How to create the database?
Run the following command:
> sh ./init.sh

2. How to start the services?
> foreman start -m gateway=1,timeline_service=3,user_service=3

3. Examples for calling the Microblog Microservice APIs
username is "ying" and password is "ying_pass"
Test for createUser(username,email,password):
http --verbose --auth ying -f POST http://localhost:5000/api/v1/user/account username=william email=william@gmail.com password=william_pass

Tests for authenticateUser(username,password):
http --verbose --auth ying -f POST http://localhost:5000/api/v1/user/auth username=william password=william_pass
http --verbose --auth ying -f POST http://localhost:5000/api/v1/user/auth username=william password=william_wrong_pass

Test for addFollower(username,usernameToFollow):
http --verbose --auth ying -f POST http://localhost:5000/api/v1/user/follower username=william usernameToFollow=alex

Test for removeFollower(username,usernameToRemove):
http --verbose --auth ying DELETE "http://localhost:5000/api/v1/user/follower?username=william&usernameToRemove=alex"

Test for getUserTimeline(username):
http --verbose --auth ying GET "http://localhost:5000/api/v1/tweets/userTimeline?username=ying"

Test for getPublicTimeline():
http --verbose --auth ying GET "http://localhost:5000/api/v1/tweets/publicTimeline"

Test for getHomeTimeline(username):
http --verbose --auth ying GET "http://localhost:5000/api/v1/tweets/homeTimeline?username=ying"

Test for postTweet(username,text):
http --verbose --auth ying -f POST http://localhost:5000/api/v1/tweets/post username=ying content="my first tweet!"