# Beaver: A random academic project

A platform that sells static websites with hosting.

The websites being sold are fixed templates, for easy of development there will just be one, 
a business template.

All templates are filled with default texts and icons that can be customized by clients.

## Database Entities

The platform is built upon these entities:

### Administrators
    -id
    -email: [string]
    -password: [hash string]
    -created_by: [ref to admin]

### Users
    -id
    -email: [string]
    -password: [hash string]
    -created_by: [ref to admin]

### Templates
    -id
    -name: [string]

### Website
    -id:
    -state: [on, off]
    -template: [ref to template]
    -owner: [ref to user]
    -domain: [string]

### Data
    -id
    -website: [ref to website]
    -field_n : [string]

### PendingData
    -id
    -created_at: [datetime]
    -website: [ref to website]
    -field_n: [string]

## User interface views

The platform's UI is composed by these views

### /login
Allows users and admins to log in to the system using credentials

### /admin
Panel where an administrador can perform the following actions:

* Create a new user or administrator.

* Create a new page for one of his users, in this process, the admin selects a template and 
uploads a file containing all parameters required for the text substitution
and effective customization of the selected template,
the file's contents will be encoded in a domain specific language that is easy enough
for a client to understand and write.

* Accept a request previously created by one of his users, where the user requests
an update for one his pages, the changes for the given page are already in the system
and await for administrator consent of aproval.

* The administrator can also view all of his users and a list of their websites, he can 
visit detail views for both at them.

### /user/:id
Shows information about the user, like email and websites owned.

### /website/:id
Shows information about the website, like status, template, owner, domain name and data.

* If the one visiting this view is the website owners, a "request edit" must appear, 
that will permit the user to upload a file containing the specifications of the new texts,
this will create a new request to the administrator responsible for this user and this website.

## Controllers

One important aspect of this project (that will not be implemlented for ease of development), 
is that, for any website sold, a domain name will be sold too, or be at least specified by the user, 
that is, all domains for Beaver websites sold to users, MUST BE ASSIGNED TO BEAVER'S PUBLIC IP.


