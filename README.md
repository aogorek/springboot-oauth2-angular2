# Spring Oauth2 angular 2,4,5 App

Sample application for Spring Oauth2 Angular 2,4,5 App

You will find some notes about this app on my blog:

https://regulargeek.blogspot.com/2018/05/angular-5-springboot-2-oauth2-and.html

App uses SpringBoot 2, Spring Security 5, angular-oauth2-oidc library for angular oauth support.

It provides support for:
    
    - SpringBoot Oauth2 resource server
    - SpringBoot Oauth2 authorization server
    - Angular2 access to backend data
    - IMPLICIT flow support with token silent refresh
    - custom spring login page
    
    
    
   It contains two modules backend and frontend 
    
   To install and run app, clone repository, go into app folder and execute
   
   `mvn clean install` 
   
   then 
   
   `cd backend/target`
   
   and
   
   `java -jar *.jar`
   
   app should start.
   
   You can run it in browser with addres:
   
   `http://localhost:8080`
   
   default username and password are:
   
   `user@user.com`/
   `password`
  
   