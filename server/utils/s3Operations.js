const { Upload } = require('@aws-sdk/lib-storage');
// eslint-disable-next-line import/no-extraneous-dependencies
const { S3 } = require('@aws-sdk/client-s3');

// dotenv helps manage environment variables
require('dotenv').config();

// The name of the bucket that you have created
const BUCKET_NAME = 'pennbuzz';

// we load credentials from the .env file
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET,
  },
  region: 'us-east-1',
});

// upload a file
const uploadFile = async (fileContent, fileName) => {
  // eslint-disable-next-line no-console
  console.log('fileName', fileName);
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name we want to upload
    Body: fileContent, // the buffer
  };

  // Uploading files to the bucket

  const data = await new Upload({
    client: s3,
    params,
  }).done();
  // eslint-disable-next-line no-console
  console.log(`File uploaded successfully. ${data.Location}`);// return the URL of the object on S3
  return data.Location;
};

// delete a file
const deleteFile = (fileName) => {
  // Setting up S3 delete parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name we want to delete
  };

  // download file from the bucket
  // eslint-disable-next-line prefer-arrow-callback, func-names
  s3.deleteObject(params, function (err, data) {
    if (err) {
      // throw err;
      return false;
    }
    // eslint-disable-next-line no-console
    console.log(`File deleted successfully. ${data}`);
    return true;
  });
};

module.exports = { uploadFile, deleteFile };
