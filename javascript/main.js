var KeyCode = {
  init: function() {
    this.bindings();
  },
  
  bindings: function() {
    var obj = this;
    
    //Get Key On KeyDown
    obj.getKey();
    
    //Trigger/Hide Code Modal onClick
    obj.showModal();
    obj.hideModal();
    
    //Switch modal language
    obj.switchLanguage();
    
    //Copy Syntax
    obj.copySyntax();
  },
  
  elms: {
    wrapper: document.getElementById('wrapper'),
    codeModal: document.getElementById('codeModal'),
    getCodeBtn: document.getElementById('getCode')
  },
  
  getKey: function() {
    document.addEventListener('keydown', function(e) {
      e.preventDefault();
      KeyCode.showKey(e.keyCode);
    });
  },
  
  showKey: function(keyCode) {
    //Fade out the title
    document.getElementsByTagName('h1')[0].classList.add('fade-out-title');
    
    //Show Key
    document.getElementById('showKey').innerHTML = keyCode;
    
    //Change keycode in syntax
    var getHolders = KeyCode.elms.codeModal.getElementsByTagName('span');
    for(i = 0; i < getHolders.length; i++) {
      getHolders[i].innerHTML = keyCode;
    }
  },
  
  showModal: function() {
    var elm = document.getElementById('getCode');
    elm.addEventListener('click', function(e) {
      e.preventDefault();
      elm.className = 'active-main-nav';
      
      KeyCode.toggleClass(KeyCode.elms.wrapper, 'hide', 'show');
      KeyCode.elms.codeModal.className = 'show';
    });
  },
  
  hideModal: function() {
    var elm = document.getElementById('closeModal');
    elm.addEventListener('click', function(e) {
      e.preventDefault();
      
      var c = KeyCode.elms;
      c.codeModal.className = 'hide';
      c.getCodeBtn.removeAttribute('class');
      KeyCode.toggleClass(c.wrapper, 'show', 'hide');
    });
  },
  
  switchLanguage: function() {
    var getSwitches = document.querySelectorAll('[data-trigger]');
    
    for(elm = 0; elm < getSwitches.length; elm++) {
      getSwitches[elm].addEventListener('click', function(e) {
        e.preventDefault();
        var getTabs = document.querySelectorAll('.code-nav li');
        
        for(navTabs = 0; navTabs < getTabs.length; navTabs++) {
          getTabs[navTabs].classList.remove('active-code-nav');
        }
        
        this.parentNode.classList.add('active-code-nav');
        
        var selectedLanguage = this.getAttribute('data-trigger');
        var getCodeWindows = document.querySelectorAll('[data-target]');
        
        document.getElementById('copyButton').setAttribute('data-clipboard-target', selectedLanguage + 'Code');
        
        for(codeWindows = 0; codeWindows < getCodeWindows.length; codeWindows++) {
          KeyCode.toggleClass(getCodeWindows[codeWindows], 'hide', 'show');
        }
        var activateWindow = document.querySelectorAll('[data-target=' + selectedLanguage + ']')[0];
        KeyCode.toggleClass(activateWindow, 'show', 'hide');
      });
    }
  },
  
  copySyntax: function() {
    document.getElementById("copyButton").addEventListener('click', function(e) {
      e.preventDefault();
    });
    
    var client = new ZeroClipboard(document.getElementById("copyButton"));
    client.on( "ready", function(readyEvent) {
      client.on( "aftercopy", function() {
        document.querySelector('.modal-controls p').className = '';
        
        setTimeout(function() {
          document.querySelector('.modal-controls p').className = 'hide';
        }, 1000);
      });
    });
  },
  
  toggleClass: function(elm, addClass, removeClass) {
    elm.classList.remove(removeClass);
    elm.classList.add(addClass);
  }
}

KeyCode.init();