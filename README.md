# Airis

Airis uses the combination of temperature, barometric pressure, and humidity readings provided by CityIQ nodes to monitor nutrient pollution. Specifically, the primary and secondary correlations of these readings with Nitrogen and Ozone reactions within the atmosphere and their additional relation of Phosphorus runoff, encompassing the summation of their influence on the environment. The sensor data, coupled with the sensor’s location registry, is then used to detect, store, plot, and illustrate appropriate readings; producing a reliable, accessible, and comprehensible means to track current environmental trends; determine the efficiency and impacts of sustainable actions in place; and approximate future environmental effects and hazards. 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
npm install express
npm install request-promise
npm install mysql
npm install nohup
```

## Deployment

1. Update manifest.yml with appropitate information

```
applications:
  - name: your-name-predix-starter
    memory: 64M
    buildpack: nodejs_buildpack
    command: node server/app.js
#services:
 # - <your-name>-secure-uaa-instance
env:
    node_env: cloud
    uaa_service_label : predix-uaa
    # Add these values for authentication in the cloud
    #base64ClientCredential: [Use base64 credentials]
    #loginBase64ClientCredential: [Use base64 credentials]
```

2. Push to Predix Cloud

```
px push
```
## Username and password
user:     amsuarez 
password: CsufPredix12!

## Built With

* [Predix Cloud](http://www.predix.io) - The cloud framework
* [node.js](https://nodejs.org/en/) - Web framework
* [MySQL](https://mysql.com) - Used to generate RSS Feeds
* [MapBox](https://mapbox.com) - Heatmap API
* [Predix-webapp-starter](https://github.com/PredixDev/predix-webapp-starter) - Building blocks of our webapp

## Contributing

*  Austin Suarez - austinmsuarez@gmail.com
*  Jonathan Moubayed - jonmoubayed@gmail.com
*  Shree Rawal - rawalshreepal000@gmail.com


## Copyright

Copyright © 2015, 2016, 2017, 2018 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of GE Global Research. The software may be used and/or copied only with the written permission of GE Global Research or in accordance with the terms and conditions stipulated in the agreement/contract under which the software has been supplied.

## Acknowledgments

* General Electric 
* San Diego 
