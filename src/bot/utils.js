class Utils {
  static getInlineImage(str) {
    return `https://raw.githubusercontent.com/shishkevichd/ttgdt_shedule_bot/refs/heads/main/images/${str}.png`
  }
  static generateRandomNumber() {
    return Math.floor(Math.random() * 100001)
  }
}

export default Utils