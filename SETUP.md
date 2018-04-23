# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

1. First install node

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install these node packages
```
npm install express
npm install request-promise
npm install mysql
npm install nohup
npm install fs
npm install request
```


## Deployment

1. Log-in to clound foundary and enter appropiate credentials

 ```
 cf login
 ```

2. Navigate to location where you downloaded the repository, and enter this folder

```
predix-nodejs-starter-master
```

3. Update manifest.yml with appropitate information

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

Our manifest contains information to run with our Predix Dev Environment


4. Push to Predix Cloud

```
px push
```
or 
```
cf push
```
