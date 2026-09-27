/**
 * Automated Verification Script for Student Management REST API
 * Tests all endpoints, HTTP methods, and status codes (200, 201, 400, 404).
 */

const http = require('http');
process.env.NODE_ENV = 'test';
const app = require('./app');

const PORT = 3001;
let server;

function request(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : null;
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, rawBody: body });
        }
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n========================================');
  console.log(' Starting Student REST API Test Suite');
  console.log('========================================\n');

  let passed = 0;
  let failed = 0;

  function assert(description, condition) {
    if (condition) {
      console.log(` \x1b[32m✔ PASS\x1b[0m: ${description}`);
      passed++;
    } else {
      console.error(` \x1b[31m✘ FAIL\x1b[0m: ${description}`);
      failed++;
    }
  }

  try {
    // 1. GET / - Welcome endpoint
    const resHome = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/',
      method: 'GET'
    });
    assert('GET / returns 200 OK', resHome.status === 200);

    // 2. GET /students - View all students
    const resAll = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/students',
      method: 'GET'
    });
    assert('GET /students returns 200 OK', resAll.status === 200);
    assert('GET /students returns array of initial students', Array.isArray(resAll.body) && resAll.body.length >= 3);

    // 3. GET /students/:id - View existing student by ID
    const resGetOne = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/students/1',
      method: 'GET'
    });
    assert('GET /students/1 returns 200 OK', resGetOne.status === 200);
    assert('GET /students/1 returns Rahul (BCA)', resGetOne.body.name === 'Rahul' && resGetOne.body.course === 'BCA');

    // 4. GET /students/:id - View non-existent student (404 Not Found)
    const resGetNotFound = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/students/999',
      method: 'GET'
    });
    assert('GET /students/999 returns 404 Not Found', resGetNotFound.status === 404);
    assert('GET /students/999 has message "Student Not Found"', resGetNotFound.body.message === 'Student Not Found');

    // 5. POST /students - Invalid input (400 Bad Request)
    const resPostInvalid = await request(
      {
        hostname: 'localhost',
        port: PORT,
        path: '/students',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      { name: '' }
    );
    assert('POST /students with missing course returns 400 Bad Request', resPostInvalid.status === 400);
    assert('POST /students 400 returns "Invalid Input"', resPostInvalid.body.message === 'Invalid Input');

    // 6. POST /students - Valid creation (201 Created)
    const resPostValid = await request(
      {
        hostname: 'localhost',
        port: PORT,
        path: '/students',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      { name: 'Neha', course: 'MCA' }
    );
    assert('POST /students returns 201 Created', resPostValid.status === 201);
    assert('POST /students has message "New Student Created"', resPostValid.body.message === 'New Student Created');
    assert('POST /students returns created student object', resPostValid.body.student && resPostValid.body.student.name === 'Neha');

    const createdId = resPostValid.body.student.id;

    // 7. PUT /students/:id - Update existing student (200 OK)
    const resPutValid = await request(
      {
        hostname: 'localhost',
        port: PORT,
        path: `/students/${createdId}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      },
      { course: 'PhD' }
    );
    assert(`PUT /students/${createdId} returns 200 OK`, resPutValid.status === 200);
    assert(`PUT /students/${createdId} student course is updated`, resPutValid.body.student.course === 'PhD');

    // 8. PUT /students/:id - Update non-existent student (404 Not Found)
    const resPutNotFound = await request(
      {
        hostname: 'localhost',
        port: PORT,
        path: '/students/999',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      },
      { name: 'Nobody' }
    );
    assert('PUT /students/999 returns 404 Not Found', resPutNotFound.status === 404);

    // 9. DELETE /students/:id - Delete existing student (200 OK)
    const resDeleteValid = await request({
      hostname: 'localhost',
      port: PORT,
      path: `/students/${createdId}`,
      method: 'DELETE'
    });
    assert(`DELETE /students/${createdId} returns 200 OK`, resDeleteValid.status === 200);
    assert(`DELETE /students/${createdId} has message "Success"`, resDeleteValid.body.message === 'Success');

    // 10. DELETE /students/:id - Delete non-existent student (404 Not Found)
    const resDeleteNotFound = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/students/999',
      method: 'DELETE'
    });
    assert('DELETE /students/999 returns 404 Not Found', resDeleteNotFound.status === 404);

    // 11. Undefined route returns 404 Not Found
    const resUndefined = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/unknown-route',
      method: 'GET'
    });
    assert('GET /unknown-route returns 404 Not Found', resUndefined.status === 404);

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    server.close(() => {
      console.log('\n========================================');
      console.log(` Summary: ${passed} Passed, ${failed} Failed`);
      console.log('========================================\n');
      process.exit(failed > 0 ? 1 : 0);
    });
  }
}

server = app.listen(PORT, () => {
  runTests();
});
