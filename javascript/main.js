var KeyCode = function() {
  var wrapper = document.getElementById('wrapper');
  var codeModal = document.getElementById('codeModal');
  var getCodeBtn = document.getElementById('getCode');
  
  function init() {
    bindings();
  }
  
  function bindings() {
    getKey();
    showModal();
    hideModal();
    switchLanguage();
    copySyntax();
  }
  
  function getKey() {
    document.addEventListener('keydown', function(e) {
      e.preventDefault();
      showKey(e.keyCode);
    });
  }
  
  function showKey(keyCode) {
    document.getElementsByTagName('h1')[0].classList.add('fade-out-title');
    
    //Show Key
    document.getElementById('showKey').innerHTML = keyCode;
    
    //Change keycode in syntax
    var getHolders = codeModal.getElementsByTagName('span');
    for(i = 0; i < getHolders.length; i++) {
      getHolders[i].innerHTML = keyCode;
    }
  }
  
  function showModal() {
    var elm = document.getElementById('getCode');
    elm.addEventListener('click', function(e) {
      e.preventDefault();
      elm.className = 'active-main-nav';
      
      toggleClass(wrapper, 'hide', 'show');
      codeModal.className = 'show';
    });
  }
  
  function hideModal() {
    var elm = document.getElementById('closeModal');
    elm.addEventListener('click', function(e) {
      e.preventDefault();
      
      var c = KeyCode.elms;
      c.codeModal.className = 'hide';
      c.getCodeBtn.removeAttribute('class');
      toggleClass(c.wrapper, 'show', 'hide');
    });
  }
  
  function switchLanguage() {
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
          toggleClass(getCodeWindows[codeWindows], 'hide', 'show');
        }
        var activateWindow = document.querySelectorAll('[data-target=' + selectedLanguage + ']')[0];
        toggleClass(activateWindow, 'show', 'hide');
      });
    }
  }
  
  function copySyntax() {
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
  
  function toggleClass(elm, addClass, removeClass) {
    elm.classList.remove(removeClass);
    elm.classList.add(addClass);
  }
  
  return {
    init: init
  }
}();

KeyCode.init();