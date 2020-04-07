import Vue from 'vue';
import {GmContentView} from "./utils/tf.js"
import App from './App.vue'

export class GenericView extends GmContentView {
  vue;
  vueApp;

  constructor() {
    super();
    this.init();
  }

  init() { 
    this.vue = new Vue({
      render: h => h(App),
    }).$mount('#tfjs-app');
    this.vueApp = this.vue.$children[0];
  }

  /**
   * @type {tf.TribefireJs}
   */
  tfjs;

  /**
   * @type {tf.GmSession}
   */
  session;

  configureTribefireJs(tfjs) {
    this.tfjs = tfjs;
  }

  configureGmSession(session) {
    this.session = session;

    //resend data to Vue App  
    this.vueApp.configureGmSession(session);
  }

  deselectAll() {
    this.vueApp.deselectAll();
  }
    
  getGmSession() {
    return this.session;
  } 

  setContent(content) {
    if (this.vue == null)
       return;

     //resend data to Vue App  
     this.vueApp.setContent(content);
  }

  getFirstSelectedItem() {
    return this.vueApp.getFirstSelectedItem(); 
  }

  getCurrentSelection() {
    return this.vueApp.getCurrentSelection(); 
  }

  getView() {
    return this;
  } 

  getElement() {
    return this.vue.$el;
  }
}
