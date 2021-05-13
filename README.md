# iKeep

iKeep is a mobile application intended to help Informatics students in the University of Washington retain past information from classes by providing users with quick, targeted questions designed after the information gathered in previous courses.

# Purpose

Provide iSchool students with a practice platform using the University of Washington's curriculum to assist students in retaining fundamental skills that they have learned throughout their education.

# Tech/Framework Used

Frontend -> React Native
Backend -> Go, JavaScript, Node.js, AWS EC2, Docker

# For students interested in research

A lot of work to be done here! We were unable to focus on conducting sufficient education research to narrow down the best ways to present questions to students, optimal amount of times, kinds of questions, length of questions, etc.. For students interested in a research based Capstone, iKeep is a great project to further improve.

In addition, we did not generate a robust enough question set for users to consume over long periods of time (since iKeep is designed to be used one/multiple times a day for months and even years, many more questions can be generated!).

Research students can also conduct user tests to continue narrowing down question length, difficulty, and accessibility — since iKeep emphasizes accessibility and ease-of-use, it may be beneficial to determine how iSchool students react (over long periods of time) to certain metrics in order to achieve having users answer questions consistently.

# For students interested in project management (pm)

iKeep is the perfect opportunity for students interested in leadership positions. For someone interested in a PM role, you may want to begin by brainstorming ways to improve the application, set a concrete action plan, create a timeline, manage your team, and finally find ways to get the iSchool community involved in the project. Consider the following questions for inspiration: How may the iSchool adopt iKeep? How can iSchool students contribute and benefit from the application? How can we integrate this application into the degree so that students can use it continuously? Can we go further and involve professors, having them add their favorite sample questions to the courses they teach? What are ways we could make this process seamless and easy?

# For students interested in development

The development side is not written that well for the backend part. The server is currently hosted in AWS EC2 and deployed using Docker. The code itself uses a microservice architecture which is a good design for scaling but it is hard thus it is poorly written. The code consists of 2 main containers, question and gateway. Initial calls will be directed to gateway, which is written in Go, after that it will be directed via ReverseProxy to question, which is written in JavaScript. I would suggest for future development to just take the handlers in the JavaScript code and then deploy the server in your own way (i.e. remove the Go code). Furthermore, notice that the gateway consists of some handlers that handle authentication, it is no longer used since authentication is moved to the question folder now. Note to think about: handle saving answers for questions as images, improve security (i.e. hashing password), find a better way to write gateway code. The frontend is written using ReactNative which helps in creating Web, Android and IOS apps.

# Contributors
1. Anish Dhawan (ad99@uw.edu)
2. Matthew Putra (putra@uw.edu)
3. Ryan Huang (ryanh42@uw.edu)
4. Sofia Thomas (sofiat21@uw.edu)
