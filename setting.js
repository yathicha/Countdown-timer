function validateInput() {
    var hours = parseInt(document.getElementById('hours').value);
    var minutes = parseInt(document.getElementById('minutes').value);
    var seconds = parseInt(document.getElementById('seconds').value);

    if (hours < 0 || minutes < 0 || seconds < 0) {
      var overlay = document.getElementById('overlay');
      var popup = document.getElementById('popup');
      overlay.style.display = 'block';
      popup.style.display = 'block';
      return false;
    }

    return true;
  }

  function closePopup() {
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    overlay.style.display = 'none';
    popup.style.display = 'none';
  }