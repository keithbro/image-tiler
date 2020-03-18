const sharp = require('sharp');

/**
 * I created this module for the purposes of removing references to
 * the underlying image library from the business logic code. We would
 * need to do a little more to enable this properly. For example,
 * instead of having image.extract in extractor.js, we could have
 * extract(image) and define that function here.
 * 
 * The goal would be that if we swapped image library later, we could
 * only edit this file and leave the business logic alone.
 */

const getImage = sharp;
const getDimensions = (image) => image.metadata();

module.exports = { getDimensions, getImage };