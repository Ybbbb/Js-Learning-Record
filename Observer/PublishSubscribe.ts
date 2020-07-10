
class Events {
    /**事件对象 */
    eventObj = {};
    constructor() { }
    /**
     * 发布
     * @param topic 要发布的主题
     * @param arg 作为事件发送的数据
     */
    publish(topic: string, ...args: any[]) {
        if (this.eventObj.hasOwnProperty(topic)) {
            const fn = this.eventObj[topic];
            fn.forEach(fn => {
                fn.apply(this, args);
            });
        }
    }
    /**
     * 订阅
     * @param topic 要订阅的主题
     * @param handlers 事件处理函数
     */
    subscribe(topic: string, ...handlers: Function[]): void {
        if (!this.eventObj.hasOwnProperty(topic)) {
            this.eventObj[topic] = [];
        }
        this.eventObj[topic].push(...handlers);
    }
    /**
     * 取消订阅
     * @param topic 订阅的主题
     * @param handler 要取消的事件处理函数
     */
    unsubscribe(topic: string, handler?: Function): boolean {
        if (!this.eventObj.hasOwnProperty(topic)) {
            return false;
        }
        if (handler) {
            // 如果处理函数存在，则从主题处理数组中删除它
            this.eventObj[topic] = this.eventObj[topic].filter(x => x !== handler);
            return true;
        } else {
            // 否则直接删除该主题
            return delete this.eventObj[topic];
        }
    }
}
const events = new Events();
/**报社 */
interface NewsOffice {
    // 发布新闻
    releaseNews();
}
class HuPuNewsOffice implements NewsOffice {
    releaseNews() {
        console.log('新闻发布了！');
        events.publish('news-release', '今天预计有大到暴雨！');
    }
}
/**读者 */
interface Reader {
    // 订阅新闻
    subscribeNews();
    // 取消订阅
    unscribeNews();
}
class XiaoMing implements Reader {
    subscribeNews() {
        events.subscribe('news-release', this.readNews);
    }
    unscribeNews() {
        events.unsubscribe('news-release', this.readNews);
    }
    private readNews(arg) {
        console.log(`今天新闻是：${arg}`);
        console.log('今天又下雨啊，出门要记得带伞！');
    }
}
class LaoWang implements Reader {
    // 订阅新闻
    subscribeNews() {
        events.subscribe('news-release', this.readNews);
    }
    // 取消订阅
    unscribeNews() {
        events.unsubscribe('news-release', this.readNews);
    }
    private readNews(arg) {
        console.log(`今天新闻是：${arg}`);
        console.log('今天下雨适合睡觉！');
    }
}
// Test
const xiaoMing = new XiaoMing();
xiaoMing.subscribeNews();
const laoWang = new LaoWang();
laoWang.subscribeNews();
laoWang.unscribeNews();
const huPu = new HuPuNewsOffice();
huPu.releaseNews();