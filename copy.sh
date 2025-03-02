#!/bin/bash

# Check if 'chrome' directory exists
if [ -d "chrome" ]; then
  # Clean the contents of the 'chrome' directory
  rm -rf chrome/*
else
  # If 'chrome' directory does not exist, create it
  mkdir chrome
fi

# Copy 'dist' directory and 'manifest.json' into 'chrome'
cp -r dist chrome/
cp -r _locales chrome/
cp manifest.json chrome/

if [ -f "chrome.zip" ]; then
  rm chrome.zip
fi

zip -r chrome.zip chrome/