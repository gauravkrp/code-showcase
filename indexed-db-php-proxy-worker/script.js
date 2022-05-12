// -------------------- Init Variables --------------------
// api urls 
const loginURL = `${apiBaseUrl}?command=Authenticate`;
const getTxnsListURL = `${apiBaseUrl}?command=Get`;
const createTxnURL = `${apiBaseUrl}?command=CreateTransaction`;

// indexedDB variables
const IDB_DB_NAME = 'App_IDB';
const IDB_TXN_OBJ_STORE = 'Transactions';
let totalRecords;
let start = 0;
const recordsPerPage = 100;

// DOM Nodes
const $loginContent = $('#loginContent');
const $transactionTable = $('#transactionTable');
const $transactionTableBody = $('#transactionTableBody');
const $loadingTxnsMsg = `<p id="loadingTransactions">
    Please wait while we fetch and prepare your transactions. It will take a while.
  </p>`;
const $prevPageBtn = $('#prevPage');
const $nextPageBtn = $('#nextPage');
const $transactionForm = $('#transactionForm');
const $openTxnModalBtn = $('#openTxnModalBtn');
const $createTxnModal = $('#createTxnModal');
const $modalCloseBtn = $('.modalCloseBtn');

const $loginFormSubmitBtn = $('#submitLoginForm');
const $loginForm = $('#loginForm');
const $createTxnSubmitBtn = $('#createTxnBtn');
const $createTxnForm = $('#createTxnForm');
const $createTxnMsg = $('#createTxnMsg');

// loading state variables
let isFormSubmitting = false;
let isTxnFetching = false;
let isDataLoading = false;

/**
 * @description - Abstracting ajax object for resuability
 * @param {string} url - url of request
 * @param {string} method - request http method
 * @return {object} - ajax object
*/
const ajaxObj = (url, method = 'GET') => ({
  method: 'POST',
  url: 'proxy.php',
  data: {
    method,
    url,
  }
});

/**
 * @description - Get the transactions lists for the authenticated user
 * @param {string} authToken - auth token of the user
*/
function fetchTxnsList(authToken) {
  
  isTxnFetching = true;
  $loginContent.hide();
  $transactionTable.before($loadingTxnsMsg);

  const urlParmas = $.param({
    authToken,
    returnValueList: 'transactionList',
  });

  const url = `${getTxnsListURL}&${urlParmas}`;

  $.ajax(ajaxObj(url)
  ).done(function (result) {
    const response = JSON.parse(result);
    
    if (response.jsonCode === 200) {
      const txnsList = response.transactionList;
      totalRecords = txnsList.length;
      txnsList.sort(function (a, b) {
        return new Date(b.inserted) - new Date(a.inserted);
      });

      // show first page (100 records) data in UI immediately
      const firstPageData = txnsList.slice(0, recordsPerPage);
      $('#loadingTransactions').remove();
      $transactionTable.show();
      $transactionForm.show();
      displayTransactions(firstPageData);
      $nextPageBtn.attr('disabled', 'disabled'); // next btn is disabled as only showing 100 records.

      // store data in IDB
      storeInIndexedDB(txnsList).then(function (result) {
        $nextPageBtn.prop("disabled", false); // enable next btn
      }).catch(function (err) {
        console.error(err);
      });
    }
    if (response.jsonCode === 407) {
      // session expired. login again!
      document.cookie = encodeURIComponent('authToken') + '=' + encodeURIComponent('') + '; path =/; max-age=-3600';
      alert('Session Expired! You need to log in again.');
      window.location.reload();
    }

  }).fail(err => console.error(err))
  .always(function () {
    isTxnFetching = false;
  });
}

/**
 * @description - Stores the transactions in the indexedDB
 * @param [array] list - list of transactions
 * @return {Promise} Promise object with the result of the operation
*/
function storeInIndexedDB(list) {
  return new Promise(function(resolve, reject) {

    if (!window.indexedDB) {
      reject(`Your browser doesn't support IndexedDB`);
    }

    const request = indexedDB.open(IDB_DB_NAME, 1);

    request.onupgradeneeded = function (event) {
      let db = request.result;
      if (!db.objectStoreNames.contains(IDB_TXN_OBJ_STORE)) {
        let store = db.createObjectStore(IDB_TXN_OBJ_STORE, { keyPath: 'transactionID' });
        store.createIndex('txn_inserted', 'inserted');
      }
    };

    request.onerror = (event) => reject(`IDB error: ${event.target.error}`);

    request.onsuccess = (event) => {
      const db = event.target.result;
      list.forEach(async (item, index) => {
        await insertToDB(db, item);
        if (index === list.length - 1) {
          resolve(`Successfully stored ${list.length} transactions in IndexedDB`);
        }
      });
    };
  });
}

/**
 * @description - Insert a transaction to the indexedDB
 * @param {object} db - IDB db object
 * @param {object} list - transaction object
 * @return {Promise}
*/
function insertToDB(db, item) {
  return new Promise(function (resolve, reject) {
    const txn = db.transaction(IDB_TXN_OBJ_STORE, "readwrite");
    const store = txn.objectStore(IDB_TXN_OBJ_STORE);
    let query = store.put(item);

    query.onsuccess = () => resolve(`Successfully inserted transaction ${item.transactionID}`);
    query.onerror = (event) => reject("error", event.target.error);
    txn.oncomplete = () => db.close();
  });
}

/**
 * @description - Get transactions from indexedDB
 * @param {number} page - page number
 * @return {array} list - list of transactions
*/
function getDataFromDB(start, recordsPerPage) {
  return new Promise(function (resolve, reject) {
    let hasSkipped = false;
    let txns = [];
    const request = indexedDB.open(IDB_DB_NAME);

    request.onerror = (event) => reject(`IDB error: ${event.target.errorCode}`);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const txn = db.transaction(IDB_TXN_OBJ_STORE, "readonly");
      const store = txn.objectStore(IDB_TXN_OBJ_STORE);

      const index = store.index('txn_inserted');

      index.openCursor(null, 'prev').onsuccess = (event) => {
        let cursor = event.target.result;
        if (!hasSkipped && start > 0) {
          hasSkipped = true;
          cursor.advance(start);
          return;
        }
        if (cursor) {
          txns.push(cursor.value);
          if (txns.length < recordsPerPage) {
            cursor.continue();
          } else {
            resolve(txns);
          }
        } else {
          // console.log('resolving ', txns);
          resolve(txns);
        }
      }

      txn.oncomplete = () => db.close();
    };
  });
}

/**
 * @description - Show list of transactions in the UI
 * @param [array] list - list of 100 transactions
*/
function displayTransactions(list) {
  $('#recordStatus').text(
    `Showing ${start + 1} - ${(start + recordsPerPage) < totalRecords ? (start + recordsPerPage) : totalRecords}
    of ${totalRecords} transactions`
  );
  $transactionTableBody.html("");
  list.forEach(function (txn, i) {
    const $amount = ((txn.amount) / 100).toLocaleString("en-US", { style: "currency", currency: txn.currency });
    $txnRow = `<tr>
      <td>${start + i + 1}</td>
      <td>${txn.created}</td>
      <td>${txn.merchant}</td>
      <td>${$amount}</td>
      <td>${txn.category}</td>
      <td>${txn.tag}</td>
      <td>${txn.inserted}</td>
      </tr>`;
    $transactionTableBody.append($txnRow);
  });
  // handle next/prev buttons
  if (start > 0) {
    $prevPageBtn.prop("disabled", false);
  } else {
    $prevPageBtn.attr('disabled', 'disabled');
  }
  if (start + recordsPerPage < totalRecords) {
    $nextPageBtn.prop("disabled", false);
  } else {
    $nextPageBtn.attr('disabled', 'disabled');
  }
}

$(document).ready(function() {

  // if user is already authenticated, authToken is present in cookies
  if (isAuthenticated) {
    fetchTxnsList(authToken);
  }

  // modal open
  $openTxnModalBtn.on('click', function () {
    $createTxnModal.css('display', 'block');
  });

  // modal close
  $modalCloseBtn.on('click', function () {
    $createTxnModal.css('display', 'none');
  });

  // on click on next and prev button - pagination
  $nextPageBtn.on('click', function () {
    isDataLoading = true;
    start += recordsPerPage;
    getDataFromDB(start, recordsPerPage).then(data => {
      displayTransactions(data);
    }).catch(error => { console.error(error); });
  });
  $prevPageBtn.on('click', function () {
    isDataLoading = true
    start -= recordsPerPage;
    getDataFromDB(start, recordsPerPage).then(data => {
      displayTransactions(data);
    }).catch(error => { console.error(error); });
  });

  // get today date and set it as max in date field
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  const yyyy = today.getFullYear();
  const today_date = yyyy + '-' + mm + '-' + dd ;
  $('#createTxnDate').attr("max", today_date);

  // Login Form Submission
  $loginFormSubmitBtn.on('click', function(e) {
    if (isFormSubmitting) return;
    e.preventDefault();

    $loginForm.find('.error').html('');

    const partnerUserID = $('#loginEmail').val();
    const partnerUserSecret = $('#loginPassword').val();

    // input field validations
    if(!partnerUserID || !partnerUserSecret) {
      alert('Please enter valid email and password');
      return;
    }

    isFormSubmitting = true;
    $loginFormSubmitBtn.html('Logging in...');

    // prepare url querystring 
    const urlParmas = $.param({
      partnerUserID,
      partnerUserSecret,
      partnerName,
      partnerPassword
    });

    const url = `${loginURL}&${urlParmas}`;

    $.ajax(ajaxObj(url, 'POST')
    ).done(function (result) {
        const response = JSON.parse(result);
        if (response.jsonCode === 404) {
          // Invalid email
          $loginForm.find('.error').html('No user with that partner/userID');
        }
        if (response.jsonCode === 401) {
          // Invalid password
          $loginForm.find('.error').html('Invalid Credentials');
        }
        if (response.jsonCode === 407) {
          // session expired. login again!
          $loginForm.find('.error').html('Session Expired! Please log in again.');
        }
        if (response.jsonCode === 200) {
          // login successful
          isAuthenticated = true;
          const token = response.authToken;
          // save auth token to cookie
          document.cookie = encodeURIComponent('authToken') + '=' + encodeURIComponent(token) + '; path =/; max-age=86400';
          fetchTxnsList(token);
        }
      })
      .fail(function () {
        $loginForm.find('.error').html('Something went wrong. Please try again.');
      })
      .always(function () {
        isFormSubmitting = false;
        $loginFormSubmitBtn.html('Login');
      });
  });

  // Create Transaction Form Submission
  $createTxnSubmitBtn.on('click', function (e) {
    if (isFormSubmitting) return;
    e.preventDefault();

    $createTxnMsg.removeClass('error').html('');

    const amount = $('#createTxnAmount').val();
    const merchant = $('#createTxnMerchant').val();
    const created = $('#createTxnDate').val();

    // input field validations
    if (!amount || !merchant || !created) {
      $('#createTxnError').html('Please provide valid information');
      return;
    }

    isFormSubmitting = true;
    $createTxnSubmitBtn.html('Submitting...');

    // prepare url querystring 
    const urlParmas = $.param({
      authToken,
      amount: amount * 100,
      merchant,
      created,
    });

    const url = `${createTxnURL}&${urlParmas}`;

    $.ajax(ajaxObj(url, 'POST')
    ).done(function (result) {
        const response = JSON.parse(result);
        if (response.jsonCode === 407) {
          $createTxnMsg.addClass('error').html('Session Expired! Please log in again.');
        }
        if (response.jsonCode === 200) {
          // creation successful
          $createTxnMsg.addClass('success').html('Transaction created successfully!');

          // add to indexed db
          const request = indexedDB.open(IDB_DB_NAME);
          request.onerror = (event) => console.error(`IDB error: ${event.target.error}`);
          request.onsuccess = async (event) => {
            const db = event.target.result;
            await insertToDB(db, response.transactionList[0]);
            $createTxnModal.css('display', 'none');
            start = 0;
            totalRecords++;
            // show fresh entry to UI
            getDataFromDB(start, recordsPerPage).then(data => {
              displayTransactions(data);
            }).catch(error => { console.error(error); });
          };
        }
      })
      .fail(function () {
        $createTxnMsg.addClass('error').html('Something went wrong. Please try again.');
      })
      .always(function () {
        isFormSubmitting = false;
        $createTxnSubmitBtn.html('Create Transaction');
      });
  });

});

