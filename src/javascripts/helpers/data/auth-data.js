import firebase from 'firebase/app';
import 'firebase/auth';

import $ from 'jquery';

import sideNav from '../../components/navbars/side-navbar';
import usersData from './users-data';
import dashboard from '../../components/dashboard/dashboard';

const homeNavbar = document.getElementById('navbar-button-home');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const diaryNav = document.getElementById('navbar-button-diary');
const eventsNav = document.getElementById('navbar-button-events');
const newsNav = document.getElementById('navbar-button-news');
const authDiv = document.getElementById('auth');
const homePageDiv = document.getElementById('homePageDiv');
const messagesNavBar = document.getElementById('navbar-button-messages');
const messagesDiv = document.getElementById('messagesPageDiv');
const navUsername = document.getElementById('username-container');

const printHomePage = () => {
  usersData.getUsersArray()
    .then(() => {
      dashboard.dashInit();
    })
    .catch(error => console.error(error, 'could not get users array'));
};

const showOnLogin = () => {
  homeNavbar.classList.remove('hide');
  authNavbar.classList.add('hide');
  logoutNavbar.classList.remove('hide');
  authDiv.classList.add('hide');
  homePageDiv.classList.remove('hide');
  diaryNav.classList.remove('hide');
  messagesNavBar.classList.remove('hide');
  eventsNav.classList.remove('hide');
  newsNav.classList.remove('hide');
  navUsername.classList.add('d-flex');
  navUsername.classList.remove('hide');
  printHomePage();
};

const hideOnLogoff = () => {
  homeNavbar.classList.add('hide');
  authNavbar.classList.remove('hide');
  logoutNavbar.classList.add('hide');
  authDiv.classList.remove('hide');
  diaryNav.classList.add('hide');
  homePageDiv.classList.add('hide');
  eventsNav.classList.add('hide');
  newsNav.classList.add('hide');
  messagesNavBar.classList.add('hide');
  messagesDiv.classList.add('hide');
  navUsername.classList.remove('d-flex');
  navUsername.classList.add('hide');
};

const logout = () => {
  firebase.auth().signOut();
};

const addUsername = () => {
  $('#userNameModal').off('hidden.bs.modal', logout); // removes sign out event listener on modal hide
  const userName = document.getElementById('userNameInput').value;
  if (userName) {
    const newUser = {
      uid: firebase.auth().currentUser.uid,
      userName,
    };

    usersData.addNewUser(newUser)
      .then(() => {
        showOnLogin();
      })
      .catch(error => console.error(error));
  } else {
    logout();
  }
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      sideNav.attachSideNavEvents();
      $('#userNameModal').on('hidden.bs.modal', logout); // adds event listener on modal close
      usersData.getUsersArray()
        .then((users) => {
          const matchingUser = users.find(u => u.uid === user.uid);
          if (matchingUser) {
            showOnLogin(user);
            $('#username').html(matchingUser.userName);
          } else {
            authDiv.classList.add('hide');
            authNavbar.classList.add('hide');
            $('#userNameModal').modal('show');
            document.getElementById('saveUserNameBtn').addEventListener('click', addUsername);
          }
        })
        .catch(error => console.error('could not get users array', error));
    } else {
      hideOnLogoff();
    }
  });
};

export default {
  checkLoginStatus,
};
