function GButton(pin, holdMs, clickTimeoutMs) {
  this.pin = pin;
  this.holdMs = holdMs || 600;           // Время до срабатывания удержания (мс)
  this.clickTimeout = clickTimeoutMs || 350; // Окно ожидания следующего клика (мс)
  this.debounceMs = 30;                  // Защита от дребезга контактов (мс)

  this.state = false;
  this.lastRawState = false;
  this.lastDebounceTime = 0;

  this.pressTime = 0;
  this.lastReleaseTime = 0;
  this.clickCounter = 0;

  this.holdFlag = false;
  this.holdedReported = false;

  // Одноразовые флаги событий (сбрасываются после чтения)
  this._single = false;
  this._double = false;
  this._triple = false;
  this._hasClicks = false;
  this._lastClicks = 0;
  this._holded = false;

  gpio.pinMode(this.pin, "INPUT_PULLUP");
}

GButton.prototype.tick = function () {
  var currentTime = now();
  var rawState = (gpio.digitalRead(this.pin) === 0);

  // Фильтрация дребезга контактов
  if (rawState !== this.lastRawState) {
    this.lastDebounceTime = currentTime;
    this.lastRawState = rawState;
  }

  if ((currentTime - this.lastDebounceTime) >= this.debounceMs) {
    // Момент нажатия (переход 0 -> 1)
    if (rawState && !this.state) {
      this.state = true;
      this.pressTime = currentTime;
      this.holdFlag = false;
      this.holdedReported = false;
    }

    // Момент отпускания (переход 1 -> 0)
    if (!rawState && this.state) {
      this.state = false;
      this.lastReleaseTime = currentTime;

      // Засчитываем клик, только если не было удержания
      if (!this.holdFlag) {
        this.clickCounter++;
      }
      this.holdFlag = false;
    }
  }

  // Проверка удержания (пока кнопка зажата)
  if (this.state && !this.holdFlag) {
    if ((currentTime - this.pressTime) >= this.holdMs) {
      this.holdFlag = true;
      this.clickCounter = 0; // Сбрасываем накопленные клики при удержании
      if (!this.holdedReported) {
        this._holded = true;
        this.holdedReported = true;
      }
    }
  }

  // Подсчёт серии кликов после окончания окна ожидания
  if (!this.state && this.clickCounter > 0) {
    if ((currentTime - this.lastReleaseTime) >= this.clickTimeout) {
      this._lastClicks = this.clickCounter;
      this._hasClicks = true;

      if (this.clickCounter === 1) this._single = true;
      if (this.clickCounter === 2) this._double = true;
      if (this.clickCounter === 3) this._triple = true;

      this.clickCounter = 0;
    }
  }
};

// Одиночный клик (сработает один раз)
GButton.prototype.isSingle = function () {
  if (this._single) {
    this._single = false;
    return true;
  }
  return false;
};

// Двойной клик (сработает один раз)
GButton.prototype.isDouble = function () {
  if (this._double) {
    this._double = false;
    return true;
  }
  return false;
};

// Тройной клик (сработает один раз)
GButton.prototype.isTriple = function () {
  if (this._triple) {
    this._triple = false;
    return true;
  }
  return false;
};

// Была ли любая серия кликов (1, 2, 3, 4, 5...)
GButton.prototype.hasClicks = function () {
  if (this._hasClicks) {
    this._hasClicks = false;
    return true;
  }
  return false;
};

// Возвращает точное количество кликов в последней серии
GButton.prototype.getClicks = function () {
  return this._lastClicks;
};

// Возвращает true один раз в момент достижения порога удержания
GButton.prototype.isHolded = function () {
  if (this._holded) {
    this._holded = false;
    return true;
  }
  return false;
};

// Возвращает true непрерывно, пока кнопка удерживается дольше holdMs
GButton.prototype.isHold = function () {
  return this.holdFlag;
};
