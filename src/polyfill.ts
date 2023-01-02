function checkFetch() {
  try {
    fetch;
  } catch (err) {
    require('isomorphic-fetch');
  }
}

function checkAbortController() {
  try {
    AbortController;
  } catch (err) {
    require('abortcontroller-polyfill');
  }
}

checkFetch();
checkAbortController();
