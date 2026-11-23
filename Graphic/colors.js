var colors = {
  // basic colors
  black:     display.color(0, 0, 0),
  white:     display.color(255, 255, 255),
  gray:      display.color(128, 128, 128),
  lightGray: display.color(190, 190, 190),
  red:       display.color(255, 40, 40),
  green:     display.color(40, 220, 80),
  blue:      display.color(40, 120, 255),
  yellow:    display.color(255, 220, 0),
  orange:    display.color(255, 130, 0),
  pink:      display.color(255, 100, 180),
  purple:    display.color(160, 50, 240),
  cyan:      display.color(0, 230, 230),
  gold:      display.color(255, 200, 40),
  lime:      display.color(160, 255, 40),
  
  success:   display.color(40, 220, 80),
  warning:   display.color(255, 190, 0),
  danger:    display.color(255, 50, 50),
  info:      display.color(50, 180, 255),
  muted:     display.color(110, 110, 110),

  // system colors in bruce
  themeMain: BRUCE_PRICOLOR,
  themeSec:  BRUCE_SECCOLOR,
  themeBg:   BRUCE_BGCOLOR,

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
