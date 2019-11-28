#!/bin/bash
echo
echo "removing old app.zip..."
rm app.zip
echo

echo "zipping new deployable directory..."
echo
zip app.zip \
  index.js \
  package-lock.json \
  package.json
echo