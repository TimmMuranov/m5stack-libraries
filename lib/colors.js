var colors = {
  black:   display.color(0, 0, 0),
  white:   display.color(255, 255, 255),
  gray:    display.color(128, 128, 128),
  darkGray:display.color(50, 50, 50),
  
  red:     display.color(255, 40, 40),
  green:   display.color(40, 220, 80),
  blue:    display.color(40, 120, 255),
  
  yellow:  display.color(255, 220, 0),
  orange:  display.color(255, 130, 0),
  pink:    display.color(255, 100, 180),
  purple:  display.color(160, 50, 240),
  cyan:    display.color(0, 230, 230),
  
  themeMain: BRUCE_PRICOLOR,
  themeSec:  BRUCE_SECCOLOR,
  themeBg:   BRUCE_BGCOLOR
};

colors.list = [
   colors.black,
   colors.white,
   colors.gray,
   colors.darkGray,
   colors.red, 
   colors.green, 
   colors.blue, 
   colors.yellow, 
   colors.orange, 
   colors.pink,
   colors.purple, 
   colors.cyan 
];

colors.success = colors.green;
colors.warning = colors.yellow;
colors.danger  = colors.red;
colors.info    = colors.cyan;
colors.muted   = colors.gray;
