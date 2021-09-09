const options = {
  apiKey: '971e934d-373e-4d5a-9bae-4f5fc831c57c',
  v: '2.1',
  lang: 'ru_RU',
  coordorder: 'latlong',
};

let loading = false;

let wait = [];

export default {
  state: null,
  loadMap() {
    return new Promise((resolve, reject) => {
      if (window.ymaps) return resolve(window.ymaps);
      if (!loading) {
        loading = true;
        const scriptTag = document.createElement('script');
        scriptTag.onload = () => {
          window.ymaps.ready(() => {
            loading = false;
            this.state = window.ymaps;
            wait.forEach((item) => {
              item.resolve(this.state);
            });
            wait = [];
            resolve(this.state);
          });
        };
        scriptTag.onerror = () => {
          loading = false;
          const error = new Error('Ошибка загрузки');
          wait.forEach((item) => {
            item.reject(error);
          });
          wait = [];
          reject(error);
        };
        const baseUrl = 'https://api-maps.yandex.ru';
        scriptTag.setAttribute('src', `${baseUrl}/${options.v}?lang=${options.lang}&coordorder=${options.coordorder}`);
        document.body.appendChild(scriptTag);
      } else {
        wait.push({
          resolve,
          reject,
        });
      }
    });
  },
};
