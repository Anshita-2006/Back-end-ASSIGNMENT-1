// fileManager.js
// File Manager using the fs module
// Implements Create, Read, Update, and Delete file operations.
// Run: node fileManager.js

const fs = require('fs');

const filePath = './test.txt';

console.log('Creating File...');

fs.writeFile(filePath, 'Hello Node.js', (err) => {
  if (err) {
    console.log('Error creating file:', err.message);
    return;
  }
  console.log('File Created');

  console.log('Reading File');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err.message);
      return;
    }
    console.log(data);

    fs.appendFile(filePath, '\nLearning FS Module', (err) => {
      if (err) {
        console.log('Error updating file:', err.message);
        return;
      }
      console.log('File Updated');

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.log('Error reading file:', err.message);
          return;
        }
        console.log(data);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('Error deleting file:', err.message);
            return;
          }
          console.log('File Deleted');
        });
      });
    });
  });
});
