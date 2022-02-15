# PhoneBookNode
You must include the following modules on the server

From the directory: 

`npm install mysql2`

`npm install express`

Then the port number in PhoneServer.js ot another number between 9000-9020.

Then run:
`node PhoneServer.js`

## RESTful API
### List all records

*url*/list

### Find a record by a field                                                                                 
*url*/find?field=Last&search=*name*

field = {Last, First, Type}

### Add a new record                                                                                         
*url*/addrec?First=*first*&Last=*last*&Phone=*phone*&Type=*type*

type = {Family, Friend, Business, Other}

### Delete a record given it's ID                                                                            
*url*/delete?ID=*id*
### Lookup record by ID                                                                                      
*url*/*id*   
