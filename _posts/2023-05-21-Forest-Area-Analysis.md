---
title: Analysing forest area of Indian States
author: Mayank Singh 
date: 2023-05-21
categories: [Blogging, Data Engineering/Data Analysis]
tags: [writing, Deutsch Learning, Rules for Infinitiv Verb]
render_with_liquid: false
---



#### Analysis of Forest Area in India

As we all know, we are currently facing a dire situation where our planet is facing more natural calamity. This is mainly 
due to the exponential increase in the green house gases in the atmosphere which promotes global warming. Also, everyday large area
of the forests are being cut for various different reasons.Thus the final result is more draughts, floods, unexpected seasonal changes.

Therefore, this project aims to uncover the changes in the forest areas over the years in different Indian States.

#### Resources Used - 


| Data Source | Technology Stack                                                 |
|:------------|:-----------------------------------------------------------------|
| https://www.kaggle.com/datasets/arjunprasadsarkhel/forest-cover-in-india      | Python, Pandas, Matplotlib, Geopandas, flask, Pycharm, Blueprint |


This project can be built on juptyer notebook but I prefer developing projects as a web application.

Lets start with the file structure. First we need to initialize _ _ init _ _.py file in the folder. _ _ init _ _.py file is 
basically a python file which gets executed without needing to call it explicitly. Within the _ _ init _ _.py file
we have included the following code. The ForestCover.routes is the python file inside ForestCover folder which consists 
of a file where we have initialized forest_cover blueprint. Blueprint comes into benefit when we need to add various other features
within our application. We can call all the blueprints defined in our applications in this _ _ init _ _.py file. Thus, it becomes 
quite handy overall.

```bash
from flask import Flask
from ForestCover.routes import forest_cover

def create_app():
    app = Flask(__name__)
    app.jinja_env.add_extension('jinja2.ext.loopcontrols')
    app.register_blueprint(forest_cover)

    return app
```

### To be continued later









