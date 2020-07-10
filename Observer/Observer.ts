// 观察者
interface Observer {
  update(params: any);
}
// 被观察主题
interface Subject {
  registerObserver(observer: Observer);
  removeObserver(observer: Observer);
  notifyObserver();
}
// 热水器控制台
class WaterHeaterControl implements Observer {
  update(arg: boolean) {
    if (arg) {
      console.log('主人水烧好了，已自动为您切断电源！');
    }
  }
}
// 水温检测装置
class WaterTemperature implements Subject {

  /**观察者 */
  private observers: Observer[] = [];
  private _isBoiling: boolean;
  /**是否沸腾 */
  set isBoiling(v: boolean) {
    this._isBoiling = v;
    this.notifyObserver();
  }
  get isBoiling() {
    return this._isBoiling;
  }
  /**
   * 注册观察者
   * @param observer 观察者
   */
  registerObserver(observer: Observer): void {
    if (!this.observers.some(item => { item === observer })) {
      this.observers.push(observer);
    }
  }
  /**移除观察者 */
  removeObserver(observer: Observer) {
    if (this.observers.length > 0) {
      this.observers = this.observers.filter(item => item !== observer);
    }
  }
  /**通知所有观察者 */
  notifyObserver() {
    this.observers.forEach(item => {
      item.update(this.isBoiling);
    })
  }
}
const waterTemperature = new WaterTemperature();
const waterHeaterControl = new WaterHeaterControl();
waterTemperature.registerObserver(waterHeaterControl);
waterTemperature.isBoiling = true;

