# PhoneBookNode
You must include the following modules on the server

From the directory: 

`npm install mysql`

`npm install socket.io`

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
