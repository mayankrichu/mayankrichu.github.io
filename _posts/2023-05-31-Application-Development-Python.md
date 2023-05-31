---
title: Application Development design pattern
author: mayank
date: 2023-05-31
categories: [Blogging, Python, Application Developement]
tags: [Application Development,Model, View, controller]
render_with_liquid: false
---


#### Model Controller View

When I first started developing applications in Python, I used to naively include all the business logic and 
redirecting links in a single .py file.  However, during my master's studies, I gained knowledge 
about the Model-View-Controller (MVC) design pattern, which proved to be highly beneficial in giving applications a 
meaningful structure that is easy to plan and extend.

In the MVC pattern, the Model component contains the logic and algorithms for processing the data. 
Personally, I include all the necessary functions as models. The Controller component calls the model 
elements and then forwards the results to the View component for display to the users."

Below is the sample pattern of the file structure which I usually use for my applications.


+++ProjectName 
   +++ ABC
       +++ utils.py
       +++ routes.py
   +++ templates
       +++ abc.html
   +++ run.py


In the above example ProjectName is the parent folder of the application. ABC is one of the folder to 
define specifc Models and their controller. utils.py is used to define the model/logic of the program. Mostly,
it consists of all the functions or classes which can be called by the routes.py/controller. Therefore, now it
should be clear that routes.py is a controller which consists of the links which redirects to a specific html define
in the controller.

In the templates folder, you can find the HTML content and CSS files that are called from the routes.py file.

The run.py file is the main Python file that includes calls to all the relevant models defined in the application.
