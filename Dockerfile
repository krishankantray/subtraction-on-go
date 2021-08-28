FROM node:14
RUN npm install
EXPOSE 9000
CMD ["npm", "run", "start"]