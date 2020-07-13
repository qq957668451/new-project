// 获取当前星期
export const getWeek = () => {
    var mydate = new Date();
    var myddy = mydate.getDay(); //获取存储当前日期
    var weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    ];
    return weekday[myddy];
};

// 本地存储
export const funLocalstorage = {
    set: (key, value, day) => {
        var data = {
            value: value,
            expiration: ''
        }
        // 设置X天后过期
        if (day && (Number(day) > 0)) {
            data.expiration = new Date().getTime() + Number(day) * 24 * 60 * 60 * 1000
            // 不设置过期天数，默认30天后过期
        } else if (day === undefined) {
            data.expiration = new Date().getTime() + 30 * 24 * 60 * 60 * 1000
            // 设置不过期
        } else if (day === -1) {
            data.expiration = 'notSet'
        }
        localStorage.setItem(key, JSON.stringify(data));
    },
    get: (key) => {
        var data = JSON.parse(localStorage.getItem(key))
        if (data) {
            if (data.expiration === 'notSet' || data.expiration > (new Date().getTime())) {
                return data.value
            } else {
                localStorage.removeItem(key);
            }
            return
        }

    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
}
// 设置cookie
export const setCookie = function (key, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// 获取cookie
export const getCookie = function (key) {
    var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return false;
}