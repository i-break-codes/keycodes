var KeyCode = {
  init: function() {
    this.bindings();
  },
  
  bindings: function() {
    //Get Key On KeyDown
    this.getKey();
    
    //Trigger/Hide Code Modal onClick
    this.showModal();
    this.hideModal();
    
    //Switch modal language
    this.switchLanguage();
    
    //Copy Syntax
    this.copySyntax();
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
    
    var test = document.getElementById('codeModal');
    test.getElementsByTagName('span')[0].innerHTML = keyCode;
  },
  
  showModal: function() {
    var elm = document.getElementById('getCode');
    elm.addEventListener('click', function(e) {
      e.preventDefault();
      elm.className = 'active-main-nav';
      
      KeyCode.elms.wrapper.classList.remove('show');
      KeyCode.elms.wrapper.classList.add('hide');
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
      c.wrapper.classList.remove('hide');
      c.wrapper.classList.add('show');
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
          getCodeWindows[codeWindows].classList.remove('show');
          getCodeWindows[codeWindows].classList.add('hide');
        }
        var activateWindow = document.querySelectorAll('[data-target=' + selectedLanguage + ']')[0];
        activateWindow.classList.remove('hide');
        activateWindow.classList.add('show');
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
  }
}

KeyCode.init();