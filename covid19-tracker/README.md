# covid19-tracker

forntend----------------

for creation of components - ngModules used
for calling external apis   - Axios Node module is used (used for client server communication)
login validation - ngForm Validation used
signup validation - Custom validation used 


backend----------------------

Based on microservices architecture 

Two microservices Created 
1. User Authentication service "basically it is simlilar to (Api gateway)"
2. watchlist service 

------------DESCRIPTION OF BACKEND APIS---------

1.user Authentication service 

-> Apis created for 
	*Login
	*Register
	*Edit user details
	*edit password 
	*Add country to watchlist (calling from watchlist service )

-> Jwt is used for Authentication 
-> api/v1/* is mapping url for authentication 
-> Mysql is used as Database 

2.Watchlist Service 

->Add watchlist 
->remove watchlist 
->view watchlist 
->MongoDb is used as database 



