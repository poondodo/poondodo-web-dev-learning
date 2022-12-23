"use strict";

import { fetchLogin, fetchStatus, fetchLogout, fetchLoggedInUsers, fetchMessageList, fetchSendingMessage } from "./services";

(function () {
    const state = {
        wasLoggedIn: false,
        username: '',
        userList: [],
        currentTalkingTo: '',
        messageList: [],
        timeoutId: '',
        error: '',
    }

    const loginEl = document.querySelector('.login-module');
    const statusEl = document.querySelector('.status-module');
    const loggedInUsersEl = document.querySelector('.logged-in-users');
    const messageEl = document.querySelector('.messages');
    const outGoingEl = document.querySelector('.outgoing');
    const errorEl = document.querySelector('.error-message');

    // every time get to this page, first check user status
    // if logged in, get logged-in-user list and current talking to user messages
    pollStatus();
    render();

    // regular polling
    function pollStatus() {
        fetchStatus()
        .then(result => {
            state.username = result.username;
            if (state.username) {
                state.wasLoggedIn = true;
                renderLoginPage();
                renderStatusPage();
                fetchLoggedInUsers()
                .then(result => {
                    state.userList = result.loggedInUsers;
                    renderLoggedInUsers();
                })
                .then( () => {
                    fetchMessageList(state.currentTalkingTo).then(result => {
                        state.messageList = result.messageList;
                        renderMessages();
                    });
                });
            }
        })
        .then(() => {
            if (state.wasLoggedIn) {
                state.timeoutId = setTimeout(pollStatus, 5000);
            }
        })
        .catch(err => {
            state.error = err.error;
            render(state.error);
        });
    }

    // at login page, logging-in, render chat-module with 
    // updating logged-in-user list and current talking to user messages
    loginEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('login-button')) {
            const username = document.querySelector(`.login-username`).value;
            fetchLogin(username).then(response => {
                state.wasLoggedIn = true;
                state.username = username;
                pollStatus();
                fetchLoggedInUsers()
                .then(result => {
                    state.userList = result.loggedInUsers;
                    render();
                })
                .then( () => {
                    fetchMessageList(state.currentTalkingTo).then(result => {
                        state.messageList = result.messageList;
                        render();
                    })
                });
            }).catch(err => {
                state.error = err.error;
                render(state.error);
            });
        }
    })

    // on chat page, log out, clear state
    statusEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('logout-button')) {
            event.preventDefault();
            fetchLogout().then(response => {
                state.wasLoggedIn = false;
                state.username = '';
                state.userList = [];
                state.currentTalkingTo = '';
                state.messageList = [];
                clearTimeout(state.timeoutId);
                state.timeoutId = '',
                render();
            }).catch(err => {
                state.error = err.error;
                render(state.error);
            });
        }
    })

    // on chat page, change talking to user
    loggedInUsersEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('loggedInUser')) {
            const currentTalkingTo = event.target.dataset.username;
            fetchMessageList(currentTalkingTo).then(result => {
                state.currentTalkingTo = currentTalkingTo;
                state.messageList = result.messageList;
                render();
            }).catch(err => {
                state.error = err.error;
                render(state.error);
            });
        }
    })

    // on chat page, send message, then re-render message list
    outGoingEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('send-button')) {
            event.preventDefault();
            const messageContent = document.querySelector('.content-to-send').value;
            const message = {
                sendFrom: state.username,
                content: messageContent,
            };
            const currentTalkingTo = state.currentTalkingTo;
            fetchSendingMessage(message, currentTalkingTo).then(result => {
                fetchMessageList(currentTalkingTo).then(result => {
                    state.messageList = result.messageList;
                    render();
                }).catch(err => {
                    state.error = err.error;
                    render(state.error);
                });
            }).catch(err => {
                state.error = err.error;
                render(state.error);
            })
        }
    })

    function renderLoginPage() {
        loginEl.innerHTML = state.wasLoggedIn ? '' : `
            <input class="login-username" name="username" placeholder="Username"/>
            <button class="login-button" >login</button>
        `;
    }

    function renderStatusPage() {
        statusEl.innerHTML = state.wasLoggedIn ? `
            <div>
                <span class="welcome">Welcome ${state.username}!</span>
                <button class="logout-button">Log out</button>
            </div>
        ` : ``;
    }

    function renderLoggedInUsers() {
        const userList = state.userList;
        const html = userList.map((username) => {
            if (username == state.username) {
                return ``;
            }
            return `
                <li>
                    <span class="loggedInUser" data-username="${username}">${username}</span>
                </li>
            `;
        }).join('');
        loggedInUsersEl.innerHTML = state.wasLoggedIn ? html : ``;
    }

    function renderMessages() {
        const messages = state.messageList;
        const html = messages.map((message) => {
            return `
                <li>
                    <div class="message">
                        <div class="sender-info">
                            <span class="username">${message.sendFrom}</span>
                        </div>
                        <p class="message-text">${message.content}</p>
                    </div>
                </li>
            `;
        }).join('');
        messageEl.innerHTML = (state.wasLoggedIn && !state.currentTalkingTo) ? `You have to select a user to start chatting.` : html;
    }

    function renderOutgoing() {
        outGoingEl.innerHTML = (state.wasLoggedIn && state.currentTalkingTo) ? `
            <form class="send-message">
                <input class="content-to-send" placeholder="Enter message to send" />
                <button class="send-button" type="submit">Send</button>
            </form>
        ` : ``;
    }

    function renderErrorPage(error) {
        const errorMsg = {
            'auth-insufficient': "Don't use dog as username",
            'required-username': "Please enter a valid username. A valid username should only contains digits and letters.",
            'auth-missing': "Please login.",
            'require-message': 'Please enter a message.',
            'invalid-word': "Please enter a valid word. A valid word should only contains letters."
        }
        errorEl.innerHTML = error ? `<p>Error: ${errorMsg[error]}</p>` : '';
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