/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLoggedInUsers": () => (/* binding */ fetchLoggedInUsers),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchMessageList": () => (/* binding */ fetchMessageList),
/* harmony export */   "fetchSendingMessage": () => (/* binding */ fetchSendingMessage),
/* harmony export */   "fetchStatus": () => (/* binding */ fetchStatus)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function fetchStatus() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLoggedInUsers() {
  return fetch('/api/loggedinusers', {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchMessageList(currentTalkingTo) {
  return fetch('/api/messagelist', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      currentTalkingTo: currentTalkingTo
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchSendingMessage(message, currentTalkingTo) {
  return fetch('/api/message', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      message: message,
      currentTalkingTo: currentTalkingTo
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");



(function () {
  var state = {
    wasLoggedIn: false,
    username: '',
    userList: [],
    currentTalkingTo: '',
    messageList: [],
    timeoutId: '',
    error: ''
  };
  var loginEl = document.querySelector('.login-module');
  var statusEl = document.querySelector('.status-module');
  var loggedInUsersEl = document.querySelector('.logged-in-users');
  var messageEl = document.querySelector('.messages');
  var outGoingEl = document.querySelector('.outgoing');
  var errorEl = document.querySelector('.error-message');

  // every time get to this page, first check user status
  // if logged in, get logged-in-user list and current talking to user messages
  pollStatus();
  render();

  // regular polling
  function pollStatus() {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchStatus)().then(function (result) {
      state.username = result.username;
      if (state.username) {
        state.wasLoggedIn = true;
        renderLoginPage();
        renderStatusPage();
        (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLoggedInUsers)().then(function (result) {
          state.userList = result.loggedInUsers;
          renderLoggedInUsers();
        }).then(function () {
          (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessageList)(state.currentTalkingTo).then(function (result) {
            state.messageList = result.messageList;
            renderMessages();
          });
        });
      }
    }).then(function () {
      if (state.wasLoggedIn) {
        state.timeoutId = setTimeout(pollStatus, 5000);
      }
    })["catch"](function (err) {
      state.error = err.error;
      render(state.error);
    });
  }

  // at login page, logging-in, render chat-module with 
  // updating logged-in-user list and current talking to user messages
  loginEl.addEventListener('click', function (event) {
    if (event.target.classList.contains('login-button')) {
      var username = document.querySelector(".login-username").value;
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (response) {
        state.wasLoggedIn = true;
        state.username = username;
        pollStatus();
        (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLoggedInUsers)().then(function (result) {
          state.userList = result.loggedInUsers;
          render();
        }).then(function () {
          (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessageList)(state.currentTalkingTo).then(function (result) {
            state.messageList = result.messageList;
            render();
          });
        });
      })["catch"](function (err) {
        state.error = err.error;
        render(state.error);
      });
    }
  });

  // on chat page, log out, clear state
  statusEl.addEventListener('click', function (event) {
    if (event.target.classList.contains('logout-button')) {
      event.preventDefault();
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function (response) {
        state.wasLoggedIn = false;
        state.username = '';
        state.userList = [];
        state.currentTalkingTo = '';
        state.messageList = [];
        clearTimeout(state.timeoutId);
        state.timeoutId = '', render();
      })["catch"](function (err) {
        state.error = err.error;
        render(state.error);
      });
    }
  });

  // on chat page, change talking to user
  loggedInUsersEl.addEventListener('click', function (event) {
    if (event.target.classList.contains('loggedInUser')) {
      var currentTalkingTo = event.target.dataset.username;
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessageList)(currentTalkingTo).then(function (result) {
        state.currentTalkingTo = currentTalkingTo;
        state.messageList = result.messageList;
        render();
      })["catch"](function (err) {
        state.error = err.error;
        render(state.error);
      });
    }
  });

  // on chat page, send message, then re-render message list
  outGoingEl.addEventListener('click', function (event) {
    if (event.target.classList.contains('send-button')) {
      event.preventDefault();
      var messageContent = document.querySelector('.content-to-send').value;
      var message = {
        sendFrom: state.username,
        content: messageContent
      };
      var currentTalkingTo = state.currentTalkingTo;
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSendingMessage)(message, currentTalkingTo).then(function (result) {
        (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessageList)(currentTalkingTo).then(function (result) {
          state.messageList = result.messageList;
          render();
        })["catch"](function (err) {
          state.error = err.error;
          render(state.error);
        });
      })["catch"](function (err) {
        state.error = err.error;
        render(state.error);
      });
    }
  });
  function renderLoginPage() {
    loginEl.innerHTML = state.wasLoggedIn ? '' : "\n            <input class=\"login-username\" name=\"username\" placeholder=\"Username\"/>\n            <button class=\"login-button\" >login</button>\n        ";
  }
  function renderStatusPage() {
    statusEl.innerHTML = state.wasLoggedIn ? "\n            <div>\n                <span class=\"welcome\">Welcome ".concat(state.username, "!</span>\n                <button class=\"logout-button\">Log out</button>\n            </div>\n        ") : "";
  }
  function renderLoggedInUsers() {
    var userList = state.userList;
    var html = userList.map(function (username) {
      if (username == state.username) {
        return "";
      }
      return "\n                <li>\n                    <span class=\"loggedInUser\" data-username=\"".concat(username, "\">").concat(username, "</span>\n                </li>\n            ");
    }).join('');
    loggedInUsersEl.innerHTML = state.wasLoggedIn ? html : "";
  }
  function renderMessages() {
    var messages = state.messageList;
    var html = messages.map(function (message) {
      return "\n                <li>\n                    <div class=\"message\">\n                        <div class=\"sender-info\">\n                            <span class=\"username\">".concat(message.sendFrom, "</span>\n                        </div>\n                        <p class=\"message-text\">").concat(message.content, "</p>\n                    </div>\n                </li>\n            ");
    }).join('');
    messageEl.innerHTML = state.wasLoggedIn && !state.currentTalkingTo ? "You have to select a user to start chatting." : html;
  }
  function renderOutgoing() {
    outGoingEl.innerHTML = state.wasLoggedIn && state.currentTalkingTo ? "\n            <form class=\"send-message\">\n                <input class=\"content-to-send\" placeholder=\"Enter message to send\" />\n                <button class=\"send-button\" type=\"submit\">Send</button>\n            </form>\n        " : "";
  }
  function renderErrorPage(error) {
    var errorMsg = {
      'auth-insufficient': "Don't use dog as username",
      'required-username': "Please enter a valid username. A valid username should only contains digits and letters.",
      'auth-missing': "Please login.",
      'require-message': 'Please enter a message.',
      'invalid-word': "Please enter a valid word. A valid word should only contains letters."
    };
    errorEl.innerHTML = error ? "<p>Error: ".concat(errorMsg[error], "</p>") : '';
  }
  function render(error) {
    renderLoginPage();
    renderStatusPage();
    renderLoggedInUsers();
    renderMessages();
    renderOutgoing();
    renderErrorPage(error);
  }
})();
})();

/******/ })()
;
//# sourceMappingURL=page.js.map