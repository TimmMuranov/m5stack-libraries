var drawer = {
  // random color
  random: function() {
    return display.color(random(50, 255), random(50, 255), random(50, 255));
  },

  // translating from web format "#RRGGBB"
  hex: function(hexStr) {
    if (hexStr.charAt(0) === "#") {
      hexStr = hexStr.substring(1);
    }
    var r = parseInt(hexStr.substring(0, 2), 16);
    var g = parseInt(hexStr.substring(2, 4), 16);
    var b = parseInt(hexStr.substring(4, 6), 16);
    return display.color(r, g, b);
  },

  // a rainbow (pos от 0 до 255)
  rainbow: function(pos) {
    pos = 255 - (pos % 256);
    if (pos < 85) {
      return display.color(255 - pos * 3, 0, pos * 3);
    }
    if (pos < 170) {
      pos -= 85;
      return display.color(0, pos * 3, 255 - pos * 3);
    }
    pos -= 170;
    return display.color(pos * 3, 255 - pos * 3, 0);
  }
};
