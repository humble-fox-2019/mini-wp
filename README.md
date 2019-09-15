# mini-wp

# API - Documentation

__BASE URL__ http://miniwp.fransnesa.com
__BASE_URL__ http://34.87.55.207

## List Of User Routes

### <b> Login <b>
 <b> POST </b> __BASE_URL__/user/login <br>

<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Email                  | String (require)      |
| Password               | String (require)      |


### Register <br>
 <b> POST </b> __BASE_URL__/user/register<br>
 
<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Email                  | String (require)      |
| Password               | String (require)      |
| Name                   | String (require)      |


## List Of Todo Routes

### Create <br>
 <b> POST </b> __BASE_URL__/miniWp/ <br>

<b> Header <b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |

<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Title                  | String (require)      |
| Content                | String (require)      |
| featured_image         | File                  |
| Tag                    | Array                 |


### Get All Todo <br>
 <b> GET </b> __BASE_URL__/miniWp/ <br>

<b> Header <b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |


### Update Todo <br>
 <b> PATCH </b> __BASE_URL__/miniWp/:id <br>

<b> Header <b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |

<b> Params </b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Title                  | String (require)      |
| Content                | String (require)      |
| featured_image         | File                  |
| Tag                    | Array                 |


### Delete <br>
 <b> DELETE </b> __BASE_URL__/miniWp/:id <br>

<b> Header <b> <br>

| Name                   | Description           |
| ---------------------- |:----------------------|
| Token                  | String (require)      |

 