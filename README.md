# Ghibli-Quiz
Web application creating a Quiz based on Studio Ghibli films.

The application is built using HTML, CSS, Bootstrap, and JS, along with its modules (Node.js, Axios, EJS, etc.).
To launch the application, proceed as follows : 
  - download and cd the project in your terminal ;
  - initialise npm `npm init` ;
  - install these npm modules : axios, body-parser, express `npm i axios` `npm i body-parser`... ;
  - run the index.js file using `node index.js` or `nodemon index.js` ;
  - open a browser and select localhost:3000/

Here is the website you should access : 
![image](https://github.com/user-attachments/assets/4b41ece6-f5ed-4dda-a394-8b694307671e)

It consists in creating a 7 questions quiz, where the user will be invited to guess a Ghibli film title based on its description. 
The Ghibli's data are picked up from the Studio Ghibli public API available at this url : https://ghibliapi.vercel.app.

There is no authentification necessary, and the API is free access. 
