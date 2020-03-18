# Imager Tiler

## Quick Start

Add an image of your chosing to the root directory of the application e.g. Cat.jpg.

````
git clone https://github.com/keithbro/image-tiler.git
cd image-tiler
npm install
npm start Cat.jpg
````

## Prerequisites

Node v12 or higher.

Note that on v13.3.0 I've seen a segmentation fault that occurs after the images
have been extracted. The app was developed and tested using Node LTS (v12.16.1
at the time of writing).

## Tests

Test have been created under `tests/`. To run:

````
npm test
````
