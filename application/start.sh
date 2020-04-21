#!/bin/bash
echo "Starting module install"
cd /app/api
npm install
cd /app/api
npm install ejs
echo "Starting Application"
cd /app/api
npm run start:dev