---
title: Analysing forest area of Indian States
author: Mayank Singh 
date: 2023-05-21
categories: [Blogging, Data Engineering/Data Analysis]
tags: [writing, Deutsch Learning, Rules for Infinitiv Verb]
render_with_liquid: false
---


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

The next step is to build Forest Cover Directory and create three files within it. File names are
routes.py, utils.py and _ _init_ _.py. Here in routes we define the flask api or the link which when entered 
perform specific tasks and/or redirects to an HTML content. The utils.py is built to seperate the processing or the
logical part seperate to the flask part. We call functions from utils.py to 
the routes.py. Here _ _ init _ _.py is defined to make sure ForestCover is treated
as subpackage. 

Note -- If we don't use _ _ init _ _.py in the subpackage. The ForestCover will not be treated as a 
subpackage and thus we need to call the functions defined in the ForestCover as Projectname.ForestCover.routes

Let us see the content within utils.py 

We have created a function which loads the Forest data from the source folder to a pandas dataframe.
```bash

def read_forest_data():
    forest_data = pd.read_excel('ForestData.xlsx')
    
    return forest_data
```

The file content consists of some irregularities. Therefore we need to solve these issues. For example the values are 
defined in string format. Also, some values consists of "," if the number is in the format 20,000. To solve this issue we have
created a small function which can be applied to a dataframe. 

```bash
def remove_comma(value):

    try:
        new_value = value.replace(',','')
        new_value = new_value.replace(' ', '')
        return float(new_value)
    except:
        return float(value)
```

Below code does following things 
1. Loads the map data from the folder to a new dataframe
2. Joins the map dataframe to the forest dataframe through Indian States
3. Correct the format of data. In our case we need to remove "," and change the value to float type
4. Create a new column named Difference whose value is the difference of two columns based on year. In our example we want to check
the change in forest area from the year 2003 to 2011.
5. Next we can check the percentage change by dividing the difference value with the comparision year value)
6. Later we can plot it using matplot lib.
  ```bash
  def get_graph_forest_data(forest_data, year_data):

    shp_gdf = gpd.read_file('ForestCover/India States/Indian_states.shp')
    value_column = str(year_data)
    merged = shp_gdf.set_index('st_nm').join(forest_data.set_index('State/UTs'))
    merged[value_column] = merged[value_column].apply(remove_comma)
    comparision_year = '2003'
    merged[comparision_year] = merged[comparision_year].apply(remove_comma)
    merged['difference'] = merged[comparision_year] - merged[value_column]
    merged['percentage_change'] = (merged['difference']/merged[comparision_year]) * 100
    merged = merged.dropna()

    # normalize color
    vmin = merged['percentage_change'].min()
    vmax = merged['percentage_change'].max()
    vcenter = merged['percentage_change'].mean()

    print(vmin, vmax, vcenter)
    divnorm = colors.TwoSlopeNorm(vmin=vmin, vcenter=vcenter, vmax=vmax)

    k = 1600 
    fig, ax = plt.subplots(figsize=(10, 10))



    cmap = 'Blues'

    ax = merged.plot(column='percentage_change', cmap=cmap, scheme= 'Quantiles', k=k, ax=ax, edgecolor='0.8', legend=False)

    print(merged.columns)
    for _, row in shp_gdf.iterrows():
        state_name = row['st_nm']
        centroid = row.geometry.centroid
        ax.annotate(state_name, xy=(centroid.x, centroid.y), ha='center', va='center', fontsize = 5)


    cbar = plt.cm.ScalarMappable(norm=divnorm, cmap=cmap)
    fig.colorbar(cbar, ax=ax)


    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
  
    return plot_url
```

The final output we get is below Indian Map which shows the changes of the forest cover from the year 2003 to 2011.


![Map.png](2023-05-22%2FMap.png)
Change % in forest cover in India 2011 when compared with the year 2003


### To be continued later









