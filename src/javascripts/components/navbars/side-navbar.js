import $ from 'jquery';
import diary from '../diary/diary';
import events from '../events/events';

const hideAll = () => {
  $('#auth').addClass('hide');
  $('#userNameModalBtnDiv').addClass('hide');
  $('#homePageDiv').addClass('hide');
  $('.authed-diary').addClass('hide');
  $('.events').addClass('hide');
};

const showEvents = () => {
  hideAll();
  events.initEvents();
  $('.events').removeClass('hide');
};

const showDiary = () => {
  hideAll();
  diary.initDiary();
  $('.authed-diary').removeClass('hide');
};

const showHome = () => {
  hideAll();
  $('#homePageDiv').removeClass('hide');
};

const showAuth = () => {
  hideAll();
  $('#auth').removeClass('hide');
};

const attachSideNavEvents = () => {
  $('#navbar-button-events').click(showEvents);
  $('#navbar-button-diary').click(showDiary);
  $('#navbar-button-home').click(showHome);
  $('#navbar-button-logout').click(showAuth);
};

export default { attachSideNavEvents };
