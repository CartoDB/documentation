class user {
  constructor() {
    this.initUserStatus();
  }

  getCookieValue(cookieName) {
    var cookies = document.cookie.split("; ");
    for(var i = 0; i < cookies.length; i++){
      var keyValue = cookies[i].split("=");
      if(keyValue[0] == cookieName)
        return keyValue[1];
    }
    return null;
  }

  hasCartoCookie() {
    if(this.getCookieValue("_cartodb_base_url"))
      return true;
    return false;
  }

  getBaseURL() {
    return decodeURIComponent(this.getCookieValue("_cartodb_base_url"));
  }

  initUserStatus() {
    if(!this.hasCartoCookie())
      this.initDisconnectedSettings();
    else {
      var apiUrl = this.getBaseURL() + "/api/v3/me";
      var ownClass = this;
      fetch(apiUrl, {
              method: 'GET',
              credentials: 'include'
            }
      ).then(function(response) {
        if (!response.ok)
          throw Error(response.statusText);
        return response.json();
      }).then(function(jsonResponse) {
        ownClass.userInformation = jsonResponse;
        if(jsonResponse.user_data){
          ownClass.initConnectedSettings()
          ownClass.setUserInfo();
        }
        else
        {
          ownClass.initDisconnectedSettings();
        }
      }).catch(function(error) {
        ownClass.initDisconnectedSettings();
      });
    }
  }

  changeTextElement(element, text) {
    if (element)
      element.innerHTML = text;
  }

  changeImageElement(element, imageUrl) {
    if (element)
      element.src = imageUrl;
  }

  setUserInfo() {
    var elements = document.getElementsByClassName("js-user-information");
    for (var i = 0; i < elements.length; i++){
      var dataset = elements[i].dataset;
      if(dataset.addusertext){
        this.changeTextElement(elements[i], this.userInformation.user_data[dataset.addusertext])
      }
      if (dataset.adduserimage){
        this.changeImageElement(elements[i], this.userInformation.user_data[dataset.adduserimage])
      }
    }
  }

  changeURLElement(element, url) {
    if (element)
      element.href = url;
  }

  setBaseurlLinks() {
    var elements = document.getElementsByClassName("js-user-information");
    for (var i = 0; i < elements.length; i++){
      var dataset = elements[i].dataset;
      if(dataset.addbaselink){
        this.changeURLElement(elements[i], this.getBaseURL() + "/" + dataset.addbaselink)
      }
    }
  }

  addClassToElementList(elementList, className) {
    for(var i = 0; i < elementList.length; i++)
      elementList[i].classList.add(className);
  }

  removeClassFromElementList(elementList, className) {
    for(var i = 0; i < elementList.length; i++)
      elementList[i].classList.remove(className);
  }

  initConnectedSettings() {
    var showConnected = document.getElementsByClassName("js-User--showConnected");
    var hideConnected = document.getElementsByClassName("js-User--hideConnected");
    this.addClassToElementList(hideConnected, "user-element--hide");
    this.removeClassFromElementList(showConnected, "user-element--hide");
    this.setBaseurlLinks();
    if(typeof ga !== 'undefined'){
      ga('send', 'event', 'UserState', 'pageview', "Connected", {
        nonInteraction: true
      });
    }
  }

  initDisconnectedSettings() {
    var showConnected = document.getElementsByClassName("js-User--showConnected");
    var hideConnected = document.getElementsByClassName("js-User--hideConnected");
    this.addClassToElementList(showConnected, "user-element--hide");
    this.removeClassFromElementList(hideConnected, "user-element--hide");
    if(typeof ga !== 'undefined'){
      ga('send', 'event', 'UserState', 'pageview', "Disconnected", {
        nonInteraction: true
      });
    }
  }
}

var userClass = new user();

export default userClass;