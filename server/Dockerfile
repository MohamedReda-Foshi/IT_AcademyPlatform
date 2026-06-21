FROM node:22.22.2

WORKDIR /src
    
COPY package*.json ./

RUN npm install

COPY . .

# Expose the port your app runs on
EXPOSE 5000

#start app
CMD [ "npm","start" ,"dev"]



