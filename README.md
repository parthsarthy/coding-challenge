### Steps to setup the project
make setup <br/>
make run

### Tasks completed
Implemented user sigup, login, registration and profile.<br/>
Implemented fetching of data for listing users when not logged in and sorted the topic alphabetically. <br/>
Integrated react within Django  which makes it easier to deploy as we don't need to run separate service for React application
Implemented frontend validation for form fields wherever required.<br/>
Setup validation for allowing users to only select 6 topics when they try to select 7th appropriate message displayed.
Password stored is encrypted<br/>
I used MySQL while development but have changed to sqlite3 for now as it doesn't require any configuration changes to the application for now.

### Improvements in current structure
We can use scss and file watcher for better structuring the css files.<br/>
Viewing other user's profile while logged in to be setup completely.<br/>
I was able to format data for viewing when user is not logged in but yet to set up view.<br/>
Users can create profile and view it however, they are not able to edit profile yet so working on that.<br/>
Routes are decided based on some flags stored as props, can leverage Private and Public routes concept in react.


### Models
Customised user model provided by Django to use email for login instead of username.<br/>
Created related field in user_profile model which makes it easier to segregate the data in different models and allows us to fetch entire user profile.<br/>
Topic model only has name of the topics.<br/>
Topics and users can be viewed from the admin site. Both models are registered to admin.<br/>
