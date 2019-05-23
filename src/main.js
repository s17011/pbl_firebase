import Vue from 'vue'
import App from './App.vue'

import firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp({
  databaseURL: "https://virebase-id.firebaseio.com",
  projectId: "virebase-id",
});

export const db = firebase.firestore();

new Vue({
  el: '#app',
  render: h => h(App)
})
